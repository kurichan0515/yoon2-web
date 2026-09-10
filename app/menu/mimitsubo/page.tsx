import type { Metadata } from 'next';
import PublicLayout from '../../../src/layouts/PublicLayout';
import MimitsuboDetail from '../../../src/views/MimitsuboDetail';

export const metadata: Metadata = {
  title: '耳つぼ施術詳細｜日本フランス式耳つぼ協会認定｜yoon²',
  description: '愛媛県松山市の耳つぼ施術詳細ページ。耳の200以上のツボをもみほぐし、お悩みに合わせたジュエリーをつけ放題で24時間体質改善をサポート。一般社団法人日本フランス式耳つぼ協会認定の技術で施術。ご予約は公式LINEから簡単にどうぞ。',
  openGraph: {
    type: 'website',
    title: '耳つぼ施術詳細｜日本フランス式耳つぼ協会認定｜yoon²',
    description: '愛媛県松山市の耳つぼ施術。200以上のツボをもみほぐし、ジュエリーつけ放題で24時間体質改善をサポート。日本フランス式耳つぼ協会認定。公式LINEから簡単予約。',
    url: 'https://yoon2.com/menu/mimitsubo',
    siteName: 'yoon²',
    locale: 'ja_JP',
    images: [{
      url: 'https://yoon2.com/images/shop/play-room.jpg',
      width: 1920,
      height: 1280,
      alt: 'yoon² - 耳つぼ施術',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '耳つぼ施術詳細｜日本フランス式耳つぼ協会認定｜yoon²',
    description: '愛媛県松山市の耳つぼ施術。200以上のツボをもみほぐし、ジュエリーつけ放題で24時間体質改善をサポート。日本フランス式耳つぼ協会認定。公式LINEから簡単予約。',
    images: ['https://yoon2.com/images/shop/play-room.jpg'],
  },
  alternates: {
    canonical: 'https://yoon2.com/menu/mimitsubo',
    languages: { ja: 'https://yoon2.com/menu/mimitsubo' },
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '耳つぼ施術',
  description: '耳つぼもみほぐし＋ジュエリーつけ放題。200以上のツボから不調にアプローチ。',
  provider: { '@type': 'BeautySalon', name: 'yoon²ゆんゆん' },
  areaServed: { '@type': 'City', name: '松山市' },
  offers: { '@type': 'Offer', priceCurrency: 'JPY', price: '3500' },
};

export default function MimitsuboPage() {
  return (
    <PublicLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <MimitsuboDetail />
    </PublicLayout>
  );
}
