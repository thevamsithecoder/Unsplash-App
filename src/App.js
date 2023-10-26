import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); 

  useEffect(() => {
    if (!value) {
      setResults([]);
      setSelectedImage(null); 
      return; 
    }
    const fetchImages = async () => {
      try {
        const response = await fetch(`https://api.unsplash.com/search/photos?client_id=WKUbJx6jKNAcDtMYxGhuUvj7tyJUJk0nG9huS3rdLew&query=${value}`);
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error('Error occured while fetching the images:', error);
      }
    };
    fetchImages();
  }, [value]);

  const openImageDetails = (image) => {
    setSelectedImage(image);
  };

  const closeImageDetails = () => {
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <h1>Unsplash Gallery</h1>
      <input
        className="search-input"
        placeholder='Search for Images...'
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className='image-list'>
        {results && results.length > 0 ? (
          results.map((item) => (
            <div className="item-container" key={item.id} onClick={() => openImageDetails(item)}>
              <img className='item' src={item.urls.regular} alt="images" />
            </div>
          ))
        ) : (
          <h2 className="empty">No results found</h2>
        )}
      </div>
      {selectedImage && (
        <div>
          <span onClick={closeImageDetails}></span>
          <img src={selectedImage.urls.regular} alt="Selected" />
          <div className="details">
            <p>Likes: {selectedImage.likes}</p>
            <p>Name: {selectedImage.user.name}</p>
            <p>Description: {selectedImage.alt_description}</p>
          </div>
          <br />
          <div>
            <p>Link: <span className='links'>{selectedImage.links.download}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;