'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { getEventsByDate, getMonthlyBookingStats } from '../services/calendarService';
import logger from '../utils/logger';
import './AdminBookingDetails.css';

interface BookingDetails {
  bookingSource: string;
  customerName: string | null;
  service: string | null;
  estimatedDuration?: number;
  customerType: string;
  priority: string;
  phone: string | null;
  email: string | null;
  notes: string | null;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  isAllDay: boolean;
  isHotPepperBooking: boolean;
  bookingDetails: BookingDetails;
}

interface MonthlyStats {
  totalBookings: number;
  hotPepperBookings: number;
  directBookings: number;
  revenueEstimate: number;
  sourceBreakdown: Record<string, number>;
  serviceBreakdown: Record<string, number>;
}

const SOURCE_ICONS: Record<string, string> = {
  'ホットペッパービューティー': '🌶️',
  'LINE直接予約': '💬',
  '電話予約': '📞',
  '来店予約': '🏪',
};

const PRIORITY_CLASS: Record<string, string> = {
  'VIP顧客': 'priority-vip',
  '新規顧客': 'priority-new',
  'リピーター': 'priority-repeat',
};

const AdminBookingDetails = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookings, setBookings] = useState<CalendarEvent[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const fetchBookings = async (date: Date) => {
    try {
      setIsLoading(true);
      setBookings(await getEventsByDate(date) as CalendarEvent[]);
    } catch (e) { logger.error('予約取得エラー:', e); setBookings([]); }
    finally { setIsLoading(false); }
  };

  const fetchMonthlyStats = async (date: Date) => {
    try {
      setMonthlyStats(await getMonthlyBookingStats(date.getFullYear(), date.getMonth() + 1) as MonthlyStats);
    } catch (e) { console.error('統計取得エラー:', e); setMonthlyStats(null); }
  };

  useEffect(() => {
    fetchBookings(selectedDate);
    fetchMonthlyStats(selectedDate);
  }, [selectedDate]);

  const fmtTime = (d: Date) => new Date(d).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="admin-booking-details">
      <div className="admin-header">
        <h2>管理者用予約詳細</h2>
        <div className="admin-controls">
          <input type="date" value={selectedDate.toISOString().split('T')[0]!}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedDate(new Date(e.target.value))}
            className="date-input" />
          <button onClick={() => setShowStats(!showStats)} className="stats-toggle">
            {showStats ? '予約一覧' : '統計表示'}
          </button>
        </div>
      </div>

      {showStats && monthlyStats ? (
        <div className="admin-stats">
          <h3>月間統計 ({selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月)</h3>
          <div className="stats-grid">
            {[
              ['総予約数', String(monthlyStats.totalBookings)],
              ['HP予約', String(monthlyStats.hotPepperBookings)],
              ['直接予約', String(monthlyStats.directBookings)],
              ['売上見積もり', `¥${monthlyStats.revenueEstimate.toLocaleString()}`],
            ].map(([label, value]) => (
              <div key={label} className="stat-card"><h4>{label}</h4><span className="stat-number">{value}</span></div>
            ))}
          </div>
          <div className="breakdown-stats">
            <div className="breakdown-section">
              <h4>予約ソース別</h4>
              <div className="breakdown-list">
                {Object.entries(monthlyStats.sourceBreakdown).map(([source, count]) => (
                  <div key={source} className="breakdown-item">
                    <span className="source-icon">{SOURCE_ICONS[source] ?? '❓'}</span>
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
          <h3>{selectedDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}の予約</h3>
          {isLoading ? (
            <div className="loading"><div className="loading-spinner"></div><p>読み込み中...</p></div>
          ) : (
            <div className="bookings-list">
              {bookings.length > 0 ? bookings.map((booking, i) => (
                <div key={i} className="booking-card">
                  <div className="booking-header">
                    <div className="booking-time">{fmtTime(booking.start)} - {fmtTime(booking.end)}</div>
                    <div className="booking-source">
                      <span className="source-icon">{SOURCE_ICONS[booking.bookingDetails.bookingSource] ?? '❓'}</span>
                      <span className="source-text">{booking.bookingDetails.bookingSource}</span>
                    </div>
                  </div>
                  <div className="booking-content">
                    <div className="booking-info">
                      {[
                        ['お客様名', booking.bookingDetails.customerName ?? '不明'],
                        ['サービス', booking.bookingDetails.service ?? '不明'],
                        ['予約時間', `${booking.bookingDetails.estimatedDuration ?? '-'}分`],
                        ['顧客タイプ', booking.bookingDetails.customerType],
                      ].map(([label, value]) => (
                        <div key={label} className="info-item"><label>{label}:</label><span>{value}</span></div>
                      ))}
                    </div>
                    <div className="booking-meta">
                      <div className={`priority-badge ${PRIORITY_CLASS[booking.bookingDetails.priority] ?? 'priority-normal'}`}>
                        {booking.bookingDetails.priority}
                      </div>
                      {booking.bookingDetails.phone && <div className="contact-info"><span className="phone">📞 {booking.bookingDetails.phone}</span></div>}
                      {booking.bookingDetails.email && <div className="contact-info"><span className="email">📧 {booking.bookingDetails.email}</span></div>}
                    </div>
                    {booking.bookingDetails.notes && (
                      <div className="booking-notes"><label>備考:</label><p>{booking.bookingDetails.notes}</p></div>
                    )}
                  </div>
                </div>
              )) : (
                <div className="no-bookings"><p>この日の予約はありません</p></div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBookingDetails;
