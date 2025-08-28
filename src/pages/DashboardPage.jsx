// Importing necessary modules and components
import React from 'react'; // React library for building the UI
import { Routes, Route } from 'react-router-dom'; // Importing Routes and Route for routing
import Sidebar from '../components/Sidebar'; // Importing Sidebar component for navigation
import DashboardContent from '../components/DashboardContent'; // Importing the main dashboard content component
import InteractiveTools from '../components/InteractiveTools'; // Importing InteractiveTools component
import Resources from '../components/Resources'; // Importing Resources component
import Progress from '../components/Progress'; // Importing Progress component
import Dictionary from '../components/Dictionary'; // Importing Dictionary component from resources
import EbooksPage from '../components/EbooksPage'; // Importing EbooksPage component from resources
import '../assets/styles/dashboard.css'; // Importing the CSS file for styling the dashboard page

const DashboardPage = () => {
  return (
    <div className="dashboard-page"> {/* Main wrapper for the dashboard page */}
      <Sidebar /> {/* Sidebar component for navigation on the left */}
      <div className="dashboard-main"> {/* Main section to display selected content */}
        {/* Defining routes for different sections of the dashboard */}
        <Routes>
          <Route path="/" element={<DashboardContent />} /> {/* Default route to display dashboard content */}
          <Route path="interactive-tools/*" element={<InteractiveTools />} /> {/* Route to Interactive Tools section */}
          <Route path="resources" element={<Resources />} /> {/* Route to Resources section */}
          <Route path="resources/dictionary" element={<Dictionary />} /> {/* Route to Dictionary under Resources */}
          <Route path="resources/ebooksPage" element={<EbooksPage />} /> {/* Route to Ebooks Page under Resources */}
          <Route path="progress" element={<Progress />} /> {/* Route to Progress section */}
        </Routes>
      </div>
    </div>
  );
};

export default DashboardPage; // Exporting DashboardPage component for use in other parts of the application
