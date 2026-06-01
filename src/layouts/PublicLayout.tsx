'use client';

import React, { ReactNode } from 'react';
import PublicHeader from '../components/public/PublicHeader';
import PublicFooter from '../components/public/PublicFooter';
import './PublicLayout.css';

interface Props { children: ReactNode; }

const PublicLayout = ({ children }: Props) => (
  <div className="public-layout">
    <PublicHeader />
    <main className="public-main">{children}</main>
    <PublicFooter />
  </div>
);

export default PublicLayout;
