// Import React and useState hook
import React, { useState } from 'react';
// Importing CSS for the PronunciationTrainer component
import '../assets/styles/pronounciationTrainer.css';

const PronunciationTrainer = () => {
  // State variables for managing level, generated text, recording status, and transcription
  const [level, setLevel] = useState(null); // To store selected difficulty level
  const [generatedText, setGeneratedText] = useState(""); // To store the generated text for practice
  const [recording, setRecording] = useState(false); // To track whether recording is ongoing
  const [recordingStopped, setRecordingStopped] = useState(false); // To track if recording has stopped
  const [transcription, setTranscription] = useState(""); // To store transcription of the recording

  // Handle level selection (easy, medium, hard)
  const handleLevelSelect = (selectedLevel) => {
    setLevel(selectedLevel); // Set the selected level
  };

  // Handle text generation when "Generate Text" button is clicked
  const handleGenerateText = async () => {
    if (!level) {
      setGeneratedText("Please select a level before generating text.");
      return; // Prevent text generation if no level is selected
    }

    try {
      // Send GET request to fetch random sentence based on selected level
      const response = await axios.get(`http://localhost:8000/get-random-sentence?level=${level}`);
      
      // Check for errors in the response data
      if (response.data.error) {
        setGeneratedText(response.data.error);
      } else {
        setGeneratedText(response.data.text);
      }
    } catch (error) {
      console.error("Error fetching text:", error.response?.data?.message || error.message);
      setGeneratedText("Failed to fetch text from the server."); // Handle error if request fails
    }
  };

  // Handle text changes in the textarea
  const handleTextChange = (e) => {
    setGeneratedText(e.target.value); // Update generated text state
  };

  // Start recording when the "Start Recording" button is clicked
  const startRecording = async () => {
    try {
      // Send POST request to start recording
      await axios.post("http://localhost:8000/start-recording");
      setRecording(true); // Set recording state to true
      setRecordingStopped(false); // Reset recording stopped flag
      setTranscription(""); // Clear previous transcription
    } catch (error) {
      console.error("Error starting recording:", error.response?.data?.message || error.message);
    }
  };

  // Stop recording when the "Stop Recording" button is clicked
  const stopRecording = async () => {
    try {
      // Send POST request to stop recording
      await axios.post("http://localhost:8000/stop-recording");
      setRecording(false); // Set recording state to false
      setRecordingStopped(true); // Set recording stopped flag to true
    } catch (error) {
      console.error("Error stopping recording:", error.response?.data?.message || error.message);
    }
  };

  // Fetch the transcription report after recording is stopped
  const fetchReport = async () => {
    if (!recordingStopped) {
      alert("Please stop the recording before generating the report.");
      return; // Prevent fetching transcription if recording is still ongoing
    }

    try {
      // Send GET request to fetch transcription data
      const response = await axios.get("http://localhost:8000/get-transcription");
      setTranscription(response.data.content); // Set the transcription result
    } catch (error) {
      console.error("Error fetching transcription:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="pronunciation-trainer-container">
      {/* Textarea for practicing or generating text */}
      <textarea
        className="pronunciation-trainer-text-area"
        value={generatedText}
        onChange={handleTextChange}
        placeholder="Enter your text to practice or generate random text by selecting a level."
      ></textarea>
      
      <div className="pronunciation-trainer-button-group">
        {/* Buttons for selecting difficulty level (Easy, Medium, Hard) */}
        <div className="pronunciation-trainer-level-buttons">
          {["Easy", "Medium", "Hard"].map((difficulty) => (
            <button
              key={difficulty}
              className={`pronunciation-trainer-level-button ${
                level === difficulty ? "active" : ""
              }`}
              onClick={() => handleLevelSelect(difficulty)} // Handle level selection
            >
              {difficulty}
            </button>
          ))}
        </div>
        
        {/* Button for starting or stopping the recording */}
        <button
          className={`pronunciation-trainer-record-button ${
            recording ? "active" : recordingStopped ? "stopped" : ""
          }`}
          onClick={recording ? stopRecording : startRecording} // Toggle between start and stop recording
        >
          {recording ? "Stop Recording" : recordingStopped ? "Stopped" : "Start Recording"}
        </button>
      </div>
      
      {/* Buttons for generating text and fetching report */}
      <div
        className="pronunciation-trainer-button-group"
        style={{ justifyContent: "flex-end", marginTop: "10px" }}
      >
        <button
          className="pronunciation-trainer-action-button"
          onClick={handleGenerateText} // Generate text on button click
        >
          Generate Text
        </button>
        <button
          className="pronunciation-trainer-action-button"
          onClick={fetchReport} // Fetch transcription report on button click
        >
          Get Report
        </button>
      </div>
      
      {/* Display transcription result if available */}
      {transcription && (
        <div className="pronunciation-trainer-transcription-output">
          <h4>Result:</h4>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};

// Export PronunciationTrainer component
export default PronunciationTrainer;
