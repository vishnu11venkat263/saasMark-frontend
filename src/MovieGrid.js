// src/MovieGrid.js

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './MovieGrid.css';
import { Link, useNavigate  } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Snackbar from './Snackbar'; 
import SearchBar from './SearchBar';

const MovieGrid = ({  }) => {


    const [movies, setMovies] = useState([]); // State to hold movie data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [searchTerm, setSearchTerm] = useState(''); 
  const [error, setError] = useState(null); // State to manage errors
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
   
    const fetchMovies = async () => {
      try {
        const termToSend = searchTerm.trim() === '' ? null : searchTerm;
       
        const response = await axios.get(`http://localhost:3001/movies`,{
            params: { search: termToSend } 
        }); // Replace with your API URL
        setMovies(response.data); // Assuming the data is in response.data
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchMovies();
}, [searchTerm]);


console.log("searchTerm",searchTerm);
const handleDelete = async (movieId) => {
    try {
      
     const response = await axios.delete(`http://localhost:3001/movies/${movieId}`);
      console.log('Movie submitted successfully:', response.data);
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
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

if (loading) return <p>Loading...</p>; // Show loading message
  if (error) return <p>Error: {error}</p>; // Show error message

  return (
    <div>
    <div>
    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    

    <div className="movie-grid">
      {movies.map((movie, index) => (
        <div key={index} className="movie-card">
              <Link to={`/movies/${movie.id}`}>
          <h3>{movie.movieName}</h3>
          <p>Released: {formatDate(movie.releaseDate)}</p>
          <p>Rating: {movie.averageRating}</p>
          <div className="icons">
         
            <span role="button" className="icon">
            <Link to={`/editMovieForm/${movie.id}`}>
              <FontAwesomeIcon icon={faEdit} /> {/* Edit Icon */}
              </Link>
            </span>
            <span role="button"  onClick={() => handleDelete(movie.id)}className="icon">
              <FontAwesomeIcon icon={faTrashAlt} /> {/* Delete Icon */}
            </span>
          </div>
          </Link>
        </div>
      ))}
    </div>
    </div>
    <Snackbar 
        message={snackbarMessage}
        isOpen={snackbarOpen}
        onClose={handleSnackbarClose}
      />
    </div>
  );
};


const formatDate = (dateString) => {
  // Convert the string to a Date object
  const date = new Date(dateString);
  // Format the date using date-fns
  return format(date, 'MMMM dd, yyyy'); // Change format as needed
};


export default MovieGrid;
