import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import FontLoader from './font-loader';
import appConfig from '../src/config/appConfig';
import { MENU_DATA } from '../src/data/menuData';
import '../src/App.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://yoon2.com'),
  title: '松山の耳かき・イヤーエステ専門店 yoon²｜見える耳掃除×オイルリンパ【北久米駅4分】',
  description: '松山市北久米の耳かき・イヤーエステ専門店。イヤースコープで"見える耳掃除"、和漢オイルリンパで凝り・むくみをやさしくケア。ホットペッパー評価4.93、初回40分4,500円〜。北久米駅徒歩4分・駐車場あり・木曜定休。',
  openGraph: {
    type: 'website',
    title: '松山の耳かき・イヤーエステ専門店 yoon²｜見える耳掃除×オイルリンパ【北久米駅4分】',
    description: '松山市北久米の耳かき・イヤーエステ専門店。イヤースコープで"見える耳掃除"、和漢オイルリンパで凝り・むくみをやさしくケア。ホットペッパー評価4.93、初回40分4,500円〜。北久米駅徒歩4分・駐車場あり・木曜定休。',
    url: 'https://yoon2.com',
    siteName: 'yoon²',
    locale: 'ja_JP',
    images: [
      {
        url: 'https://yoon2.com/images/about/concept-interior.jpg',
        width: 1920,
        height: 1280,
        alt: 'yoon² - 松山の耳かき・イヤーエステ専門店',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '松山の耳かき・イヤーエステ専門店 yoon²｜見える耳掃除×オイルリンパ【北久米駅4分】',
    description: '松山市北久米の耳かき・イヤーエステ専門店。イヤースコープで"見える耳掃除"、和漢オイルリンパで凝り・むくみをやさしくケア。ホットペッパー評価4.93、初回40分4,500円〜。北久米駅徒歩4分・駐車場あり・木曜定休。',
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
  themeColor: '#000000',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'yoon²ゆんゆん',
  description: '見える耳かき（イヤーエステ）と和漢オイルリンパの専門サロン。お客様一人ひとりに合わせた施術で、深いリラクゼーションを提供いたします。',
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

// 価格は menuData の新規/初回価格（初回が無いメニューは通常価格）に揃える
const menuPrice = (id: string) => {
  const menu = MENU_DATA.flatMap(cat => cat.menus).find(m => m.id === id);
  if (!menu) throw new Error(`menuData に ${id} がありません`);
  return String(menu.price);
};

const SERVICES = [
  { name: 'イヤーエステ', menuId: 'ear-40-new', description: 'イヤースコープで見ながら行う耳かき・耳掃除と、耳まわりのケアで顔まわりもすっきり' },
  { name: 'イヤーエステ×オイルリンパ', menuId: 'ear-oil-100-new', description: 'イヤーエステ40分と和漢オイルリンパを組み合わせたセットコース' },
  { name: 'オイルリンパ', menuId: 'oil-90-new', description: '五行和漢オイルを使用した全身リンパトリートメント' },
  { name: 'ヘッドスパ', menuId: 'headspa-40', description: '耳まわりからほぐすドライヘッドスパで頭と首のこわばりをリセット' },
  { name: '耳つぼ', menuId: 'mimitubo-regular', description: '耳のツボを刺激し自律神経を整えるリラクゼーション施術（ジュエリー込み）' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '施術メニュー',
  itemListElement: SERVICES.map((service, i) => ({
    '@type': 'Service',
    position: i + 1,
    name: service.name,
    description: service.description,
    provider: { '@type': 'BeautySalon', name: 'yoon²ゆんゆん' },
    areaServed: { '@type': 'City', name: '松山市' },
    offers: { '@type': 'Offer', priceCurrency: 'JPY', price: menuPrice(service.menuId) },
  })),
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
        {/* LCP 画像 preload */}
        <link rel="preload" as="image" href="/images/shop/play-room.webp" media="(min-width: 769px)" />
        <link rel="preload" as="image" href="/images/hero/hero-sp.webp" media="(max-width: 768px)" />
        {/* fonts.gstatic.com のみ preconnect (実際のフォントファイル取得先) */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <FontLoader />
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
