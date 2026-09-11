import type { Metadata } from 'next';
import PublicLayout from '../../../src/layouts/PublicLayout';
import OilLymphDetail from '../../../src/views/OilLymphDetail';

export const metadata: Metadata = {
  title: 'オイルこだわりのリンパトリートメント｜yoon²(松山市)',
  description: '愛媛県松山市のオイルリンパトリートメント。肌にやさしい厳選オイルを使用し、滞ったリンパをじっくり丁寧に流して冷え・むくみ・全身の重だるさをケア。オイル選定のこだわりや60分・90分の施術の流れも紹介。ご予約は公式LINEから簡単に。',
  openGraph: {
    type: 'website',
    title: 'オイルこだわりのリンパトリートメント｜yoon²(松山市)',
    description: '愛媛県松山市のオイルリンパトリートメント。厳選オイルで滞ったリンパをじっくり丁寧に流し、冷え・むくみ・全身の重だるさをケア。ご予約は公式LINEから簡単に。',
    url: 'https://yoon2.com/menu/oil-lymph',
    siteName: 'yoon²',
    locale: 'ja_JP',
    images: [{
      url: 'https://yoon2.com/images/menus/oil-treatment.jpg',
      width: 1600,
      height: 1067,
      alt: 'yoon² - オイルリンパトリートメント',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'オイルこだわりのリンパトリートメント｜yoon²(松山市)',
    description: '愛媛県松山市のオイルリンパトリートメント。厳選オイルで滞ったリンパをじっくり丁寧に流し、冷え・むくみ・全身の重だるさをケア。ご予約は公式LINEから簡単に。',
    images: ['https://yoon2.com/images/menus/oil-treatment.jpg'],
  },
  alternates: {
    canonical: 'https://yoon2.com/menu/oil-lymph',
    languages: { ja: 'https://yoon2.com/menu/oil-lymph' },
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'オイルリンパトリートメント',
  description: '厳選オイルを使用したリンパドレナージュ。冷え性やむくみ、身体の重だるさを解消。',
  provider: { '@type': 'BeautySalon', name: 'yoon²ゆんゆん' },
  areaServed: { '@type': 'City', name: '松山市' },
  offers: { '@type': 'Offer', priceCurrency: 'JPY', price: '6800' },
};

export default function OilLymphPage() {
  return (
    <PublicLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <OilLymphDetail />
    </PublicLayout>
  );
}
