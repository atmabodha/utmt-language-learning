// Importing React and useState hook, along with axios for making HTTP requests
import React, { useState } from "react";
import axios from "axios";
import '../assets/styles/speechPractice.css' // Importing the CSS for styling the component

const SpeechPractice = () => {
  // State hooks to manage generated text, transcription, feedback, and recording status
  const [generatedText, setGeneratedText] = useState("");
  const [transcription, setTranscription] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [recording, setRecording] = useState(false);

  // Initializing the SpeechRecognition API (for speech-to-text functionality)
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true; // Enable continuous speech recognition
  recognition.interimResults = true; // Enable interim results for real-time transcription
  recognition.lang = "en-US"; // Set language to English

  // Function to start recording and process speech-to-text
  const startRecording = () => {
    setRecording(true); // Set recording status to true
    setTranscription(""); // Clear previous transcription
    setFeedback(null); // Clear previous feedback

    recognition.start(); // Start speech recognition
    recognition.onresult = (event) => {
      let interimTranscript = "";
      // Process speech recognition results
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          interimTranscript += event.results[i][0].transcript; // Store final transcript
        }
      }
      setTranscription(interimTranscript); // Update transcription with the speech result
    };

    // Handle any errors that occur during speech recognition
    recognition.onerror = (error) => {
      console.error("Speech recognition error:", error.message);
      stopRecording(); // Stop recording if there's an error
    };
  };

  // Function to stop recording and stop speech recognition
  const stopRecording = () => {
    setRecording(false); // Set recording status to false
    recognition.stop(); // Stop speech recognition
  };

  // Function to fetch feedback for the transcription
  const fetchFeedback = async () => {
    if (!transcription.trim()) {
      alert("No transcription available. Please record something first."); // Alert if no transcription
      return;
    }
  
    try {
      // Send transcription to the backend to get feedback
      const response = await axios.post("http://localhost:8000/speech/feedback", {
        speech_text: transcription,  // Send transcription as a parameter to the backend
      });
      setFeedback(response.data); // Update state with feedback from the server
    } catch (error) {
      console.error("Error fetching feedback:", error.message);
      setFeedback({ error: "Failed to fetch feedback. Try again." }); // Set error message if the request fails
    }
  };
  

  return (
    <div className="speech-practice-container">
      <h2>Speech Practice</h2>
      
      {/* Button to start or stop recording based on the recording state */}
      <div>
        <button onClick={recording ? stopRecording : startRecording}>
          {recording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>

      {/* Textarea to display live transcription */}
      <textarea
        readOnly // Make textarea read-only to display the transcription
        value={transcription} // Set the transcription value to update the textarea
        placeholder="Your live transcription will appear here..."
        rows={4} // Set the number of rows for the textarea
        cols={50} // Set the number of columns for the textarea
      ></textarea>
      
      {/* Button to fetch feedback, disabled if there's no transcription */}
      <button onClick={fetchFeedback} disabled={!transcription.trim()}>
        Get Feedback
      </button>
      
      {/* Display feedback if available */}
      {feedback && (
        <div>
          <h3>Feedback</h3>
          <p><strong>Transcription:</strong> {feedback.transcription}</p> {/* Display the transcription */}
          <p><strong>Feedback:</strong> {feedback.grammar_feedback}</p> {/* Display grammar feedback */}
        </div>
      )}
    </div>
  );
};

// Exporting the SpeechPractice component to be used in other parts of the app
export default SpeechPractice;
