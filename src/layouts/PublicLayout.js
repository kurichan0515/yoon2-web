'use client';

import React from 'react';
import PublicHeader from '../components/public/PublicHeader';
import PublicFooter from '../components/public/PublicFooter';
import logger from '../utils/logger';
import './PublicLayout.css';

const PublicLayout = ({ children }) => {
  logger.debug('PublicLayout rendered');

  return (
    <div className="public-layout">
      <PublicHeader />
      <main className="public-main">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
