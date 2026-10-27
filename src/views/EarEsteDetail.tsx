import Image from 'next/image';
import Link from 'next/link';
import appConfig from '../config/appConfig';
import { MENU_DATA } from '../data/menuData';
import Breadcrumb from '../components/common/Breadcrumb';
import ReservationCTA from '../components/common/ReservationCTA';
import './MenuDetail.css';

const earEsteMenus = (MENU_DATA.find(c => c.categoryKey === 'ear-este')?.menus ?? [])
  .filter(m => (appConfig.features as { firstVisitDiscount?: boolean }).firstVisitDiscount || !m.newCustomer);

const RECOMMENDS = [
  '自分の耳の中がどうなっているか見てみたい',
  '休んでも疲れが取れない、頭や目が重い',
  '耳掃除のプロにすっきり任せたい',
  '耳掃除は自分でうまくできずスッキリしない',
];

const FLOW = [
  { title: 'カウンセリング', desc: '耳の状態や気になる点をうかがいます。耳掃除がはじめての方にも、流れを丁寧にご説明します。' },
  { title: 'イヤースコープで耳の中を確認', desc: 'モニターに映る耳の中を、ご自身の目で見ながら施術。普段見えない耳の状態を実感していただけます。' },
  { title: '見る耳かき', desc: 'モニターを見ながらプロが丁寧に耳掃除。耳の中をすっきり綺麗にしていきます。' },
  { title: '仕上げ・耳周りケア', desc: 'コースに応じて、耳周りやヘッドのほぐしも合わせて実施。爽快感と整う感覚を同時に体感していただけます。' },
];

export const EAR_ESTE_FAQ = [
  { q: '耳掃除だけでも受けられますか？', a: 'はい、40分コースは耳掃除中心のメニューです。しっかりほぐしたい方には、耳周り・ヘッドケアも含む60分・80分コースがおすすめです。' },
  { q: '痛くないですか？', a: '耳の中の状態を確認しながら丁寧に行うため、強い痛みが出るような施術ではありません。耳垢の状態などにより感じ方は個人差があります。' },
  { q: 'モニターは自分でも見られますか？', a: 'はい、施術中はモニターに耳の中の様子が映りますので、ご自身で確認しながら受けていただけます。' },
  { q: '男性でも利用できますか？', a: 'はい、男性のお客様にも人気のメニューです。完全個室のプライベート空間でリラックスしていただけます。' },
  { q: '耳鼻科の耳掃除とは何が違いますか？', a: '当店の施術は医療行為ではなく、リラクゼーションを目的としたものです。痛みや聞こえにくさ、かゆみが続くなど気になる症状がある場合は、耳鼻科の受診をおすすめしています。' },
];

export default function EarEsteDetail() {
  return (
    <div className="detail-page">
      <div className="detail-breadcrumb-wrap">
        <div className="container">
          <Breadcrumb
            items={[
              { name: 'トップ', href: '/' },
              { name: 'メニュー', href: '/?menu=ear-este' },
              { name: 'イヤーエステ' },
            ]}
          />
        </div>
      </div>

      <section className="detail-hero">
        <div className="detail-hero-bg">
          <Image
            src="/images/menus/ear-treatment-2.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="detail-hero-overlay" />
        </div>
        <div className="detail-hero-content">
          <span className="detail-hero-label">Ear Esthetic</span>
          <h1 className="detail-hero-title">イヤーエステとは？モニターで見る新感覚の耳かき</h1>
          <p className="detail-hero-copy">
            イヤースコープで耳の中を見ながらのプロの耳掃除。耳まわりもやさしくほぐし、リラックスした時間をお過ごしいただけます。
          </p>
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
                src="/images/menus/ear-treatment-1.jpg"
                alt="イヤースコープを使った耳かきの施術風景"
                width={480}
                height={360}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
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
                alt="耳周りの施術風景"
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
                src="/images/menus/jewelry-1.jpg"
                alt="耳つぼジュエリーをつけた仕上がり"
                width={480}
                height={360}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="detail-gallery-item">
              <Image
                src="/images/menus/jewelry-2.jpg"
                alt="耳つぼジュエリーをつけた仕上がり"
                width={480}
                height={360}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="detail-gallery-item">
              <Image
                src="/images/menus/jewelry-3.jpg"
                alt="耳つぼジュエリーをつけた仕上がり"
                width={480}
                height={360}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="detail-gallery-item">
              <Image
                src="/images/menus/jewelry-material-1.jpg"
                alt="耳つぼジュエリーの種類"
                width={480}
                height={360}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="detail-gallery-item">
              <Image
                src="/images/menus/jewelry-material-2.jpg"
                alt="耳つぼの位置を確認しながらの施術"
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
            <span className="detail-section-label">About the Treatment</span>
            <h2>イヤーエステについて</h2>
          </div>
          <div className="detail-body">
            <p>
              イヤーエステとは、イヤースコープ（耳の中を映すカメラ）で耳の中を確認しながら行う耳かき・耳掃除に、耳まわりのケアを組み合わせた施術です。
            </p>
            <p>
              愛媛県初、イヤースコープのモニターを見ながら受けられる新感覚の耳掃除メニューです。自分では見えない耳の中の状態を確認しながら、プロが丁寧に耳垢を取り除いていきます。
            </p>
            <p>
              耳掃除のあとは耳まわりをやさしくほぐし、リラックスした時間をお過ごしいただけます。40分の耳掃除中心コースから、耳周り・ヘッドまでじっくりほぐす80分コースまで、ご希望に合わせてお選びいただけます。
            </p>
          </div>
          {earEsteMenus.length > 0 && (
            <ul className="detail-price-list" aria-label="コース・料金">
              {earEsteMenus.map(m => (
                <li className="detail-price-item" key={m.id}>
                  <div className="detail-price-name">
                    {m.badge && <span className="detail-price-badge">{m.badge}</span>}
                    {m.name}
                  </div>
                  <div className="detail-price-meta">
                    <span>約{m.time}分</span>
                    <span className="detail-price-value">
                      ¥{m.price.toLocaleString()}{m.priceFrom && '〜'}
                      {m.originalPrice && <s className="detail-price-original">¥{m.originalPrice.toLocaleString()}</s>}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-white)' }}>
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

      <section className="section">
        <div className="container">
          <div className="detail-section-header">
            <span className="detail-section-label">FAQ</span>
            <h2>よくある質問</h2>
          </div>
          <div className="detail-faq-list">
            {EAR_ESTE_FAQ.map(item => (
              <div className="detail-faq-item" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="detail-section-header">
            <span className="detail-section-label">Combination</span>
            <h2>組み合わせて受けるなら</h2>
          </div>
          <div className="detail-related-grid">
            <Link href="/menu/oil-lymph/" className="detail-related-card">
              <span className="detail-related-card-label">Oil Lymph</span>
              <span className="detail-related-card-name">オイルリンパについて詳しく見る<span aria-hidden="true"> →</span></span>
            </Link>
            <Link href="/?menu=ear-oil#menu" className="detail-related-card">
              <span className="detail-related-card-label">Set Course</span>
              <span className="detail-related-card-name">イヤーエステ×オイルリンパのセットを見る<span aria-hidden="true"> →</span></span>
            </Link>
          </div>
        </div>
      </section>

      <ReservationCTA
        heading="見る耳かきイヤーエステを、公式LINEでご予約"
        description="愛媛県初の新感覚イヤーエステを、公式LINEから簡単にご予約いただけます。"
        sourceLabel="イヤーエステ詳細ページ"
      />
    </div>
  );
}
