import React, { useState , useEffect } from 'react';
import './ReviewForm.css'; // Import the CSS file
import Snackbar from './Snackbar';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';

const ReviewForm = () => {
  
  const [setMoviesList, SetMoviesList] = useState([]);
  const [reviewerName, setName] = useState('');
  const [rating, setRating] = useState('');
  const [reviewComments, setComments] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [movieId, setSelectedMovie] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3001/movies'); // Change this to your API
            
                
        SetMoviesList(response.data);
       
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {
        movieId,
      
      reviewerName,
      rating,
      reviewComments,
    };
    try {
        // Make the API request to update the review
        const response = await fetch(`http://localhost:3001/movies/addReview`, {
          method: 'POST', //
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(review),
        });
  
        if (!response.ok) {
          // Handle error
          throw new Error('Something went wrong during the API request.');
        }
  
        const result = await response.json();
        console.log('Review Added successfully:', result);
  
       setSnackbarMessage(result.message || 'Review added successfully!');
          setSnackbarOpen(true);
          setTimeout(() => {
            setSnackbarOpen(false);
            setSnackbarMessage('');
          }, 3000);
           SetMoviesList([]);
         setName('');
          setRating('');
           setComments('');
           setSnackbarMessage('');
          setSelectedMovie([]);
          setSnackbarOpen('');
        setRating('');
        navigate('/');
      } catch (error) {
        console.error('Error updating review:', error);
        alert('Failed to update the review. Please try again later.');
      }
  
    console.log(review); // In real-world, you'd send this to a backend API.
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  return (
    <div>
    <div className="form-container">
      <h3>Add New Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label>Select a movie</label>
          <select
            value={movieId}
            onChange={(e) => setSelectedMovie(e.target.value)}
            required
          >
            <option value="">Select a movie</option>
            {setMoviesList.map((movie) => (
                console.log("movie",movie),
                
              <option key={movie.id} value={movie.id}>
                {movie.movieName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
        
          <input
            type="text"
            value={reviewerName}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </div>
        <div className="form-group">
         
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating out of 10"
            max="10"
            min="1"
            required
          />
        </div>
        <div className="form-group">
        
          <textarea
            value={reviewComments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Review comments"
            required
          ></textarea>
        </div>
        <div className="form-footer">
          <button type="submit" className="submit-btn">
            Add Review
          </button>
        </div>
      </form>
    </div>
    <Snackbar 
        message={snackbarMessage}
        isOpen={snackbarOpen}
        onClose={handleSnackbarClose}
      />
    </div>
  );
};

export default ReviewForm;
