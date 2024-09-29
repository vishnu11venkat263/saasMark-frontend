import React, { useState ,  useEffect} from 'react';
import './EditReviewForm.css'; // Import the CSS file
import Snackbar from './Snackbar'; 
import { useParams } from 'react-router-dom';
import {  useNavigate  } from 'react-router-dom';


const ReviewForm = ({ readOnlyFields = {}}) => {
  const [movie, setMovie] = useState('');
  const [movieId, setMovieId] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState('');
  const [reviewComments, setComments] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const {reviewId} = useParams();


  useEffect(() => {

    const fetchReviewData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/movies/editReviews/${reviewId}`);
          const data = await response.json();
          console.log("data",data);
          setMovie(data.movie.movieName); 
          setMovieId(data.movie.id); 
          setReviewerName(data.reviews.reviewerName);
            setComments(data.reviews.reviewComments);
        setRating(data.reviews.rating);

        } catch (error) {
          console.error("Error fetching movie data:", error);
        }
      };
   
    // const reviewData = state ? state.review : { text: 'Sample review', score: 8 };
    
    fetchReviewData();
  }, []);




  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {
     
      reviewerName,
      movieId,
      rating,
      reviewComments,
    };
    try {
        // Make the API request to update the review
        const response = await fetch(`http://localhost:3001/movies/updateReview/${reviewId}`, {
          method: 'POST', //
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(review), // Send the form data as JSON
        });
  
        if (!response.ok) {
          // Handle error
          throw new Error('Something went wrong during the API request.');
        }
  
        const result = await response.json();
        console.log('Review updated successfully:', result);
  
       setSnackbarMessage(result.message || 'Review Updated successfully!');
          setSnackbarOpen(true);
          setTimeout(() => {
            setSnackbarOpen(false);
            setSnackbarMessage('');
          }, 3000);
          setMovie(''); 
          setReviewerName('');
            setComments('');
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
      <h3>Edit Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        
        <input
            type="text"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            placeholder="Movie name"
            readOnly= 'true'
            required
          />
        </div>
        <div className="form-group">
        
          <input
            type="text"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
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
          <button type="submit" disabled={readOnlyFields.movie} className="submit-btn">
            Update Review
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
