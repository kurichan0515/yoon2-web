'use client';

import { useEffect } from 'react';

// 見出し用 Noto Serif JP（400/500, display=swap）。
// - next/font だと日本語の unicode-range 分割 @font-face（約190KB）が render-blocking CSS になり FCP/LCP が悪化
// - <link media="print"> の非同期読み込みでも、CSS(約60KB) が LCP までの依存に入り Lighthouse の LCP が +0.4s
// そのため window の load 後に stylesheet を注入する。読み込みまではシステム明朝で表示される。
const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500&display=swap';
const LINK_ID = 'noto-serif-jp-css';

export default function SerifFontLoader() {
  useEffect(() => {
    const inject = () => {
      if (document.getElementById(LINK_ID)) return;
      const link = document.createElement('link');
      link.id = LINK_ID;
      link.rel = 'stylesheet';
      link.href = FONTS_URL;
      document.head.appendChild(link);
    };
    if (document.readyState === 'complete') {
      inject();
      return;
    }
    window.addEventListener('load', inject, { once: true });
    return () => window.removeEventListener('load', inject);
  }, []);

  return null;
}
