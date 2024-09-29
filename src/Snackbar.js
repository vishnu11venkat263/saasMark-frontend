import React from 'react';
import './Snackbar.css'; // You can style it with your CSS

const Snackbar = ({ message, isOpen, onClose }) => {
  return (
    <div className={`snackbar ${isOpen ? 'show' : ''}`}>
      {message}
    
    </div>
  );
};

export default Snackbar;
