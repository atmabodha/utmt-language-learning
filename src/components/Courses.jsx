// Import React library
import React from 'react';

// Define the Courses functional component
const Courses = () => {
  return (
    <div className="content"> {/* Main container for the Courses page */}
      
      {/* Top Bar Section */}
      <div className="top-bar">
        
        {/* Heading Section */}
        <div className="heading">
          <h1>Learn from the best</h1> {/* Page title */}
        </div>
        
        {/* Profile Section in the top bar */}
        <div className="right-section">
          <div className="profile"> {/* User profile section */}
            <i className="fas fa-user-circle"></i> {/* User icon */}
            <span>Profile</span> {/* Profile label */}
          </div>
        </div>
      </div>

      {/* Interactive Card Section */}
      <div className="interactive-card-container">
        
        {/* Grammar Course Card */}
        <div className="card">
          <h2>Grammar Course</h2> {/* Course title */}
          <p>Master grammar with comprehensive lessons.</p> {/* Course description */}
        </div>

        {/* Writing Course Card */}
        <div className="card">
          <h2>Writing Course</h2> {/* Course title */}
          <p>Improve your writing skills with structured lessons.</p> {/* Course description */}
        </div>

      </div>
    </div>
  );
};

// Export the Courses component for use in other parts of the app
export default Courses;
