// Import images to be used in the main content sections
import boygirltalking from '../../public/assets/images/boyandgirltalking.jpg'
import image2 from '../../public/assets/images/image2.jpg'
import image3 from '../../public/assets/images/image3.png'

// MainContent component definition
const MainContent = () => {
    return (
      <div className="containers">
        {/* First main content section */}
        <div className="main-content">
          <div className="text-content">
            {/* Heading and introductory text for the first section */}
            <p>GramAi: Elevate Your Communication</p>
            <h1>Unlock Your Communication Potential with GramAi</h1>
            <div className="buttons">
              {/* Call-to-action buttons for the first section */}
              <a className="get-started" href="#">Get Started</a>
              <a className="unlock-voice" href="#">Unlock Your Voice</a>
            </div>
          </div>
          <div className="image-content">
            {/* Image illustrating two people communicating */}
            <img src={boygirltalking} alt="Illustration of two people communicating" width="600" height="400"></img>
            {/* Commented out alternative image */}
            {/* <img src="/images/boyandgirltalking.jpg" alt="People Communicating" /> */}
          </div>
        </div>
        
        {/* Second main content section */}
        <div className="main-content reversed">
          <div className="image-content">
            {/* Image representing tailored coaching */}
            <img src={image2} alt="Illustration representing tailored coaching" width="600" height="400"></img>
          </div>
          <div className="text-content">
            {/* Heading and description for the second section */}
            <p>Tailored Coaching for Exceptional Communication</p>
            <h1>Enhance Your Skills with GramAi</h1>
            <p>At GramAi, we believe that effective communication is the foundation for personal and professional success.</p>
            <div className="buttons">
              {/* Call-to-action button for enhancing skills */}
              <a className="get-started" href="#">Enhance Your Skills</a>
            </div>
          </div>
        </div>
  
        {/* Third main content section */}
        <div className="main-content">
          <div className="text-content">
            {/* Heading and description for the third section */}
            <p>Personalized Learning Experience</p>
            <h1>Master Communication with Tailored Feedback</h1>
            <p>Our AI-driven platform adapts to your unique needs, providing personalized feedback to help you achieve mastery in communication skills.</p>
            <div className="buttons">
              {/* Call-to-action button for starting the improvement journey */}
              <a className="get-started" href="#">Start Improving</a>
            </div>
          </div>
          <div className="image-content">
            {/* Image illustrating personalized learning and feedback */}
            <img src={image3} alt="Illustration showing personalized learning and feedback" width="600" height="400"></img>
          </div>
        </div>
  
      </div>
    );
  };
  
  // Export the MainContent component for use in other parts of the app
  export default MainContent;
