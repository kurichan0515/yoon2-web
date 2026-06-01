export const trackLineAddConversion = () => {
  const enabled = process.env.NEXT_PUBLIC_GOOGLE_ADS_ENABLED === 'true';
  if (!enabled) return;
  const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
  const lineLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LINE_CONVERSION_LABEL;
  if (!conversionId) return;
  if (typeof window.gtag === 'function') {
    if (lineLabel) {
      window.gtag('event', 'conversion', { send_to: `${conversionId}/${lineLabel}`, value: 5000, currency: 'JPY' });
    } else {
      window.gtag('event', 'ads_conversion_add_line', { send_to: conversionId, value: 1, currency: 'JPY' });
    }
  }
};

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
