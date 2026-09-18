import type { Metadata } from 'next';
import PublicLayout from '../../../src/layouts/PublicLayout';
import EarEsteDetail from '../../../src/views/EarEsteDetail';
import { MENU_DATA } from '../../../src/data/menuData';

const earEsteMenus = MENU_DATA.find(c => c.categoryKey === 'ear-este')?.menus ?? [];
const earEsteMinPrice = Math.min(...earEsteMenus.map(m => m.price));

export const metadata: Metadata = {
  title: 'イヤーエステ｜愛媛初の見る耳かき｜yoon²(松山市)',
  description: '愛媛県初、イヤースコープで耳の中を見ながら受けられる新感覚のイヤーエステ。松山市のサロンyoon²で、プロによる見る耳かきと自律神経ケアを体験。頭や耳の重だるさが気になる方に。ご予約は公式LINEから簡単に。',
  openGraph: {
    type: 'website',
    title: 'イヤーエステ｜愛媛初の見る耳かき｜yoon²(松山市)',
    description: '愛媛県初、イヤースコープで耳の中を見ながら受けられる新感覚のイヤーエステ。プロによる見る耳かきと自律神経ケアを体験できます。',
    url: 'https://yoon2.com/menu/ear-este',
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
    title: 'イヤーエステ｜愛媛初の見る耳かき｜yoon²(松山市)',
    description: '愛媛県初、イヤースコープで耳の中を見ながら受けられる新感覚のイヤーエステ。プロによる見る耳かきと自律神経ケアを体験できます。',
    images: ['https://yoon2.com/images/menus/ear-treatment-2.jpg'],
  },
  alternates: {
    canonical: 'https://yoon2.com/menu/ear-este',
    languages: { ja: 'https://yoon2.com/menu/ear-este' },
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'イヤーエステ',
  description: 'イヤースコープで耳の中を見ながら受けられる見る耳かき。自律神経を刺激し頭や耳の重だるさをケア。',
  provider: { '@type': 'BeautySalon', name: 'yoon²ゆんゆん' },
  areaServed: { '@type': 'City', name: '松山市' },
  offers: { '@type': 'Offer', priceCurrency: 'JPY', price: String(earEsteMinPrice) },
};

export default function EarEstePage() {
  return (
    <PublicLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <EarEsteDetail />
    </PublicLayout>
  );
}
