import React, { useState, useEffect, useRef } from 'react';
import appConfig from '../config/appConfig';
import { MENU_DATA, HOTPEPPER_URL, getMenuStructuredData } from '../data/menuData';
import { trackHotpepperClick, trackLineClick, trackMenuView } from '../services/analyticsService';
import './MenuSection.css';

const BADGE_CLASS = {
  '初回限定': 'menu-badge--new',
  '人気':     'menu-badge--popular',
  'プレミアム':'menu-badge--premium',
  'オプション':'menu-badge--option',
};

function MenuCard({ menu, lineUrl }) {
  return (
    <article className={`menu-item-card${menu.recommended ? ' menu-item-card--recommended' : ''}`}>
      {menu.badge && (
        <span className={`menu-badge ${BADGE_CLASS[menu.badge] || ''}`}>{menu.badge}</span>
      )}
      <h3 className="menu-item-name">{menu.name}</h3>

      <div className="menu-item-price-row">
        <span className="menu-item-price">¥{menu.price.toLocaleString()}</span>
        {menu.originalPrice && (
          <span className="menu-item-original-price">¥{menu.originalPrice.toLocaleString()}</span>
        )}
      </div>

      <div className="menu-item-time">
        <span className="menu-item-time-icon" aria-hidden="true">🕐</span>
        <span>約{menu.time}分</span>
      </div>

      <p className="menu-item-description">{menu.description}</p>

      <div className="menu-item-actions">
        <a
          href={HOTPEPPER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="menu-item-btn menu-item-btn--primary"
          aria-label={`${menu.name}をホットペッパーで予約（新しいウィンドウで開きます）`}
          onClick={() => trackHotpepperClick(menu.name)}
        >
          今すぐ予約する
        </a>
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="menu-item-btn menu-item-btn--secondary"
          aria-label={`${menu.name}についてLINEで相談（新しいウィンドウで開きます）`}
          onClick={() => trackLineClick(menu.name)}
        >
          LINEで予約・相談
        </a>
      </div>
    </article>
  );
}

function MenuSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [fading, setFading] = useState(false);
  const sectionRef = useRef(null);
  const lineUrl = appConfig.shop.lineUrl;

  // メニューセクション到達イベント（1回のみ）
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const once = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { trackMenuView(); once.disconnect(); } },
      { threshold: 0.3 }
    );
    once.observe(el);
    return () => once.disconnect();
  }, []);

  // セクション表示アニメーション
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('fade-in');
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // SEO構造化データ
  useEffect(() => {
    const id = 'menu-structured-data';
    if (document.getElementById(id)) return;
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = getMenuStructuredData();
    document.head.appendChild(script);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  const handleTabChange = (index) => {
    if (index === activeTab) return;
    setFading(true);
    setTimeout(() => {
      setActiveTab(index);
      setFading(false);
    }, 200);
  };

  const handleTabKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTabChange(index);
    } else if (e.key === 'ArrowRight') {
      handleTabChange((index + 1) % MENU_DATA.length);
    } else if (e.key === 'ArrowLeft') {
      handleTabChange((index - 1 + MENU_DATA.length) % MENU_DATA.length);
    }
  };

  const current = MENU_DATA[activeTab];
  // 初回割引OFFの場合は newCustomer メニューを非表示にする
  const visibleMenus = appConfig.features.firstVisitDiscount
    ? current.menus
    : current.menus.filter(m => !m.newCustomer);

  return (
    <section id="menu" className="menu-section section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Menu &amp; Price</span>
          <h2>メニュー・料金</h2>
          <p>あなたに合った癒しのメニューをお選びください</p>
        </div>

        {/* タブナビゲーション */}
        <div
          className="menu-tabs"
          role="tablist"
          aria-label="メニューカテゴリ"
        >
          {MENU_DATA.map((cat, i) => (
            <button
              key={cat.categoryKey}
              role="tab"
              aria-selected={i === activeTab}
              aria-controls={`menu-panel-${cat.categoryKey}`}
              id={`menu-tab-${cat.categoryKey}`}
              className={`menu-tab${i === activeTab ? ' menu-tab--active' : ''}`}
              onClick={() => handleTabChange(i)}
              onKeyDown={(e) => handleTabKeyDown(e, i)}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* カテゴリ説明 */}
        <p className="menu-category-desc">{current.description}</p>

        {/* メニューグリッド */}
        <div
          id={`menu-panel-${current.categoryKey}`}
          role="tabpanel"
          aria-labelledby={`menu-tab-${current.categoryKey}`}
          className={`menu-item-grid${fading ? ' menu-item-grid--fading' : ''}`}
        >
          {visibleMenus.map(menu => (
            <MenuCard key={menu.id} menu={menu} lineUrl={lineUrl} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MenuSection;
