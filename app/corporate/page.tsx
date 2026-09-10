import PublicLayout from '../../src/layouts/PublicLayout';
import Corporate from '../../src/views/Corporate';

export const metadata = {
  title: '法人契約プラン | yoon² - 松山の耳つぼ・イヤーエステ専門サロン',
  description: '従業員様の福利厚生・リフレッシュ・社内表彰に。yoon²の法人契約プランでは、まとめてチケットをご購入いただき、従業員様が自由にイヤーエステ・オールインワンコースをご利用いただけます。',
  openGraph: {
    type: 'website' as const,
    title: '法人契約プラン | yoon²',
    description: '従業員様の福利厚生・リフレッシュ・社内表彰に。まとめてチケットをご購入いただき、従業員様が自由にご利用いただける法人向けプランです。',
    url: 'https://yoon2.com/corporate',
    siteName: 'yoon²',
    locale: 'ja_JP',
    images: [{
      url: 'https://yoon2.com/images/about/concept-interior.jpg',
      width: 1920,
      height: 1280,
      alt: 'yoon² - 松山の耳つぼ・イヤーエステ専門サロン',
    }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: '法人契約プラン | yoon²',
    description: '従業員様の福利厚生・リフレッシュ・社内表彰に。まとめてチケットをご購入いただき、従業員様が自由にご利用いただける法人向けプランです。',
    images: ['https://yoon2.com/images/about/concept-interior.jpg'],
  },
  alternates: {
    canonical: 'https://yoon2.com/corporate',
    languages: { 'ja': 'https://yoon2.com/corporate' },
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '法人契約プラン | yoon²',
  url: 'https://yoon2.com/corporate',
  isPartOf: { '@type': 'WebSite', url: 'https://yoon2.com' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://yoon2.com/' },
    { '@type': 'ListItem', position: 2, name: '法人契約プラン', item: 'https://yoon2.com/corporate' },
  ],
};

export default function CorporatePage() {
  return (
    <PublicLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Corporate />
    </PublicLayout>
  );
}
