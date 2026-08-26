'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './PublicHeader.css';
import appConfig from '../../config/appConfig';
import { trackLineAddConversion } from '../../services/googleAdsService';

const PublicHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const diff = currentScrollY - lastScrollY.current;

          if (currentScrollY < 100) {
            setIsVisible(true);
            setIsScrolled(false);
          } else {
            setIsScrolled(true);
            if (diff > 5) {
              setIsVisible(false);
              if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
              scrollTimeout.current = setTimeout(() => setIsVisible(true), 150);
            } else if (diff < -5) {
              setIsVisible(true);
              if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            }
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <header className={`public-header ${isVisible ? 'header-visible' : 'header-hidden'} ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="public-header-container">
        <div className="public-header-left">
          <Link
            href="/"
            className="public-logo"
            onClick={(e) => {
              if (pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
            }}
          >
            <p className="public-logo-text">yoon<sup>2</sup></p>
          </Link>
        </div>
        <div className="public-header-right">
          <a
            href={appConfig.shop.lineUrl || appConfig.social.line.url}
            target="_blank"
            rel="noopener noreferrer"
            className="line-button"
            onClick={() => trackLineAddConversion()}
          >
            LINEで予約
            <span className="visually-hidden">（新しいウィンドウで開きます）</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
