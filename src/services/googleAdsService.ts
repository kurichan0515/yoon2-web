export const trackContactConversion = (value = 8000) => {
  const enabled = process.env.NEXT_PUBLIC_GOOGLE_ADS_ENABLED === 'true';
  if (!enabled) return;
  const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
  if (!conversionId) return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', { send_to: conversionId, value, currency: 'JPY' });
  }
};

export const trackConversion = (eventName: string, value: number | null = null) => {
  const enabled = process.env.NEXT_PUBLIC_GOOGLE_ADS_ENABLED === 'true';
  if (!enabled) return;
  const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
  if (!conversionId) return;
  if (typeof window.gtag === 'function') {
    const data: Record<string, unknown> = { send_to: conversionId };
    if (value != null) { data.value = value; data.currency = 'JPY'; }
    window.gtag('event', eventName, data);
  }
};

export const trackPageView = () => {};

const googleAdsService = { initialize: () => {} };
export default googleAdsService;
