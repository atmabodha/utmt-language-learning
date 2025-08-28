import React, { useState } from 'react';
import '../assets/styles/EbooksPage.css'; // Import specific styles for the EbooksPage

// Component to render the EbooksPage
const EbooksPage = () => {
  // State to store the search term entered by the user
  const [searchTerm, setSearchTerm] = useState('');

  // State to store the summary of the searched book
  const [summary, setSummary] = useState('');

  // State to manage the loading state while fetching data
  const [loading, setLoading] = useState(false);

  // State to track the currently hovered book for hover effects
  const [hoveredBook, setHoveredBook] = useState(null);

  // List of available books with their name, image, and PDF URL
  const books = [
    { name: 'Ikigai', image: '/images/ikigai.jpg', pdfUrl: '/pdf/ikigai.pdf' },
    { name: 'The Art of Happiness', image: '/images/happiness.jpg', pdfUrl: '/pdf/art_of_happiness.pdf' },
    { name: 'Anne Frank', image: '/images/anne.jpg', pdfUrl: '/pdf/anne_frank.pdf' },
    { name: 'The Conch Bearer', image: '/images/bearer.jpg', pdfUrl: '/pdf/conch_bearer.pdf' },
    { name: 'The Alchemist', image: '/images/alchemist.jpg', pdfUrl: '/pdf/alchemist.pdf' },
    { name: '12 rules for life', image: '/images/rules_12.jpg', pdfUrl: '/pdf/rules_12.pdf' },
  ];

  // Function to handle book PDF downloads
  const handleBookClick = (pdfUrl) => {
    const link = document.createElement('a'); // Create an anchor element
    link.href = pdfUrl; // Set the PDF URL
    link.download = true; // Set the download attribute
    link.click(); // Trigger the download
  };

  // Function to handle book summary search
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    setLoading(true); // Set loading state to true while fetching data
    try {
      // Fetch book summary from the server
      const response = await fetch(`http://localhost:8000/get-summary?book=${searchTerm}`);
      const data = await response.json();

      // Check if the response is successful
      if (response.ok) {
        setSummary(data.summary); // Update the summary state with fetched data
      } else {
        setSummary('Book not found'); // Handle case when book is not found
      }
    } catch (error) {
      setSummary('Error fetching summary'); // Handle errors in fetching
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="content"> {/* Wrapper for consistent layout across pages */}
      {/* Top bar with a title and profile section */}
      <div className="top-bar">
        <div className="heading">
          <h1>Explore and Learn</h1>
        </div>
        <div className="right-section">
          <div className="profile">
            <i className="fas fa-user-circle"></i> {/* User profile icon */}
            <span>Profile</span>
          </div>
        </div>
      </div>

      {/* Main content section specific to the EbooksPage */}
      <div className="ebooks-content">
        {/* Search bar for entering book names */}
        <div className="search-container">
          <h2>Want a summary of any specific book? Type the book name in the search bar and press Enter.</h2>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Enter book name" // Placeholder text for the search input
              value={searchTerm} // Controlled input value
              onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
              className="search-input" // Styling class for the search input
            />
            <button type="submit" className="search-button">Search</button> {/* Submit button */}
          </form>
        </div>

        {/* Display book summary if available */}
        {summary ? (
          <div className="summary-container">
            <button className="back-button" onClick={() => setSummary('')}>Back</button> {/* Reset summary */}
            <h3>Summary of {searchTerm}</h3>
            {loading ? <p>Loading...</p> : <p>{summary}</p>} {/* Show loading state or summary */}
          </div>
        ) : (
          /* Display grid of books */
          <div className="books-grid">
            {books.map((book, index) => (
              <div
                className="book-item"
                key={index} // Unique key for each book item
                onMouseEnter={() => setHoveredBook(book.name)} // Track hovered book
                onMouseLeave={() => setHoveredBook(null)} // Reset hovered book
              >
                <img
                  src={book.image} // Book image source
                  alt={book.name} // Alternative text for the image
                  className={`book-image ${hoveredBook === book.name ? 'hovered' : ''}`} // Apply hover effect
                  onClick={() => handleBookClick(book.pdfUrl)} // Trigger PDF download on click
                />
                {hoveredBook === book.name && (
                  <div className="download-pdf-message">Download PDF</div> // Show message on hover
                )}
                <p>{book.name}</p> {/* Display book name */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EbooksPage;
