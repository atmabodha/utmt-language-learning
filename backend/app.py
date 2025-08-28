from fastapi import FastAPI, UploadFile, File  # Import FastAPI and related modules
from fastapi.responses import JSONResponse  # Import JSONResponse for HTTP responses
from pydantic import BaseModel  # Import BaseModel for request/response models
import threading  # Import threading for running tasks concurrently
from record_mic import record_audio  # Import function for recording audio
from api_02 import upload, save_transcript  # Import upload and save_transcript functions
import os  # Import os for file system operations
from api_secrets import GROQ_API_KEY, prompt  # Import API secrets
from groq import Groq  # Import Groq library for AI-powered processing
import random  # Import random for random operations

# Initialize the Groq client with the provided API key
client = Groq(api_key=GROQ_API_KEY)

# Initialize the FastAPI application
app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware  # Import middleware for CORS handling

# Configure Cross-Origin Resource Sharing (CORS) to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allowed origin for frontend
    allow_credentials=True,  # Allow credentials (cookies, headers)
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Variables for managing recording state and output filename
recording_thread = None  # Thread object for recording
recording_active = False  # Boolean flag to check recording status
recorded_filename = "output.wav"  # Default filename for recorded audio


class TranscriptionResponse(BaseModel):
    """
    Model for the transcription response.
    """
    message: str  # Response message
    content: str = ""  # Transcription content (default: empty)


def process_audio():
    """
    Process the recorded audio to transcribe and save the transcript.
    Uploads the recorded audio and saves the transcription.
    """
    global recorded_filename
    # Upload the recorded audio and get the URL
    audio_url = upload(recorded_filename)
    # Save the transcription using the uploaded audio URL
    save_transcript(audio_url, "file_title")


@app.post("/start-recording")
def start_recording():
    """
    API endpoint to start recording audio.
    Starts a new thread for audio recording.
    """
    global recording_thread, recording_active

    if recording_active:
        # If a recording is already in progress, return an error response
        return JSONResponse(
            status_code=400, content={"message": "Recording is already in progress."}
        )

    recording_active = True  # Set the recording state to active

    # Create and start a new thread for audio recording
    recording_thread = threading.Thread(
        target=record_audio, args=(recorded_filename, lambda: recording_active)
    )
    recording_thread.start()

    # Return a success message
    return {"message": "Recording started."}


@app.post("/stop-recording", response_model=TranscriptionResponse)
def stop_recording():
    """
    API endpoint to stop the audio recording and process the transcript.
    """
    global recording_active

    if not recording_active:
        # If no recording is in progress, return an error response
        return JSONResponse(
            status_code=400, content={"message": "No recording in progress to stop."}
        )

    recording_active = False  # Set the recording state to inactive

    if recording_thread and recording_thread.is_alive():
        # Wait for the recording thread to finish
        recording_thread.join()

    # Process the recorded audio file
    process_audio()

    output_file = "file_title.txt"  # Expected output file for transcription
    if os.path.exists(output_file):
        # If transcription file exists, read and return its content
        with open(output_file, "r") as file:
            content = file.read()
        return TranscriptionResponse(message="Recording stopped.", content=content)
    else:
        # If no transcription file is found, return a message
        return TranscriptionResponse(
            message="Recording stopped, but no transcription found."
        )


@app.get("/get-transcription", response_model=TranscriptionResponse)
def get_transcription():
    """
    API endpoint to retrieve the transcription of the recorded audio.
    Reads the transcription file and enhances the response using Groq API.
    """
    output_file = "file_title.txt"  # Path to the transcription file

    if os.path.exists(output_file):
        # If the transcription file exists, read its content
        with open(output_file, "r") as file:
            transcription_content = file.read()
            # Enhance the transcription using the Groq API
            enhanced_response = getGroqResponse(prompt, transcription_content)
            print('enhanced_response', enhanced_response)  # Log the enhanced response for debugging
        return TranscriptionResponse(
            message="Transcription retrieved successfully.", content=enhanced_response
        )
    else:
        # If no transcription file exists, return a response indicating this
        return TranscriptionResponse(
            message="No transcription available.", content=""
        )

# Static list of books with their details
books = [
    {"name": "Ikigai", "image": "/images/ikigai.jpg", "pdfUrl": "/pdf/ikigai.pdf"},
    {"name": "The Art of Happiness", "image": "/images/happiness.jpg", "pdfUrl": "/pdf/art_of_happiness.pdf"},
    {"name": "Anne Frank", "image": "/images/anne.jpg", "pdfUrl": "/pdf/anne_frank.pdf"},
    {"name": "The Conch Bearer", "image": "/images/bearer.jpg", "pdfUrl": "/pdf/conch_bearer.pdf"},
    {"name": "The Alchemist", "image": "/images/alchemist.jpg", "pdfUrl": "/pdf/alchemist.pdf"},
    {"name": "12 Rules for Life", "image": "/images/rules_12.jpg", "pdfUrl": "/pdf/rules_12.pdf"}
]

# Model for the summary response
class SummaryResponse(BaseModel):
    """
    Model to structure the response for a book summary.
    """
    summary: str  # Summary of the book

# Function to call the Groq API and get the summary
def get_groq_summary(book_name: str) -> str:
    """
    Generate a summary of a book using the Groq API.
    """
    prompt = f"Give a summary of the book '{book_name}'"
    
    try:
        # Call the Groq API to generate the book summary
        completion = client.chat.completions.create(
            model="llama3-8b-8192",  # Model used for summarization
            messages=[{"role": "user", "content": prompt}],
            temperature=0
        )
        return completion.choices[0].message.content  # Extract the summary content
    except Exception as e:
        print(f"Error generating summary from Groq: {e}")  # Log the error
        return "An error occurred while generating the summary."

# Model for feedback response
class FeedbackResponse(BaseModel):
    """
    Model to structure the feedback response.
    """
    transcription: str  # Original transcription
    grammar_feedback: str  # Grammar-related feedback
    suggested_sentence: str  # Suggested corrections or improvements

# Function to get feedback from the Groq API
def get_groq_feedback(transcription: str) -> FeedbackResponse:
    """
    Get feedback from the Groq API based on the transcription.
    """
    try:
        # Prompt to analyze transcription for grammar issues
        prompt = (
            f"Analyze this English transcription for grammar not the capitalization and full stops but any other general issues. "
            f"Note: Don't respond with analysis if the text is in Hinglish or any other language. Respond only if it is in English; "
            f"if any other language, respond as 'Speak in English'.\n\n{transcription}"
        )
        # Call the Groq API for feedback
        completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
        )
        feedback = completion.choices[0].message.content
        # Process response into structured feedback
        return FeedbackResponse(
            transcription=transcription,
            grammar_feedback=feedback,
            suggested_sentence="Suggested sentence or corrections go here.",
        )
    except Exception as e:
        print(f"Error with Groq API: {e}")  # Log the error
        return FeedbackResponse(
            transcription=transcription,
            grammar_feedback="Error generating feedback.",
            suggested_sentence="Error generating suggestions."
        )

# Model for speech feedback request
class SpeechFeedbackRequest(BaseModel):
    """
    Model to structure the request for speech feedback.
    """
    speech_text: str  # Text derived from speech

@app.post("/speech/feedback", response_model=FeedbackResponse)
async def analyze_speech(request: SpeechFeedbackRequest):
    """
    API endpoint to analyze speech transcription and provide feedback.
    """
    speech_text = request.speech_text

    if not speech_text.isascii():
        # If the speech text contains non-English characters, return an error
        return JSONResponse(
            status_code=400,
            content={"error": "Non-English speech detected. Please speak in English."},
        )
    
    # Get feedback using the Groq API
    feedback = get_groq_feedback(speech_text)
    return feedback

# FastAPI route to get the summary of a book
@app.get("/get-summary", response_model=SummaryResponse)
async def get_summary(book: str):
    """
    API endpoint to retrieve the summary of a specific book.
    """
    # Check if the book exists in the static list
    book_found = next((book_item for book_item in books if book_item["name"].lower() == book.lower()), None)
    
    if not book_found:
        # If the book is not found, return a 404 error
        return JSONResponse(status_code=404, content={"error": "Book not found"})
    
    # Fetch summary from Groq API
    summary = get_groq_summary(book_found["name"])
    print('summary', summary)  # Log the summary for debugging
    
    return SummaryResponse(summary=summary)

# Function to generate a response using the Groq API
def getGroqResponse(prompt: str, content: str) -> str:
    """
    Generate a response using the Groq API.
    """
    try:
        # Call the Groq API to generate the response
        completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {
                    "role": "user",
                    "content": f"{prompt}\n\nTranscription:\n{content}",
                }
            ],
            temperature=0,
        )
        print('completion', completion)  # Log the completion response
        return completion.choices[0].message.content  # Extract the response content
    except Exception as e:
        print(f"Error generating response from Groq: {e}")  # Log the error
        return "An error occurred while generating the enhanced transcription report."

# MongoDB connection setup
from pymongo import MongoClient  # Import MongoClient to connect to MongoDB
from urllib.parse import quote_plus  # Import for encoding MongoDB credentials
import random  # Import random for random operations

# Encode username and password for MongoDB connection
username = quote_plus("su-22012")
password = quote_plus("Narendra123@#")


# Construct the MongoDB URI with encoded username and password for secure access
uri = f"mongodb+srv://{username}:{password}@gramai.jc23s.mongodb.net/?retryWrites=true&w=majority&appName=GramAi"

# Create a MongoDB client using the constructed URI
client = MongoClient(uri)

# Connect to the database named 'gramai_database'
db = client['gramai_database']

# Select the collection named 'pronunciation_texts' from the database
collection = db['pronunciation_texts']

@app.get("/get-random-sentence")
async def get_random_sentence(level: str):
    """
    API endpoint to retrieve a random sentence from the database based on the specified level.
    """
    # Validate the provided level to ensure it's one of the predefined categories
    if level not in ["Easy", "Medium", "Hard"]:
        return {"error": "Invalid level"}  # Return an error if the level is invalid
    
    # Build a query to find documents containing the specified level's text
    query = {level.lower() + 'text': {"$exists": True}}
    
    # Retrieve all matching documents from the collection
    documents = list(collection.find(query))
    
    # Check if no documents were found for the specified level
    if not documents:
        return {"error": f"No data found for {level} level"}  # Return an error if no data is available
    
    # Randomly select one document from the retrieved list
    selected_document = random.choice(documents)
    
    # Extract and return the text corresponding to the specified level
    return {"text": selected_document.get(level.lower() + 'text')}

# Predefined lists of sentences categorized by difficulty level
easy_sentences = [
    "The cat is on the mat.",
    "She likes to read books.",
    "He plays football every day."
]

medium_sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "She traveled to many countries last year.",
    "They enjoy hiking in the mountains during the weekends."
]

hard_sentences = [
    "Despite the challenges, he managed to finish the project ahead of the deadline.",
    "The research findings suggested that the correlation between the variables was not statistically significant.",
    "The complexity of the problem required an innovative solution to achieve optimal results."
]

@app.get("/get-random-sentence")
async def get_random_sentence(level: str):
    """
    API endpoint to retrieve a random sentence from predefined lists based on the specified level.
    """
    # Validate the provided level to ensure it's one of the predefined categories
    if level not in ["Easy", "Medium", "Hard"]:
        return {"error": "Invalid level"}  # Return an error if the level is invalid
    
    # Select the appropriate list of sentences based on the level
    if level == "Easy":
        sentences = easy_sentences
    elif level == "Medium":
        sentences = medium_sentences
    elif level == "Hard":
        sentences = hard_sentences
    
    # Randomly select one sentence from the selected list
    selected_sentence = random.choice(sentences)
    
    # Return the selected sentence as the response
    return {"text": selected_sentence}
