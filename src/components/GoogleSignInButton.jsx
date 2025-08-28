// Import necessary dependencies
import React from "react";
import { doSignInWithGoogle } from "../../firebase"; // Import the Google sign-in function
import { useNavigate } from 'react-router-dom'; // Import useNavigate for page navigation
import '../assets/styles/googlesignin.css'; // Import CSS for styling the Google Sign-In button

// GoogleSignInButton component handles user authentication via Google
const GoogleSignInButton = () => {
  const navigate = useNavigate(); // Initialize the navigate function for redirection

  // Function to handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      // Attempt Google sign-in and log the result if successful
      const result = await doSignInWithGoogle();
      console.log("Google Sign-In Successful:", result);

      // Navigate the user to the dashboard page upon successful sign-in
      navigate('/dashboard');
    } catch (error) {
      // Log an error message if sign-in fails
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return (
    // Button for triggering Google Sign-In
    <button onClick={handleGoogleSignIn} className="google-signin-btn">
      Continue with Google {/* Button label */}
    </button>
  );
};

// Export the component for use in other parts of the application
export default GoogleSignInButton;
