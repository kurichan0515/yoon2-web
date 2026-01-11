import React, { useEffect, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialFeed from '../components/SocialFeed';
import AdSense from '../components/common/AdSense';
import { trackPageView } from '../services/analyticsService';
import appConfig from '../config/appConfig';
import logger from '../utils/logger';
import './Home.css';

const Home = memo(() => {
  const navigate = useNavigate();
  logger.debug('Home component rendered');
  
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    logger.debug('Home useEffect called');
    // ページの一番上にスクロール
    window.scrollTo(0, 0);
    
    // インプレッションを記録
    trackPageView('Home', {
      section: 'main'
    });
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-background" style={{backgroundImage: "url('/images/hero/wait-room.png')"}}>
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content fade-in">
            <h1>yoon²</h1>
            <p className="hero-subtitle">ear esthetic & acupressure salon</p>
            <p className="hero-description">
              イヤーエステと耳つぼで至福のひととき<br />
              プロの技術で心身ともにリラックスできる特別な時間をお届けします
            </p>
            <div className="hero-actions">
              <a
                href={appConfig.shop.lineUrl || appConfig.social.line.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary hero-cta"
                aria-label="LINEで予約・お問い合わせ（新しいウィンドウで開きます）"
              >
                LINEで予約・お問い合わせ
              </a>
              <button 
                onClick={() => navigate('/shop')} 
                className="btn-secondary"
              >
                店舗情報
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Announcement Section */}
      <section className="announcement-section section" ref={addToRefs}>
        <div className="container">
          <div className="announcement-card">
            <img 
              src="/images/announcements/notification01.png" 
              alt="店舗移転のお知らせ"
              className="announcement-image"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="image-placeholder announcement-placeholder" style={{display: 'none'}} aria-hidden="true">
              <span>お知らせ画像</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section section" ref={addToRefs}>
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <span className="section-label">About Us</span>
              <h2>サービスの特徴</h2>
              <p>
                イヤーエステと耳つぼで心身のバランスを整える専門サロンです。
                お客様一人ひとりに合わせたオーダーメイドの施術で、深いリラクゼーションを提供いたします。
              </p>
              <p>
                ドライヘッドスパとの組み合わせで、頭部全体の疲れを解消し、
                日常のストレスから解放される特別な時間をお過ごしいただけます。
              </p>
            </div>
            <div className="about-image">
              <img 
                src="/images/shop/play-room.png" 
                alt="店内の様子 - リラクゼーション空間"
                className="about-image-content"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="image-placeholder" style={{display: 'none'}} aria-hidden="true">
                <span>イヤーエステ・耳つぼの様子</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section - Simplified */}
      <section className="menu-section section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Services</span>
            <h2>サービスメニュー</h2>
            <p>お客様のご要望に合わせたイヤーエステ・耳つぼ・ドライヘッドスパメニューをご用意しております</p>
          </div>
          <div className="simplified-menu-grid">
            {/* おすすめメニュー画像 */}
            <div 
              className="menu-image-card" 
              onClick={() => navigate('/courses')}
              role="button"
              tabIndex={0}
              aria-label="おすすめメニューの詳細を見る"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate('/courses');
                }
              }}
            >
              <img 
                src="/images/menus/recommend-menu.jpg" 
                alt="おすすめメニューの画像"
                className="menu-image"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="image-placeholder menu-image-placeholder" style={{display: 'none'}} aria-hidden="true">
                <span>おすすめメニュー</span>
              </div>
              <div className="menu-image-overlay">
                <h3>おすすめメニュー</h3>
                <p>詳細を見る</p>
              </div>
            </div>

            {/* 耳つぼメニュー画像 */}
            <div 
              className="menu-image-card" 
              onClick={() => navigate('/courses')}
              role="button"
              tabIndex={0}
              aria-label="耳つぼメニューの詳細を見る"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate('/courses');
                }
              }}
            >
              <img 
                src="/images/menus/mimitubo-menu.jpg" 
                alt="耳つぼメニューの画像"
                className="menu-image"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="image-placeholder menu-image-placeholder" style={{display: 'none'}} aria-hidden="true">
                <span>耳つぼメニュー</span>
              </div>
              <div className="menu-image-overlay">
                <h3>耳つぼメニュー</h3>
                <p>詳細を見る</p>
              </div>
            </div>

            {/* イヤーエステ・ドライヘッドスパメニュー画像 */}
            <div 
              className="menu-image-card" 
              onClick={() => navigate('/courses')}
              role="button"
              tabIndex={0}
              aria-label="イヤーエステ・ドライヘッドスパメニューの詳細を見る"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate('/courses');
                }
              }}
            >
              <img 
                src="/images/menus/ear-este-menu.jpg" 
                alt="イヤーエステ・ドライヘッドスパメニューの画像"
                className="menu-image"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="image-placeholder menu-image-placeholder" style={{display: 'none'}} aria-hidden="true">
                <span>イヤーエステ・ドライヘッドスパメニュー</span>
              </div>
              <div className="menu-image-overlay">
                <h3>イヤーエステ・ドライヘッドスパ</h3>
                <p>詳細を見る</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="social-section section" ref={addToRefs}>
        <div className="container">
          <SocialFeed />
        </div>
      </section>

      {/* AdSense広告 - SNSセクション後 */}
      <section className="adsense-section section" ref={addToRefs}>
        <div className="container">
          <AdSense 
            adSlot="2647640133" 
            adFormat="auto"
            className="adsense-social"
          />
        </div>
      </section>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
