import React, { useState, useEffect } from 'react';
import { getAllBookings, updateBooking, cancelBooking } from '../services/bookingService';
import appConfig from '../config/appConfig';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      const allBookings = await getAllBookings();
      setBookings(allBookings);
    } catch (error) {
      console.error('予約データの読み込みエラー:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBooking(bookingId, { status: newStatus });
      await loadBookings();
      alert('予約ステータスを更新しました');
    } catch (error) {
      console.error('ステータス更新エラー:', error);
      alert('ステータス更新に失敗しました');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('この予約をキャンセルしますか？')) {
      try {
        await cancelBooking(bookingId);
        await loadBookings();
        alert('予約をキャンセルしました');
      } catch (error) {
        console.error('キャンセルエラー:', error);
        alert('キャンセルに失敗しました');
      }
    }
  };

  const openBookingDetail = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

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

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { text: '確認待ち', class: 'status-pending' },
      confirmed: { text: '確認済み', class: 'status-confirmed' },
      cancelled: { text: 'キャンセル', class: 'status-cancelled' },
      completed: { text: '完了', class: 'status-completed' }
    };
    return statusMap[status] || { text: '不明', class: 'status-unknown' };
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesDate = !selectedDate || booking.date === selectedDate;
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesDate && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    completed: bookings.filter(b => b.status === 'completed').length
  };

  if (isLoading) {
    return (
      <div className="admin-dashboard">
        <div className="container">
          <div className="loading">
            <h2>データを読み込み中...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>管理者ダッシュボード</h1>
          <p>予約管理システム</p>
        </div>

        {/* 統計情報 */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>総予約数</h3>
            <span className="stat-number">{stats.total}</span>
          </div>
          <div className="stat-card pending">
            <h3>確認待ち</h3>
            <span className="stat-number">{stats.pending}</span>
          </div>
          <div className="stat-card confirmed">
            <h3>確認済み</h3>
            <span className="stat-number">{stats.confirmed}</span>
          </div>
          <div className="stat-card cancelled">
            <h3>キャンセル</h3>
            <span className="stat-number">{stats.cancelled}</span>
          </div>
        </div>

        {/* フィルター */}
        <div className="filters">
          <div className="filter-group">
            <label>日付で絞り込み:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>ステータスで絞り込み:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">すべて</option>
              <option value="pending">確認待ち</option>
              <option value="confirmed">確認済み</option>
              <option value="cancelled">キャンセル</option>
              <option value="completed">完了</option>
            </select>
          </div>
          <button onClick={loadBookings} className="refresh-btn">
            更新
          </button>
        </div>

        {/* 予約一覧 */}
        <div className="bookings-section">
          <h2>予約一覧 ({filteredBookings.length}件)</h2>
          <div className="bookings-table">
            <table>
              <thead>
                <tr>
                  <th>予約ID</th>
                  <th>お名前</th>
                  <th>連絡先</th>
                  <th>日時</th>
                  <th>サービス</th>
                  <th>ステータス</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(booking => {
                  const serviceInfo = getServiceInfo(booking.service);
                  const statusInfo = getStatusBadge(booking.status);
                  
                  return (
                    <tr key={booking.id}>
                      <td>
                        <button 
                          className="booking-id-link"
                          onClick={() => openBookingDetail(booking)}
                        >
                          {booking.id.substring(0, 8)}...
                        </button>
                      </td>
                      <td>{booking.name}</td>
                      <td>
                        <div className="contact-info">
                          <div>{booking.email}</div>
                          <div>{booking.phone}</div>
                        </div>
                      </td>
                      <td>
                        <div className="datetime-info">
                          <div>{formatDate(booking.date)}</div>
                          <div>{booking.time}</div>
                        </div>
                      </td>
                      <td>
                        <div className="service-info">
                          <div>{serviceInfo.name}</div>
                          <div className="price">¥{serviceInfo.price.toLocaleString()}</div>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${statusInfo.class}`}>
                          {statusInfo.text}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <select
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                            className="status-select"
                          >
                            <option value="pending">確認待ち</option>
                            <option value="confirmed">確認済み</option>
                            <option value="completed">完了</option>
                            <option value="cancelled">キャンセル</option>
                          </select>
                          <button
                            onClick={() => openBookingDetail(booking)}
                            className="detail-btn"
                          >
                            詳細
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 予約詳細モーダル */}
        {showModal && selectedBooking && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>予約詳細</h2>
                <button className="close-btn" onClick={closeModal}>×</button>
              </div>
              <div className="modal-body">
                <div className="booking-detail">
                  <div className="detail-section">
                    <h3>基本情報</h3>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <label>予約ID</label>
                        <span>{selectedBooking.id}</span>
                      </div>
                      <div className="detail-item">
                        <label>お名前</label>
                        <span>{selectedBooking.name}</span>
                      </div>
                      <div className="detail-item">
                        <label>メールアドレス</label>
                        <span>{selectedBooking.email}</span>
                      </div>
                      <div className="detail-item">
                        <label>電話番号</label>
                        <span>{selectedBooking.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="detail-section">
                    <h3>予約情報</h3>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <label>予約日時</label>
                        <span>{formatDate(selectedBooking.date)} {selectedBooking.time}</span>
                      </div>
                      <div className="detail-item">
                        <label>サービス</label>
                        <span>{getServiceInfo(selectedBooking.service).name}</span>
                      </div>
                      <div className="detail-item">
                        <label>料金</label>
                        <span>¥{getServiceInfo(selectedBooking.service).price.toLocaleString()}</span>
                      </div>
                      <div className="detail-item">
                        <label>ステータス</label>
                        <span className={`status-badge ${getStatusBadge(selectedBooking.status).class}`}>
                          {getStatusBadge(selectedBooking.status).text}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedBooking.message && (
                    <div className="detail-section">
                      <h3>ご要望・メッセージ</h3>
                      <p>{selectedBooking.message}</p>
                    </div>
                  )}

                  <div className="detail-section">
                    <h3>システム情報</h3>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <label>予約日時</label>
                        <span>{new Date(selectedBooking.createdAt?.toDate?.() || selectedBooking.createdAt).toLocaleString('ja-JP')}</span>
                      </div>
                      {selectedBooking.updatedAt && (
                        <div className="detail-item">
                          <label>最終更新</label>
                          <span>{new Date(selectedBooking.updatedAt?.toDate?.() || selectedBooking.updatedAt).toLocaleString('ja-JP')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={closeModal} className="close-modal-btn">
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
