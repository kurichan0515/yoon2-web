import React, { useState, memo } from 'react';
import appConfig from '../config/appConfig';
import './SocialFeed.css';

const SocialFeed = memo(() => {
  const [activeTab, setActiveTab] = useState('instagram');
  const { social } = appConfig;

  // モックデータ（実際のAPI連携時は削除）
  /*
  const mockTweets = [
    {
      id: 1,
      text: "本日も多くのお客様にご来店いただき、ありがとうございました！",
      date: "2024-12-15",
      likes: 12
    },
    {
      id: 2,
      text: "新しいイヤーエステ機器が入荷しました。より快適なサービスをお届けします！",
      date: "2024-12-14",
      likes: 8
    },
    {
      id: 3,
      text: "年末年始の営業時間についてお知らせします。詳細は店舗までお問い合わせください。",
      date: "2024-12-13",
      likes: 15
    }
  ];
  */

  const mockInstagramPosts = [
    {
      id: 1,
      image: "/images/social/shop-interior.jpg",
      caption: "今日の店内の様子です #イヤーエステ #リラックス #松山 #清水町 #yoon²",
      date: "2024-12-15",
      likes: 24
    },
    {
      id: 2,
      image: "/images/social/treatment-scene.jpg",
      caption: "イヤーエステと耳つぼで心身のリラクゼーション #イヤーエステ #耳つぼジュエリー #yoon²",
      date: "2024-12-14",
      likes: 18
    },
    {
      id: 3,
      image: "/images/social/customer-voice.jpg",
      caption: "お客様の声をいただきました #お客様の声 #ありがとう #リピート",
      date: "2024-12-13",
      likes: 31
    }
  ];

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
              <h3>@{social.instagram.username}</h3>
              <a 
                href={social.instagram.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="follow-button"
              >
                フォローする
              </a>
            </div>
            <div className="instagram-posts">
              {mockInstagramPosts.map(post => (
                <div key={post.id} className="instagram-post">
                  <div className="post-image">
                    <img 
                      src={post.image} 
                      alt={`Instagram投稿: ${post.caption.substring(0, 50)}...`}
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="image-placeholder" style={{display: 'none'}} aria-hidden="true">
                      <span>画像を読み込み中...</span>
                    </div>
                  </div>
                  <div className="post-content">
                    <p>{post.caption}</p>
                    <div className="post-meta">
                      <span className="date">{post.date}</span>
                      <span className="likes">❤️ {post.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

SocialFeed.displayName = 'SocialFeed';

export default SocialFeed;
