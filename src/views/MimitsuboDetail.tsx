import Image from 'next/image';
import appConfig from '../config/appConfig';
import Breadcrumb from '../components/common/Breadcrumb';
import ReservationCTA from '../components/common/ReservationCTA';
import './MenuDetail.css';

const mimitsuboMenus = appConfig.shop.services.filter(s => s.category === 'mimitubo');

const RECOMMENDS = [
  '耳がカチカチに凝っている気がする',
  '冷えやむくみが気になる',
  '自律神経の乱れ・不眠が気になる',
  'かわいいジュエリーをつけて過ごしたい',
];

const FLOW = [
  { title: 'カウンセリング', desc: '今の体調やお悩み、気になる部位をうかがいます。ジュエリーのデザインや色もこのタイミングでご相談いただけます。' },
  { title: '耳つぼもみほぐし', desc: '200以上あるといわれる耳のツボを、指で丁寧にもみほぐしていきます。耳掃除は行わず、その分もみほぐしにたっぷり時間をかけます。' },
  { title: 'ジュエリーつけ放題', desc: 'お悩みや気分に合わせて、豊富な種類の中からジュエリーをお選びいただけます。個数制限なしで、お好きなだけつけ放題です。' },
  { title: '仕上げ', desc: '鏡でジュエリーの位置を確認しながら仕上げます。施術後も24時間、ツボへの刺激で体質改善をサポートします。' },
];

const FAQ = [
  { q: 'ジュエリーはどのくらい持ちますか？', a: '耳の状態や生活スタイルによって異なりますが、次回のご来店まで楽しんでいただける方が多いです。気になる場合はご来店時にご相談ください。' },
  { q: '金属アレルギーでも大丈夫ですか？', a: 'アレルギーが心配な方は、ご予約時に必ずお申し出ください。肌質やアレルギーの状況に応じてご案内いたします。' },
  { q: '痛みはありますか？', a: '強い痛みが出るような施術ではありませんが、こりの強い部分は押した際に響くような感覚があることがあります。圧の強さは都度調整できますので、遠慮なくお伝えください。' },
  { q: '男性でも利用できますか？', a: 'はい、男性のお客様にもご利用いただけます。完全個室のプライベート空間でリラックスしていただけます。' },
];

export default function MimitsuboDetail() {
  return (
    <div className="detail-page">
      <div className="detail-breadcrumb-wrap">
        <div className="container">
          <Breadcrumb
            items={[
              { name: 'トップ', href: '/' },
              { name: 'メニュー', href: '/?menu=mimitubo' },
              { name: '耳つぼ' },
            ]}
          />
        </div>
      </div>

      <section className="detail-hero">
        <div className="detail-hero-bg">
          <Image
            src="/images/shop/play-room.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="detail-hero-overlay" />
        </div>
        <div className="detail-hero-content">
          <span className="detail-hero-label">Mimitsubo Treatment</span>
          <h1 className="detail-hero-title">200以上のツボから整える、耳つぼ施術</h1>
          <p className="detail-hero-copy">
            耳つぼもみほぐし＋ジュエリーつけ放題で、24時間続く不調ケア。カチカチにこった耳をほぐし、血流とお身体のバランスを整えます。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="detail-section-header">
            <span className="detail-section-label">About the Treatment</span>
            <h2>耳つぼ施術について</h2>
          </div>
          <div className="detail-body">
            <p>
              耳には全身に対応する200以上のツボが集まっているといわれています。耳つぼもみほぐしでカチカチにこった耳をやさしくほぐし、血流を促進。お悩みに合わせたジュエリーをつけ放題で、施術後も24時間体質改善をサポートします。
            </p>
            <p>
              耳掃除は行わず、その分もみほぐしとカウンセリングにたっぷり時間をかけるのが特徴。冷え・むくみ・自律神経の乱れが気になる方、女性に特に人気のメニューです。
            </p>
            <p>
              ジュエリーは種類が豊富で、パーツ選びも楽しみのひとつ。お友達や家族、恋人とおそろいにしたり、お悩みを共有しながら選んだりと、耳つぼ体験の仕方はさまざまです。個数制限なしでつけ放題なので、その日の気分やコーディネートに合わせてお楽しみいただけます。
            </p>
          </div>
          {mimitsuboMenus.length > 0 && (
            <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
              {mimitsuboMenus.map(m => `${m.duration}（¥${m.price.toLocaleString()}〜）`).join(' / ')}
            </p>
          )}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="detail-section-header">
            <span className="detail-section-label">For You</span>
            <h2>こんな方におすすめ</h2>
          </div>
          <div className="detail-recommend-grid">
            {RECOMMENDS.map(item => (
              <div className="detail-recommend-item" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="detail-section-header">
            <span className="detail-section-label">Flow</span>
            <h2>施術の流れ</h2>
          </div>
          <ol className="detail-flow-list">
            {FLOW.map(step => (
              <li className="detail-flow-step" key={step.title}>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="detail-section-header">
            <span className="detail-section-label">Certification</span>
            <h2>認定情報</h2>
          </div>
          <div className="detail-cert-box">
            <span className="detail-cert-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="9" r="6" />
                <path d="M9 14.2 7.5 21 12 18.5 16.5 21 15 14.2" />
              </svg>
            </span>
            <div>
              <h3>一般社団法人日本フランス式耳つぼ協会 認定</h3>
              <p>
                当店の耳つぼ施術は、一般社団法人日本フランス式耳つぼ協会の認定技術に基づいて行っています。詳しくは
                {' '}
                <a
                  href="https://mimitubojapan.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-cert-link"
                >
                  協会公式サイト
                </a>
                {' '}
                をご確認ください。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="detail-section-header">
            <span className="detail-section-label">Gallery</span>
            <h2>施術風景・店内の様子</h2>
          </div>
          <div className="detail-gallery-grid">
            <div className="detail-gallery-item">
              <Image
                src="/images/menus/ear-treatment-2.jpg"
                alt="耳の施術風景"
                width={480}
                height={360}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="detail-gallery-item">
              <Image
                src="/images/menus/ear-treatment-3.jpg"
                alt="耳もみほぐしの施術風景"
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

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="detail-section-header">
            <span className="detail-section-label">FAQ</span>
            <h2>よくある質問</h2>
          </div>
          <div className="detail-faq-list">
            {FAQ.map(item => (
              <div className="detail-faq-item" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReservationCTA
        heading="耳つぼ施術を、公式LINEでご予約"
        description="ジュエリーつけ放題の耳つぼ施術を、公式LINEから簡単にご予約いただけます。"
        sourceLabel="耳つぼ詳細ページ"
      />
    </div>
  );
}
