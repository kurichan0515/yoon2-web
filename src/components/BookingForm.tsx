'use client';

import React from 'react';
import appConfig from '../config/appConfig';
import { trackLineAddConversion } from '../services/googleAdsService';
import './BookingForm.css';

const BookingForm = () => {
  const handleLineBooking = () => {
    const lineUrl = appConfig.social.line.url as string;
    trackLineAddConversion();
    const w = window.open(lineUrl, '_blank', 'noopener,noreferrer');
    if (!w) window.location.href = lineUrl;
  };

  return (
    <div className="booking-form-container">
      <div className="booking-redirect-header">
        <h2>ご予約について</h2>
        <p className="booking-description">
          ご予約は公式LINEから承っております。<br />
          下記のボタンからLINEでお気軽にお問い合わせください。
        </p>
      </div>
      <div className="booking-methods">
        <div className="booking-method primary">
          <div className="method-header">
            <span className="method-icon">💬</span>
            <h3>公式LINEで予約</h3>
            <span className="recommended-badge">おすすめ</span>
          </div>
          <div className="method-content">
            <p className="method-description">
              LINEで簡単に予約やお問い合わせができます。<br />
              営業時間外でもメッセージをお送りいただけます。
            </p>
            <div className="method-benefits">
              {[['⏰','24時間受付'],['💡','気軽に相談'],['📱','簡単操作']].map(([icon, text]) => (
                <div key={text} className="benefit-item">
                  <span className="benefit-icon">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <button onClick={handleLineBooking} className="booking-button line-booking"
              aria-label="LINEで予約・お問い合わせ（新しいウィンドウで開きます）">
              <span className="button-icon" aria-hidden="true">💬</span>
              LINEで予約・お問い合わせ
            </button>
            <p className="method-note">{appConfig.social.line.note as string}</p>
          </div>
        </div>
      </div>
      <div className="services-preview">
        <h3>主なサービス</h3>
        <div className="services-grid">
          {(appConfig.shop.services as { id: string; name: string; duration: string; price: number }[])
            .slice(0, 4).map(s => (
            <div key={s.id} className="service-card">
              <h4>{s.name}</h4>
              <p className="service-duration">{s.duration}</p>
              <p className="service-price">¥{s.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <p className="services-note">詳しいメニューや料金については、LINEでお気軽にお問い合わせください。</p>
      </div>
      <div className="booking-notes">
        <h3>ご予約について</h3>
        <ul>
          <li>ご予約の確認は、LINEまたはお電話でご連絡いたします</li>
          <li>予約の変更・キャンセルはお早めにご連絡ください</li>
          <li>当日のキャンセルはキャンセル料が発生する場合があります</li>
          <li>ご不明な点がございましたら、お気軽にLINEでお問い合わせください</li>
        </ul>
      </div>
    </div>
  );
};

export default BookingForm;
