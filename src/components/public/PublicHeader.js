import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import appConfig from '../../config/appConfig';
import './PublicHeader.css';

const PublicHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  // スクロール方向に応じてヘッダーの表示/非表示を制御
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = currentScrollY - lastScrollY.current;

          // トップに近い場合は常に表示
          if (currentScrollY < 100) {
            setIsVisible(true);
            setIsScrolled(false);
          } else {
            setIsScrolled(true);
            
            // 下にスクロールしている場合（スクロール中）は非表示
            if (scrollDifference > 5) {
              setIsVisible(false);
              // スクロールタイムアウトをクリア
              if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
              }
              // スクロールが止まったら表示
              scrollTimeout.current = setTimeout(() => {
                setIsVisible(true);
              }, 150);
            }
            // 上にスクロールしている場合は表示
            else if (scrollDifference < -5) {
              setIsVisible(true);
              // スクロールタイムアウトをクリア
              if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
              }
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
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <header className={`public-header ${isVisible ? 'header-visible' : 'header-hidden'} ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="public-header-container">
        <div className="public-header-left">
          <Link
            to="/"
            className="public-logo"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            aria-label="トップページへ"
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
            aria-label="LINEで予約・お問い合わせ（新しいウィンドウで開きます）"
          >
            LINEで予約
          </a>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
