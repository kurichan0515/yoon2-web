import React, { useEffect, useRef, useState } from 'react';
import appConfig from '../../config/appConfig';
import logger from '../../utils/logger';
import './AdSense.css';

/**
 * Google AdSense広告コンポーネント
 * 
 * 使用方法:
 * <AdSense 
 *   adSlot="1234567890"  // AdSense広告ユニットID（オプション、設定ファイルのデフォルト値を使用）
 *   adFormat="auto"      // 広告フォーマット: "auto", "rectangle", "horizontal", "vertical"
 *   style={{ display: 'block' }}
 *   className="adsense-container"
 * />
 * 
 * 注意:
 * - adSlotはGoogle AdSenseで取得した広告ユニットIDを設定してください
 * - 設定ファイル（appConfig.js）でデフォルト値を設定できます
 * - 広告は審査通過後に表示されます
 * - クリック誘導は禁止されています
 * - ローカル環境では開発用プレースホルダーが表示されます
 */
const AdSense = ({ 
  adSlot, 
  adFormat = 'auto',
  style = {},
  className = '',
  fullWidthResponsive = true 
}) => {
  const adRef = useRef(null);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [scriptReady, setScriptReady] = useState(typeof window !== 'undefined' && !!window.adsbygoogle);
  
  // AdSenseが有効でない場合は何も表示しない
  if (!appConfig.adsense.enabled) {
    return null;
  }

  // adSlotが指定されていない場合は設定ファイルのデフォルト値を使用
  const finalAdSlot = adSlot || appConfig.adsense.defaultAdSlot;
  const publisherId = appConfig.adsense.publisherId;

  // 開発環境かどうかを判定（localhost、127.0.0.1、または環境変数で制御）
  const isDevelopment = 
    process.env.NODE_ENV === 'development' || 
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    process.env.REACT_APP_ADSENSE_DEV_MODE === 'true';

  // 遅延読み込みされた adsbygoogle.js の準備完了を待つ（イベント発火がマウントより先の場合はポーリングで検知）
  useEffect(() => {
    if (isDevelopment || scriptReady) return;
    const onReady = () => setScriptReady(true);
    window.addEventListener('adsbygoogle-ready', onReady);
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      setScriptReady(true);
      return () => window.removeEventListener('adsbygoogle-ready', onReady);
    }
    let elapsed = 0;
    const poll = setInterval(() => {
      elapsed += 300;
      if (window.adsbygoogle) {
        setScriptReady(true);
        clearInterval(poll);
      } else if (elapsed >= 10000) clearInterval(poll);
    }, 300);
    return () => {
      window.removeEventListener('adsbygoogle-ready', onReady);
      clearInterval(poll);
    };
  }, [isDevelopment, scriptReady]);

  useEffect(() => {
    if (!finalAdSlot) {
      logger.warn('AdSense: adSlot is not configured');
      return;
    }

    // 開発環境ではプレースホルダーを表示
    if (isDevelopment) {
      setShowPlaceholder(true);
      logger.debug('AdSense: Development mode - showing placeholder', { 
        adSlot: finalAdSlot, 
        adFormat,
        publisherId 
      });
      return;
    }

    // 本番: スクリプトがまだならプレースホルダーのまま（scriptReady で再実行される）
    if (!scriptReady || !window.adsbygoogle) {
      setShowPlaceholder(true);
      return;
    }

    try {
      setShowPlaceholder(false);
      requestAnimationFrame(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          logger.debug('AdSense: Ad unit initialized', { adSlot: finalAdSlot, adFormat });
        } catch (e) {
          logger.error('AdSense: Error initializing ad unit', e);
          setShowPlaceholder(true);
          return;
        }
        setTimeout(() => {
          const adElement = adRef.current;
          if (adElement && adElement.offsetHeight === 0) setShowPlaceholder(true);
        }, 2000);
      });
    } catch (error) {
      logger.error('AdSense: Error initializing ad unit', error);
      setShowPlaceholder(true);
    }
  }, [finalAdSlot, adFormat, publisherId, isDevelopment, scriptReady]);

  if (!finalAdSlot || !publisherId) {
    return null;
  }

  return (
    <div 
      className={`adsense-wrapper ${className} ${showPlaceholder ? 'adsense-placeholder-mode' : ''}`}
      style={style}
    >
      {/* 実際のAdSense広告 */}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: showPlaceholder ? 'none' : 'block',
          ...(fullWidthResponsive && { width: '100%' })
        }}
        data-ad-client={publisherId}
        data-ad-slot={finalAdSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
      
      {/* 開発用テスト広告 */}
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
      
      {/* 本番環境でのフォールバックプレースホルダー */}
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
