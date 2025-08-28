// Importing necessary components for the landing page
import Header from '../components/Header'; // Importing the Header component
import Contact from '../components/Contact'; // Importing the Contact component (not used in the current render)
import MainContent from '../components/MainContent'; // Importing the MainContent component for the main content area
import MissionSection from '../components/MissionSection'; // Importing the MissionSection component to display the mission statement
import Footer from '../components/Footer'; // Importing the Footer component
import '../assets/styles/landing.css' // Importing the CSS file for styling the landing page

const LandingPage = () => {
  return (
    <>
      {/* Rendering the Header component */}
      <Header />
      
      {/* Rendering the MainContent component */}
      <MainContent />
      
      {/* Rendering the MissionSection component */}
      <MissionSection />
      
      {/* Rendering the Footer component */}
      <Footer />
    </>
  );
};

export default LandingPage; // Exporting the LandingPage component to be used in other parts of the application
