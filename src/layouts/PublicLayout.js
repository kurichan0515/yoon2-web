import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from '../components/public/PublicHeader';
import PublicFooter from '../components/public/PublicFooter';
import logger from '../utils/logger';
import './PublicLayout.css';

const PublicLayout = () => {
  logger.debug('PublicLayout rendered');
  
  return (
    <div className="public-layout">
      <PublicHeader />
      <main className="public-main">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
