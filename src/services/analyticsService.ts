import { collection, addDoc, getDocs, query, orderBy, where, Firestore } from 'firebase/firestore';
import { db } from '../firebase/config';
import logger from '../utils/logger';


interface PageView {
  id: string;
  pageName: string;
  timestamp: Date;
  userAgent: string;
  referrer: string;
  url: string;
}

interface PageStat {
  pageName: string;
  totalViews: number;
  uniqueViews: number;
  lastViewed: Date | null;
  views: PageView[];
}

function isDbReady(d: typeof db): d is Firestore {
  return !!d && !!(d as unknown as { _delegate?: unknown })._delegate;
}

class AnalyticsService {
  private isInitialized = false;

  sendGoogleAdsPageViewConversion() {
    const adsEnabled = process.env.NEXT_PUBLIC_GOOGLE_ADS_ENABLED === 'true';
    const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
    const pageViewLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_PAGEVIEW_CONVERSION_LABEL
      ?? process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
    if (!adsEnabled || !adsId || !pageViewLabel) return;
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    window.gtag('event', 'conversion', { send_to: `${adsId}/${pageViewLabel}` });
  }

  async initialize() {
    if (this.isInitialized) return;
    try {
      const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
      if (typeof window !== 'undefined' && window.gtag && ga4Id) window.gtag('config', ga4Id);
      this.isInitialized = true;
    } catch (e) { logger.error('Analytics Service 初期化エラー:', e); }
  }

  async trackPageView(pageName: string, additionalData: Record<string, unknown> = {}) {
    try {
      await this.initialize();
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'page_view', { page_title: pageName, page_location: window.location.href });
      }
      this.sendGoogleAdsPageViewConversion();
      if (!isDbReady(db)) { logger.debug('Firebase not available, skipping page view tracking'); return; }
      await addDoc(collection(db, 'pageViews'), {
        pageName,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        url: window.location.href,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ...additionalData,
      });
    } catch (e) { logger.error('ページビュー記録エラー:', e); }
  }

  async trackEvent(eventName: string, eventData: Record<string, unknown> = {}) {
    try {
      await this.initialize();
      if (typeof window !== 'undefined' && window.gtag) window.gtag('event', eventName, eventData);
      if (!isDbReady(db)) { logger.debug('Firebase not available, skipping event tracking'); return; }
      await addDoc(collection(db, 'events'), { eventName, timestamp: new Date(), userAgent: navigator.userAgent, url: window.location.href, ...eventData });
    } catch (e) { logger.error('イベント記録エラー:', e); }
  }

  async getPageViewStats(startDate?: Date | null, endDate?: Date | null): Promise<PageStat[]> {
    try {
      let q = query(collection(db!, 'pageViews'), orderBy('timestamp', 'desc'));
      if (startDate) q = query(q, where('timestamp', '>=', startDate));
      if (endDate) q = query(q, where('timestamp', '<=', endDate));
      const snapshot = await getDocs(q);
      const pageViews = snapshot.docs.map(d => ({ id: d.id, ...d.data(), timestamp: (d.data().timestamp as { toDate(): Date }).toDate() })) as PageView[];
      const stats: Record<string, PageStat> = {};
      pageViews.forEach(view => {
        const n = view.pageName;
        if (!stats[n]) stats[n] = { pageName: n, totalViews: 0, uniqueViews: 0, lastViewed: null, views: [] };
        stats[n]!.totalViews++;
        stats[n]!.views.push(view);
        if (!stats[n]!.lastViewed || view.timestamp > stats[n]!.lastViewed!) stats[n]!.lastViewed = view.timestamp;
      });
      Object.keys(stats).forEach(n => {
        const unique = new Set(stats[n]!.views.map(v => v.userAgent + v.referrer));
        stats[n]!.uniqueViews = unique.size;
      });
      return Object.values(stats);
    } catch (e) { logger.error('ページビュー統計取得エラー:', e); return []; }
  }

  async getDailyPageViewStats(days = 30): Promise<Record<string, Record<string, number>>> {
    try {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - days);
      const stats = await this.getPageViewStats(start, end);
      const daily: Record<string, Record<string, number>> = {};
      stats.forEach(ps => {
        ps.views.forEach(v => {
          const date = v.timestamp.toISOString().split('T')[0]!;
          daily[date] ??= {};
          daily[date]![ps.pageName] = (daily[date]![ps.pageName] ?? 0) + 1;
        });
      });
      return daily;
    } catch (e) { logger.error('日別統計取得エラー:', e); return {}; }
  }

  async getRealTimeStats() {
    try {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 3_600_000);
      const stats = await this.getPageViewStats(oneHourAgo, now);
      return {
        totalViewsLastHour: stats.reduce((s, p) => s + p.totalViews, 0),
        activePages: stats.length,
        topPages: [...stats].sort((a, b) => b.totalViews - a.totalViews).slice(0, 5),
      };
    } catch (e) { logger.error('リアルタイム統計取得エラー:', e); return { totalViewsLastHour: 0, activePages: 0, topPages: [] }; }
  }
}

const analyticsService = new AnalyticsService();
export default analyticsService;

export const trackPageView = (pageName: string, additionalData?: Record<string, unknown>) => analyticsService.trackPageView(pageName, additionalData);
export const trackEvent = (eventName: string, eventData?: Record<string, unknown>) => analyticsService.trackEvent(eventName, eventData);
export const getPageViewStats = (startDate?: Date | null, endDate?: Date | null) => analyticsService.getPageViewStats(startDate, endDate);
export const getDailyPageViewStats = (days?: number) => analyticsService.getDailyPageViewStats(days);
export const getRealTimeStats = () => analyticsService.getRealTimeStats();

// --- コンバージョンヘルパー ---

function gtagCall(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag(...args);
}

function sendGoogleAdsConversion(label?: string, value?: number | null, extraPayload?: Record<string, unknown> | null) {
  const adsEnabled = process.env.NEXT_PUBLIC_GOOGLE_ADS_ENABLED === 'true';
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
  if (!adsEnabled || !adsId || !label) return;
  const payload: Record<string, unknown> = { send_to: `${adsId}/${label}` };
  if (value != null) { payload.value = value; payload.currency = 'JPY'; }
  if (extraPayload) Object.assign(payload, extraPayload);
  gtagCall('event', 'conversion', payload);
}

export function trackHotpepperClick(menuName = '') {
  gtagCall('event', 'click_hotpepper', { event_category: 'conversion', event_label: menuName || 'Hotpepper Reservation Button', value: 5000 });
  sendGoogleAdsConversion(process.env.NEXT_PUBLIC_GOOGLE_ADS_HOTPEPPER_CONVERSION_LABEL, 5000);
}

export function trackLineClick(menuName = '') {
  gtagCall('event', 'click_line', { event_category: 'conversion', event_label: menuName || 'LINE Reservation Button', value: 5000 });
  sendGoogleAdsConversion(process.env.NEXT_PUBLIC_GOOGLE_ADS_LINE_CONVERSION_LABEL, 5000);
}

export function trackMenuView() {
  gtagCall('event', 'view_menu', { event_category: 'engagement', event_label: 'Menu Section Viewed' });
}

export function trackFaqView() {
  gtagCall('event', 'view_faq', { event_category: 'engagement', event_label: 'FAQ Section Viewed' });
}

export function trackReviewsView() {
  gtagCall('event', 'view_reviews', { event_category: 'engagement', event_label: 'Reviews Section Viewed' });
}
