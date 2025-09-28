import React, { useEffect, useRef } from 'react';
import SocialFeed from '../components/SocialFeed';
import QRCodes from '../components/QRCodes';
import appConfig from '../config/appConfig';
import './Home.css';

const Home = ({ onNavigateToBooking }) => {
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
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
        <div className="hero-background">
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
              <button 
                onClick={() => onNavigateToBooking('booking')} 
                className="btn-primary hero-cta"
              >
                今すぐ予約する
              </button>
              <button 
                onClick={() => onNavigateToBooking('shop')} 
                className="btn-secondary"
              >
                店舗情報
              </button>
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
              <div className="about-features">
                <div className="feature-item">
                  <span className="feature-icon">✨</span>
                  <span>イヤーエステ</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💎</span>
                  <span>耳つぼジュエリー</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🌸</span>
                  <span>ドライヘッドスパ</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <span>イヤーエステ・耳つぼの様子</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="menu-section section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Services</span>
            <h2>サービスメニュー</h2>
            <p>お客様のご要望に合わせたイヤーエステ・耳つぼ・ドライヘッドスパメニューをご用意しております</p>
          </div>
          <div className="menu-categories">
            {/* おすすめメニュー */}
            <div className="menu-category recommend-menu">
              <div className="category-content-wrapper">
                <div className="category-text-content">
                  <h3 className="category-title">おすすめメニュー</h3>
                  <div className="menu-grid">
                    {appConfig.shop.services.filter(service => service.category === 'recommend').map(service => (
                      <div key={service.id} className="menu-card featured">
                        <div className="menu-content">
                          <h4>{service.name}</h4>
                          <p className="menu-duration">{service.duration}</p>
                          <p className="menu-price">¥{service.price.toLocaleString()}</p>
                          <p className="menu-description">{service.description}</p>
                          <p className="next-discount">次回予約で200円引き</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="category-image-content">
                  <img 
                    src="/images/menus/recommend-menu.jpg" 
                    alt="おすすめメニュー - yoon²極メニューと最上級メニュー"
                    className="menu-category-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="image-placeholder menu-category-placeholder" style={{display: 'none'}}>
                    <span>おすすめメニュー画像</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 耳つぼメニュー */}
            <div className="menu-category mimitubo-menu">
              <div className="category-content-wrapper">
                <div className="category-image-content">
                  <img 
                    src="/images/menus/mimitubo-menu.jpg" 
                    alt="耳つぼメニュー - 各種料金設定"
                    className="menu-category-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="image-placeholder menu-category-placeholder" style={{display: 'none'}}>
                    <span>耳つぼメニュー画像</span>
                  </div>
                </div>
                <div className="category-text-content">
                  <h3 className="category-title">耳つぼ</h3>
                  <div className="menu-grid">
                    {appConfig.shop.services.filter(service => service.category === 'mimitubo').map(service => (
                      <div key={service.id} className="menu-card">
                        <div className="menu-content">
                          <h4>{service.name}</h4>
                          <p className="menu-price">¥{service.price.toLocaleString()}</p>
                          <p className="menu-description">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="menu-note">付け放題メニューのみ　次回予約で200円引き</p>
                </div>
              </div>
            </div>

            {/* イヤーエステ・ドライヘッドスパ */}
            <div className="menu-category ear-este-menu">
              <div className="category-content-wrapper">
                <div className="category-text-content">
                  <h3 className="category-title">イヤーエステ・ドライヘッドスパ</h3>
                  <div className="menu-grid">
                    {appConfig.shop.services.filter(service => service.category === 'ear-este' || service.category === 'dry-head').map(service => (
                      <div key={service.id} className="menu-card">
                        <div className="menu-content">
                          <h4>{service.name}</h4>
                          <p className="menu-duration">{service.duration}</p>
                          <p className="menu-price">¥{service.price.toLocaleString()}</p>
                          <p className="menu-description">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="menu-note">次回予約で200円引き</p>
                </div>
                <div className="category-image-content">
                  <img 
                    src="/images/menus/ear-este-menu.jpg" 
                    alt="イヤーエステ・ドライヘッドスパメニュー - 料金表"
                    className="menu-category-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="image-placeholder menu-category-placeholder" style={{display: 'none'}}>
                    <span>イヤーエステ・ドライヘッドスパメニュー画像</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section section" ref={addToRefs}>
        <div className="container">
          <div className="vision-content">
            <div className="vision-image">
              <div className="image-placeholder">
                <span>店内の様子</span>
              </div>
            </div>
            <div className="vision-text">
              <span className="section-label">Our Vision</span>
              <h2>心身のバランスを整える</h2>
              <p>
                イヤーエステと耳つぼの力で、お客様の心身のバランスを整えることが私たちの使命です。
                プロの技術と心のこもったサービスで、深いリラクゼーションと健康をサポートいたします。
              </p>
              <div className="vision-stats">
                <div className="stat-item">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">お客様</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">5</span>
                  <span className="stat-label">年の実績</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">満足度</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR Codes Section */}
      <QRCodes />

      {/* Social Section */}
      <section className="social-section section" ref={addToRefs}>
        <div className="container">
          <SocialFeed />
        </div>
      </section>
    </div>
  );
};

export default Home;
