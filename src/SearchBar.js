// src/SearchBar.js
import React from 'react';
import './SearchBar.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    const location = useLocation();
    const addMovieFormPage = location.pathname.startsWith('/addMovieForm');
    const addReviewFormPage = location.pathname.startsWith('/addReviewForm');
  return (
   
  
    <div className="search-bar">
      
      { !addMovieFormPage && !addReviewFormPage && (
        <>
        
        <h2>The best movie reviews site!</h2>
      <input
        type="text"
        
        placeholder="Search for your favourite movie"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      </> )}
    </div>

  );
};

export default SearchBar;
