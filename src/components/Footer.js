import React from 'react';
import appConfig from '../config/appConfig';
import './Footer.css';

const Footer = () => {
  const { shop, social } = appConfig;
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h3>yoon²</h3>
            <p className="footer-subtitle">ear esthetic & acupressure salon</p>
            <p className="footer-description">
              イヤーエステと耳つぼで心身のバランスを整えます。
              プロの技術でお客様に深いリラクゼーションと健康をお届けいたします。
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>サロン情報</h4>
              <ul>
                <li><a href="#about">サービス特徴</a></li>
                <li><a href="#menu">メニュー</a></li>
                <li><a href="#contact">店舗情報</a></li>
                <li><a href="#booking">予約</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>営業時間</h4>
              <p>{shop.hours.open} - {shop.hours.close}</p>
              <p>定休日: {shop.holidays}</p>
              <p className="note">{shop.hours.note}</p>
            </div>
            
            <div className="footer-section">
              <h4>お問い合わせ</h4>
              <p>📍 {shop.address}</p>
              <p>📞 {shop.phone}</p>
              <p className="note">※お電話に出ることができません</p>
              <p>ご予約は公式LINEにメッセージをお願いします</p>
              <div className="social-links">
                {social.instagram.url && (
                  <a href={social.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <span className="social-icon">📷</span>
                  </a>
                )}
                {social.line.url && (
                  <a href={social.line.url} target="_blank" rel="noopener noreferrer" aria-label="LINE">
                    <span className="social-icon">💬</span>
                  </a>
                )}
                {!social.instagram.url && !social.line.url && (
                  <p className="note">SNSアカウント準備中</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 yoon²ゆんゆん. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
