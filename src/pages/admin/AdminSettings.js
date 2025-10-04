import React, { useState, useEffect } from 'react';
import appConfig from '../../config/appConfig';
import './AdminSettings.css';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    shopName: appConfig.shop.name,
    phone: appConfig.shop.phone,
    address: appConfig.shop.address,
    email: appConfig.shop.email,
    lineUrl: appConfig.shop.lineUrl,
    instagramUrl: appConfig.shop.instagramUrl
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // 設定保存のロジック（実際の実装ではFirestoreに保存）
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模擬保存
      setMessage('設定が正常に保存されました。');
    } catch (error) {
      setMessage('設定の保存に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-settings">
      <div className="settings-container">
        <div className="settings-header">
          <h1>システム設定</h1>
          <p>店舗情報とシステム設定を管理します</p>
        </div>

        <form onSubmit={handleSave} className="settings-form">
          <div className="form-section">
            <h3>基本情報</h3>
            <div className="form-group">
              <label htmlFor="shopName">店舗名</label>
              <input
                type="text"
                id="shopName"
                name="shopName"
                value={settings.shopName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">電話番号</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">住所</label>
              <textarea
                id="address"
                name="address"
                value={settings.address}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">メールアドレス</label>
              <input
                type="email"
                id="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>SNS・連絡先</h3>
            <div className="form-group">
              <label htmlFor="lineUrl">LINE URL</label>
              <input
                type="url"
                id="lineUrl"
                name="lineUrl"
                value={settings.lineUrl}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="instagramUrl">Instagram URL</label>
              <input
                type="url"
                id="instagramUrl"
                name="instagramUrl"
                value={settings.instagramUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          {message && (
            <div className={`message ${message.includes('失敗') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          <div className="form-actions">
            <button 
              type="submit" 
              className="save-btn"
              disabled={isLoading}
            >
              {isLoading ? '保存中...' : '設定を保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
