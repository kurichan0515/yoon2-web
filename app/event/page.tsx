import PublicLayout from '../../src/layouts/PublicLayout';
import Event from '../../src/views/Event';

export const metadata = {
  title: '出張イヤーエステイベント募集｜yoon²（ゆんゆん）愛媛・松山',
  description: '愛媛県松山市の耳つぼ・イヤーエステ専門サロンyoon²が、出張イベント開催先を募集中。ホテル・温泉施設・福祉施設・マルシェなどで耳かき・イヤーエステ体験イベントを開催できる施設様を探しています。お気軽にLINEでご相談ください。',
  openGraph: {
    type: 'website' as const,
    title: '出張イヤーエステイベント募集｜yoon²（ゆんゆん）愛媛・松山',
    description: '愛媛県松山市の耳つぼ・イヤーエステ専門サロンyoon²が、出張イベント開催先を募集中。ホテル・温泉施設・福祉施設・マルシェなどで開催できる施設様を探しています。',
    url: 'https://yoon2.com/event',
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
    title: '出張イヤーエステイベント募集｜yoon²（ゆんゆん）愛媛・松山',
    description: '愛媛県松山市の耳つぼ・イヤーエステ専門サロンyoon²が、出張イベント開催先を募集中。ホテル・温泉施設・福祉施設・マルシェなどで開催できる施設様を探しています。',
    images: ['https://yoon2.com/images/about/concept-interior.jpg'],
  },
  alternates: {
    canonical: 'https://yoon2.com/event',
    languages: { 'ja': 'https://yoon2.com/event' },
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '出張イヤーエステイベント募集',
  url: 'https://yoon2.com/event',
  isPartOf: { '@type': 'WebSite', url: 'https://yoon2.com' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://yoon2.com/' },
    { '@type': 'ListItem', position: 2, name: '出張イベント募集', item: 'https://yoon2.com/event' },
  ],
};

export default function EventPage() {
  return (
    <PublicLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Event />
    </PublicLayout>
  );
}
