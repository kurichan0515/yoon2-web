'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import appConfig from '../../config/appConfig';
import { HOTPEPPER_URL } from '../../data/menuData';
import { trackHotpepperClick, trackLineClick, trackTelClick } from '../../services/analyticsService';
import './MobileBookingBar.css';

const SHOW_AFTER_SCROLL_Y = 400;
const EXCLUDED_PATHS = ['/privacy'];

// SP（768px 以下）のみ表示する予約固定バー。表示幅の制御は CSS 側
const MobileBookingBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isExcluded = EXCLUDED_PATHS.some(p => pathname?.startsWith(p));

  useEffect(() => {
    if (isExcluded) return;
    let ticking = false;
    const update = () => {
      setIsVisible(window.scrollY >= SHOW_AFTER_SCROLL_Y);
      ticking = false;
    };
    const handleScroll = () => {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    };
    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExcluded]);

  if (isExcluded) return null;

  const lineUrl = appConfig.shop.lineUrl || appConfig.social.line.url;
  const telHref = `tel:${appConfig.shop.phone.replace(/-/g, '')}`;

  return (
    <>
      {/* バーでフッター末尾が隠れないよう、バーと同じ高さの余白を確保 */}
      <div className="mobile-booking-bar-spacer" aria-hidden="true" />
      <div className={`mobile-booking-bar${isVisible ? ' is-visible' : ''}`} aria-hidden={!isVisible}>
        <a href={HOTPEPPER_URL} target="_blank" rel="noopener noreferrer"
          className="btn-primary mobile-booking-bar-btn"
          tabIndex={isVisible ? undefined : -1}
          onClick={() => trackHotpepperClick('StickyBar')}>
          ホットペッパーで予約
          <span className="visually-hidden">（新しいウィンドウで開きます）</span>
        </a>
        <a href={lineUrl} target="_blank" rel="noopener noreferrer"
          className="btn-secondary mobile-booking-bar-btn"
          tabIndex={isVisible ? undefined : -1}
          onClick={() => trackLineClick('StickyBar')}>
          LINEで空き確認
          <span className="visually-hidden">（新しいウィンドウで開きます）</span>
        </a>
        <a href={telHref}
          className="btn-secondary mobile-booking-bar-btn mobile-booking-bar-tel"
          aria-label="電話で予約・問い合わせ"
          tabIndex={isVisible ? undefined : -1}
          onClick={() => trackTelClick('StickyBar')}>
          <Phone size={20} aria-hidden="true" />
        </a>
      </div>
    </>
  );
};

export default MobileBookingBar;
