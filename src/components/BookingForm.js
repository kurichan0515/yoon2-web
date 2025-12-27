import React from 'react';
import appConfig from '../config/appConfig';
import './BookingForm.css';

const BookingForm = () => {

  // LINEで予約ボタンのクリックハンドラー
  const handleLineBooking = () => {
    const lineUrl = appConfig.social.line.url;
    // セキュリティのため、新しいウィンドウで開く際はnoopenerを使用
    const newWindow = window.open(lineUrl, '_blank', 'noopener,noreferrer');
    if (!newWindow) {
      // ポップアップブロッカーが有効な場合のフォールバック
      window.location.href = lineUrl;
    }
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
        {/* 公式LINE予約（メイン） */}
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
              <div className="benefit-item">
                <span className="benefit-icon">⏰</span>
                <span>24時間受付</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">💡</span>
                <span>気軽に相談</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">📱</span>
                <span>簡単操作</span>
              </div>
            </div>
            <button 
              onClick={handleLineBooking}
              className="booking-button line-booking"
              aria-label="LINEで予約・お問い合わせ（新しいウィンドウで開きます）"
            >
              <span className="button-icon" aria-hidden="true">💬</span>
              LINEで予約・お問い合わせ
            </button>
            <p className="method-note">
              {appConfig.social.line.note}
            </p>
          </div>
        </div>

      </div>

      {/* サービス情報 */}
      <div className="services-preview">
        <h3>主なサービス</h3>
        <div className="services-grid">
          {appConfig.shop.services.slice(0, 4).map(service => (
            <div key={service.id} className="service-card">
              <h4>{service.name}</h4>
              <p className="service-duration">{service.duration}</p>
              <p className="service-price">¥{service.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <p className="services-note">
          詳しいメニューや料金については、LINEでお気軽にお問い合わせください。
        </p>
      </div>

      {/* 注意事項 */}
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
