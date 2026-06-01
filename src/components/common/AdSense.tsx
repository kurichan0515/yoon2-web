'use client';

import React, { useEffect, useRef, useState, CSSProperties } from 'react';
import appConfig from '../../config/appConfig';
import logger from '../../utils/logger';
import './AdSense.css';


type AdFormat = 'auto' | 'rectangle' | 'horizontal' | 'vertical';

interface Props {
  adSlot?: string;
  adFormat?: AdFormat;
  style?: CSSProperties;
  className?: string;
  fullWidthResponsive?: boolean;
}

const AdSense = ({
  adSlot,
  adFormat = 'auto',
  style = {},
  className = '',
  fullWidthResponsive = true,
}: Props) => {
  const adRef = useRef<HTMLModElement>(null);
  const pushCalledRef = useRef(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [scriptReady, setScriptReady] = useState(
    typeof window !== 'undefined' && !!window.adsbygoogle
  );

  if (!appConfig.adsense.enabled) return null;

  const finalAdSlot = adSlot ?? appConfig.adsense.defaultAdSlot;
  const publisherId = appConfig.adsense.publisherId;
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const isDevelopment =
    process.env.NODE_ENV === 'development' ||
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    process.env.NEXT_PUBLIC_ADSENSE_DEV_MODE === 'true';

  useEffect(() => {
    if (isDevelopment || scriptReady) return;
    const onReady = () => setScriptReady(true);
    window.addEventListener('adsbygoogle-ready', onReady);
    if (window.adsbygoogle) { setScriptReady(true); return () => window.removeEventListener('adsbygoogle-ready', onReady); }
    let elapsed = 0;
    const poll = setInterval(() => {
      elapsed += 300;
      if (window.adsbygoogle) { setScriptReady(true); clearInterval(poll); }
      else if (elapsed >= 10000) clearInterval(poll);
    }, 300);
    return () => { window.removeEventListener('adsbygoogle-ready', onReady); clearInterval(poll); };
  }, [isDevelopment, scriptReady]);

  useEffect(() => {
    if (!finalAdSlot) { logger.warn('AdSense: adSlot is not configured'); return; }
    if (isDevelopment) { setShowPlaceholder(true); return; }
    if (!scriptReady || !window.adsbygoogle) { setShowPlaceholder(true); return; }
    setShowPlaceholder(false);
  }, [finalAdSlot, adFormat, publisherId, isDevelopment, scriptReady]);

  useEffect(() => {
    if (showPlaceholder || isDevelopment || pushCalledRef.current) return;
    if (!scriptReady || !window.adsbygoogle) return;
    pushCalledRef.current = true;
    requestAnimationFrame(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle ?? []).push({});
      } catch (e) {
        logger.error('AdSense: Error initializing ad unit', e);
        setShowPlaceholder(true);
      }
      setTimeout(() => {
        const el = adRef.current;
        if (el && el.offsetHeight === 0) setShowPlaceholder(true);
      }, 2000);
    });
  }, [showPlaceholder, isDevelopment, scriptReady, finalAdSlot, adFormat]);

  if (!finalAdSlot || !publisherId) return null;

  return (
    <div
      className={`adsense-wrapper ${className} ${showPlaceholder ? 'adsense-placeholder-mode' : ''}`}
      style={style}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: showPlaceholder ? 'none' : 'block', ...(fullWidthResponsive && { width: '100%' }) }}
        data-ad-client={publisherId}
        data-ad-slot={finalAdSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
      {showPlaceholder && isDevelopment && (
        <div className={`adsense-test-ad adsense-test-ad--${adFormat}`}>
          <div className="adsense-test-ad-label">
            <span className="adsense-test-ad-badge">広告</span>
            <span className="adsense-test-ad-google">Google</span>
          </div>
          <div className="adsense-test-ad-content">
            <div className="adsense-test-ad-image">
              <div className="adsense-test-ad-image-placeholder">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" fill="#f0f0f0"/>
                  <path d="M30 40L50 25L70 40V70H30V40Z" fill="#d0d0d0"/>
                  <circle cx="50" cy="50" r="8" fill="#b0b0b0"/>
                </svg>
              </div>
            </div>
            <div className="adsense-test-ad-text">
              <div className="adsense-test-ad-title">テスト広告タイトル</div>
              <div className="adsense-test-ad-description">
                これはローカル環境でのテスト用広告です。実際のAdSense広告の見た目を模しています。
              </div>
              <div className="adsense-test-ad-url">example.com</div>
            </div>
          </div>
          <div className="adsense-test-ad-footer">
            <div className="adsense-test-ad-info">
              <span className="adsense-test-ad-info-text">テストモード</span>
              <span className="adsense-test-ad-info-separator">•</span>
              <span className="adsense-test-ad-info-text">Slot: {finalAdSlot}</span>
              <span className="adsense-test-ad-info-separator">•</span>
              <span className="adsense-test-ad-info-text">Format: {adFormat}</span>
            </div>
          </div>
        </div>
      )}
      {showPlaceholder && !isDevelopment && (
        <div className="adsense-placeholder">
          <div className="adsense-placeholder-content">
            <div className="adsense-placeholder-icon">📢</div>
            <div className="adsense-placeholder-text">
              <strong>広告を読み込み中...</strong>
              <div className="adsense-placeholder-info">
                <div>パブリッシャーID: {publisherId}</div>
                <div>広告ユニットID: {finalAdSlot}</div>
                <div>フォーマット: {adFormat}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdSense;
