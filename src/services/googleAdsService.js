/**
 * Google広告コンバージョン送信サービス（GA4連携方式）
 */

/**
 * LINE追加コンバージョンを送信
 */
export const trackLineAddConversion = () => {
  const enabled = process.env.REACT_APP_GOOGLE_ADS_ENABLED === 'true';

  if (!enabled) {
    console.warn('Google広告コンバージョン追跡が無効です（REACT_APP_GOOGLE_ADS_ENABLED=false）');
    return;
  }

  const conversionId = process.env.REACT_APP_GOOGLE_ADS_CONVERSION_ID;
  const lineLabel = process.env.REACT_APP_GOOGLE_ADS_LINE_CONVERSION_LABEL;

  if (!conversionId) {
    console.error('Google広告コンバージョンIDが設定されていません（REACT_APP_GOOGLE_ADS_CONVERSION_ID）');
    return;
  }

  if (typeof window.gtag === 'function') {
    if (lineLabel) {
      console.info('[Click] line(additional)', { send_to: `${conversionId}/${lineLabel}` });
      window.gtag('event', 'conversion', {
        send_to: `${conversionId}/${lineLabel}`,
        value: 5000,
        currency: 'JPY'
      });
      console.log('✅ LINE予約コンバージョン送信完了:', `${conversionId}/${lineLabel}`);
      return;
    }

    // 後方互換（ラベル未設定時のみ）
    window.gtag('event', 'ads_conversion_add_line', {
      send_to: conversionId,
      value: 1,
      currency: 'JPY'
    });

    console.log('⚠️ LINEラベル未設定のため後方互換イベントで送信:', conversionId);
  } else {
    console.error('❌ gtag関数が見つかりません。Googleタグが正しく読み込まれているか確認してください。');
  }
};

/**
 * お問い合わせコンバージョンを送信
 * @param {number} value - コンバージョンの価値（円）
 */
export const trackContactConversion = (value = 8000) => {
  const enabled = process.env.REACT_APP_GOOGLE_ADS_ENABLED === 'true';

  if (!enabled) {
    console.warn('Google広告コンバージョン追跡が無効です');
    return;
  }

  const conversionId = process.env.REACT_APP_GOOGLE_ADS_CONVERSION_ID;

  if (!conversionId) {
    console.error('Google広告コンバージョンIDが設定されていません');
    return;
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      'send_to': conversionId,
      'value': value,
      'currency': 'JPY'
    });

    console.log('✅ お問い合わせコンバージョン送信完了:', conversionId, 'value:', value);
  } else {
    console.error('❌ gtag関数が見つかりません');
  }
};

/**
 * 汎用コンバージョン送信
 * @param {string} eventName - イベント名
 * @param {number} value - コンバージョンの価値（円）
 */
export const trackConversion = (eventName, value = null) => {
  const enabled = process.env.REACT_APP_GOOGLE_ADS_ENABLED === 'true';

  if (!enabled) {
    console.warn('Google広告コンバージョン追跡が無効です');
    return;
  }

  const conversionId = process.env.REACT_APP_GOOGLE_ADS_CONVERSION_ID;

  if (!conversionId) {
    console.error('Google広告コンバージョンIDが設定されていません');
    return;
  }

  if (typeof window.gtag === 'function') {
    const eventData = {
      'send_to': conversionId
    };

    if (value !== null) {
      eventData.value = value;
      eventData.currency = 'JPY';
    }

    window.gtag('event', eventName, eventData);

    console.log('✅ コンバージョン送信完了:', eventName, eventData);
  } else {
    console.error('❌ gtag関数が見つかりません');
  }
};

// App.js および各ページの既存インポートとの後方互換性
export const trackPageView = () => {};

const googleAdsService = { initialize: () => {} };
export default googleAdsService;
