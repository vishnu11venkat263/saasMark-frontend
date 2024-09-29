import React, { useState, useEffect } from 'react';
import './MovieDetail.css';
import { useParams ,Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';


// Sample API endpoint (replace with your actual API)
const API_URL = 'https://api.example.com/movies/1/reviews';

const MovieReview = () => {
  const [movieData, setMovieData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const {movieId} = useParams();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/movies/reviews/${movieId}`);
        const data = await response.json();
        console.log("data",data);
        
        setMovieData(data.movie); // Assuming `movie` key contains movie info
        setReviews(data.reviews); // Assuming `reviews` key contains reviews array
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, []);

  if (!movieData) {
    return <div>Loading...</div>;
  }
  const handleDelete = async (reviewId) => {
    try {
      
     const response = await axios.delete(`http://localhost:3001/movies/reviews/${reviewId}`);
      console.log('Movie Deleted successfully:', response.data);
      //   setResponseMessage(response.message);
        setSnackbarMessage(response.message || 'Movie Deleted successfully!');
        setSnackbarOpen(true);
      
       setTimeout(() => {
          setSnackbarOpen(false);
          setSnackbarMessage('');
        }, 3000);
        navigate('/');
    } catch (error) {
      console.error('Error deleting the movie:', error);
    }
  };
  return (
    <div className="movie-review-container">
      <div className="header">
        <h1>{movieData.movieName}</h1>
        <span className="rating">{movieData.averageRating}/10</span>
      </div>
     
      
      <div className="reviews">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <p className="review-text">{review.reviewComments}</p>
            <div className="review-details">
              <span className="author">By {review.reviewerName}</span>
              <span className="score">{review.rating}/10</span>
            </div>
            <div className="actions">
              <button className="edit-btn"> <Link to={`/editReviewForm/${review.id}`}>
              <FontAwesomeIcon icon={faEdit} /> {/* Edit Icon */}
              </Link></button>
              <button onClick={() => handleDelete(review.id)} className="delete-btn"> <FontAwesomeIcon icon={faTrashAlt} /> {/* Delete Icon */}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieReview;
