import logger from '../utils/logger';

declare global { interface Window { gtag?: (...args: unknown[]) => void; } }

function gtagCall(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag(...args);
}

function sendGoogleAdsPageViewConversion() {
  const adsEnabled = process.env.NEXT_PUBLIC_GOOGLE_ADS_ENABLED === 'true';
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_PAGEVIEW_CONVERSION_LABEL
    ?? process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (!adsEnabled || !adsId || !label) return;
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', { send_to: `${adsId}/${label}` });
}

function sendGoogleAdsConversion(label?: string, value?: number | null) {
  const adsEnabled = process.env.NEXT_PUBLIC_GOOGLE_ADS_ENABLED === 'true';
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
  if (!adsEnabled || !adsId || !label) return;
  const payload: Record<string, unknown> = { send_to: `${adsId}/${label}` };
  if (value != null) { payload.value = value; payload.currency = 'JPY'; }
  gtagCall('event', 'conversion', payload);
}

export const trackPageView = (pageName: string, additionalData?: Record<string, unknown>) => {
  try {
    const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
    if (typeof window !== 'undefined' && window.gtag) {
      if (ga4Id) window.gtag('config', ga4Id);
      window.gtag('event', 'page_view', { page_title: pageName, page_location: window.location.href, ...additionalData });
    }
    sendGoogleAdsPageViewConversion();
  } catch (e) { logger.error('ページビュー記録エラー:', e); }
};

export const trackEvent = (eventName: string, eventData?: Record<string, unknown>) => {
  gtagCall('event', eventName, eventData);
};

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

export default { trackPageView, trackEvent };
