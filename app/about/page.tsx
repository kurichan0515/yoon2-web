import type { Metadata } from 'next';
import PublicLayout from '../../src/layouts/PublicLayout';
import AboutDetail from '../../src/views/AboutDetail';

export const metadata: Metadata = {
  title: 'yoon²について｜愛媛県松山市の耳つぼ・イヤーエステ専門サロン',
  description: '愛媛県松山市北久米のイヤーエステ・耳つぼ専門サロンyoon²のご紹介ページ。お店が生まれた経緯や大切にしている想い、オーナー紹介、店舗情報を掲載しています。ご予約・ご相談は公式LINEから承っております。',
  openGraph: {
    type: 'website',
    title: 'yoon²について｜愛媛県松山市の耳つぼ・イヤーエステ専門サロン',
    description: '愛媛県松山市北久米のイヤーエステ・耳つぼ専門サロンyoon²のご紹介。お店が生まれた経緯や大切にしている想いを掲載。',
    url: 'https://yoon2.com/about',
    siteName: 'yoon²',
    locale: 'ja_JP',
    images: [{
      url: 'https://yoon2.com/images/about/concept-interior.jpg',
      width: 1920,
      height: 1280,
      alt: 'yoon² - 店内の様子',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'yoon²について｜愛媛県松山市の耳つぼ・イヤーエステ専門サロン',
    description: '愛媛県松山市北久米のイヤーエステ・耳つぼ専門サロンyoon²のご紹介。お店が生まれた経緯や大切にしている想いを掲載。',
    images: ['https://yoon2.com/images/about/concept-interior.jpg'],
  },
  alternates: {
    canonical: 'https://yoon2.com/about',
    languages: { ja: 'https://yoon2.com/about' },
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'yoon²について',
  url: 'https://yoon2.com/about',
  isPartOf: { '@type': 'WebSite', url: 'https://yoon2.com' },
};

export default function AboutPage() {
  return (
    <PublicLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <AboutDetail />
    </PublicLayout>
  );
}
