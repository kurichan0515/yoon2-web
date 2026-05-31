'use client';

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;600;700&family=Montserrat:wght@300;400;600;700&family=League+Spartan:wght@400;600;700&family=Noto+Sans+JP:wght@300;400;700&display=swap';

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
