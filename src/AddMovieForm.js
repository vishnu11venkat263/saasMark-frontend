import React, { useState } from 'react';
import './AddMovieForm.css'; // Import the CSS file
import axios from 'axios'; // Import axios

import Snackbar from './Snackbar'; 

const AddMovieForm = () => {
  const [name, setName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addMovieData = {
      
        name,
        releaseDate
      };
      setIsSubmitting(true);
    console.log(`Movie Name: ${name}, Release Date: ${releaseDate}`);

    try {
        // Using Axios to send POST request
        const response = await axios.post('http://localhost:3001/movies/addMovie', addMovieData);
        
        // Handle success response
        
          console.log('Movie submitted successfully:', response.data);
        //   setResponseMessage(response.message);
          setSnackbarMessage(response.message || 'Movie added successfully!');
          setSnackbarOpen(true);
         setName('');
         setReleaseDate('');
         setTimeout(() => {
            setSnackbarOpen(false);
            setSnackbarMessage('');
          }, 3000);
          
        
      } catch (error) {
        // Handle errors
        console.log("error",error);
        
        setSnackbarMessage(error.response.data.message);
      setSnackbarOpen(true);

      // Auto-close snackbar after 3 seconds
      setTimeout(() => {
        setSnackbarOpen(false);
        setSnackbarMessage('');
      }, 3000);
      } finally {
        setIsSubmitting(false);
      }


    }
   const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };
   


  return (
    <div>
    <form onSubmit={handleSubmit} className="form">
      <h2>Add New Movie</h2>
      <div className="input-group">
        <input 
          type="text" 
          placeholder="Name" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          className="input"
          required // Added required attribute
        />
      </div>
      <div className="input-group">
        <input 
          type="text" 
          value={releaseDate}
          placeholder="Release Date" 
          onChange={(e) => setReleaseDate(e.target.value)} 
          className="input"
          required // Added required attribute
        />
      </div>
      <div className="button-container"> {/* New div to align the button */}
        <button type="submit" className="button">Create Movie</button>
      </div>
    </form>
    <Snackbar 
        message={snackbarMessage}
        isOpen={snackbarOpen}
        onClose={handleSnackbarClose}
      />
    </div>
  );
};

export default AddMovieForm;
