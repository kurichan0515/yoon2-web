import React, { useEffect, useRef, memo } from 'react';
import { trackPageView } from '../services/analyticsService';
import appConfig from '../config/appConfig';
import logger from '../utils/logger';
import './ShopInfo.css';

const ShopInfo = memo(() => {
  const { shop, social } = appConfig;
  const sectionsRef = useRef([]);

  logger.debug('ShopInfo component rendered', { shopName: shop?.name });


  useEffect(() => {
    // ページの一番上にスクロール
    window.scrollTo(0, 0);
    
    // インプレッションを記録
    trackPageView('ShopInfo', {
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
    <div className="shop-info-page">
      {/* Hero Section */}
      <section className="shop-hero">
        <div className="hero-background" style={{backgroundImage: "url('/images/hero/wait-room.png')"}}>
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content fade-in">
            <span className="section-label">About Us</span>
            <h1>店舗情報</h1>
            <p className="hero-description">
              イヤーエステと耳つぼで心身のバランスを整える専門サロン<br />
              プロの技術で深いリラクゼーションと健康をサポートいたします
            </p>
          </div>
        </div>
      </section>

      {/* 店舗概要セクション */}
      <section className="section shop-overview" ref={addToRefs}>
        <div className="container">
          <div className="overview-content">
            <div className="overview-text">
              <span className="section-label">Shop Overview</span>
              <h2>サロン概要</h2>
              <h3 className="shop-name">yoon²ゆんゆん</h3>
              <p className="shop-description">
                イヤーエステと耳つぼで心身のバランスを整える専門サロンです。
                お客様一人ひとりに合わせたオーダーメイドの施術で、深いリラクゼーションを提供いたします。
              </p>
              <p className="shop-description">
                ドライヘッドスパとの組み合わせで、頭部全体の疲れを解消し、
                日常のストレスから解放される特別な時間をお過ごしいただけます。
              </p>
            </div>
            <div className="overview-image">
              <img 
                src="/images/shop/play-room.png" 
                alt="サロンの様子 - リラクゼーション空間"
                className="overview-image-content"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="image-placeholder" style={{display: 'none'}} aria-hidden="true">
                <span>サロンの様子</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* アクセス情報セクション */}
      <section className="section access-section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Access</span>
            <h2>アクセス情報</h2>
            <p>お気軽にお越しください</p>
          </div>
          <div className="access-content">
            <div className="access-details">
              <div className="info-card">
                <div className="info-icon">📍</div>
                <div className="info-content">
                  <h4>住所</h4>
                  <p>{shop?.address || '住所情報を取得中...'}</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">🚃</div>
                <div className="info-content">
                  <h4>最寄り駅</h4>
                  {shop?.access?.stations?.filter(station => station).map((station, index) => (
                    <p key={index}>{station}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="map-container">
              <iframe
                src={shop?.googleMapsUrl || appConfig.shop.googleMapsUrl}
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="yoon²ゆんゆん 店舗位置"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 駐車場写真セクション */}
      {shop?.access?.parkingPhotos?.parkingLot && (
        <section className="section parking-section" ref={addToRefs}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">Parking</span>
              <h2>駐車場</h2>
              <p>お車でお越しの際はこちらをご利用ください</p>
            </div>
            <div className="parking-photo-container">
              <div className="parking-image-wrapper">
                <img 
                  src={shop?.access?.parkingPhotos?.parkingLot || appConfig.shop.access.parkingPhotos.parkingLot}
                  alt="駐車場の様子"
                  className="parking-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const placeholder = e.target.nextElementSibling;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div className="image-placeholder" style={{display: 'none'}} aria-hidden="true">
                  <span>駐車場の写真</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 駐車場から店舗までの写真セクション */}
      {shop?.access?.parkingPhotos?.routeToShop && (
        <section className="section route-section" ref={addToRefs}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">Route</span>
              <h2>駐車場から店舗までの道順</h2>
              <p>駐車場から店舗までの道のりをご案内します</p>
            </div>
            <div className="route-photo-container">
              <div className="route-image-wrapper">
                <img 
                  src={shop?.access?.parkingPhotos?.routeToShop || appConfig.shop.access.parkingPhotos.routeToShop}
                  alt="駐車場から店舗までの道順"
                  className="route-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const placeholder = e.target.nextElementSibling;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div className="image-placeholder" style={{display: 'none'}} aria-hidden="true">
                  <span>駐車場から店舗までの写真</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 営業時間セクション */}
      <section className="section hours-section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Business Hours</span>
            <h2>営業時間</h2>
            <p>ご来店をお待ちしております</p>
          </div>
          <div className="hours-content">
            <div className="hours-grid">
              <div className="hours-card">
                <h4>平日</h4>
                <p className="hours-time">{shop?.hours?.weekday || '10:00 - 20:00'}</p>
                <p className="hours-note">月曜日〜金曜日</p>
              </div>
              <div className="hours-card">
                <h4>土日祝</h4>
                <p className="hours-time">{shop?.hours?.weekend || '10:00 - 20:00'}</p>
                <p className="hours-note">土曜日・日曜日・祝日</p>
              </div>
            </div>
            <div className="hours-notes">
              <h4>📋 ご確認事項</h4>
              <ul>
                {shop?.notes?.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>



      {/* お問い合わせセクション */}
      <section className="section contact-section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Contact</span>
            <h2>お問い合わせ・ご予約</h2>
            <p>お気軽にお問い合わせください</p>
          </div>
          
          <div className="contact-info">
            <div className="contact-note">
              <h4>💬 ご予約・お問い合わせについて</h4>
              <p>ご予約やお問い合わせは<strong>公式LINE</strong>にメッセージをお願いします。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

ShopInfo.displayName = 'ShopInfo';

export default ShopInfo;