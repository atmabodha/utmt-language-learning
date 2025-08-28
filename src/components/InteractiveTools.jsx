// Import necessary dependencies
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom"; // Import for navigation and routing
import pronounciationImage from '/assets/images/pronounciation.png'; // Import image for pronunciation card
import mic from '/assets/images/microphone.png'; // Import image for speech practice card

// Import components for routing
import PronunciationTrainer from "./PronounciationTrainer";
import SpeechPractice from './SpeechPractice';

// InteractiveTools component - main container for interactive tools
const InteractiveTools = () => {
  const [isProfileOpen, setProfileOpen] = useState(false); // State to toggle profile visibility

  // Function to toggle the profile section's visibility
  const toggleProfile = () => {
    setProfileOpen(!isProfileOpen);
  };

  return (
    <div className="content"> {/* Main content container */}
      {/* Top Bar */}
      <div className="top-bar"> {/* Header for the page */}
        <div className="heading">
          <h1>Learn from the best</h1> {/* Page title */}
        </div>
        {/* Profile section in the top bar */}
        <div className="right-section">
          <div className="profile" onClick={toggleProfile}> {/* Clickable profile icon */}
            <i className="fas fa-user-circle"></i> {/* Profile icon */}
            <span>Profile</span>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      {isProfileOpen && <Profile />} {/* Conditionally render profile component when toggled */}

      {/* Routes and Card Container */}
      <Routes>
        {/* Default route rendering the cards for interactive tools */}
        <Route
          path="/"
          element={
            <div className="interactive-card-container"> {/* Card container for interactive tools */}
              {/* Pronunciation Trainer Card */}
              <Link to="pronunciation-trainer" className="card">
                <img
                  src={pronounciationImage} // Icon for pronunciation
                  alt="Pronunciation Icon"
                  className="card-icon"
                />
                <h2>Pronunciation Check</h2> {/* Title for the card */}
                <p>Practice pronunciation with audio feedback.</p> {/* Card description */}
              </Link>
              {/* Speech Practice Card */}
              <Link to="speech-practice" className="card">
                <img
                  src={mic} // Icon for speech practice
                  alt="Mic icon"
                  className="card-icon"
                />
                <h2>Speech Practice</h2> {/* Title for the card */}
                <p>Enhance your speaking skills.</p> {/* Card description */}
              </Link>
            </div>
          }
        />
        {/* Route for Pronunciation Trainer */}
        <Route path="pronunciation-trainer" element={<PronunciationTrainer />} />
        {/* Route for Speech Practice */}
        <Route path="speech-practice" element={<SpeechPractice />} />
      </Routes>
    </div>
  );
};

// Export the InteractiveTools component for use in the application
export default InteractiveTools;
