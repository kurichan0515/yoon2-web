import type { Metadata } from 'next';
import PublicLayout from '../../../src/layouts/PublicLayout';
import EarEsteDetail, { EAR_ESTE_FAQ } from '../../../src/views/EarEsteDetail';
import { MENU_DATA } from '../../../src/data/menuData';

const earEsteMenus = MENU_DATA.find(c => c.categoryKey === 'ear-este')?.menus ?? [];
const earEsteMinPrice = Math.min(...earEsteMenus.map(m => m.price));
const firstVisitMenu = earEsteMenus.find(m => m.id === 'ear-40-new');
const priceText = firstVisitMenu
  ? `${firstVisitMenu.time}分${firstVisitMenu.price.toLocaleString()}円〜（初回）`
  : `${earEsteMinPrice.toLocaleString()}円〜`;

const TITLE = 'イヤーエステとは？松山の見える耳かき専門店｜yoon²';
const DESCRIPTION = `イヤーエステとは、イヤースコープで耳の中を一緒に見ながら行う耳かき・耳掃除と、耳まわりのケアを組み合わせた施術です。松山市北久米のyoon²で${priceText}。施術の流れ・料金・よくある質問をご紹介します。`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://yoon2.com/menu/ear-este/',
    siteName: 'yoon²',
    locale: 'ja_JP',
    images: [{
      url: 'https://yoon2.com/images/menus/ear-treatment-2.jpg',
      width: 1600,
      height: 1067,
      alt: 'yoon² - イヤーエステ',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['https://yoon2.com/images/menus/ear-treatment-2.jpg'],
  },
  alternates: {
    canonical: 'https://yoon2.com/menu/ear-este/',
    languages: { ja: 'https://yoon2.com/menu/ear-este/' },
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'イヤーエステ',
  description: 'イヤースコープで耳の中を見ながら行う耳かき・耳掃除と、耳まわりのケア。',
  provider: { '@type': 'BeautySalon', name: 'yoon²ゆんゆん' },
  areaServed: { '@type': 'City', name: '松山市' },
  offers: { '@type': 'Offer', priceCurrency: 'JPY', price: String(earEsteMinPrice) },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: EAR_ESTE_FAQ.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function EarEstePage() {
  return (
    <PublicLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EarEsteDetail />
    </PublicLayout>
  );
}
