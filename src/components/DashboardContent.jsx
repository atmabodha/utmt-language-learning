// Import React and necessary hooks and components
import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation between routes
import "../assets/styles/dashboard.css"; // Import custom styles for the dashboard
import resourcesIcon from '/assets/images/resources.png'; // Import Resources icon image
import progressIcon from '/assets/images/progress.png'; // Import Progress icon image
import toolsIcon from '/assets/images/toolkit.png'; // Import Tools icon image

// Define the DashboardContent functional component
const DashboardContent = () => {
  // State to manage whether the profile section is open or closed
  const [isProfileOpen, setProfileOpen] = useState(false);

  // State to manage whether the user is in editing mode for profile details
  const [isEditing, setIsEditing] = useState(false);

  // State to store profile details
  const [profileDetails, setProfileDetails] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  });

  // Function to toggle the visibility of the profile section
  const toggleProfile = () => {
    setProfileOpen(!isProfileOpen); // Toggle the profile section state
    setIsEditing(false); // Exit editing mode if the profile is closed
  };

  // Function to toggle editing mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle editing state
  };

  // Function to handle input changes for profile details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails((prevDetails) => ({
      ...prevDetails, // Retain existing profile details
      [name]: value, // Update the specific field with the new value
    }));
  };

  // Function to save edited profile details
  const handleSave = () => {
    setIsEditing(false); // Exit editing mode
    // Save logic (e.g., API call) can be implemented here
  };

  return (
    <div className="content"> {/* Main container for the dashboard content */}

      {/* Top Bar Section */}
      <div className="top-bar">
        <div className="heading">
          <h1>Learn from the best</h1> {/* Dashboard title */}
        </div>
        <div className="right-section">
          <div className="profile" onClick={toggleProfile}> {/* Profile icon and button */}
            <i className="fas fa-user-circle"></i> {/* User profile icon */}
            <span>Profile</span>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      {isProfileOpen && (
        <div className="profile-section"> {/* Container for the profile details */}
          <h2>Your Profile</h2> {/* Profile section heading */}
          <p>View and edit your personal details.</p> {/* Description */}
          <ul>
            <li>
              <span>Name: </span>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profileDetails.name}
                  onChange={handleChange}
                />
              ) : (
                <span>{profileDetails.name}</span>
              )}
            </li>
            <li>
              <span>Email: </span>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileDetails.email}
                  onChange={handleChange}
                />
              ) : (
                <span>{profileDetails.email}</span>
              )}
            </li>
            <li>
              {isEditing ? (
                <button onClick={handleSave}>Save</button> /* Save button */
              ) : (
                <button onClick={handleEditToggle}>Edit Profile</button> /* Edit button */
              )}
            </li>
            <li><Link to="/login">Logout</Link> {/* Logout button/link */}</li>
          </ul>
          <button onClick={() => setProfileOpen(false)} className="close-button"> {/* Close button */}
            Close
          </button>
        </div>
      )}

      {/* Card Container */}
      <div className="card-container"> {/* Container for the feature cards */}
        <div className="card"> {/* Card for interactive tools */}
          <Link to="interactive-tools">
            <img src={toolsIcon} alt="Tools Icon" className="card-icon" /> {/* Card icon */}
            <h2>Interactive Tools</h2> {/* Card title */}
            <p>Play language games, practice conversation and pronunciation.</p> {/* Card description */}
          </Link>
        </div>
        <div className="card"> {/* Card for resources */}
          <Link to="resources">
            <img src={resourcesIcon} alt="Resources Icon" className="card-icon" /> {/* Card icon */}
            <h2>Resources</h2> {/* Card title */}
            <p>Access dictionaries, e-books, infographics, and podcasts.</p> {/* Card description */}
          </Link>
        </div>
      </div>
    </div>
  );
};

// Export the DashboardContent component for use in other parts of the application
export default DashboardContent;
