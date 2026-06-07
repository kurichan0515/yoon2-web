'use client';

// Noto Sans JP はシステムフォント優先にしてWebフォント読み込みを排除
// Cinzel は HomeSns のセクション見出しで使用
const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;600&family=League+Spartan:wght@400;700&family=Cinzel:wght@400;700&display=swap';

export default function FontLoader() {
  return (
    <link
      rel="stylesheet"
      href={FONTS_URL}
      media="print"
      onLoad={(e) => {
        const el = e.currentTarget as HTMLLinkElement;
        if (el.media !== 'all') el.media = 'all';
      }}
    />
  );
}
