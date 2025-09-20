import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import appConfig from '../config/appConfig';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const location = useLocation();
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // URLパラメータまたはstateから予約データを取得
    const params = new URLSearchParams(location.search);
    const bookingId = params.get('id') || location.state?.bookingId;
    
    if (bookingId) {
      // 実際の実装では、Firebaseから予約データを取得
      // ここではモックデータを使用
      const mockBookingData = {
        id: bookingId,
        name: params.get('name') || '田中太郎',
        email: params.get('email') || 'tanaka@example.com',
        phone: params.get('phone') || '03-1234-5678',
        date: params.get('date') || '2024-12-20',
        time: params.get('time') || '14:00',
        service: params.get('service') || 'premium',
        message: params.get('message') || '',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      
      setBookingData(mockBookingData);
    }
    
    setIsLoading(false);
  }, [location]);

  const getServiceInfo = (serviceId) => {
    return appConfig.shop.services.find(service => service.id === serviceId) || 
           { name: 'サービス', duration: '30分', price: 2000 };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const handleCancelBooking = () => {
    if (window.confirm('予約をキャンセルしますか？この操作は取り消せません。')) {
      // 実際の実装では、Firebaseで予約ステータスを更新
      alert('予約をキャンセルしました。');
      // ホームページにリダイレクト
      window.location.href = '/';
    }
  };

  const handleModifyBooking = () => {
    // 予約変更ページにリダイレクト
    window.location.href = `/booking?modify=${bookingData.id}`;
  };

  if (isLoading) {
    return (
      <div className="booking-confirmation">
        <div className="container">
          <div className="loading">
            <h2>予約情報を読み込み中...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="booking-confirmation">
        <div className="container">
          <div className="error">
            <h2>予約情報が見つかりません</h2>
            <p>予約IDが正しくないか、予約が存在しません。</p>
            <a href="/booking" className="back-button">新規予約に戻る</a>
          </div>
        </div>
      </div>
    );
  }

  const serviceInfo = getServiceInfo(bookingData.service);

  return (
    <div className="booking-confirmation">
      <div className="container">
        <div className="confirmation-header">
          <h1>✅ 予約完了</h1>
          <p>ご予約ありがとうございます。以下の内容で承りました。</p>
        </div>

        <div className="booking-details">
          <div className="details-card">
            <h2>予約詳細</h2>
            <div className="details-grid">
              <div className="detail-item">
                <label>予約ID</label>
                <span className="booking-id">{bookingData.id}</span>
              </div>
              <div className="detail-item">
                <label>お名前</label>
                <span>{bookingData.name}</span>
              </div>
              <div className="detail-item">
                <label>メールアドレス</label>
                <span>{bookingData.email}</span>
              </div>
              <div className="detail-item">
                <label>電話番号</label>
                <span>{bookingData.phone}</span>
              </div>
              <div className="detail-item">
                <label>予約日時</label>
                <span>{formatDate(bookingData.date)} {bookingData.time}</span>
              </div>
              <div className="detail-item">
                <label>サービス</label>
                <span>{serviceInfo.name} ({serviceInfo.duration})</span>
              </div>
              <div className="detail-item">
                <label>料金</label>
                <span className="price">¥{serviceInfo.price.toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <label>ステータス</label>
                <span className={`status ${bookingData.status}`}>
                  {bookingData.status === 'confirmed' ? '確認済み' : 
                   bookingData.status === 'pending' ? '確認待ち' : 
                   bookingData.status === 'cancelled' ? 'キャンセル済み' : '不明'}
                </span>
              </div>
            </div>
            
            {bookingData.message && (
              <div className="message-section">
                <label>ご要望・メッセージ</label>
                <p>{bookingData.message}</p>
              </div>
            )}
          </div>

          <div className="action-buttons">
            <button onClick={handleModifyBooking} className="modify-button">
              予約を変更する
            </button>
            <button onClick={handleCancelBooking} className="cancel-button">
              予約をキャンセルする
            </button>
          </div>

          <div className="important-notes">
            <h3>📋 ご確認事項</h3>
            <ul>
              <li>予約日の前日までにキャンセル・変更が可能です</li>
              <li>当日キャンセルの場合は、キャンセル料が発生する場合があります</li>
              <li>予約確認のため、後日お電話をさせていただく場合があります</li>
              <li>ご不明な点がございましたら、お気軽にお電話ください</li>
            </ul>
            <div className="contact-info">
              <p><strong>お問い合わせ先</strong></p>
              <p>電話: {appConfig.shop.phone}</p>
              <p>営業時間: 平日 {appConfig.shop.hours.weekday} / 土日祝 {appConfig.shop.hours.weekend}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
