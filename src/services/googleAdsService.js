// Google Ads コンバージョン追跡サービス
import appConfig from '../config/appConfig';
import logger from '../utils/logger';

class GoogleAdsService {
  constructor() {
    this.isInitialized = false;
    this.isLoading = false;
    this.conversionId = appConfig.googleAds.conversionId;
    this.conversionLabel = appConfig.googleAds.conversionLabel;
    this.enabled = appConfig.googleAds.enabled;
  }

  // Google Adsタグ（gtag.js）を動的に読み込む
  loadGoogleAdsScript() {
    if (typeof window === 'undefined') return;
    
    // 既に読み込まれている場合はスキップ
    if (window.dataLayer && window.gtag) {
      return;
    }

    // スクリプトが既に読み込み中の場合はスキップ
    if (this.isLoading) {
      return;
    }

    if (!this.conversionId || !this.conversionId.startsWith('AW-')) {
      logger.debug('Google Ads: コンバージョンIDが設定されていないか、無効な形式です');
      return;
    }

    this.isLoading = true;

    // dataLayerを初期化
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());

    // gtag.jsスクリプトを読み込む
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.conversionId}`;
    script.onload = () => {
      // コンバージョンIDで設定
      gtag('config', this.conversionId);
      this.isInitialized = true;
      this.isLoading = false;
      logger.info('Google Ads Service 初期化完了', { conversionId: this.conversionId });
    };
    script.onerror = () => {
      this.isLoading = false;
      logger.error('Google Ads: スクリプトの読み込みに失敗しました');
    };
    document.head.appendChild(script);
  }

  // 初期化
  initialize() {
    if (this.isInitialized) return;
    
    if (!this.enabled) {
      logger.debug('Google Ads: 無効化されています');
      return;
    }

    if (!this.conversionId) {
      logger.debug('Google Ads: コンバージョンIDが設定されていません');
      return;
    }

    // Google Adsタグを読み込む
    this.loadGoogleAdsScript();
  }

  // コンバージョンを記録
  trackConversion(action = 'conversion', options = {}) {
    try {
      this.initialize();

      if (!this.enabled || !this.isInitialized) {
        logger.debug('Google Ads: 無効化されているか初期化されていません');
        return;
      }

      if (!this.conversionId) {
        logger.warn('Google Ads: コンバージョンIDが設定されていません');
        return;
      }

      // 開発環境では記録しない（オプション）
      const isDevelopment = 
        process.env.NODE_ENV === 'development' || 
        window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1';

      if (isDevelopment) {
        logger.debug('Google Ads: 開発環境ではコンバージョンを記録しません', {
          action,
          options,
          conversionId: this.conversionId,
          conversionLabel: this.conversionLabel
        });
        return;
      }

      // コンバージョンイベントを送信
      const conversionData = {
        send_to: this.conversionLabel 
          ? `${this.conversionId}/${this.conversionLabel}`
          : this.conversionId,
        value: options.value || 1.0,
        currency: options.currency || 'JPY',
        transaction_id: options.transactionId || undefined
      };

      // オプションのパラメータを追加
      if (options.eventCategory) conversionData.event_category = options.eventCategory;
      if (options.eventLabel) conversionData.event_label = options.eventLabel;

      window.gtag('event', 'conversion', conversionData);

      logger.info('Google Ads: コンバージョンを記録しました', {
        action,
        conversionData
      });
    } catch (error) {
      logger.error('Google Ads: コンバージョン記録エラー', error);
    }
  }

  // ページビューを記録
  trackPageView(pagePath, pageTitle) {
    try {
      this.initialize();

      if (!this.enabled || !this.isInitialized) {
        return;
      }

      if (!this.conversionId) {
        return;
      }

      // 開発環境では記録しない（オプション）
      const isDevelopment = 
        process.env.NODE_ENV === 'development' || 
        window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1';

      if (isDevelopment) {
        logger.debug('Google Ads: 開発環境ではページビューを記録しません', {
          pagePath,
          pageTitle
        });
        return;
      }

      window.gtag('config', this.conversionId, {
        page_path: pagePath,
        page_title: pageTitle
      });

      logger.debug('Google Ads: ページビューを記録しました', {
        pagePath,
        pageTitle
      });
    } catch (error) {
      logger.error('Google Ads: ページビュー記録エラー', error);
    }
  }

  // カスタムイベントを記録
  trackEvent(eventName, eventParams = {}) {
    try {
      this.initialize();

      if (!this.enabled || !this.isInitialized) {
        return;
      }

      // 開発環境では記録しない（オプション）
      const isDevelopment = 
        process.env.NODE_ENV === 'development' || 
        window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1';

      if (isDevelopment) {
        logger.debug('Google Ads: 開発環境ではイベントを記録しません', {
          eventName,
          eventParams
        });
        return;
      }

      window.gtag('event', eventName, {
        ...eventParams,
        send_to: this.conversionId
      });

      logger.debug('Google Ads: イベントを記録しました', {
        eventName,
        eventParams
      });
    } catch (error) {
      logger.error('Google Ads: イベント記録エラー', error);
    }
  }
}

// シングルトンインスタンス
const googleAdsService = new GoogleAdsService();

export default googleAdsService;

// 個別関数もエクスポート
export const trackConversion = (action, options) => googleAdsService.trackConversion(action, options);
export const trackPageView = (pagePath, pageTitle) => googleAdsService.trackPageView(pagePath, pageTitle);
export const trackEvent = (eventName, eventParams) => googleAdsService.trackEvent(eventName, eventParams);
