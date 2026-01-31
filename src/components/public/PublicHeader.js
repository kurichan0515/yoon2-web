import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import appConfig from '../../config/appConfig';
import './PublicHeader.css';

const PublicHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMobileMenuOpen(false);
  };

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
          >
            <h1>{appConfig.shop.name}</h1>
          </Link>
        </div>
        
        <nav className={`public-navigation ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`} aria-label="メインナビゲーション">
          <a 
            href="#about" 
            className="nav-link" 
            aria-label="サービスについてへ移動"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToSection('about');
            }}
          >
            サービスについて
          </a>
          <a 
            href="#menu" 
            className="nav-link" 
            aria-label="メニューへ移動"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToSection('menu');
            }}
          >
            メニュー
          </a>
          <a 
            href="#courses" 
            className="nav-link" 
            aria-label="コース情報へ移動"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToSection('courses');
            }}
          >
            コース情報
          </a>
          <a 
            href="#shop" 
            className="nav-link" 
            aria-label="店舗情報へ移動"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToSection('shop');
            }}
          >
            店舗情報
          </a>
          <a 
            href="#reserve" 
            className="nav-link" 
            aria-label="ご予約へ移動"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToSection('reserve');
            }}
          >
            ご予約
          </a>
          <a 
            href={appConfig.shop.lineUrl || appConfig.social.line.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link line-link mobile-only"
            aria-label="LINEで予約（新しいウィンドウで開きます）"
          >
            LINEから予約
          </a>
        </nav>
        
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

        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'mobile-menu-toggle-open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default PublicHeader;
