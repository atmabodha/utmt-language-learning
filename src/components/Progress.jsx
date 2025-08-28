// Import React library
import React from 'react';

// Progress component definition
const Progress = () => {
  return (
    <div className="content">
      {/* Top bar section containing heading and profile */}
      <div className="top-bar">
        <div className="heading">
          {/* Main heading for the page */}
          <h1>Learn from the best</h1>
        </div>
        <div className="right-section">
          {/* Profile section with an icon and label */}
          <div className="profile">
            {/* Profile icon */}
            <i className="fas fa-user-circle"></i>
            {/* Profile label */}
            <span>Profile</span>
          </div>
        </div>
      </div>

      {/* Interactive card container */}
      <div className="interactive-card-container">
        <div className="card">
          {/* Card title */}
          <h2>Quizzes</h2>
          {/* Card description */}
          <p>Test your knowledge with interactive quizzes.</p>
        </div>
      </div>
    </div>
  );
};

// Export Progress component for use in other parts of the application
export default Progress;
