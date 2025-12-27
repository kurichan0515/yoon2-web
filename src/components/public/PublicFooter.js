import React from 'react';
import appConfig from '../../config/appConfig';
import './PublicFooter.css';

const PublicFooter = () => {
  return (
    <footer className="public-footer">
      <div className="public-footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{appConfig.shop.name}</h3>
            <p>{appConfig.shop.description || "イヤーエステと耳つぼで心身のバランスを整える専門サロンです。"}</p>
          </div>
          
          <div className="footer-section">
            <h4>店舗情報</h4>
            <p>📍 {appConfig.shop.address}</p>
            <p>🕒 {appConfig.shop.hours.weekday}</p>
            <p>📅 定休日: {appConfig.shop.holidays}</p>
          </div>
          
          <div className="footer-section">
            <h4>アクセス</h4>
            <div>
              {appConfig.shop.access.stations.filter(station => station).map((station, index) => (
                <p key={index}>{station}</p>
              ))}
              {appConfig.shop.access.landmarks && <p>{appConfig.shop.access.landmarks}</p>}
              {appConfig.shop.access.parking && <p>{appConfig.shop.access.parking}</p>}
            </div>
          </div>
          
          <div className="footer-section">
            <h4>予約・お問い合わせ</h4>
            <a 
              href={appConfig.shop.lineUrl || appConfig.social.line.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-line-link"
            >
              💬 LINEで予約
            </a>
            {appConfig.shop.email && <p>📧 {appConfig.shop.email}</p>}
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 {appConfig.shop.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
