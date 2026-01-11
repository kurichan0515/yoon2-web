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
    
    // index.htmlで既にgtagが読み込まれている場合は、それを利用
    if (typeof window !== 'undefined' && window.gtag && window.dataLayer) {
      this.isInitialized = true;
      // 環境変数からコンバージョンIDを取得（設定されていない場合はindex.htmlのIDを使用）
      if (!this.conversionId && window.gtag) {
        // index.htmlで設定されたIDを推測（直接取得は困難なため、環境変数の設定を推奨）
        logger.debug('Google Ads: index.htmlで既に読み込まれています。環境変数の設定を推奨します。');
      }
      logger.info('Google Ads Service 初期化完了（既存のgtagを利用）', { 
        conversionId: this.conversionId || 'index.htmlから読み込み済み'
      });
      return;
    }
    
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

  // LINE追加用のコンバージョンイベントを記録
  trackLineAddConversion(eventParams = {}) {
    try {
      this.initialize();

      // gtagが利用可能でない場合はスキップ
      if (typeof window === 'undefined' || !window.gtag) {
        logger.debug('Google Ads: gtagが利用できません');
        return;
      }

      // 開発環境では記録しない（オプション）
      const isDevelopment = 
        process.env.NODE_ENV === 'development' || 
        window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1';

      if (isDevelopment) {
        logger.debug('Google Ads: 開発環境ではLINE追加コンバージョンを記録しません', {
          eventParams
        });
        return;
      }

      // LINE追加用のコンバージョンイベントを送信
      // コンバージョンラベルが設定されている場合はそれを使用
      const eventData = {
        ...eventParams
      };

      // コンバージョンラベルが設定されている場合はsend_toを追加
      if (this.conversionLabel) {
        eventData.send_to = `${this.conversionId}/${this.conversionLabel}`;
      }

      window.gtag('event', 'ads_conversion_add_line', eventData);

      logger.info('Google Ads: LINE追加コンバージョンを記録しました', {
        eventData
      });
    } catch (error) {
      logger.error('Google Ads: LINE追加コンバージョン記録エラー', error);
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
export const trackLineAddConversion = (eventParams) => googleAdsService.trackLineAddConversion(eventParams);
