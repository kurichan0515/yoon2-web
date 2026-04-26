// インプレッション追跡サービス
import { collection, addDoc, getDocs, query, orderBy, where, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import logger from '../utils/logger';

class AnalyticsService {
  constructor() {
    this.isInitialized = false;
  }

  sendGoogleAdsPageViewConversion() {
    const adsEnabled = process.env.REACT_APP_GOOGLE_ADS_ENABLED === 'true';
    const adsId = process.env.REACT_APP_GOOGLE_ADS_CONVERSION_ID;
    const pageViewLabel = process.env.REACT_APP_GOOGLE_ADS_PAGEVIEW_CONVERSION_LABEL
      || process.env.REACT_APP_GOOGLE_ADS_CONVERSION_LABEL;

    if (!adsEnabled || !adsId || !pageViewLabel) return;
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

    window.gtag('event', 'conversion', {
      send_to: `${adsId}/${pageViewLabel}`,
    });
  }

  // 初期化
  async initialize() {
    if (this.isInitialized) return;
    
    try {
      // Firebase Analytics の設定（オプション）
      const ga4Id = process.env.REACT_APP_GA4_MEASUREMENT_ID;
      if (typeof window !== 'undefined' && window.gtag && ga4Id) {
        window.gtag('config', ga4Id);
      }
      
      this.isInitialized = true;
      logger.info('Analytics Service 初期化完了');
    } catch (error) {
      logger.error('Analytics Service 初期化エラー:', error);
    }
  }

  // ページビューを記録
  async trackPageView(pageName, additionalData = {}) {
    try {
      await this.initialize();

      // Googleタグ送信はFirestore可用性に依存させない
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'page_view', {
          page_title: pageName,
          page_location: window.location.href
        });
      }
      // Google Adsの「ページビュー」コンバージョンを送信（ラベル設定時のみ）
      this.sendGoogleAdsPageViewConversion();
      
      // Firebaseが利用可能かより厳密にチェック
      if (!db || typeof db === 'undefined' || !db._delegate) {
        logger.debug('Firebase not available, skipping page view tracking');
        return;
      }
      
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

      logger.debug(`ページビュー記録: ${pageName}`);
    } catch (error) {
      logger.error('ページビュー記録エラー:', error);
    }
  }

  // イベントを記録
  async trackEvent(eventName, eventData = {}) {
    try {
      await this.initialize();

      // Googleタグ送信はFirestore可用性に依存させない
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, eventData);
      }
      
      // Firebaseが利用可能かより厳密にチェック
      if (!db || typeof db === 'undefined' || !db._delegate) {
        logger.debug('Firebase not available, skipping event tracking');
        return;
      }
      
      const event = {
        eventName: eventName,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        ...eventData
      };

      await addDoc(collection(db, 'events'), event);

      logger.debug(`イベント記録: ${eventName}`);
    } catch (error) {
      logger.error('イベント記録エラー:', error);
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
      logger.error('ページビュー統計取得エラー:', error);
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
      logger.error('日別統計取得エラー:', error);
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
      logger.error('リアルタイム統計取得エラー:', error);
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

// ==============================
// コンバージョンイベント追跡ヘルパー
// Google Ads (AW-621590738) + GA4 共通
// ==============================

function gtag(...args) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
}

function sendGoogleAdsConversion(label, value = null, extraPayload = null) {
  const adsEnabled = process.env.REACT_APP_GOOGLE_ADS_ENABLED === 'true';
  const adsId = process.env.REACT_APP_GOOGLE_ADS_CONVERSION_ID;

  if (!adsEnabled || !adsId || !label) {
    console.info('[AdsConversion:SKIP]', {
      reason: !adsEnabled ? 'ads_disabled' : !adsId ? 'missing_ads_id' : 'missing_label',
      adsEnabled,
      hasAdsId: Boolean(adsId),
      hasLabel: Boolean(label),
    });
    return;
  }

  const payload = { send_to: `${adsId}/${label}` };
  if (value !== null) {
    payload.value = value;
    payload.currency = 'JPY';
  }
  if (extraPayload && typeof extraPayload === 'object') {
    Object.assign(payload, extraPayload);
  }

  console.info('[AdsConversion:SEND]', payload);
  gtag('event', 'conversion', payload);
}

/** ホットペッパー予約ボタンクリック */
export function trackHotpepperClick(menuName = '') {
  console.info('[Click] hotpepper', { menuName: menuName || 'Hotpepper Reservation Button' });
  gtag('event', 'click_hotpepper', {
    event_category: 'conversion',
    event_label: menuName || 'Hotpepper Reservation Button',
    value: 5000,
  });
  sendGoogleAdsConversion(process.env.REACT_APP_GOOGLE_ADS_HOTPEPPER_CONVERSION_LABEL, 5000);
}

/** LINE予約ボタンクリック */
export function trackLineClick(menuName = '') {
  console.info('[Click] line', { menuName: menuName || 'LINE Reservation Button' });
  gtag('event', 'click_line', {
    event_category: 'conversion',
    event_label: menuName || 'LINE Reservation Button',
    value: 5000,
  });
  sendGoogleAdsConversion(process.env.REACT_APP_GOOGLE_ADS_LINE_CONVERSION_LABEL, 5000);
}

/** 電話タップ */
export function trackPhoneClick(phoneHref = '') {
  console.info('[Click] phone', { eventLabel: 'Phone Call' });
  gtag('event', 'click_phone', {
    event_category: 'conversion',
    event_label: 'Phone Call',
    value: 5000,
  });

  // 電話リンクは遷移が早く、送信前に離脱しやすいため callback で遷移する
  if (phoneHref) {
    const safeNavigate = () => { window.location.href = phoneHref; };
    let navigated = false;
    const navigateOnce = () => {
      if (navigated) return;
      navigated = true;
      safeNavigate();
    };

    sendGoogleAdsConversion(
      process.env.REACT_APP_GOOGLE_ADS_PHONE_CONVERSION_LABEL,
      5000,
      {
        event_callback: navigateOnce,
        event_timeout: 1200,
      }
    );

    setTimeout(navigateOnce, 1300);
    return;
  }

  sendGoogleAdsConversion(process.env.REACT_APP_GOOGLE_ADS_PHONE_CONVERSION_LABEL, 5000);
}

/** メニューセクション到達 */
export function trackMenuView() {
  gtag('event', 'view_menu', {
    event_category: 'engagement',
    event_label: 'Menu Section Viewed',
  });
}

/** FAQセクション到達 */
export function trackFaqView() {
  gtag('event', 'view_faq', {
    event_category: 'engagement',
    event_label: 'FAQ Section Viewed',
  });
}

/** 口コミセクション到達 */
export function trackReviewsView() {
  gtag('event', 'view_reviews', {
    event_category: 'engagement',
    event_label: 'Reviews Section Viewed',
  });
}
