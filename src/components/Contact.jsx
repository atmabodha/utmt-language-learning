// Import React and necessary CSS for the Contact component
import React from 'react';
import "../assets/styles/contact.css"; // Importing external CSS for styling

// Define the Contact functional component
const Contact = () => {
  return (
    <div className="contact-container"> {/* Main container for the Contact page */}
      <h2>Contact Us Now</h2> {/* Page heading */}

      <div className="contact-form-container"> {/* Container for the form and map */}
        {/* Contact Form Section */}
        <form className="contact-form">
          {/* Name Field */}
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            placeholder="Enter your name" 
          />

          {/* Email Field */}
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            placeholder="Enter your email" 
          />

          {/* Message Field */}
          <label htmlFor="message">Message:</label>
          <textarea 
            id="message" 
            name="message" 
            required 
            placeholder="Type your message here"
          ></textarea>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>

        {/* Map Section */}
        <div className="map-container"> 
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5092627321746!2d144.96305531531667!3d-37.81410797975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce730!2sVictoria!5e0!3m2!1sen!2sin!4v1617166793437!5m2!1sen!2sin"
            width="100%" 
            height="300" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            title="Google Map Location"
          >
          </iframe>
        </div>
      </div>
    </div>
  );
};

// Export the Contact component for use in other parts of the app
export default Contact;
