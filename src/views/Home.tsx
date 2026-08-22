'use client';

import React, { useEffect, useRef, memo, RefCallback } from 'react';
import SocialFeed from '../components/SocialFeed';
import FAQ from '../components/FAQ';
import MenuSection from '../components/MenuSection';
import ReviewsSection from '../components/ReviewsSection';
import ConcernSection from '../components/ConcernSection';
import MenuDiagnosis from '../components/MenuDiagnosis';
import FlowSection from '../components/FlowSection';
import AdSense from '../components/common/AdSense';
import appConfig from '../config/appConfig';
import logger from '../utils/logger';
import { trackLineAddConversion } from '../services/googleAdsService';
import './Home.css';

interface ShopConfig {
  address?: string;
  phone?: string;
  lineUrl?: string;
  googleMapsUrl?: string;
  notes?: string[];
  hours?: { weekday?: string };
  access?: {
    stations?: string[];
    parkingPhotos?: { parkingLot?: string; routeToShop?: string; accessGuide?: string };
  };
}

const hideImgShowPlaceholder = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  img.style.display = 'none';
  const ph = img.nextElementSibling as HTMLElement | null;
  if (ph) ph.style.display = 'flex';
};

const Home = memo(() => {
  logger.debug('Home component rendered');
  const heroRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    import('../services/analyticsService').then(({ trackPageView }) => {
      trackPageView('Home', { section: 'main' });
    }).catch(() => {});
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('fade-in'); }),
      { threshold: 0.1 }
    );
    sectionsRef.current.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const addToRefs: RefCallback<HTMLElement> = (el) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el);
  };

  const shop = appConfig.shop as ShopConfig;
  const lineUrl = (shop.lineUrl ?? (appConfig.social as { line: { url: string } }).line.url) as string;

  return (
    <div className="home">
      <section className="hero" ref={heroRef}>
        <div className="hero-background">
          <picture>
            <source media="(max-width: 768px)" srcSet="/images/hero/hero-sp.webp" type="image/webp" />
            <source media="(max-width: 768px)" srcSet="/images/hero/hero-sp.jpg" />
            <source srcSet="/images/shop/play-room.webp" type="image/webp" />
            <img src="/images/shop/play-room.jpg" alt=""
              width={1920} height={1280}
              fetchPriority="high" decoding="async" className="hero-bg-img" />
          </picture>
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="hero-title-main">yoon²</h1>
            <p className="hero-title-reading" aria-label="読み方">ゆんゆん</p>
            <p className="hero-title-sub">松山の耳つぼ・イヤーエステ専門サロン</p>
            <p className="hero-subtitle">ear esthetic &amp; acupressure salon</p>
            <p className="hero-description">
              「取れる」快感と、耳から広がる深い眠り。<br />
              迷走神経を優しく撫でる新感覚タッチで、蓄積した脳疲労をリセット。
            </p>
            <div className="hero-price-banner">
              <p className="hero-price-label">女性スタッフ対応</p>
              <p className="hero-price-menu">耳つぼジュエリー</p>
              <div className="hero-price-wrapper">
                <span className="hero-price-yen">¥</span>
                <span className="hero-price-amount">3,500</span>
                <span className="hero-price-unit">〜</span>
              </div>
              <p className="hero-price-note">もみほぐし＋ジュエリーつけ放題</p>
            </div>
            <div className="hero-review-badge" aria-label="ホットペッパービューティー 評価4.91">
              <div className="hero-review-stars-row">
                <span className="hero-review-stars" aria-hidden="true">★★★★★</span>
                <span className="hero-review-rating">4.91</span>
              </div>
              <p className="hero-review-source">ホットペッパービューティー</p>
            </div>
            <a
              href="https://mimitubojapan.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-certification-badge"
            >
              <span aria-hidden="true">🏅</span>
              一般社団法人日本フランス式耳つぼ協会認定
            </a>
            <div className="hero-actions">
              <a href={lineUrl} target="_blank" rel="noopener noreferrer"
                className="btn-primary hero-cta line-booking-btn"
                aria-label="LINEで予約・お問い合わせ（新しいウィンドウで開きます）"
                onClick={() => trackLineAddConversion()}>
                <span className="line-booking-text">
                  <span className="line-booking-line1">LINEで予約</span>
                  <span className="line-booking-line2">お問い合わせ</span>
                </span>
              </a>
              <button onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="btn-secondary" style={{ whiteSpace: 'nowrap' }}>
                コースを見る
              </button>
            </div>
          </div>
        </div>
      </section>

      <ConcernSection />
      <MenuDiagnosis />
      <FlowSection />
      <ReviewsSection />
      <MenuSection />
      <FAQ />

      <section className="social-section section" ref={addToRefs}>
        <div className="container"><SocialFeed /></div>
      </section>

      <section id="access" className="shop-section section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Shop Information</span>
            <h2>店舗情報</h2>
            <p>お気軽にお越しください</p>
          </div>
          <div className="shop-info-content">
            <div className="shop-info-details">
              {[
                ['📍','住所', <p key="addr">{shop.address ?? '住所情報を取得中...'}</p>],
                ['🚗','駐車場のご案内', (
                  <div key="parking">
                    <p>店舗前に駐車スペースがございません。店舗近くの専用駐車場（北久米町412番地）をご利用ください。</p>
                    <a href="https://maps.google.com/?cid=10357450395002350789" target="_blank" rel="noopener noreferrer"
                      className="btn-secondary" style={{ display: 'inline-block', marginTop: 'var(--spacing-sm)' }}>
                      駐車場の地図を見る
                    </a>
                  </div>
                )],
                ['🚃','最寄り駅', shop.access?.stations?.filter(Boolean).map((s, i) => <p key={i}>{s}</p>)],
                ['🕐','営業時間', <p key="hours">月〜日 {shop.hours?.weekday ?? '10:00 - 20:00'}</p>],
                ['📞','電話番号', <p key="phone">{shop.phone ?? '080-8478-1163'}</p>],
              ].map(([icon, title, content]) => (
                <div key={title as string} className="info-card">
                  <div className="info-icon" aria-hidden="true">{icon}</div>
                  <div className="info-content"><h4>{title}</h4>{content}</div>
                </div>
              ))}
            </div>
            <div className="map-container">
              <iframe
                src={shop.googleMapsUrl ?? ''}
                width="100%" height="300"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="yoon²ゆんゆん 店舗位置"
              />
            </div>
          </div>
        </div>
      </section>

      {shop.access?.parkingPhotos?.accessGuide && (
        <section className="access-guide-section section" ref={addToRefs}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">Access</span>
              <h2>アクセス案内</h2>
              <p className="section-header-description">お車でのアクセス方法をご確認ください</p>
              <p className="section-header-description">駐車場：北久米町412番地</p>
            </div>
            <div className="route-photo-container">
              <div className="route-image-wrapper">
                <img src={shop.access.parkingPhotos.accessGuide} alt="駐車場・店舗へのアクセスマップ"
                  className="route-image" width={800} height={600} loading="lazy"
                  onError={hideImgShowPlaceholder} />
                <div className="image-placeholder" style={{ display: 'none' }} aria-hidden="true">
                  <span>アクセス案内の画像</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {shop.access?.parkingPhotos?.parkingLot && (
        <section className="parking-section section" ref={addToRefs}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">Parking</span>
              <h2>駐車場</h2>
              <p className="section-header-description">お車でお越しの際はこちらをご利用ください</p>
            </div>
            <div className="parking-photo-container">
              <div className="parking-image-wrapper">
                <img src={shop.access.parkingPhotos.parkingLot} alt="駐車場の様子"
                  className="parking-image" width={800} height={450} loading="lazy"
                  onError={hideImgShowPlaceholder} />
                <div className="image-placeholder" style={{ display: 'none' }} aria-hidden="true">
                  <span>駐車場の写真</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {shop.access?.parkingPhotos?.routeToShop && (
        <section className="route-section section" ref={addToRefs}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">Route</span>
              <h2>駐車場から店舗までの道順</h2>
              <p className="section-header-description">駐車場から店舗までの道のりをご案内します</p>
            </div>
            <div className="route-photo-container">
              <div className="route-image-wrapper">
                <img src={shop.access.parkingPhotos.routeToShop} alt="駐車場から店舗までの道順"
                  className="route-image" width={800} height={450} loading="lazy"
                  onError={hideImgShowPlaceholder} />
                <div className="image-placeholder" style={{ display: 'none' }} aria-hidden="true">
                  <span>駐車場から店舗までの写真</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="hours-section section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Business Hours</span>
            <h2>営業時間</h2>
            <p>ご来店をお待ちしております</p>
          </div>
          <div className="hours-content">
            <div className="hours-grid" style={{ gridTemplateColumns: '1fr' }}>
              <div className="hours-card">
                <h4>月〜日・祝</h4>
                <p className="hours-time">月〜日 {shop.hours?.weekday ?? '10:00 - 20:00'}</p>
                <p className="hours-note">毎日営業</p>
              </div>
            </div>
            {shop.notes && shop.notes.length > 0 && (
              <div className="hours-notes">
                <h4>📋 ご確認事項</h4>
                <ul>{shop.notes.map((note, i) => <li key={i}>{note}</li>)}</ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="reserve" className="reserve-section section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Reservation &amp; Contact</span>
            <h2>ご予約・お問い合わせ</h2>
            <p>お気軽にお問い合わせください</p>
          </div>
          <div className="contact-info">
            <h4 className="contact-heading">
              <span className="contact-heading-line1">💬 ご予約</span>
              <span className="contact-heading-line2">お問い合わせについて</span>
            </h4>
            <p>ご予約やお問い合わせは<strong>公式LINE</strong>にメッセージをお願いします。</p>
            <a href={lineUrl} target="_blank" rel="noopener noreferrer"
              className="btn-primary line-booking-btn"
              style={{ marginTop: '1rem', display: 'inline-block' }}
              onClick={() => trackLineAddConversion()}>
              <span className="line-booking-text">
                <span className="line-booking-line1">LINEで予約</span>
                <span className="line-booking-line2">お問い合わせ</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="adsense-section section" ref={addToRefs}>
        <div className="container">
          <AdSense adSlot="2647640133" adFormat="auto" className="adsense-social" />
        </div>
      </section>
    </div>
  );
});

Home.displayName = 'Home';
export default Home;
