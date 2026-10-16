import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { notoSans, notoSerif } from './fonts';
import appConfig from '../src/config/appConfig';
import '../src/App.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://yoon2.com'),
  title: 'yoon²|イヤーエステ×オイルリンパ専門店【愛媛初・北久米駅4分】',
  description: '愛媛初の耳つぼ×イヤーエステ専門サロン。ホットペッパービューティー評価4.93、見える耳かきとオイルリンパで凝りやむくみをやさしくほぐす。北久米駅徒歩4分、初回4,500円〜。',
  openGraph: {
    type: 'website',
    title: 'yoon²|イヤーエステ×オイルリンパ専門店【愛媛初・北久米駅4分】',
    description: '愛媛初の耳つぼ×イヤーエステ専門サロン。ホットペッパービューティー評価4.93、見える耳かきとオイルリンパで凝りやむくみをやさしくほぐす。北久米駅徒歩4分、初回4,500円〜。',
    url: 'https://yoon2.com',
    siteName: 'yoon²',
    locale: 'ja_JP',
    images: [
      {
        url: 'https://yoon2.com/images/about/concept-interior.jpg',
        width: 1920,
        height: 1280,
        alt: 'yoon² - 松山の耳つぼ・イヤーエステ専門サロン',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'yoon²|イヤーエステ×オイルリンパ専門店【愛媛初・北久米駅4分】',
    description: '愛媛初の耳つぼ×イヤーエステ専門サロン。ホットペッパービューティー評価4.93、見える耳かきとオイルリンパで凝りやむくみをやさしくほぐす。北久米駅徒歩4分、初回4,500円〜。',
    images: ['https://yoon2.com/images/about/concept-interior.jpg'],
  },
  alternates: {
    canonical: 'https://yoon2.com/',
    languages: {
      'ja': 'https://yoon2.com/',
    },
  },
  icons: {
    icon: '/favicon-32x32.png',
    apple: '/logo192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#332D28',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'yoon²ゆんゆん',
  description: 'イヤーエステと耳つぼで心身のバランスを整える専門サロンです。お客様一人ひとりに合わせたオーダーメイドの施術で、深いリラクゼーションを提供いたします。',
  url: 'https://yoon2.com',
  telephone: appConfig.shop.phone,
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
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '20:00',
    },
  ],
  priceRange: '¥3,500-¥17,500',
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
      offers: { '@type': 'Offer', priceCurrency: 'JPY', price: '4500' },
    },
    {
      '@type': 'Service',
      position: 2,
      name: '耳つぼ',
      description: '耳のツボを刺激し自律神経を整えるリラクゼーション施術（ジュエリー込み）',
      provider: { '@type': 'BeautySalon', name: 'yoon²ゆんゆん' },
      areaServed: { '@type': 'City', name: '松山市' },
      offers: { '@type': 'Offer', priceCurrency: 'JPY', price: '3500' },
    },
    {
      '@type': 'Service',
      position: 3,
      name: 'オイルリンパ',
      description: '五行和漢オイルを使用した全身リンパトリートメント',
      provider: { '@type': 'BeautySalon', name: 'yoon²ゆんゆん' },
      areaServed: { '@type': 'City', name: '松山市' },
      offers: { '@type': 'Offer', priceCurrency: 'JPY', price: '7800' },
    },
    {
      '@type': 'Service',
      position: 4,
      name: 'ヘッドスパ',
      description: '頭皮マッサージで血行促進・ストレス解消',
      provider: { '@type': 'BeautySalon', name: 'yoon²ゆんゆん' },
      areaServed: { '@type': 'City', name: '松山市' },
      offers: { '@type': 'Offer', priceCurrency: 'JPY', price: '4500' },
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
    <html lang="ja" className={`${notoSerif.variable} ${notoSans.variable}`}>
      <head>
        {/* LCP 画像 preload */}
        <link rel="preload" as="image" href="/images/shop/play-room.webp" media="(min-width: 769px)" />
        <link rel="preload" as="image" href="/images/hero/hero-sp.webp" media="(max-width: 768px)" />
        {/* AdSense: <Script> で strategy を付けると data-nscript が付与され警告になるため直接 <script> タグを使用 */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6862900859746528"
          crossOrigin="anonymous"
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
      <body style={{ backgroundColor: 'var(--color-off-white)', margin: 0 }}>
        {children}
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
