// src/Header.js
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Header = () => {
    const location = useLocation();
    const addMovieFormPage = location.pathname.startsWith('/addMovieForm');
    const editMovieFormPage = location.pathname.startsWith('/editMovieForm');
    const editReviewFormPage = location.pathname.startsWith('/addReviewForm');
    const addReviewFormPage = location.pathname.startsWith('/editReviewForm');
  return (
    <header className="header">
      <div className="logo">
      <Link to={`/`}>MOVIECRITIC </Link></div>
      { !addMovieFormPage && !addReviewFormPage && !editMovieFormPage && !editReviewFormPage && (
      <div className="buttons">
       
       <Link to={`/addMovieForm`}>
        <button className="button">
        Add new movie</button>
        </Link>
       
        <div>
        <Link to={`/addReviewForm`}>
        <button className="button review">Add new review</button>
        </Link>
        </div>
      </div>
      ) }
    </header>
  );
};

export default Header;
