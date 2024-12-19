// src/components/LoadingSpinner.js
import React from 'react';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
