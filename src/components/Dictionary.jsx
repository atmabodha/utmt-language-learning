// Import React for building UI components and hooks for managing state
import React, { useState } from "react";
// Import the 'translate' library for language translation functionality
import translate from "translate";
// Import the stylesheet for styling the dictionary component
import "../assets/styles/Dictionary.css";

// Initialize the 'translate' library with Google's free translation engine
translate.engine = 'google';

const Dictionary = () => {
  // State for storing the word entered by the user
  const [query, setQuery] = useState("");
  // State for storing translations of the word in different languages
  const [translations, setTranslations] = useState({});
  // State for storing example sentences generated for the word
  const [sentences, setSentences] = useState([]);
  // State for showing a loading indicator during data fetch
  const [loading, setLoading] = useState(false);

  // Function to fetch translations using the 'translate' library
  const fetchTranslations = async (word) => {
    try {
      // Translate the word to Hindi, Bengali, and Telugu
      const hindi = await translate(word, { to: 'hi' });
      const bengali = await translate(word, { to: 'bn' });
      const telugu = await translate(word, { to: 'te' });

      // Return the translations in an object
      return { hindi, bengali, telugu };
    } catch (error) {
      // Handle errors during translation
      console.error("Error fetching translations:", error);
      return { 
        hindi: "Translation error", 
        bengali: "Translation error", 
        telugu: "Translation error" 
      };
    }
  };

  // Function to generate example sentences for the given word
  const generateSentences = (word) => {
    return [
      `The word "${word}" is commonly used in various contexts.`,
      `In many languages, including Hindi and Bengali, the word "${word}" has a similar meaning.`,
      `Using the word "${word}" can enhance your communication skills significantly.`
    ];
  };

  // Function to handle the search action and fetch data
  const handleSearch = async () => {
    if (!query.trim()) {
      // Alert the user if no word is entered
      alert("Please enter a word to search.");
      return;
    }

    setLoading(true); // Set loading state to true during data fetch
    try {
      // Fetch translations for the word
      const translationsData = await fetchTranslations(query);
      setTranslations(translationsData);

      // Generate example sentences for the word
      const exampleSentences = generateSentences(query);
      setSentences(exampleSentences);
    } catch (error) {
      // Handle errors during the data fetching process
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Reset loading state after data fetch
    }
  };

  return (
    <div className="content"> {/* Wrapper for consistent global structure */}
      {/* Top bar section with title and profile options */}
      <div className="top-bar">
        <div className="heading">
          <h1>Learn from the best</h1>
        </div>
        <div className="right-section">
          <button className="upgrade-btn">Upgrade to Premium</button>
          <div className="profile">
            <i className="fas fa-user-circle"></i>
            <span>Profile</span>
          </div>
        </div>
      </div>

      {/* Main dictionary content section */}
      <div className="dictionary-container">
        <h1 className="title">Dictionary</h1>
        
        {/* Search bar for entering the word to translate */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter a word..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-field"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        {/* Show a loading indicator when data is being fetched */}
        {loading && <p className="loading">Loading...</p>}

        {/* Display translations once fetched */}
        {translations.hindi && translations.bengali && translations.telugu && (
          <div className="translations-section">
            <h2>Translations:</h2>
            <ul>
              <li>Hindi: {translations.hindi}</li>
              <li>Bengali: {translations.bengali}</li>
              <li>Telugu: {translations.telugu}</li>
            </ul>
          </div>
        )}

        {/* Display example sentences once generated */}
        {sentences.length > 0 && (
          <div className="sentences-section">
            <h2>Example Sentences:</h2>
            <ul>
              {sentences.map((sentence, index) => (
                <li key={index} className="sentence-item">
                  {sentence}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dictionary; // Export the Dictionary component for use in other parts of the app
