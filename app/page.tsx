import PublicLayout from '../src/layouts/PublicLayout';
import Home from '../src/views/Home';
import { MENU_DATA, getMenuStructuredData } from '../src/data/menuData';
import { FAQ_DATA, getFaqStructuredData } from '../src/data/faqData';
import appConfig from '../src/config/appConfig';

// visually-hidden: クローラー可読・視覚的不可視
const srOnly: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
};

export default function HomePage() {
  const { shop } = appConfig;
  const stations = shop.access.stations.filter(Boolean);

  return (
    <PublicLayout>
      <Home />

      {/* ページ固有 JSON-LD (FAQ・メニュー) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getFaqStructuredData() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getMenuStructuredData() }}
      />

      {/* サーバーレンダリング静的コンテンツ (クローラー向け) */}
      <div style={srOnly} aria-hidden="true">
        <h2 id="ssg-shop">{shop.name} - 松山の耳つぼ・イヤーエステ専門サロン</h2>
        <p>住所: {shop.address}</p>
        <p>営業時間: {shop.hours.weekday}</p>
        <p>電話番号: {shop.phone}</p>
        {stations.length > 0 && <p>アクセス: {stations.join(' / ')}</p>}
        <p>{shop.description}</p>

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
    </PublicLayout>
  );
}
