import React, { useState, useEffect } from 'react';
import { getEventsByDate, getMonthlyBookingStats } from '../services/calendarService';
import './AdminBookingDetails.css';

const AdminBookingDetails = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // 選択日の予約を取得
  const fetchBookings = async (date) => {
    try {
      setIsLoading(true);
      const events = await getEventsByDate(date);
      setBookings(events);
    } catch (error) {
      console.error('予約取得エラー:', error);
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 月間統計を取得
  const fetchMonthlyStats = async (date) => {
    try {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const stats = await getMonthlyBookingStats(year, month);
      setMonthlyStats(stats);
    } catch (error) {
      console.error('統計取得エラー:', error);
      setMonthlyStats(null);
    }
  };

  useEffect(() => {
    fetchBookings(selectedDate);
    fetchMonthlyStats(selectedDate);
  }, [selectedDate]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getBookingSourceIcon = (source) => {
    switch (source) {
      case 'ホットペッパービューティー':
        return '🌶️';
      case 'LINE直接予約':
        return '💬';
      case '電話予約':
        return '📞';
      case '来店予約':
        return '🏪';
      default:
        return '❓';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'VIP顧客':
        return 'priority-vip';
      case '新規顧客':
        return 'priority-new';
      case 'リピーター':
        return 'priority-repeat';
      default:
        return 'priority-normal';
    }
  };

  return (
    <div className="admin-booking-details">
      <div className="admin-header">
        <h2>管理者用予約詳細</h2>
        <div className="admin-controls">
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="date-input"
          />
          <button 
            onClick={() => setShowStats(!showStats)}
            className="stats-toggle"
          >
            {showStats ? '予約一覧' : '統計表示'}
          </button>
        </div>
      </div>

      {showStats && monthlyStats ? (
        <div className="admin-stats">
          <h3>月間統計 ({selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月)</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>総予約数</h4>
              <span className="stat-number">{monthlyStats.totalBookings}</span>
            </div>
            <div className="stat-card">
              <h4>HP予約</h4>
              <span className="stat-number">{monthlyStats.hotPepperBookings}</span>
            </div>
            <div className="stat-card">
              <h4>直接予約</h4>
              <span className="stat-number">{monthlyStats.directBookings}</span>
            </div>
            <div className="stat-card">
              <h4>売上見積もり</h4>
              <span className="stat-number">¥{monthlyStats.revenueEstimate.toLocaleString()}</span>
            </div>
          </div>

          <div className="breakdown-stats">
            <div className="breakdown-section">
              <h4>予約ソース別</h4>
              <div className="breakdown-list">
                {Object.entries(monthlyStats.sourceBreakdown).map(([source, count]) => (
                  <div key={source} className="breakdown-item">
                    <span className="source-icon">{getBookingSourceIcon(source)}</span>
                    <span className="source-name">{source}</span>
                    <span className="source-count">{count}件</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="breakdown-section">
              <h4>サービス別</h4>
              <div className="breakdown-list">
                {Object.entries(monthlyStats.serviceBreakdown).map(([service, count]) => (
                  <div key={service} className="breakdown-item">
                    <span className="service-name">{service}</span>
                    <span className="service-count">{count}件</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="admin-bookings">
          <h3>
            {selectedDate.toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            })}の予約
          </h3>

          {isLoading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>読み込み中...</p>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <div key={index} className="booking-card">
                    <div className="booking-header">
                      <div className="booking-time">
                        {formatTime(booking.start)} - {formatTime(booking.end)}
                      </div>
                      <div className="booking-source">
                        <span className="source-icon">
                          {getBookingSourceIcon(booking.bookingDetails.bookingSource)}
                        </span>
                        <span className="source-text">
                          {booking.bookingDetails.bookingSource}
                        </span>
                      </div>
                    </div>

                    <div className="booking-content">
                      <div className="booking-info">
                        <div className="info-item">
                          <label>お客様名:</label>
                          <span>{booking.bookingDetails.customerName || '不明'}</span>
                        </div>
                        <div className="info-item">
                          <label>サービス:</label>
                          <span>{booking.bookingDetails.service || '不明'}</span>
                        </div>
                        <div className="info-item">
                          <label>予約時間:</label>
                          <span>{booking.bookingDetails.estimatedDuration}分</span>
                        </div>
                        <div className="info-item">
                          <label>顧客タイプ:</label>
                          <span>{booking.bookingDetails.customerType}</span>
                        </div>
                      </div>

                      <div className="booking-meta">
                        <div className={`priority-badge ${getPriorityColor(booking.bookingDetails.priority)}`}>
                          {booking.bookingDetails.priority}
                        </div>
                        {booking.bookingDetails.phone && (
                          <div className="contact-info">
                            <span className="phone">📞 {booking.bookingDetails.phone}</span>
                          </div>
                        )}
                        {booking.bookingDetails.email && (
                          <div className="contact-info">
                            <span className="email">📧 {booking.bookingDetails.email}</span>
                          </div>
                        )}
                      </div>

                      {booking.bookingDetails.notes && (
                        <div className="booking-notes">
                          <label>備考:</label>
                          <p>{booking.bookingDetails.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-bookings">
                  <p>この日の予約はありません</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBookingDetails;
