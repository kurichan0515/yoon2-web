'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signInAdmin, onAuthStateChange } from '../services/authService';
import './AdminLogin.css';

interface Props {
  onLoginSuccess?: () => void;
}

const ERROR_MESSAGES: Record<string, string> = {
  'auth/user-not-found': 'ユーザーが見つかりません',
  'auth/wrong-password': 'パスワードが間違っています',
  'auth/invalid-email': 'メールアドレスの形式が正しくありません',
  'auth/user-disabled': 'このアカウントは無効化されています',
  'auth/too-many-requests': 'ログイン試行回数が多すぎます。しばらく待ってから再試行してください',
  'auth/network-request-failed': 'ネットワークエラーが発生しました',
  'auth/invalid-credential': '認証情報が無効です',
};

const AdminLogin = ({ onLoginSuccess }: Props = {}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user: unknown) => {
      if (user) {
        if (onLoginSuccess) onLoginSuccess();
        else router.push('/system');
      }
    });
    return () => unsubscribe();
  }, [onLoginSuccess, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await signInAdmin(formData.email, formData.password);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      setError(ERROR_MESSAGES[code] ?? 'ログインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h1>管理者ログイン</h1>
          <p>yoon² 管理システム</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="email">メールアドレス</label>
            <input type="email" id="email" name="email" value={formData.email}
              onChange={handleChange} required disabled={isLoading} placeholder="admin@example.com" />
          </div>
          <div className="form-group">
            <label htmlFor="password">パスワード</label>
            <input type="password" id="password" name="password" value={formData.password}
              onChange={handleChange} required disabled={isLoading} placeholder="パスワードを入力" />
          </div>
          <button type="submit" className="login-btn" disabled={isLoading}>
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
