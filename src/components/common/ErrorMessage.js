import React from 'react';
import logger from '../../utils/logger';
import './ErrorMessage.css';

/**
 * エラーメッセージ表示コンポーネント
 * 統一されたエラー表示UIを提供
 */
const ErrorMessage = ({ 
  error, 
  title = 'エラーが発生しました',
  message = '予期しないエラーが発生しました。しばらく時間をおいて再度お試しください。',
  onRetry = null,
  onDismiss = null,
  showDetails = false
}) => {
  // エラーをログに記録
  React.useEffect(() => {
    if (error) {
      logger.error('ErrorMessage displayed:', error);
    }
  }, [error]);

  if (!error && !message) {
    return null;
  }

  return (
    <div className="error-message-container" role="alert">
      <div className="error-message-content">
        <div className="error-icon">⚠️</div>
        <div className="error-text">
          <h3 className="error-title">{title}</h3>
          <p className="error-description">
            {error?.message || message}
          </p>
          
          {showDetails && error && process.env.NODE_ENV === 'development' && (
            <details className="error-details">
              <summary>詳細情報</summary>
              <pre className="error-stack">
                {error.stack || JSON.stringify(error, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>

      {(onRetry || onDismiss) && (
        <div className="error-actions">
          {onRetry && (
            <button onClick={onRetry} className="btn-primary error-retry">
              再試行
            </button>
          )}
          {onDismiss && (
            <button onClick={onDismiss} className="btn-secondary error-dismiss">
              閉じる
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
