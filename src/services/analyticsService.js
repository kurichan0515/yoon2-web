// インプレッション追跡サービス
import { collection, addDoc, getDocs, query, orderBy, where, limit } from 'firebase/firestore';
import { db } from '../firebase/config';

class AnalyticsService {
  constructor() {
    this.isInitialized = false;
  }

  // 初期化
  async initialize() {
    if (this.isInitialized) return;
    
    try {
      // Firebase Analytics の設定（オプション）
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', process.env.REACT_APP_GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID');
      }
      
      this.isInitialized = true;
      console.log('Analytics Service 初期化完了');
    } catch (error) {
      console.error('Analytics Service 初期化エラー:', error);
    }
  }

  // ページビューを記録
  async trackPageView(pageName, additionalData = {}) {
    try {
      await this.initialize();
      
      const pageViewData = {
        pageName: pageName,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        url: window.location.href,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ...additionalData
      };

      // Firestore に記録
      await addDoc(collection(db, 'pageViews'), pageViewData);

      // Google Analytics にも送信（オプション）
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'page_view', {
          page_title: pageName,
          page_location: window.location.href
        });
      }

      console.log(`ページビュー記録: ${pageName}`);
    } catch (error) {
      console.error('ページビュー記録エラー:', error);
    }
  }

  // イベントを記録
  async trackEvent(eventName, eventData = {}) {
    try {
      await this.initialize();
      
      const event = {
        eventName: eventName,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        ...eventData
      };

      await addDoc(collection(db, 'events'), event);

      // Google Analytics にも送信（オプション）
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, eventData);
      }

      console.log(`イベント記録: ${eventName}`);
    } catch (error) {
      console.error('イベント記録エラー:', error);
    }
  }

  // ページ別インプレッション数を取得
  async getPageViewStats(startDate = null, endDate = null) {
    try {
      let q = query(collection(db, 'pageViews'), orderBy('timestamp', 'desc'));
      
      if (startDate) {
        q = query(q, where('timestamp', '>=', startDate));
      }
      if (endDate) {
        q = query(q, where('timestamp', '<=', endDate));
      }

      const snapshot = await getDocs(q);
      const pageViews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate()
      }));

      // ページ別に集計
      const stats = {};
      pageViews.forEach(view => {
        const pageName = view.pageName;
        if (!stats[pageName]) {
          stats[pageName] = {
            pageName: pageName,
            totalViews: 0,
            uniqueViews: 0,
            lastViewed: null,
            views: []
          };
        }
        
        stats[pageName].totalViews++;
        stats[pageName].views.push(view);
        
        if (!stats[pageName].lastViewed || view.timestamp > stats[pageName].lastViewed) {
          stats[pageName].lastViewed = view.timestamp;
        }
      });

      // ユニークビュー数を計算（簡易版）
      Object.keys(stats).forEach(pageName => {
        const uniqueUsers = new Set();
        stats[pageName].views.forEach(view => {
          uniqueUsers.add(view.userAgent + view.referrer);
        });
        stats[pageName].uniqueViews = uniqueUsers.size;
      });

      return Object.values(stats);
    } catch (error) {
      console.error('ページビュー統計取得エラー:', error);
      return [];
    }
  }

  // 日別インプレッション数を取得
  async getDailyPageViewStats(days = 30) {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const stats = await this.getPageViewStats(startDate, endDate);
      
      // 日別に集計
      const dailyStats = {};
      stats.forEach(pageStat => {
        pageStat.views.forEach(view => {
          const date = view.timestamp.toISOString().split('T')[0];
          if (!dailyStats[date]) {
            dailyStats[date] = {};
          }
          if (!dailyStats[date][pageStat.pageName]) {
            dailyStats[date][pageStat.pageName] = 0;
          }
          dailyStats[date][pageStat.pageName]++;
        });
      });

      return dailyStats;
    } catch (error) {
      console.error('日別統計取得エラー:', error);
      return {};
    }
  }

  // リアルタイム統計を取得
  async getRealTimeStats() {
    try {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      
      const stats = await this.getPageViewStats(oneHourAgo, now);
      
      return {
        totalViewsLastHour: stats.reduce((sum, stat) => sum + stat.totalViews, 0),
        activePages: stats.length,
        topPages: stats
          .sort((a, b) => b.totalViews - a.totalViews)
          .slice(0, 5)
      };
    } catch (error) {
      console.error('リアルタイム統計取得エラー:', error);
      return { totalViewsLastHour: 0, activePages: 0, topPages: [] };
    }
  }
}

// シングルトンインスタンス
const analyticsService = new AnalyticsService();

export default analyticsService;

// 個別関数もエクスポート
export const trackPageView = (pageName, additionalData) => analyticsService.trackPageView(pageName, additionalData);
export const trackEvent = (eventName, eventData) => analyticsService.trackEvent(eventName, eventData);
export const getPageViewStats = (startDate, endDate) => analyticsService.getPageViewStats(startDate, endDate);
export const getDailyPageViewStats = (days) => analyticsService.getDailyPageViewStats(days);
export const getRealTimeStats = () => analyticsService.getRealTimeStats();
