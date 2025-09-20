import React from 'react';
import appConfig from '../config/appConfig';
import './Footer.css';

const Footer = () => {
  const { shop, social } = appConfig;
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>{shop.name}</h3>
          <p>プロの技術で快適な耳かきをお届けします</p>
          <p className="address">{shop.address}</p>
        </div>
        
        <div className="footer-section">
          <h4>営業時間</h4>
          <p>{shop.hours.open} - {shop.hours.close}</p>
          <p>定休日: {shop.holidays}</p>
          <p className="note">{shop.hours.note}</p>
        </div>
        
        <div className="footer-section">
          <h4>お問い合わせ</h4>
          <p>電話: {shop.phone}</p>
          <p className="note">※お電話に出ることができません</p>
          <p>ご予約は公式LINEにメッセージをお願いします</p>
        </div>
        
        <div className="footer-section">
          <h4>SNS</h4>
          <div className="social-links">
            {social.instagram.url && (
              <a href={social.instagram.url} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            )}
            {social.line.url && (
              <a href={social.line.url} target="_blank" rel="noopener noreferrer">
                LINE
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 耳かき屋さん. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
