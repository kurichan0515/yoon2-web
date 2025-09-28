import React from 'react';
import appConfig from '../config/appConfig';
import './ShopInfo.css';

const ShopInfo = () => {
  const { shop, social } = appConfig;

  return (
    <div className="shop-info-page">
      <div className="container">
        <h1>店舗情報</h1>
        
        {/* 店舗概要 */}
        <section className="shop-overview">
          <h2>店舗概要</h2>
          <div className="overview-content">
            <div className="shop-details">
              <h3>{shop.name}</h3>
              <p className="shop-description">
                イヤーエステと耳つぼで心身のバランスを整える専門サロンです。
                プロの技術で深いリラクゼーションと健康をサポートいたします。
              </p>
            </div>
            <div className="shop-image">
              <div className="placeholder-image">
                <span>店舗画像</span>
              </div>
            </div>
          </div>
        </section>

        {/* アクセス情報 */}
        <section className="access-info">
          <h2>アクセス情報</h2>
          <div className="access-content">
            <div className="access-details">
              <div className="info-item">
                <h4>住所</h4>
                <p>{shop.address}</p>
              </div>
              <div className="info-item">
                <h4>電話番号</h4>
                <p><a href={`tel:${shop.phone}`}>{shop.phone}</a></p>
                <p className="note">※お電話に出ることができません。ご予約は公式LINEにメッセージをお願いします。</p>
              </div>
              <div className="info-item">
                <h4>アクセス</h4>
                {shop.access.stations.map((station, index) => (
                  <p key={index}>{station}</p>
                ))}
                <p><strong>目印:</strong> {shop.access.landmarks}</p>
                <p><strong>駐車場:</strong> {shop.access.parking}</p>
              </div>
            </div>
            <div className="map-container">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&q=${encodeURIComponent(shop.address)}&zoom=16&language=ja`}
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
        </section>

        {/* 営業時間 */}
        <section className="business-hours">
          <h2>営業時間</h2>
          <div className="hours-content">
            <div className="hours-table">
              <div className="hours-row">
                <span className="day">営業時間</span>
                <span className="time">{shop.hours.open} - {shop.hours.close}</span>
              </div>
            </div>
            <div className="holiday-info">
              <h4>定休日</h4>
              <p>{shop.holidays}</p>
              <p className="note">{shop.hours.note}</p>
            </div>
          </div>
        </section>

        {/* 設備・サービス */}
        <section className="facilities-info">
          <h2>設備・サービス</h2>
          <div className="facilities-content">
            <div className="facilities-grid">
              <div className="facility-item">
                <h4>基本情報</h4>
                <ul>
                  <li>総席数: {shop.facilities.totalSeats}席</li>
                  <li>スタッフ数: {shop.facilities.staffCount}人</li>
                  <li>駐車場: {shop.facilities.parkingSpaces}台</li>
                </ul>
              </div>
              <div className="facility-item">
                <h4>支払い方法</h4>
                <ul>
                  {shop.payment.map((method, index) => (
                    <li key={index}>{method}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="features-section">
              <h4>こだわり条件・設備</h4>
              <div className="features-grid">
                {shop.facilities.features.map((feature, index) => (
                  <span key={index} className="feature-tag">{feature}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 重要なお知らせ */}
        <section className="important-notices">
          <h2>重要なお知らせ</h2>
          <div className="notices-content">
            <ul>
              {shop.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* SNS連携 */}
        <section className="social-links">
          <h2>フォローしてください</h2>
          <div className="social-content">
            <p>最新情報やお得なキャンペーン情報をお届けします</p>
            <div className="social-buttons">
              {social.instagram.url && (
                <a 
                  href={social.instagram.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-button instagram"
                >
                  Instagram
                </a>
              )}
              {social.line.url && (
                <a 
                  href={social.line.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-button line"
                >
                  LINE
                </a>
              )}
            </div>
            {social.line.note && (
              <p className="line-note">{social.line.note}</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShopInfo;
