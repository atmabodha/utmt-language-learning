// Footer component to display website footer content
const Footer = () => {
  return (
      <div className="footer"> {/* Wrapper for the footer content */}
          {/* Logo and copyright information */}
          <div className="logo">
              {/* Logo icon and company name */}
              <i className="fas fa-broadcast-tower"></i> GramAi
              <p>© 2024 GramAi, Inc. All rights reserved.</p> {/* Copyright notice */}
          </div>

          {/* Section for company-related links */}
          <div className="footer-section">
              <h3>Company</h3> {/* Section heading */}
              <ul>
                  <li><a href="#">About Us</a></li> {/* Link to About Us page */}
                  <li><a href="#">Our Team</a></li> {/* Link to Our Team page */}
                  <li><a href="#">Careers</a></li> {/* Link to Careers page */}
                  <li><a href="#">Contact</a></li> {/* Link to Contact page */}
              </ul>
          </div>

          {/* Section for resource-related links */}
          <div className="footer-section">
              <h3>Resources</h3> {/* Section heading */}
              <ul>
                  <li><a href="#">Blog</a></li> {/* Link to Blog */}
                  <li><a href="#">FAQs</a></li> {/* Link to Frequently Asked Questions */}
                  <li><a href="#">Guides</a></li> {/* Link to Guides */}
                  <li><a href="#">Webinars</a></li> {/* Link to Webinars */}
              </ul>
          </div>

          {/* Section for legal-related links */}
          <div className="footer-section">
              <h3>Legal</h3> {/* Section heading */}
              <ul>
                  <li><a href="#">Terms of Service</a></li> {/* Link to Terms of Service */}
                  <li><a href="#">Privacy Policy</a></li> {/* Link to Privacy Policy */}
                  <li><a href="#">Accessibility</a></li> {/* Link to Accessibility statement */}
                  <li><a href="#">Sitemap</a></li> {/* Link to Sitemap */}
              </ul>
          </div>
      </div>
  );
};

export default Footer; // Exporting Footer component for use in other parts of the application
