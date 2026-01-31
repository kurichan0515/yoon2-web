import React, { useEffect, useRef } from 'react';
import appConfig from '../config/appConfig';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    // ページの一番上にスクロール
    window.scrollTo(0, 0);
    
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

  // LINE予約誘導ハンドラー
  const handleLineBooking = () => {
    const lineUrl = appConfig.social.line.url;
    const newWindow = window.open(lineUrl, '_blank', 'noopener,noreferrer');
    if (!newWindow) {
      window.location.href = lineUrl;
    }
  };

  // ホームページに戻る
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="booking-confirmation">
      {/* Hero Section */}
      <section className="confirmation-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content fade-in">
            <span className="section-label">Booking</span>
            <h1>ご予約について</h1>
            <p className="hero-description">
              現在、ご予約は公式LINEから承っております<br />
              お気軽にメッセージをお送りください
            </p>
          </div>
        </div>
      </section>

      {/* LINE予約案内セクション */}
      <section className="section line-booking-section" ref={addToRefs}>
        <div className="container">
          <div className="line-booking-content">
            <div className="booking-method-card primary">
              <div className="method-header">
                <div className="method-icon">💬</div>
                <div className="method-info">
                  <h2>公式LINEで予約</h2>
                  <p className="method-subtitle">おすすめの予約方法</p>
                </div>
              </div>
              
              <div className="method-description">
                <p>
                  24時間受付で、お気軽にメッセージをお送りいただけます。<br />
                  空き状況の確認や詳しいご相談も可能です。
                </p>
              </div>
              
              <div className="method-benefits">
                <div className="benefit-item">
                  <span className="benefit-icon">⏰</span>
                  <div className="benefit-content">
                    <h4>24時間受付</h4>
                    <p>いつでもメッセージを送れます</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">💬</span>
                  <div className="benefit-content">
                    <h4>気軽に相談</h4>
                    <p>不安なことは何でもお聞きください</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">📅</span>
                  <div className="benefit-content">
                    <h4>空き状況確認</h4>
                    <p>リアルタイムで確認できます</p>
                  </div>
                </div>
              </div>

              <button onClick={handleLineBooking} className="line-booking-button">
                <span className="button-icon">💬</span>
                LINEで予約・お問い合わせ
              </button>
              
              <p className="method-note">
                {appConfig.social.line.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* サービス情報セクション */}
      <section className="section services-preview-section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Services</span>
            <h2>主なサービス・料金</h2>
            <p>お客様のご要望に合わせた施術をご提供いたします</p>
          </div>
          <div className="services-preview-grid">
            {appConfig.shop.services.slice(0, 6).map(service => (
              <div key={service.id} className="service-preview-card">
                <div className="service-preview-content">
                  <h4>{service.name}</h4>
                  <div className="service-preview-details">
                    <span className="service-duration">{service.duration}</span>
                    <span className="service-price">¥{service.price.toLocaleString()}</span>
                  </div>
                  <p className="service-description">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="services-note">
            詳しいメニューや料金については、LINEでお気軽にお問い合わせください。
          </p>
        </div>
      </section>

      {/* 重要事項セクション */}
      <section className="section important-info-section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Important</span>
            <h2>ご予約について</h2>
            <p>ご来店前にご確認ください</p>
          </div>
          <div className="important-info-grid">
            <div className="info-card">
              <div className="info-icon">📱</div>
              <div className="info-content">
                <h4>LINEでのご予約</h4>
                <p>公式LINEにメッセージをお送りください。空き状況を確認してお返事いたします。</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">⏰</div>
              <div className="info-content">
                <h4>営業時間</h4>
                <p>平日: {appConfig.shop.hours.weekday}<br />土日祝: {appConfig.shop.hours.weekend}</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">🏪</div>
              <div className="info-content">
                <h4>店舗情報</h4>
                <p>{appConfig.shop.address}<br />TEL: {appConfig.shop.phone}</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">💡</div>
              <div className="info-content">
                <h4>キャンセル・変更</h4>
                <p>前日までにLINEでご連絡ください。当日キャンセルはキャンセル料が発生する場合があります。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* アクションセクション */}
      <section className="section action-section" ref={addToRefs}>
        <div className="container">
          <div className="action-content">
            <div className="action-header">
              <h2>他のページもご覧ください</h2>
              <p>サロンについて詳しく知りたい方はこちら</p>
            </div>
            <div className="action-buttons">
              <button onClick={handleGoHome} className="action-button primary">
                ホームページに戻る
              </button>
              <button 
                onClick={() => {
                  const shopSection = document.getElementById('shop');
                  if (shopSection) {
                    shopSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    window.location.href = '/#shop';
                  }
                }} 
                className="action-button secondary"
              >
                店舗情報を見る
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingConfirmation;