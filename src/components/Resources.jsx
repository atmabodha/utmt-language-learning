// Importing React and Link component from react-router-dom for navigation
import React from 'react';
import { Link } from 'react-router-dom';
// Importing optional CSS file for styling the Resources component
// import '../assets/styles/Resources.css'; // Optional: if you use CSS for Resources

const Resources = () => {
  return (
    <div className="content">
      {/* Top bar with heading and profile section */}
      <div className="top-bar">
        <div className="heading">
          <h1>Learn from the best</h1> {/* Main heading */}
        </div>
        <div className="right-section">
          <div className="profile">
            <i className="fas fa-user-circle"></i> {/* Profile icon */}
            <span>Profile</span> {/* Profile text */}
          </div>
        </div>
      </div>
      
      {/* Container for interactive cards */}
      <div className="interactive-card-container">
        {/* Link to dictionary page */}
        <Link to="dictionary" className="card">
          <h2>Dictionary</h2> {/* Title for the Dictionary card */}
          <p>Look up words in our extensive dictionary.</p> {/* Description of the Dictionary resource */}
        </Link>
        
        {/* Link to e-books page */}
        <Link to="ebooksPage" className="card">
          <h2>E-books</h2> {/* Title for the E-books card */}
          <p>Access a library of e-books to enhance your learning.</p> {/* Description of the E-books resource */}
        </Link>
      </div>
    </div>
  );
};

// Exporting Resources component for use in other parts of the application
export default Resources;
