import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google';

// 見出し・キャッチコピー用。使用ウェイトのみに限定（LCP悪化防止）
export const notoSerif = Noto_Serif_JP({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-serif',
});

// 本文・ナビゲーション・ボタン用
export const notoSans = Noto_Sans_JP({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
});
