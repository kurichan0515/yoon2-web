/**
 * ロガーユーティリティ
 * 開発環境のみでログを出力し、本番環境では自動的に無効化される
 */
const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  /**
   * 通常のログ（開発環境のみ）
   */
  log: (...args) => {
    if (isDevelopment) {
      console.log('[LOG]', ...args);
    }
  },

  /**
   * エラーログ（常に記録）
   * 本番環境ではエラートラッキングサービスに送信することを推奨
   */
  error: (...args) => {
    console.error('[ERROR]', ...args);
    // TODO: 本番環境ではエラートラッキングサービス（Sentry等）に送信
  },

  /**
   * 警告ログ（開発環境のみ）
   */
  warn: (...args) => {
    if (isDevelopment) {
      console.warn('[WARN]', ...args);
    }
  },

  /**
   * デバッグログ（開発環境のみ）
   */
  debug: (...args) => {
    if (isDevelopment) {
      console.debug('[DEBUG]', ...args);
    }
  },

  /**
   * 情報ログ（開発環境のみ）
   */
  info: (...args) => {
    if (isDevelopment) {
      console.info('[INFO]', ...args);
    }
  }
};

export default logger;
