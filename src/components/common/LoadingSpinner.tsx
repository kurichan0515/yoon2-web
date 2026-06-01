'use client';

import React from 'react';
import './LoadingSpinner.css';

interface Props {
  message?: string;
}

const LoadingSpinner = ({ message = '読み込み中...' }: Props) => (
  <div className="loading-spinner">
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  </div>
);

export default LoadingSpinner;
