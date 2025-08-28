// Import images to be used in the Mission Section
import effactive from '/assets/images/effactive_com.jpg'
import personalsucc from '/assets/images/personal_suc.jpeg.jpg'
import successpro from '/assets/images/Success_pro.png'

// MissionSection component definition
const MissionSection = () => {
    return (
      <div className="mission-container">
        {/* Title of the mission section */}
        <div className="title">About GramAi</div>
        
        {/* Subtitle for the mission statement */}
        <div className="mission">Our Mission</div>
        
        {/* Brief description of the mission */}
        <div className="description">
          Our mission at GramAi is to revolutionize the way people communicate...
        </div>
  
        <div className="cards">
          {/* First card representing confident communication */}
          <div className="card">
            <div className="card-text">
              {/* Image for the first card */}
              <img src={effactive} alt="Illustration representing tailored coaching" width="200" height="200"></img>
              <br></br>
              A person should be able to communicate confidently
            </div>
          </div>

          {/* Second card representing personal success */}
          <div className="card">
            <div className="card-text">
              {/* Image for the second card */}
              <img src={personalsucc} alt="Illustration representing tailored coaching" width="200" height="200"></img>
              <br></br>
              Personal success: stay confident, learn more, keep trying.
            </div>
          </div>

          {/* Third card representing professional success */}
          <div className="card">
            <div className="card-text">
              {/* Image for the third card */}
              <img src={successpro} alt="Illustration representing tailored coaching" width="200" height="200"></img>
              <br></br>
              Professional success: stay focused, build connections.
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Export the MissionSection component for use in other parts of the app
  export default MissionSection;
