import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import { getPublicAvailableTimeSlots, getMonthlyBookingStats } from '../services/calendarService';
import './CalendarPage.css';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  // const [monthlyStats, setMonthlyStats] = useState(null); // 未使用のためコメントアウト
  const [loadingSlots, setLoadingSlots] = useState(false);
  // const [loadingStats, setLoadingStats] = useState(false); // 未使用のためコメントアウト

  // 利用可能時間を取得（プライバシー保護版）
  const fetchAvailableSlots = async (date) => {
    try {
      setLoadingSlots(true);
      const slots = await getPublicAvailableTimeSlots(date);
      setAvailableSlots(slots);
    } catch (error) {
      console.error('利用可能時間取得エラー:', error);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  // 月間統計を取得
  const fetchMonthlyStats = async (date) => {
    try {
      setLoadingStats(true);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const stats = await getMonthlyBookingStats(year, month);
      setMonthlyStats(stats);
    } catch (error) {
      console.error('月間統計取得エラー:', error);
      setMonthlyStats(null);
    } finally {
      setLoadingStats(false);
    }
  };

  // 初期化
  useEffect(() => {
    // ページの一番上にスクロール
    window.scrollTo(0, 0);
    
    fetchAvailableSlots(selectedDate);
    fetchMonthlyStats(selectedDate);
  }, [selectedDate]);

  // 日付選択
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // 今日の日付を選択
  const selectToday = () => {
    const today = new Date();
    setSelectedDate(today);
  };

  // 明日の日付を選択
  const selectTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow);
  };

  return (
    <div className="calendar-page">
      {/* ページヘッダー */}
      <div className="calendar-page-header">
        <div className="header-content">
          <span className="section-label">Calendar</span>
          <h1>予約状況カレンダー</h1>
          <p className="header-description">
            お気軽にLINEでご予約・お問い合わせください。
          </p>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="calendar-page-content">
        {/* カレンダー表示 */}
        <div className="calendar-section">
          <Calendar onDateSelect={handleDateSelect} />
        </div>

        {/* サイドパネル */}
        <div className="calendar-sidebar">
          {/* 日付選択パネル */}
          <div className="sidebar-panel">
            <h3>日付選択</h3>
            <div className="date-selector">
              <p className="selected-date">
                選択日: {selectedDate.toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long'
                })}
              </p>
              <div className="quick-date-buttons">
                <button onClick={selectToday} className="date-button today">
                  今日
                </button>
                <button onClick={selectTomorrow} className="date-button tomorrow">
                  明日
                </button>
              </div>
            </div>
          </div>

          {/* 利用可能時間パネル */}
          <div className="sidebar-panel">
            <h3>利用可能時間</h3>
            {loadingSlots ? (
              <div className="loading-slots">
                <div className="loading-spinner-small"></div>
                <p>読み込み中...</p>
              </div>
            ) : (
              <div className="time-slots">
                {availableSlots.length > 0 ? (
                  availableSlots.map((slot, index) => (
                    <div 
                      key={index} 
                      className={`time-slot ${slot.available ? 'available' : 'booked'}`}
                    >
                      <span className="time">{slot.time}</span>
                      <span className="status">
                        {slot.available ? '空き' : '予約済み'}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="no-slots">時間枠情報がありません</p>
                )}
              </div>
            )}
          </div>


          {/* 予約方法案内 */}
          <div className="sidebar-panel booking-info">
            <h3>ご予約について</h3>
            <div className="booking-methods">
              <div className="booking-method primary">
                <h4>公式LINEで予約</h4>
                <p>24時間受付・お気軽にメッセージください</p>
                <a 
                  href="https://lin.ee/lyyKSqu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="booking-link line primary"
                >
                  💬 LINEで予約・お問い合わせ
                </a>
                <p className="method-note">おすすめの予約方法です</p>
              </div>
              <div className="booking-method">
                <h4>お電話でのお問い合わせ</h4>
                <p>※お電話に出ることができません</p>
                <a href="tel:080-8478-1163" className="booking-link phone disabled">
                  📞 080-8478-1163
                </a>
                <p className="phone-note">緊急時のみご利用ください</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
