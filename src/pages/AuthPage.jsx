// Importing necessary modules and components
import React, { useState } from 'react';
import { auth } from '../../firebase'; // Importing firebase authentication
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'; // Importing firebase authentication methods
import { useNavigate } from 'react-router-dom'; // Importing the navigate function for routing
import GoogleSignInButton from '../components/GoogleSignInButton'; // Importing the Google Sign In button component
import '../assets/styles/AuthPage.css'; // Importing the CSS for styling the authentication page

const AuthPage = () => {
  // State hooks for managing email, password, registration status, and navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between registration and login mode
  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission for login or registration
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Check if user is registering or logging in
      if (isRegistering) {
        // Create a new user with email and password
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Sign in the user with email and password
        await signInWithEmailAndPassword(auth, email, password);
      }
      // Redirect to the dashboard after successful login/registration
      navigate('/dashboard');
    } catch (error) {
      // Log error if authentication fails
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-page-container">
        {/* Left section with image */}
        <div className="auth-left">
          <img
            alt="Illustration of a girl sitting on a chair with a tablet, surrounded by plants and a lamp"
            src="https://storage.googleapis.com/a1aa/image/CCUa94ZHmTa6JtcccEH0gHkP1rfLotHWGCTOMW6ZzVhFhjxJA.jpg"
          />
        </div>
        
        {/* Right section with authentication form */}
        <div className="auth-right">
          {/* Toggle between Register and Login text */}
          <div className="auth-register">
            {isRegistering ? "Already have an account?" : "Not a member?"}
            <span onClick={() => setIsRegistering(!isRegistering)} style={{ cursor: 'pointer' }}>
              {isRegistering ? "Login" : "Register now"}
            </span>
          </div>
          
          {/* Display appropriate title and message based on registration state */}
          <h2>{isRegistering ? "Register" : "Hello Again!"}</h2>
          <p>{isRegistering ? "Create an account to get started" : "Welcome back you've been missed!"}</p>
          
          {/* Authentication form */}
          <form onSubmit={handleSubmit}>
            {/* Email input field */}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required
            />
            <div className="auth-password-container">
              {/* Password input field */}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                required
              />
              <i className="fas fa-eye"></i> {/* Password visibility icon */}
            </div>
            
            {/* Password recovery link */}
            <a className="auth-recovery" href="#">
              Recovery Password
            </a>
            
            {/* Submit button (register or login) */}
            <button className="auth-sign-in" type="submit">
              {isRegistering ? "Register" : "Sign In"}
            </button>
          </form>
          
          {/* Text separating social login options */}
          <div className="auth-or">Or continue with</div>
          
          {/* Social login icons */}
          <div className="auth-social-icons">
            <GoogleSignInButton /> {/* Google Sign-In button */}
            {/* Apple and Facebook logos for alternative login methods */}
            <img alt="Apple logo" src="https://storage.googleapis.com/a1aa/image/HAaEvBw7niqdFRgtoXmOVKa8HLsQd8mflQjzbLZPnSyGhjxJA.jpg" />
            <img alt="Facebook logo" src="https://storage.googleapis.com/a1aa/image/ftIeJBoU59hJOUT4Hf4fCmPhYAevrlhT8fIsGloAdewWFhjxJA.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;  // Export the AuthPage component for use in other parts of the application
