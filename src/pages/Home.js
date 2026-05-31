import React, { useEffect, useRef, memo } from 'react';
import SocialFeed from '../components/SocialFeed';
import FAQ from '../components/FAQ';
import MenuSection from '../components/MenuSection';
import ReviewsSection from '../components/ReviewsSection';
import ConcernSection from '../components/ConcernSection';
import MenuDiagnosis from '../components/MenuDiagnosis';
import FlowSection from '../components/FlowSection';
import AdSense from '../components/common/AdSense';
import { setPageMeta } from '../utils/seoHelper';
import appConfig from '../config/appConfig';
import logger from '../utils/logger';
import { trackLineAddConversion } from '../services/googleAdsService';
import './Home.css';

const Home = memo(() => {
  logger.debug('Home component rendered');
  
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    logger.debug('Home useEffect called');
    // ページの一番上にスクロール
    window.scrollTo(0, 0);
    
    // SEOメタタグを設定
    setPageMeta({
      title: 'yoon² | 松山の耳つぼ・イヤーエステ専門サロン',
      description: '愛媛県松山市の耳つぼ・イヤーエステ専門サロン。初回3,500円～、オンライン予約OK。北久米駅徒歩5分、駐車場完備。',
      path: '/'
    });
    
    // 分析・広告は遅延読み込みでメインスレッドを軽くする
    import('../services/analyticsService').then(({ trackPageView }) => {
      trackPageView('Home', { section: 'main' });
    }).catch(() => {});
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

  const { shop } = appConfig;

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-background">
          <picture>
            <source media="(max-width: 768px)" srcSet="/images/hero/hero-sp.jpg" />
            <img
              src="/images/shop/play-room.jpg"
              alt=""
              fetchpriority="high"
              decoding="async"
              className="hero-bg-img"
            />
          </picture>
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="hero-title-main">yoon²</h1>
            <p className="hero-title-reading" aria-label="読み方">ゆんゆん</p>
            <p className="hero-title-sub">松山の耳つぼ・イヤーエステ専門サロン</p>
            <p className="hero-subtitle">ear esthetic & acupressure salon</p>
            <p className="hero-description">
              「取れる」快感と、耳から広がる深い眠り。<br />
              迷走神経を優しく撫でる新感覚タッチで、蓄積した脳疲労をリセット。
            </p>
            {/* 耳つぼジュエリー訴求バナー */}
            <div className="hero-price-banner">
              <p className="hero-price-label">★ 女性一番人気 No.1</p>
              <p className="hero-price-menu">耳つぼジュエリー</p>
              <div className="hero-price-wrapper">
                <span className="hero-price-yen">¥</span>
                <span className="hero-price-amount">3,500</span>
                <span className="hero-price-unit">〜</span>
              </div>
              <p className="hero-price-note">もみほぐし＋ジュエリーつけ放題</p>
            </div>

            {/* 口コミバッジ */}
            <div className="hero-review-badge" aria-label="ホットペッパービューティー 評価4.83">
              <div className="hero-review-stars-row">
                <span className="hero-review-stars" aria-hidden="true">★★★★★</span>
                <span className="hero-review-rating">4.83</span>
              </div>
              <p className="hero-review-source">ホットペッパービューティー</p>
            </div>

            <div className="hero-actions">
              <a
                href={appConfig.shop.lineUrl || appConfig.social.line.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary hero-cta line-booking-btn"
                aria-label="LINEで予約・お問い合わせ（新しいウィンドウで開きます）"
                onClick={() => trackLineAddConversion()}
              >
                <span className="line-booking-text">
                  <span className="line-booking-line1">LINEで予約</span>
                  <span className="line-booking-line2">お問い合わせ</span>
                </span>
              </a>
              <button 
                onClick={() => {
                  const coursesSection = document.getElementById('menu');
                  if (coursesSection) {
                    coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="btn-secondary"
                style={{ whiteSpace: 'nowrap' }}
              >
                コースを見る
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* お悩みセクション */}
      <ConcernSection />

      {/* メニュー診断 */}
      <MenuDiagnosis />

      {/* 施術の流れ */}
      <FlowSection />

      {/* お客様の声 */}
      <ReviewsSection />

      {/* メニュー・料金 */}
      <MenuSection />

      {/* FAQ Section */}
      <FAQ />

      {/* Social Section (Instagram誘導) */}
      <section className="social-section section" ref={addToRefs}>
        <div className="container">
          <SocialFeed />
        </div>
      </section>

      {/* Shop Info Section */}
      <section id="shop" className="shop-section section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Shop Information</span>
            <h2>店舗情報</h2>
            <p>お気軽にお越しください</p>
          </div>

          <div className="shop-info-content">
            <div className="shop-info-details">
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
              <div className="info-card">
                <div className="info-icon">🕐</div>
                <div className="info-content">
                  <h4>営業時間</h4>
                  <p>月〜日 {shop?.hours?.weekday || '10:00 - 20:00'}</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">📞</div>
                <div className="info-content">
                  <h4>電話番号</h4>
                  <p>{shop?.phone || '080-8478-1163'}</p>
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
        <section className="parking-section section" ref={addToRefs}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">Parking</span>
              <h2>駐車場</h2>
              <p className="section-header-description">お車でお越しの際はこちらをご利用ください</p>
            </div>
            <div className="parking-photo-container">
              <div className="parking-image-wrapper">
                <img
                  src={shop?.access?.parkingPhotos?.parkingLot || appConfig.shop.access.parkingPhotos.parkingLot}
                  alt="駐車場の様子"
                  className="parking-image"
                  width={800}
                  height={450}
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
        <section className="route-section section" ref={addToRefs}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">Route</span>
              <h2>駐車場から店舗までの道順</h2>
              <p className="section-header-description">駐車場から店舗までの道のりをご案内します</p>
            </div>
            <div className="route-photo-container">
              <div className="route-image-wrapper">
                <img
                  src={shop?.access?.parkingPhotos?.routeToShop || appConfig.shop.access.parkingPhotos.routeToShop}
                  alt="駐車場から店舗までの道順"
                  className="route-image"
                  width={800}
                  height={450}
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
      <section className="hours-section section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Business Hours</span>
            <h2>営業時間</h2>
            <p>ご来店をお待ちしております</p>
          </div>
          <div className="hours-content">
            <div className="hours-grid" style={{gridTemplateColumns: '1fr'}}>
              <div className="hours-card">
                <h4>月〜日・祝</h4>
                <p className="hours-time">月〜日 {shop?.hours?.weekday || '10:00 - 20:00'}</p>
                <p className="hours-note">毎日営業</p>
              </div>
            </div>
            {shop?.notes && shop.notes.length > 0 && (
              <div className="hours-notes">
                <h4>📋 ご確認事項</h4>
                <ul>
                  {shop.notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reserve/Contact Section */}
      <section id="reserve" className="reserve-section section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Reservation & Contact</span>
            <h2>ご予約・お問い合わせ</h2>
            <p>お気軽にお問い合わせください</p>
          </div>
          
          <div className="contact-info">
            <h4 className="contact-heading">
              <span className="contact-heading-line1">💬 ご予約</span>
              <span className="contact-heading-line2">お問い合わせについて</span>
            </h4>
            <p>ご予約やお問い合わせは<strong>公式LINE</strong>にメッセージをお願いします。</p>
            <a
              href={appConfig.shop.lineUrl || appConfig.social.line.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary line-booking-btn"
              style={{ marginTop: '1rem', display: 'inline-block' }}
              onClick={() => trackLineAddConversion()}
            >
              <span className="line-booking-text">
                <span className="line-booking-line1">LINEで予約</span>
                <span className="line-booking-line2">お問い合わせ</span>
              </span>
            </a>
          </div>
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
