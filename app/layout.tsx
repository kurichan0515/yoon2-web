import type { Metadata } from 'next';
import Script from 'next/script';
import '../src/App.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://yoon2.com'),
  title: 'yoon² | 松山の耳つぼ・イヤーエステ専門サロン',
  description: '愛媛県松山市の耳つぼ・イヤーエステ専門サロン。初回3,500円～、オンライン予約OK。北久米駅徒歩5分、駐車場完備。',
  openGraph: {
    type: 'website',
    title: 'yoon² | 松山の耳つぼ・イヤーエステ専門サロン',
    description: '愛媛県松山市の耳つぼ・イヤーエステ専門サロン。初回3,500円～、オンライン予約OK。北久米駅徒歩5分、駐車場完備。',
    url: 'https://yoon2.com',
    siteName: 'yoon²',
    locale: 'ja_JP',
    images: [
      {
        url: 'https://yoon2.com/logo512.png',
        width: 512,
        height: 512,
        alt: 'yoon² - 松山の耳つぼ・イヤーエステ専門サロン',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'yoon² | 松山の耳つぼ・イヤーエステ専門サロン',
    description: '愛媛県松山市の耳つぼ・イヤーエステ専門サロン。初回3,500円～、オンライン予約OK。北久米駅徒歩5分、駐車場完備。',
    images: ['https://yoon2.com/logo512.png'],
  },
  alternates: {
    canonical: 'https://yoon2.com/',
  },
  icons: {
    icon: '/favicon-32x32.png',
    apple: '/logo192.png',
  },
  themeColor: '#000000',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'yoon²ゆんゆん',
  description: 'イヤーエステと耳つぼで心身のバランスを整える専門サロンです。お客様一人ひとりに合わせたオーダーメイドの施術で、深いリラクゼーションを提供いたします。',
  url: 'https://yoon2.com',
  telephone: '080-8478-1163',
  address: {
    '@type': 'PostalAddress',
    addressLocality: '松山市',
    addressRegion: '愛媛県',
    streetAddress: '北久米町438',
    postalCode: '790-0923',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '33.809619',
    longitude: '132.793664',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '20:00',
    },
  ],
  priceRange: '¥2,500-¥12,500',
  paymentAccepted: '現金, クレジットカード, 電子マネー',
  currenciesAccepted: 'JPY',
  areaServed: { '@type': 'City', name: '松山市' },
  sameAs: [
    'https://www.instagram.com/yoo.n.yoo.n/',
    'https://lin.ee/lyyKSqu',
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '施術メニュー',
  itemListElement: [
    {
      '@type': 'Service',
      position: 1,
      name: 'イヤーエステ',
      description: '耳周りの筋肉をほぐし、顔のむくみ・リフトアップに効果的なエステ',
      provider: { '@type': 'BeautySalon', name: 'yoon²ゆんゆん' },
      areaServed: { '@type': 'City', name: '松山市' },
      offers: { '@type': 'Offer', priceCurrency: 'JPY', price: '3500' },
    },
    {
      '@type': 'Service',
      position: 2,
      name: '耳つぼもみほぐし',
      description: '耳のツボを刺激し自律神経を整えるリラクゼーション施術',
      provider: { '@type': 'BeautySalon', name: 'yoon²ゆんゆん' },
      areaServed: { '@type': 'City', name: '松山市' },
      offers: { '@type': 'Offer', priceCurrency: 'JPY', price: '2500' },
    },
    {
      '@type': 'Service',
      position: 3,
      name: '耳つぼジュエリー',
      description: '耳つぼもみほぐし＋ジュエリーつけ放題。女性人気No.1メニュー',
      provider: { '@type': 'BeautySalon', name: 'yoon²ゆんゆん' },
      areaServed: { '@type': 'City', name: '松山市' },
      offers: { '@type': 'Offer', priceCurrency: 'JPY', price: '3500' },
    },
    {
      '@type': 'Service',
      position: 4,
      name: 'ヘッドスパ',
      description: '頭皮マッサージで血行促進・ストレス解消',
      provider: { '@type': 'BeautySalon', name: 'yoon²ゆんゆん' },
      areaServed: { '@type': 'City', name: '松山市' },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://yoon2.com/' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preload" as="image" href="/images/shop/play-room.jpg" media="(min-width: 769px)" />
        <link rel="preload" as="image" href="/images/hero/hero-sp.jpg" media="(max-width: 768px)" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;600;700&family=Montserrat:wght@300;400;600;700&family=League+Spartan:wght@400;600;700&family=Noto+Sans+JP:wght@300;400;700&display=swap"
          media="print"
          // @ts-ignore
          onLoad="this.media='all'"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body style={{ backgroundColor: '#f4f1eb', margin: 0 }}>
        {children}
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6862900859746528"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=AW-621590738`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-621590738');
            gtag('config', '${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || ''}');
          `}
        </Script>
      </body>
    </html>
  );
}
