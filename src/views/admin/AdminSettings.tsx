'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import appConfig from '../../config/appConfig';
import './AdminSettings.css';

interface Settings {
  shopName: string;
  phone: string;
  address: string;
  email: string;
  lineUrl: string;
  instagramUrl: string;
}

const AdminSettings = () => {
  const shop = appConfig.shop as { name: string; phone: string; address: string; email?: string; lineUrl?: string; instagramUrl?: string; };
  const social = appConfig.social as { line: { url: string }; instagram: { url: string } };

  const [settings, setSettings] = useState<Settings>({
    shopName: shop.name,
    phone: shop.phone,
    address: shop.address,
    email: shop.email ?? '',
    lineUrl: shop.lineUrl ?? social.line.url,
    instagramUrl: shop.instagramUrl ?? social.instagram.url,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      setMessage('設定が正常に保存されました。');
    } catch {
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
            {([['shopName','店舗名','text'],['phone','電話番号','tel'],['email','メールアドレス','email']] as const).map(([name, label, type]) => (
              <div key={name} className="form-group">
                <label htmlFor={name}>{label}</label>
                <input type={type} id={name} name={name} value={settings[name]} onChange={handleChange} required />
              </div>
            ))}
            <div className="form-group">
              <label htmlFor="address">住所</label>
              <textarea id="address" name="address" value={settings.address} onChange={handleChange} rows={3} required />
            </div>
          </div>
          <div className="form-section">
            <h3>SNS・連絡先</h3>
            {([['lineUrl','LINE URL'],['instagramUrl','Instagram URL']] as const).map(([name, label]) => (
              <div key={name} className="form-group">
                <label htmlFor={name}>{label}</label>
                <input type="url" id={name} name={name} value={settings[name]} onChange={handleChange} />
              </div>
            ))}
          </div>
          {message && (
            <div className={`message ${message.includes('失敗') ? 'error' : 'success'}`}>{message}</div>
          )}
          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={isLoading}>
              {isLoading ? '保存中...' : '設定を保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
