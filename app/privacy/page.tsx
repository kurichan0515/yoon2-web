import PublicLayout from '../../src/layouts/PublicLayout';
import PrivacyPolicy from '../../src/views/PrivacyPolicy';

export const metadata = {
  title: 'プライバシーポリシー | yoon²',
  description: 'yoon²（ゆんゆん）のプライバシーポリシー。個人情報の取り扱いについてご確認ください。',
  alternates: {
    canonical: 'https://yoon2.com/privacy',
    languages: { 'ja': 'https://yoon2.com/privacy' },
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'プライバシーポリシー | yoon²',
  url: 'https://yoon2.com/privacy',
  isPartOf: { '@type': 'WebSite', url: 'https://yoon2.com' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://yoon2.com/' },
    { '@type': 'ListItem', position: 2, name: 'プライバシーポリシー', item: 'https://yoon2.com/privacy' },
  ],
};

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PrivacyPolicy />
    </PublicLayout>
  );
}
