// src/App.js
import React, { useState } from 'react';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './SearchBar';
import MovieGrid from './MovieGrid';
import MovieDetail from './MovieDetail';
import './App.css';
import AddMovieForm from './AddMovieForm';
import ReviewForm from './ReviewForm';
import EditReviewForm from './EditReviewForm';
import EditMovieForm from './EditMovieForm'
function App() {
  // const [searchTerm, setSearchTerm] = useState('');
 

  
  
  return (
    <Router>
    <div className="App">
       
      <Header />

      
      <Routes>
      <Route path="/" element={<MovieGrid  />} />
      <Route path="/movies/:movieId" element={<MovieDetail/>} />
      <Route path="/addMovieForm" element={<AddMovieForm/>} />
      { <Route path="/editMovieForm/:movieId" element={<EditMovieForm/>} />}
      <Route path="/addReviewForm" element={<ReviewForm/>} />
      <Route path="/editReviewForm/:reviewId" element={<EditReviewForm/>} />
      </Routes>
      {/* {<Route path="/movies/:movieId" element={<MovieDetails />} /> } */}
      {/* {<MovieGrid movies={filteredMovies} /> } */}
     
    </div>
    </Router>
  );
}

export default App;
