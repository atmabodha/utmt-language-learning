// Importing React and NavLink from react-router-dom for navigation links
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar"> {/* Sidebar container */}
      <h1>GramAi</h1> {/* Title for the sidebar */}
      
      {/* Navigation link to the dashboard */}
      <NavLink to="/dashboard" className="nav-item">
        <i className="fas fa-home"></i> Home {/* Icon and text for Home */}
      </NavLink>
      
      {/* Navigation link to the interactive tools page */}
      <NavLink to="/dashboard/interactive-tools" className="nav-item">
        <i className="fas fa-tools"></i> Tools {/* Icon and text for Tools */}
      </NavLink>
      
      {/* Navigation link to the resources page */}
      <NavLink to="/dashboard/resources" className="nav-item">
        <i className="fas fa-book"></i> Resources {/* Icon and text for Resources */}
      </NavLink>
      
      {/* Navigation link to the login page */}
      <NavLink to="/login" className="logout">
        Logout {/* Text for the logout link */}
      </NavLink>
    </div>
  );
};

// Exporting the Sidebar component for use in other parts of the application
export default Sidebar;
