import Image from 'next/image';
import appConfig from '../config/appConfig';
import Breadcrumb from '../components/common/Breadcrumb';
import ReservationCTA from '../components/common/ReservationCTA';
import './MenuDetail.css';
import './AboutDetail.css';

const VALUES = [
  {
    name: '完全予約制・個室空間',
    description: '他のお客様と顔を合わせることのない完全予約制の個室。周りを気にせず、施術中だけはご自身のための時間をお過ごしいただけます。',
  },
  {
    name: 'イヤーエステ×耳つぼの専門店',
    description: '愛媛県内でも珍しい、イヤーエステと耳つぼに特化したサロン。耳という一点から、心と身体のこわばりをほどいていくことにこだわっています。',
  },
  {
    name: 'お一人おひとりに合わせた施術',
    description: 'その日の体調やお悩みをうかがいながら、圧の強さや時間配分を調整。オーダーメイドの施術で、深いリラクゼーションをお届けします。',
  },
];

export default function AboutDetail() {
  const shop = appConfig.shop;

  return (
    <div className="detail-page about-page">
      <div className="detail-breadcrumb-wrap">
        <div className="container">
          <Breadcrumb
            items={[
              { name: 'トップ', href: '/' },
              { name: 'yoon²について' },
            ]}
          />
        </div>
      </div>

      <section className="detail-hero">
        <div className="detail-hero-bg">
          <Image
            src="/images/about/concept-interior.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="detail-hero-overlay" />
        </div>
        <div className="detail-hero-content">
          <span className="detail-hero-label">About yoon²</span>
          <h1 className="detail-hero-title">yoon²について</h1>
          <p className="detail-hero-copy">
            愛媛県松山市北久米で、イヤーエステと耳つぼの専門サロンとして歩んできたyoon²。お店が生まれた経緯と、大切にしている想いをご紹介します。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-story">
          <div className="detail-section-header">
            <span className="detail-section-label">Our Story</span>
            <h2>お店ができるまで</h2>
          </div>
          <div className="detail-body">
            <p>
              「耳をほぐすと、なぜか身体全体が軽くなる」。そんな体感をもっと多くの方に届けたいという想いから、yoon²は生まれました。肩こりや頭の重さ、なかなか取れない疲れに向き合ってきた中で、耳という一点にアプローチすることの奥深さに惹かれ、イヤーエステと耳つぼを専門に扱うサロンとして愛媛県松山市北久米に店を構えました。
            </p>
            <p>
              オープンから今日まで数年、口コミやご紹介を通じて少しずつお客様の輪が広がり、女性の方はもちろん、最近では男性のお客様にもご利用いただけるサロンへと育ってきました。「ここに来るとほっとする」と言っていただけることが、何よりの励みです。
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="detail-section-header">
            <span className="detail-section-label">Our Values</span>
            <h2>大切にしていること</h2>
          </div>
          <div className="detail-oil-grid">
            {VALUES.map(v => (
              <div className="detail-oil-card" key={v.name}>
                <h3>{v.name}</h3>
                <p>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="detail-section-header">
            <span className="detail-section-label">Owner</span>
            <h2>オーナー紹介</h2>
          </div>
          <div className="detail-cert-box">
            <span className="detail-cert-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="9" r="6" />
                <path d="M9 14.2 7.5 21 12 18.5 16.5 21 15 14.2" />
              </svg>
            </span>
            <div>
              <h3>yuki</h3>
              <p>
                一般社団法人日本フランス式耳つぼ協会認定の技術で、耳つぼ・イヤーエステ施術を担当。お客様一人ひとりの体調やお悩みに向き合い、心身がゆるむ時間をご提供しています。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="detail-section-header">
            <span className="detail-section-label">Gallery</span>
            <h2>店内の様子</h2>
          </div>
          <div className="detail-gallery-grid">
            <div className="detail-gallery-item">
              <Image
                src="/images/menus/oil-treatment.jpg"
                alt="施術風景"
                width={480}
                height={360}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="detail-gallery-item">
              <Image
                src="/images/shop/play-room.jpg"
                alt="施術ベッドのある個室"
                width={480}
                height={360}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="detail-gallery-item">
              <Image
                src="/images/about/concept-interior.jpg"
                alt="落ち着いた雰囲気の施術室"
                width={480}
                height={360}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section about-shop-summary">
        <div className="container">
          <div className="detail-section-header">
            <span className="detail-section-label">Shop Data</span>
            <h2>店舗情報</h2>
          </div>
          <dl className="about-shop-dl">
            <div>
              <dt>店名</dt>
              <dd>{shop.name}</dd>
            </div>
            <div>
              <dt>所在地</dt>
              <dd>{shop.address}</dd>
            </div>
            <div>
              <dt>営業時間</dt>
              <dd>{shop.hours.weekday}</dd>
            </div>
            <div>
              <dt>定休日</dt>
              <dd>{shop.holidays}</dd>
            </div>
          </dl>
        </div>
      </section>

      <ReservationCTA
        heading="一度、耳をゆるめにいらしてください"
        description="ご予約・ご相談は公式LINEから承っております。"
        sourceLabel="yoon²についてページ"
      />
    </div>
  );
}
