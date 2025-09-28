import React, { useState, useEffect, useCallback } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import calendarService from '../services/calendarService';
import './Calendar.css';

// 日本語ロケール設定
moment.locale('ja');
const localizer = momentLocalizer(moment);

// カスタムメッセージ（日本語）
const messages = {
  allDay: '終日',
  previous: '前',
  next: '次',
  today: '今日',
  month: '月',
  week: '週',
  day: '日',
  agenda: 'アジェンダ',
  date: '日付',
  time: '時間',
  event: 'イベント',
  noEventsInRange: 'この期間にイベントはありません',
  showMore: total => `他${total}件`
};

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

  // イベント取得
  const fetchEvents = useCallback(async (startDate, endDate) => {
    try {
      setLoading(true);
      setError(null);
      
      const calendarEvents = await calendarService.getEvents(
        startDate?.toISOString(),
        endDate?.toISOString()
      );
      
      setEvents(calendarEvents);
    } catch (err) {
      console.error('イベント取得エラー:', err);
      setError('予約情報の取得に失敗しました。しばらく後でもう一度お試しください。');
    } finally {
      setLoading(false);
    }
  }, []);

  // 初期化
  useEffect(() => {
    const initializeCalendar = async () => {
      try {
        await calendarService.initialize();
        
        // 現在月のイベントを取得
        const startOfMonth = moment(date).startOf('month').toDate();
        const endOfMonth = moment(date).endOf('month').add(1, 'week').toDate();
        
        await fetchEvents(startOfMonth, endOfMonth);
      } catch (err) {
        console.error('カレンダー初期化エラー:', err);
        setError('カレンダーの初期化に失敗しました。Google Calendar APIの設定を確認してください。');
        setLoading(false);
      }
    };

    initializeCalendar();
  }, [date, fetchEvents]);

  // 日付変更時のイベント取得
  const handleNavigate = useCallback(async (newDate) => {
    setDate(newDate);
    
    let startDate, endDate;
    
    if (view === 'month') {
      startDate = moment(newDate).startOf('month').toDate();
      endDate = moment(newDate).endOf('month').add(1, 'week').toDate();
    } else if (view === 'week') {
      startDate = moment(newDate).startOf('week').toDate();
      endDate = moment(newDate).endOf('week').toDate();
    } else {
      startDate = moment(newDate).startOf('day').toDate();
      endDate = moment(newDate).endOf('day').toDate();
    }
    
    await fetchEvents(startDate, endDate);
  }, [view, fetchEvents]);

  // ビュー変更
  const handleViewChange = useCallback(async (newView) => {
    setView(newView);
    
    let startDate, endDate;
    const currentDate = date;
    
    if (newView === 'month') {
      startDate = moment(currentDate).startOf('month').toDate();
      endDate = moment(currentDate).endOf('month').add(1, 'week').toDate();
    } else if (newView === 'week') {
      startDate = moment(currentDate).startOf('week').toDate();
      endDate = moment(currentDate).endOf('week').toDate();
    } else {
      startDate = moment(currentDate).startOf('day').toDate();
      endDate = moment(currentDate).endOf('day').toDate();
    }
    
    await fetchEvents(startDate, endDate);
  }, [date, fetchEvents]);

  // イベントクリック
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // イベントスタイル
  const eventStyleGetter = (event) => {
    let backgroundColor = '#3174ad';
    let borderColor = '#3174ad';
    
    if (event.isHotPepperBooking) {
      backgroundColor = '#ff6b6b'; // ホットペッパービューティーからの予約は赤系
      borderColor = '#ff5252';
    } else {
      backgroundColor = '#4caf50'; // 直接予約は緑系
      borderColor = '#45a049';
    }
    
    return {
      style: {
        backgroundColor,
        borderColor,
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '12px',
        padding: '2px 4px'
      }
    };
  };

  // モーダルを閉じる
  const closeModal = () => {
    setSelectedEvent(null);
  };

  if (loading) {
    return (
      <div className="calendar-container">
        <div className="calendar-loading">
          <div className="loading-spinner"></div>
          <p>予約情報を読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="calendar-container">
        <div className="calendar-error">
          <h3>エラーが発生しました</h3>
          <p>{error}</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            再読み込み
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>予約状況カレンダー</h2>
        <div className="calendar-legend">
          <div className="legend-item">
            <div className="legend-color hotpepper"></div>
            <span>ホットペッパービューティー予約</span>
          </div>
          <div className="legend-item">
            <div className="legend-color direct"></div>
            <span>直接予約</span>
          </div>
        </div>
      </div>
      
      <div className="calendar-wrapper">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          messages={messages}
          view={view}
          date={date}
          onNavigate={handleNavigate}
          onView={handleViewChange}
          onSelectEvent={handleEventClick}
          eventPropGetter={eventStyleGetter}
          style={{ height: 600 }}
          formats={{
            monthHeaderFormat: 'YYYY年M月',
            dayHeaderFormat: 'M月D日(ddd)',
            dayRangeHeaderFormat: ({ start, end }) => 
              `${moment(start).format('M月D日')} - ${moment(end).format('M月D日')}`,
            timeGutterFormat: 'HH:mm',
            eventTimeRangeFormat: ({ start, end }) => 
              `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`
          }}
        />
      </div>

      {/* イベント詳細モーダル */}
      {selectedEvent && (
        <div className="event-modal-overlay" onClick={closeModal}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <div className="event-modal-header">
              <h3>予約詳細</h3>
              <button className="close-button" onClick={closeModal}>×</button>
            </div>
            <div className="event-modal-content">
              <div className="event-info">
                <div className="event-title">
                  <h4>{selectedEvent.title}</h4>
                  <span className={`event-badge ${selectedEvent.isHotPepperBooking ? 'hotpepper' : 'direct'}`}>
                    {selectedEvent.isHotPepperBooking ? 'ホットペッパー' : '直接予約'}
                  </span>
                </div>
                
                <div className="event-time">
                  <strong>日時：</strong>
                  {selectedEvent.isAllDay ? (
                    <span>{moment(selectedEvent.start).format('YYYY年M月D日')} (終日)</span>
                  ) : (
                    <span>
                      {moment(selectedEvent.start).format('YYYY年M月D日 HH:mm')} - 
                      {moment(selectedEvent.end).format('HH:mm')}
                    </span>
                  )}
                </div>

                {selectedEvent.bookingDetails.customerName && (
                  <div className="event-customer">
                    <strong>お客様名：</strong>
                    <span>{selectedEvent.bookingDetails.customerName}</span>
                  </div>
                )}

                {selectedEvent.bookingDetails.service && (
                  <div className="event-service">
                    <strong>サービス：</strong>
                    <span>{selectedEvent.bookingDetails.service}</span>
                  </div>
                )}

                {selectedEvent.bookingDetails.phone && (
                  <div className="event-phone">
                    <strong>電話番号：</strong>
                    <span>{selectedEvent.bookingDetails.phone}</span>
                  </div>
                )}

                {selectedEvent.location && (
                  <div className="event-location">
                    <strong>場所：</strong>
                    <span>{selectedEvent.location}</span>
                  </div>
                )}

                {selectedEvent.description && (
                  <div className="event-description">
                    <strong>詳細：</strong>
                    <p>{selectedEvent.description}</p>
                  </div>
                )}

                {selectedEvent.bookingDetails.notes && (
                  <div className="event-notes">
                    <strong>備考：</strong>
                    <p>{selectedEvent.bookingDetails.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
