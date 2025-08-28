// Import necessary dependencies
import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation with active state management

// Header component for displaying the app's navigation bar
const Header = () => {
  return (
    <header className="header"> {/* Header container for styling */}
      {/* Logo section of the header */}
      <div className="logo">
        <i className="fas fa-broadcast-tower"></i> {/* Icon representing the app */}
        GramAi {/* App name displayed beside the logo */}
      </div>

      {/* Navigation bar with links */}
      <nav>
        {/* Navigation links using NavLink for route-based navigation */}
        <NavLink to="/" activeClassName="active">Home</NavLink> {/* Link to the Home page */}
        <NavLink to="/about" activeClassName="active">About</NavLink> {/* Link to the About page */}
        <NavLink to="/features" activeClassName="active">Features</NavLink> {/* Link to the Features page */}
        <NavLink to="/contact" activeClassName="active">Contact</NavLink> {/* Link to the Contact page */}

        {/* Special "Join Now" button styled differently */}
        <NavLink className="join-now" to="/login" activeClassName="active">
          Join Now {/* Link to the Login page for user sign-in or sign-up */}
        </NavLink>
      </nav>
    </header>
  );
};

// Export the Header component for use in other parts of the application
export default Header;
