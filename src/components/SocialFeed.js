import React, { useState, memo } from 'react';
import appConfig from '../config/appConfig';
import './SocialFeed.css';

const SocialFeed = memo(() => {
  const [activeTab, setActiveTab] = useState('instagram');
  const { social } = appConfig;

  // Instagramユーザー名を取得（@マークを除去）
  const instagramUsername = social.instagram.username?.replace('@', '') || 'yoo.n.yoo.n';

  return (
    <div className="social-feed">
      <div className="social-header">
        <h2>SNS情報</h2>
        <p>最新情報やお得なキャンペーン情報をお届けします</p>
      </div>

      <div className="social-tabs">
        <button 
          className={`tab-button ${activeTab === 'instagram' ? 'active' : ''}`}
          onClick={() => setActiveTab('instagram')}
        >
          Instagram
        </button>
      </div>

      <div className="social-content">
        {activeTab === 'instagram' && (
          <div className="instagram-feed">
            <div className="feed-header">
              <h3>@{instagramUsername}</h3>
              <a 
                href={social.instagram.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="follow-button"
              >
                フォローする
              </a>
            </div>
            
            {/* Instagramへのリンクのみ表示 */}
            <div className="instagram-link-only" style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              background: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <svg 
                  width="64" 
                  height="64" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ margin: '0 auto', color: '#E4405F' }}
                >
                  <path 
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" 
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h4 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>
                Instagramで最新情報をチェック
              </h4>
              <p style={{ margin: '0 0 1.5rem 0', color: '#6c757d' }}>
                最新の投稿やお得な情報をお届けしています
              </p>
              <a 
                href={social.instagram.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="follow-button"
                style={{
                  display: 'inline-block',
                  fontSize: '1.1rem',
                  padding: '0.75rem 2rem'
                }}
              >
                Instagramを見る
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

SocialFeed.displayName = 'SocialFeed';

export default SocialFeed;
