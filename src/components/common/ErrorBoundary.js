import React from 'react';
import logger from '../../utils/logger';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // エラーが発生したことを示すstateを更新
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // エラーをログに記録
    logger.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // エラートラッキングサービスに送信（本番環境）
    if (process.env.NODE_ENV === 'production') {
      // TODO: エラートラッキングサービス（Sentry等）に送信
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // カスタムエラーUI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="error-icon">⚠️</div>
            <h2>申し訳ございません</h2>
            <p>予期しないエラーが発生しました。</p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>エラー詳細（開発環境のみ）</summary>
                <pre className="error-message">
                  {this.state.error.toString()}
                  {this.state.errorInfo && (
                    <div className="error-stack">
                      {this.state.errorInfo.componentStack}
                    </div>
                  )}
                </pre>
              </details>
            )}

            <div className="error-actions">
              <button onClick={this.handleReload} className="btn-primary">
                ページを再読み込み
              </button>
              <button onClick={this.handleGoHome} className="btn-secondary">
                ホームに戻る
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
