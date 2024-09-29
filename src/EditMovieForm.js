import React, { useState , useEffect} from 'react';
import './EditMovieForm.css'; // Import the CSS file
import axios from 'axios'; // Import axios
import Snackbar from './Snackbar'; 
import { useParams ,Link } from 'react-router-dom';


const AddMovieForm = () => {
  const [movieName, setName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {movieId} = useParams();

  useEffect(() => {

    const fetchReviewData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/movies/reviews/${movieId}`);
          const data = await response.json();
          console.log("data",data);
          setName(data.movie.movieName); 
          setReleaseDate(data.movie.releaseDate);
           

        } catch (error) {
          console.error("Error fetching movie data:", error);
        }
      };
   
    // const reviewData = state ? state.review : { text: 'Sample review', score: 8 };
    
    fetchReviewData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const addMovieData = {
      
        movieName,
        releaseDate
      };
      setIsSubmitting(true);
    console.log(`Movie Name: ${movieName}, Release Date: ${releaseDate}`);

    try {
        // Using Axios to send POST request
        const response = await axios.post(`http://localhost:3001/movies/updateMovie/${movieId}`, addMovieData);
        
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
      <h2>Edit Movie</h2>
      <div className="input-group">
        <input 
          type="text" 
          placeholder="Name" 
          value={movieName}
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
        <button type="submit" className="button">Update Movie</button>
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
