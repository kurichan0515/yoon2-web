import HomeSns from '../../src/views/HomeSns';
import { MENU_DATA, getMenuStructuredData } from '../../src/data/menuData';
import { FAQ_DATA, getFaqStructuredData } from '../../src/data/faqData';

export const metadata = {
  title: 'yoon² | メニュー・予約 - 松山の耳つぼ・イヤーエステ',
  description: '愛媛県松山市の耳つぼ・イヤーエステ専門サロン yoon²のメニューと予約案内。初回割引あり。ホットペッパービューティー・LINE・お電話で予約受付中。',
  openGraph: {
    type: 'website' as const,
    title: 'yoon² | メニュー・予約',
    description: '愛媛県松山市の耳つぼ・イヤーエステ専門サロン。初回割引あり。ホットペッパー・LINE予約受付中。',
    url: 'https://yoon2.com/sns',
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
    title: 'yoon² | メニュー・予約',
    description: '愛媛県松山市の耳つぼ・イヤーエステ専門サロン。初回割引あり。ホットペッパー・LINE予約受付中。',
    images: ['https://yoon2.com/images/about/concept-interior.jpg'],
  },
  alternates: {
    canonical: 'https://yoon2.com/sns',
    languages: { 'ja': 'https://yoon2.com/sns' },
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'yoon² メニュー・予約',
  url: 'https://yoon2.com/sns',
  isPartOf: { '@type': 'WebSite', url: 'https://yoon2.com' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://yoon2.com/' },
    { '@type': 'ListItem', position: 2, name: 'メニュー・予約', item: 'https://yoon2.com/sns' },
  ],
};

const srOnly: React.CSSProperties = {
  position: 'absolute', width: '1px', height: '1px', padding: 0,
  margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap', borderWidth: 0,
};

export default function SnsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: getMenuStructuredData() }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: getFaqStructuredData() }} />

      {/* クローラー向け静的コンテンツ */}
      <div style={srOnly} aria-hidden="true">
        <h1>yoon² メニュー・予約 - 松山の耳つぼ・イヤーエステ専門サロン</h1>

        <h2>施術メニュー・料金</h2>
        {MENU_DATA.map(cat => (
          <section key={cat.categoryKey}>
            <h3>{cat.category}</h3>
            <p>{cat.description}</p>
            {cat.menus.map(menu => (
              <div key={menu.id}>
                <h4>{menu.name}</h4>
                <p>¥{menu.price.toLocaleString()} / {menu.time}分</p>
                <p>{menu.description}</p>
              </div>
            ))}
          </section>
        ))}

        <h2>よくあるご質問</h2>
        {FAQ_DATA.map(cat => (
          <section key={cat.categoryKey}>
            <h3>{cat.category}</h3>
            {cat.items.map(item => (
              <div key={item.id}>
                <h4>{item.question}</h4>
                <p>{item.answerText}</p>
              </div>
            ))}
          </section>
        ))}
      </div>

      <HomeSns />
    </>
  );
}
