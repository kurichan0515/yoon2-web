'use client';

import React, { ErrorInfo, ReactNode } from 'react';
import logger from '../../utils/logger';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReload = () => window.location.reload();
  private handleGoHome = () => { window.location.href = '/'; };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
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
              <button onClick={this.handleReload} className="btn-primary">ページを再読み込み</button>
              <button onClick={this.handleGoHome} className="btn-secondary">ホームに戻る</button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
