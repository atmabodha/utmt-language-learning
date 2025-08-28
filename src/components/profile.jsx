// Import necessary modules and components
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/dashboard.css";

// Profile component definition
const Profile = ({ onClose }) => {
  // State for controlling the edit mode (true = editing, false = viewing)
  const [isEditing, setIsEditing] = useState(false);

  // State for storing profile details (name and email)
  const [profileDetails, setProfileDetails] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  });

  // Toggle the editing state
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle changes to input fields (name, email) during editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value, // Update the respective field
    }));
  };

  // Save the edited profile details and exit edit mode
  const handleSave = () => {
    setIsEditing(false);
    // Add save logic (e.g., API call to save profile data)
  };

  return (
    <div className="profile-section">
      {/* Profile title and description */}
      <h2>Your Profile</h2>
      <p>View and edit your personal details.</p>
      <ul>
        {/* Display and edit name */}
        <li>
          <span>Name: </span>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profileDetails.name}
              onChange={handleChange} // Update name on change
            />
          ) : (
            <span>{profileDetails.name}</span> // Show name when not editing
          )}
        </li>

        {/* Display and edit email */}
        <li>
          <span>Email: </span>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profileDetails.email}
              onChange={handleChange} // Update email on change
            />
          ) : (
            <span>{profileDetails.email}</span> // Show email when not editing
          )}
        </li>

        {/* Button to either save changes or start editing */}
        <li>
          {isEditing ? (
            <button onClick={handleSave}>Save</button> // Save button when editing
          ) : (
            <button onClick={handleEditToggle}>Edit Profile</button> // Edit button when viewing
          )}
        </li>

        {/* Button to close the profile section */}
        <button className="close-button" onClick={onClose}>
          Close
        </button>

        {/* Logout button */}
        <li>
          <Link to="/login">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

// Export Profile component for use in other parts of the application
export default Profile;
