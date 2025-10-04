import React, { useEffect, useRef } from 'react';
import { trackPageView } from '../services/analyticsService';
import appConfig from '../config/appConfig';
import './ShopInfo.css';

const ShopInfo = () => {
  const { shop, social } = appConfig;
  const sectionsRef = useRef([]);

  // デバッグ用ログ
  console.log('ShopInfo - appConfig:', appConfig);
  console.log('ShopInfo - shop:', shop);
  console.log('ShopInfo - shop.name:', shop?.name);


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
        <div className="hero-background">
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
              <div className="image-placeholder">
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
                <div className="info-icon">📞</div>
                <div className="info-content">
                  <h4>電話番号</h4>
                  <p><a href={`tel:${shop?.phone || ''}`}>{shop?.phone || '電話番号を取得中...'}</a></p>
                  <p className="note">※お電話に出ることができません</p>
                  <p className="note">ご予約は公式LINEにメッセージをお願いします</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">🚃</div>
                <div className="info-content">
                  <h4>最寄り駅</h4>
                  {shop?.access?.stations?.map((station, index) => (
                    <p key={index}>{station}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="map-placeholder">
              <div className="map-content">
                <span>地図</span>
                <p>Google Mapで詳細な場所をご確認いただけます</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* サービスメニューセクション */}
      <section className="section services-section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Services</span>
            <h2>サービスメニュー</h2>
            <p>お客様のご要望に合わせた施術をご提供いたします</p>
          </div>
          <div className="services-grid">
            {shop?.services?.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-content">
                  <h4>{service.name}</h4>
                  <div className="service-details">
                    <span className="service-duration">{service.duration}</span>
                    <span className="service-price">¥{service.price.toLocaleString()}</span>
                  </div>
                  <p className="service-description">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* お問い合わせ・QRコードセクション */}
      <section className="section qr-codes-section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Contact</span>
            <h2>お問い合わせ・ご予約</h2>
            <p>お気軽にお問い合わせください</p>
          </div>
          
          <div className="qr-codes-container">
            <div className="qr-code-card">
              <div className="qr-code-header">
                <span className="qr-icon">💬</span>
                <h3>公式LINE</h3>
                <p>24時間受付・お気軽にメッセージください</p>
              </div>
              <div className="qr-code-image">
                <img src="/images/qu-codes/line-qr-code.png" alt="LINE QRコード" />
              </div>
              <div className="qr-code-footer">
                <p className="qr-instruction">QRコードを読み取って友だち追加</p>
                <a 
                  href={social.line.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary qr-button"
                >
                  LINEで予約・お問い合わせ
                </a>
              </div>
            </div>

            <div className="qr-code-card">
              <div className="qr-code-header">
                <span className="qr-icon">📷</span>
                <h3>公式Instagram</h3>
                <p>最新情報やお得なキャンペーン情報をお届けします</p>
              </div>
              <div className="qr-code-image">
                <img src="/images/qu-codes/instagram-qr-code.jpg" alt="Instagram QRコード" />
              </div>
              <div className="qr-code-footer">
                <p className="qr-instruction">@yoo.n.yoo.n</p>
                <a 
                  href={social.instagram.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary qr-button"
                >
                  Instagramを見る
                </a>
              </div>
            </div>
          </div>

          <div className="contact-info">
            <div className="contact-note">
              <h4>📞 お電話でのお問い合わせについて</h4>
              <p>お電話に出ることができません。ご予約やお問い合わせは<strong>公式LINE</strong>にメッセージをお願いします。</p>
            </div>
            
            <div className="qr-note">
              <p>
                <strong>📱 QRコードについて:</strong><br/>
                上記のQRコードはプレースホルダーです。実際のLINEとInstagramのQRコード画像に置き換えることで、
                お客様がスマートフォンで直接アクセスできるようになります。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopInfo;