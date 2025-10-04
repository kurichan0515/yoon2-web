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
      'ホットペッパービューティー', 'hot pepper beauty',
      'hp予約', 'hp', 'hotpepper beauty', // 追加キーワード
      '予約システム', 'オンライン予約', 'web予約',
      'hotpepper.com', 'beauty.hotpepper.jp' // URL関連
    ];
    
    // より詳細な判定ロジック
    const hasHotPepperKeyword = hotPepperKeywords.some(keyword => 
      summary.includes(keyword) || description.includes(keyword)
    );
    
    // イベントの作成者情報もチェック
    const creator = event.creator || {};
    const creatorEmail = (creator.email || '').toLowerCase();
    const isHotPepperCreator = creatorEmail.includes('hotpepper') || 
                               creatorEmail.includes('beauty.hotpepper');
    
    // イベントの場所情報もチェック
    const location = (event.location || '').toLowerCase();
    const hasHotPepperLocation = location.includes('hotpepper') || 
                                 location.includes('ホットペッパー');
    
    return hasHotPepperKeyword || isHotPepperCreator || hasHotPepperLocation;
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
      email: this.extractEmail(description),
      notes: this.extractNotes(description),
      bookingSource: this.determineBookingSource(event),
      priority: this.determinePriority(event),
      estimatedDuration: this.calculateServiceDuration(event),
      customerType: this.determineCustomerType(event)
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

  // メールアドレスを抽出
  extractEmail(description) {
    const emailPattern = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
    const match = description.match(emailPattern);
    return match ? match[1].trim() : null;
  }

  // 予約ソースを判定
  determineBookingSource(event) {
    if (this.isHotPepperBooking(event)) {
      return 'ホットペッパービューティー';
    }
    
    const summary = (event.summary || '').toLowerCase();
    const description = (event.description || '').toLowerCase();
    
    if (summary.includes('line') || description.includes('line')) {
      return 'LINE直接予約';
    }
    
    if (summary.includes('電話') || description.includes('電話')) {
      return '電話予約';
    }
    
    if (summary.includes('来店') || description.includes('来店')) {
      return '来店予約';
    }
    
    return 'その他';
  }

  // 予約の優先度を判定
  determinePriority(event) {
    const summary = (event.summary || '').toLowerCase();
    const description = (event.description || '').toLowerCase();
    
    // VIP顧客の判定
    if (summary.includes('vip') || description.includes('vip') || 
        summary.includes('重要') || description.includes('重要')) {
      return 'VIP顧客';
    }
    
    // 新規顧客の判定
    if (summary.includes('新規') || description.includes('新規') ||
        summary.includes('初回') || description.includes('初回')) {
      return '新規顧客';
    }
    
    // リピーターの判定
    if (summary.includes('リピ') || description.includes('リピ') ||
        summary.includes('常連') || description.includes('常連')) {
      return 'リピーター';
    }
    
    return '通常';
  }

  // サービス時間を計算
  calculateServiceDuration(event) {
    const service = this.extractService(event.summary || '', event.description || '');
    
    const serviceDurations = {
      'みみつぼ': 60,
      '耳つぼ': 60,
      'イヤーエステ': 40,
      '耳エステ': 40,
      'ドライヘッドスパ': 40,
      'yoon²極メニュー': 100,
      'yoon²最上級メニュー': 100,
      'ヘッドスパ': 40
    };
    
    if (service) {
      for (const [key, duration] of Object.entries(serviceDurations)) {
        if (service.includes(key)) {
          return duration;
        }
      }
    }
    
    // デフォルトは60分
    return 60;
  }

  // 顧客タイプを判定
  determineCustomerType(event) {
    const summary = (event.summary || '').toLowerCase();
    const description = (event.description || '').toLowerCase();
    
    if (summary.includes('男性') || description.includes('男性')) {
      return '男性';
    }
    
    if (summary.includes('女性') || description.includes('女性')) {
      return '女性';
    }
    
    return '不明';
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

  // ユーザー向けの安全な時間枠取得（プライバシー保護）
  async getPublicAvailableTimeSlots(date) {
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

      // 予約済み時間を除外（詳細情報は含めない）
      events.forEach(event => {
        if (!event.isAllDay) {
          const startHour = event.start.getHours();
          const slotIndex = allSlots.findIndex(slot => 
            parseInt(slot.time.split(':')[0]) === startHour
          );
          if (slotIndex !== -1) {
            allSlots[slotIndex].available = false;
            // プライバシー保護のため、予約詳細情報は含めない
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
        sourceBreakdown: {},
        priorityBreakdown: {},
        customerTypeBreakdown: {},
        dailyStats: {},
        weeklyStats: {},
        hourlyStats: {},
        revenueEstimate: 0
      };

      // サービス別統計
      events.forEach(event => {
        const service = event.bookingDetails.service || 'その他';
        stats.serviceBreakdown[service] = (stats.serviceBreakdown[service] || 0) + 1;
      });

      // 予約ソース別統計
      events.forEach(event => {
        const source = event.bookingDetails.bookingSource || 'その他';
        stats.sourceBreakdown[source] = (stats.sourceBreakdown[source] || 0) + 1;
      });

      // 優先度別統計
      events.forEach(event => {
        const priority = event.bookingDetails.priority || '通常';
        stats.priorityBreakdown[priority] = (stats.priorityBreakdown[priority] || 0) + 1;
      });

      // 顧客タイプ別統計
      events.forEach(event => {
        const customerType = event.bookingDetails.customerType || '不明';
        stats.customerTypeBreakdown[customerType] = (stats.customerTypeBreakdown[customerType] || 0) + 1;
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

      // 週別統計
      const weeks = this.getWeeksInMonth(year, month);
      weeks.forEach(week => {
        const weekEvents = events.filter(event => {
          const eventDate = new Date(event.start);
          return eventDate >= week.start && eventDate <= week.end;
        });
        stats.weeklyStats[`Week ${week.weekNumber}`] = weekEvents.length;
      });

      // 時間別統計
      events.forEach(event => {
        const hour = event.start.getHours();
        stats.hourlyStats[hour] = (stats.hourlyStats[hour] || 0) + 1;
      });

      // 売上見積もり（サービス料金ベース）
      events.forEach(event => {
        const service = event.bookingDetails.service || '';
        const estimatedPrice = this.estimateServicePrice(service);
        stats.revenueEstimate += estimatedPrice;
      });

      return stats;
    } catch (error) {
      console.error('月間統計取得エラー:', error);
      throw error;
    }
  }

  // 月の週を取得
  getWeeksInMonth(year, month) {
    const weeks = [];
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    
    let currentWeek = 1;
    let currentDate = new Date(firstDay);
    
    while (currentDate <= lastDay) {
      const weekStart = new Date(currentDate);
      const weekEnd = new Date(currentDate);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      if (weekEnd > lastDay) {
        weekEnd.setTime(lastDay.getTime());
      }
      
      weeks.push({
        weekNumber: currentWeek,
        start: weekStart,
        end: weekEnd
      });
      
      currentDate.setDate(currentDate.getDate() + 7);
      currentWeek++;
    }
    
    return weeks;
  }

  // サービス料金を推定
  estimateServicePrice(service) {
    const servicePrices = {
      'みみつぼ': 3500,
      '耳つぼ': 3500,
      'イヤーエステ': 5000,
      '耳エステ': 5000,
      'ドライヘッドスパ': 4800,
      'yoon²極メニュー': 11000,
      'yoon²最上級メニュー': 12500,
      'ヘッドスパ': 4800
    };
    
    for (const [key, price] of Object.entries(servicePrices)) {
      if (service.includes(key)) {
        return price;
      }
    }
    
    return 5000; // デフォルト料金
  }
}

// シングルトンインスタンス
const calendarService = new CalendarService();

export default calendarService;

// 個別関数もエクスポート
export const getCalendarEvents = (timeMin, timeMax) => calendarService.getEvents(timeMin, timeMax);
export const getEventsByDate = (date) => calendarService.getEventsByDate(date);
export const getAvailableTimeSlots = (date) => calendarService.getAvailableTimeSlots(date);
export const getPublicAvailableTimeSlots = (date) => calendarService.getPublicAvailableTimeSlots(date);
export const getMonthlyBookingStats = (year, month) => calendarService.getMonthlyBookingStats(year, month);

