# Import necessary libraries
import requests
import time
from api_secrets import API_KEY_ASSEMBLYAI  # Import API key securely from a separate file

# API endpoints for uploading audio and transcription requests
upload_endpoint = 'https://api.assemblyai.com/v2/upload'
transcript_endpoint = 'https://api.assemblyai.com/v2/transcript'

# Headers for authentication
headers_auth_only = {'authorization': API_KEY_ASSEMBLYAI}  # Authentication header for upload
headers = {
    "authorization": API_KEY_ASSEMBLYAI,  # Authentication
    "content-type": "application/json"   # Content type for JSON data
}

CHUNK_SIZE = 5_242_880  # Define the chunk size for audio file upload (5MB)


def upload(filename):
    """
    Uploads an audio file to AssemblyAI and returns the upload URL.
    :param filename: Path to the audio file to be uploaded.
    :return: Upload URL for the audio file.
    """
    def read_file(filename):
        """
        Generator to read the file in chunks.
        :param filename: Path to the file.
        :yield: Chunks of the file.
        """
        with open(filename, 'rb') as f:
            while True:
                data = f.read(CHUNK_SIZE)
                if not data:  # Break loop when no data is left to read
                    break
                yield data

    # Send POST request to upload the audio file
    upload_response = requests.post(upload_endpoint, headers=headers_auth_only, data=read_file(filename))
    return upload_response.json()['upload_url']  # Return the generated upload URL


def transcribe(audio_url):
    """
    Submits a transcription request for the uploaded audio file.
    :param audio_url: URL of the uploaded audio file.
    :return: ID of the transcription task.
    """
    transcript_request = {
        'audio_url': audio_url  # Provide the audio URL in the request
    }

    # Send POST request to initiate transcription
    transcript_response = requests.post(transcript_endpoint, json=transcript_request, headers=headers)
    return transcript_response.json()['id']  # Return the transcription task ID


def poll(transcript_id):
    """
    Polls the status of the transcription task until it completes or fails.
    :param transcript_id: ID of the transcription task.
    :return: JSON response containing the transcription status and data.
    """
    polling_endpoint = transcript_endpoint + '/' + transcript_id  # Construct polling URL
    polling_response = requests.get(polling_endpoint, headers=headers)  # Send GET request for status
    return polling_response.json()  # Return polling response


def get_transcription_result_url(url):
    """
    Retrieves the transcription result by continuously polling the transcription task status.
    :param url: URL of the uploaded audio file.
    :return: Transcription data and error message (if any).
    """
    transcribe_id = transcribe(url)  # Get the transcription ID for the audio
    while True:
        data = poll(transcribe_id)  # Poll the transcription status
        if data['status'] == 'completed':  # Check if transcription is completed
            return data, None
        elif data['status'] == 'error':  # Check if there was an error
            return data, data['error']

        print("waiting for 1 seconds")
        # Uncomment the line below to wait before polling again
        # time.sleep(1)


def save_transcript(url, title):
    """
    Saves the transcription result to a file, including word-by-word details.
    :param url: URL of the uploaded audio file.
    :param title: Title for the output file.
    :return: Confirmation message indicating transcript saving status.
    """
    data, error = get_transcription_result_url(url)  # Get transcription result
    # print(data)  # Uncomment for debugging purposes
    if data:  # If transcription data is available
        filename = title + '.txt'  # Define output file name
        with open(filename, 'w') as f:
            # Write the full transcription
            f.write("Full Transcription:\n")
            f.write(data['text'] + "\n\n")
    
            # Write word-by-word breakdown
            f.write("Word-by-Word Breakdown:\n")
            for word_data in data['words']:
                f.write(f"Word: {word_data['text']}\n")
                f.write(f"  Start Time: {word_data['start']} ms\n")
                f.write(f"  End Time: {word_data['end']} ms\n")
                f.write(f"  Confidence: {word_data['confidence']}\n\n")
        print('Transcript saved')  # Print confirmation message
        return "Transcript saved"
    elif error:  # If there was an error
        print("Error!!!", error)  # Print error message
