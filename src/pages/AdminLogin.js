import React, { useState, useEffect } from 'react';
import { signInAdmin, onAuthStateChange } from '../services/authService';
import './AdminLogin.css';

const AdminLogin = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // 認証状態を監視
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        onLoginSuccess();
      }
    });

    return () => unsubscribe();
  }, [onLoginSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // エラーをクリア
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signInAdmin(formData.email, formData.password);
      // ログイン成功はonAuthStateChangeで処理される
    } catch (error) {
      console.error('ログインエラー:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      'auth/user-not-found': 'ユーザーが見つかりません',
      'auth/wrong-password': 'パスワードが間違っています',
      'auth/invalid-email': 'メールアドレスの形式が正しくありません',
      'auth/user-disabled': 'このアカウントは無効化されています',
      'auth/too-many-requests': 'ログイン試行回数が多すぎます。しばらく待ってから再試行してください',
      'auth/network-request-failed': 'ネットワークエラーが発生しました',
      'auth/invalid-credential': '認証情報が無効です',
      'auth/email-already-in-use': 'このメールアドレスは既に使用されています'
    };
    return errorMessages[errorCode] || 'ログインに失敗しました';
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h1>管理者ログイン</h1>
          <p>yoon² 管理システム</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="admin@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="パスワードを入力"
            />
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>

        <div className="login-footer">
          <p>管理者権限が必要です</p>
          <p>アクセス権限については管理者にお問い合わせください</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
