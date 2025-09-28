// Google Calendar APIサービス
// ホットペッパービューティー → Google Calendar → HP の連携

class CalendarService {
  constructor() {
    this.gapi = null;
    this.isInitialized = false;
    this.calendarId = process.env.REACT_APP_GOOGLE_CALENDAR_ID;
    this.apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  }

  // Google API初期化
  async initialize() {
    try {
      if (this.isInitialized) return true;

      // Google APIライブラリをロード
      if (!window.gapi) {
        await this.loadGoogleAPI();
      }

      await new Promise((resolve, reject) => {
        window.gapi.load('client', async () => {
          try {
            await window.gapi.client.init({
              apiKey: this.apiKey,
              discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
            });
            this.gapi = window.gapi;
            this.isInitialized = true;
            console.log('Google Calendar API初期化完了');
            resolve();
          } catch (error) {
            console.error('Google Calendar API初期化エラー:', error);
            reject(error);
          }
        });
      });

      return true;
    } catch (error) {
      console.error('Calendar Service初期化エラー:', error);
      throw error;
    }
  }

  // Google APIスクリプトをロード
  loadGoogleAPI() {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // カレンダーのイベントを取得
  async getEvents(timeMin = null, timeMax = null) {
    try {
      await this.initialize();

      const now = new Date();
      const startTime = timeMin || new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const endTime = timeMax || new Date(now.getFullYear(), now.getMonth() + 2, 0).toISOString();

      const response = await this.gapi.client.calendar.events.list({
        calendarId: this.calendarId,
        timeMin: startTime,
        timeMax: endTime,
        showDeleted: false,
        singleEvents: true,
        maxResults: 100,
        orderBy: 'startTime'
      });

      const events = response.result.items || [];
      return this.formatEvents(events);
    } catch (error) {
      console.error('イベント取得エラー:', error);
      throw error;
    }
  }

  // 特定日のイベントを取得
  async getEventsByDate(date) {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const events = await this.getEvents(
        startOfDay.toISOString(),
        endOfDay.toISOString()
      );

      return events;
    } catch (error) {
      console.error('日付別イベント取得エラー:', error);
      throw error;
    }
  }

  // イベントをフォーマット
  formatEvents(events) {
    return events.map(event => {
      const start = event.start.dateTime || event.start.date;
      const end = event.end.dateTime || event.end.date;
      
      return {
        id: event.id,
        title: event.summary || '予約',
        start: new Date(start),
        end: new Date(end),
        description: event.description || '',
        location: event.location || '',
        isAllDay: !event.start.dateTime,
        status: event.status,
        // ホットペッパービューティーからの予約かどうかを判定
        isHotPepperBooking: this.isHotPepperBooking(event),
        // 予約の詳細情報を解析
        bookingDetails: this.parseBookingDetails(event)
      };
    });
  }

  // ホットペッパービューティーからの予約かどうかを判定
  isHotPepperBooking(event) {
    const summary = (event.summary || '').toLowerCase();
    const description = (event.description || '').toLowerCase();
    
    // ホットペッパービューティー関連のキーワードをチェック
    const hotPepperKeywords = [
      'ホットペッパー', 'hotpepper', 'hot pepper',
      'ホットペッパービューティー', 'hot pepper beauty'
    ];
    
    return hotPepperKeywords.some(keyword => 
      summary.includes(keyword) || description.includes(keyword)
    );
  }

  // 予約の詳細情報を解析
  parseBookingDetails(event) {
    const description = event.description || '';
    const summary = event.summary || '';
    
    // 基本的な予約情報を抽出
    const details = {
      customerName: this.extractCustomerName(summary, description),
      service: this.extractService(summary, description),
      phone: this.extractPhone(description),
      notes: this.extractNotes(description)
    };

    return details;
  }

  // 顧客名を抽出
  extractCustomerName(summary, description) {
    // 様々なパターンで顧客名を抽出
    const namePatterns = [
      /お名前[：:]\s*([^\n\r]+)/,
      /氏名[：:]\s*([^\n\r]+)/,
      /名前[：:]\s*([^\n\r]+)/,
      /^([^さん]+)さん/
    ];

    for (const pattern of namePatterns) {
      const match = description.match(pattern) || summary.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    return null;
  }

  // サービス内容を抽出
  extractService(summary, description) {
    const servicePatterns = [
      /メニュー[：:]\s*([^\n\r]+)/,
      /サービス[：:]\s*([^\n\r]+)/,
      /コース[：:]\s*([^\n\r]+)/
    ];

    for (const pattern of servicePatterns) {
      const match = description.match(pattern) || summary.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    // サマリーから一般的なサービス名を抽出
    if (summary.includes('みみつぼ') || summary.includes('耳つぼ')) {
      return 'みみつぼマッサージ';
    }
    if (summary.includes('イヤーエステ') || summary.includes('耳エステ')) {
      return 'イヤーエステ';
    }

    return null;
  }

  // 電話番号を抽出
  extractPhone(description) {
    const phonePattern = /(?:電話|TEL|Phone)[：:]?\s*([\d-]+)/i;
    const match = description.match(phonePattern);
    return match ? match[1].trim() : null;
  }

  // 備考を抽出
  extractNotes(description) {
    const notesPatterns = [
      /備考[：:]\s*([^\n\r]+)/,
      /メモ[：:]\s*([^\n\r]+)/,
      /注意事項[：:]\s*([^\n\r]+)/
    ];

    for (const pattern of notesPatterns) {
      const match = description.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    return null;
  }

  // 利用可能な時間枠を計算
  async getAvailableTimeSlots(date) {
    try {
      const events = await this.getEventsByDate(date);
      
      // 営業時間（10:00-20:00）
      const businessHours = {
        start: 10,
        end: 20
      };

      // 1時間単位のタイムスロット
      const allSlots = [];
      for (let hour = businessHours.start; hour < businessHours.end; hour++) {
        allSlots.push({
          time: `${hour.toString().padStart(2, '0')}:00`,
          available: true
        });
      }

      // 予約済み時間を除外
      events.forEach(event => {
        if (!event.isAllDay) {
          const startHour = event.start.getHours();
          const slotIndex = allSlots.findIndex(slot => 
            parseInt(slot.time.split(':')[0]) === startHour
          );
          if (slotIndex !== -1) {
            allSlots[slotIndex].available = false;
            allSlots[slotIndex].booking = event;
          }
        }
      });

      return allSlots;
    } catch (error) {
      console.error('利用可能時間取得エラー:', error);
      throw error;
    }
  }

  // 月間の予約統計を取得
  async getMonthlyBookingStats(year, month) {
    try {
      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month, 0);
      
      const events = await this.getEvents(
        startOfMonth.toISOString(),
        endOfMonth.toISOString()
      );

      const stats = {
        totalBookings: events.length,
        hotPepperBookings: events.filter(e => e.isHotPepperBooking).length,
        directBookings: events.filter(e => !e.isHotPepperBooking).length,
        serviceBreakdown: {},
        dailyStats: {}
      };

      // サービス別統計
      events.forEach(event => {
        const service = event.bookingDetails.service || 'その他';
        stats.serviceBreakdown[service] = (stats.serviceBreakdown[service] || 0) + 1;
      });

      // 日別統計
      for (let day = 1; day <= endOfMonth.getDate(); day++) {
        const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const dayEvents = events.filter(event => {
          const eventDate = event.start.toISOString().split('T')[0];
          return eventDate === dateStr;
        });
        stats.dailyStats[dateStr] = dayEvents.length;
      }

      return stats;
    } catch (error) {
      console.error('月間統計取得エラー:', error);
      throw error;
    }
  }
}

// シングルトンインスタンス
const calendarService = new CalendarService();

export default calendarService;

// 個別関数もエクスポート
export const getCalendarEvents = (timeMin, timeMax) => calendarService.getEvents(timeMin, timeMax);
export const getEventsByDate = (date) => calendarService.getEventsByDate(date);
export const getAvailableTimeSlots = (date) => calendarService.getAvailableTimeSlots(date);
export const getMonthlyBookingStats = (year, month) => calendarService.getMonthlyBookingStats(year, month);

