'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import calendarService from '../services/calendarService';
import logger from '../utils/logger';
import './Calendar.css';

moment.locale('ja');
const localizer = momentLocalizer(moment);

const messages = {
  allDay: '終日', previous: '前', next: '次', today: '今日',
  month: '月', week: '週', day: '日', agenda: 'アジェンダ',
  date: '日付', time: '時間', event: 'イベント',
  noEventsInRange: 'この期間にイベントはありません',
  showMore: (total: number) => `他${total}件`,
};

interface BookingDetails {
  customerName: string | null;
  service: string | null;
  phone: string | null;
  notes: string | null;
  bookingSource: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  isAllDay: boolean;
  isHotPepperBooking: boolean;
  location?: string;
  description?: string;
  bookingDetails: BookingDetails;
}

const Calendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<string>('month');
  const [date, setDate] = useState(new Date());

  const fetchEvents = useCallback(async (startDate?: Date, endDate?: Date) => {
    try {
      setLoading(true);
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const evts = await (calendarService as any).getEvents(startDate?.toISOString(), endDate?.toISOString());
      setEvents(evts as CalendarEvent[]);
    } catch (err) {
      logger.error('イベント取得エラー:', err);
      setError('予約情報の取得に失敗しました。しばらく後でもう一度お試しください。');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await calendarService.initialize();
        await fetchEvents(
          moment(date).startOf('month').toDate(),
          moment(date).endOf('month').add(1, 'week').toDate()
        );
      } catch {
        setError('カレンダーの初期化に失敗しました。Google Calendar APIの設定を確認してください。');
        setLoading(false);
      }
    })();
  }, [date, fetchEvents]);

  const handleNavigate = useCallback(async (newDate: Date) => {
    setDate(newDate);
    const start = view === 'month' ? moment(newDate).startOf('month').toDate()
      : view === 'week' ? moment(newDate).startOf('week').toDate()
      : moment(newDate).startOf('day').toDate();
    const end = view === 'month' ? moment(newDate).endOf('month').add(1, 'week').toDate()
      : view === 'week' ? moment(newDate).endOf('week').toDate()
      : moment(newDate).endOf('day').toDate();
    await fetchEvents(start, end);
  }, [view, fetchEvents]);

  const handleViewChange = useCallback(async (newView: string) => {
    setView(newView);
    const start = newView === 'month' ? moment(date).startOf('month').toDate()
      : newView === 'week' ? moment(date).startOf('week').toDate()
      : moment(date).startOf('day').toDate();
    const end = newView === 'month' ? moment(date).endOf('month').add(1, 'week').toDate()
      : newView === 'week' ? moment(date).endOf('week').toDate()
      : moment(date).endOf('day').toDate();
    await fetchEvents(start, end);
  }, [date, fetchEvents]);

  const eventStyleGetter = (event: CalendarEvent) => ({
    style: {
      backgroundColor: event.isHotPepperBooking ? '#ff6b6b' : '#4caf50',
      borderColor: event.isHotPepperBooking ? '#ff5252' : '#45a049',
      color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', padding: '2px 4px',
    },
  });

  if (loading) return (
    <div className="calendar-container">
      <div className="calendar-loading"><div className="loading-spinner"></div><p>予約情報を読み込み中...</p></div>
    </div>
  );

  if (error) return (
    <div className="calendar-container">
      <div className="calendar-error">
        <h3>エラーが発生しました</h3><p>{error}</p>
        <button className="retry-button" onClick={() => window.location.reload()}>再読み込み</button>
      </div>
    </div>
  );

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>予約状況カレンダー</h2>
        <div className="calendar-legend">
          <div className="legend-item"><div className="legend-color hotpepper"></div><span>ホットペッパービューティー予約</span></div>
          <div className="legend-item"><div className="legend-color direct"></div><span>直接予約</span></div>
        </div>
      </div>
      <div className="calendar-wrapper">
        <BigCalendar
          localizer={localizer}
          events={events as object[]}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          messages={messages}
          view={view as 'month' | 'week' | 'day' | 'agenda'}
          date={date}
          onNavigate={handleNavigate}
          onView={handleViewChange}
          onSelectEvent={(e: unknown) => setSelectedEvent(e as CalendarEvent)}
          eventPropGetter={eventStyleGetter as (event: object) => { style: React.CSSProperties }}
          style={{ height: 600 }}
          formats={{
            monthHeaderFormat: 'YYYY年M月',
            dayHeaderFormat: 'M月D日(ddd)',
            dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
              `${moment(start).format('M月D日')} - ${moment(end).format('M月D日')}`,
            timeGutterFormat: 'HH:mm',
            eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
              `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,
          }}
        />
      </div>
      {selectedEvent && (
        <div className="event-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="event-modal" onClick={e => e.stopPropagation()}>
            <div className="event-modal-header">
              <h3>予約詳細</h3>
              <button className="close-button" onClick={() => setSelectedEvent(null)}>×</button>
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
                    <span>{moment(selectedEvent.start).format('YYYY年M月D日 HH:mm')} - {moment(selectedEvent.end).format('HH:mm')}</span>
                  )}
                </div>
                {selectedEvent.bookingDetails.customerName && <div className="event-customer"><strong>お客様名：</strong><span>{selectedEvent.bookingDetails.customerName}</span></div>}
                {selectedEvent.bookingDetails.service && <div className="event-service"><strong>サービス：</strong><span>{selectedEvent.bookingDetails.service}</span></div>}
                {selectedEvent.bookingDetails.phone && <div className="event-phone"><strong>電話番号：</strong><span>{selectedEvent.bookingDetails.phone}</span></div>}
                {selectedEvent.location && <div className="event-location"><strong>場所：</strong><span>{selectedEvent.location}</span></div>}
                {selectedEvent.description && <div className="event-description"><strong>詳細：</strong><p>{selectedEvent.description}</p></div>}
                {selectedEvent.bookingDetails.notes && <div className="event-notes"><strong>備考：</strong><p>{selectedEvent.bookingDetails.notes}</p></div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
