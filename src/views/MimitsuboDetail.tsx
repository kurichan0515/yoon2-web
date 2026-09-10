import Image from 'next/image';
import appConfig from '../config/appConfig';
import Breadcrumb from '../components/common/Breadcrumb';
import ReservationCTA from '../components/common/ReservationCTA';
import './MenuDetail.css';

const mimitsuboMenus = appConfig.shop.services.filter(s => s.category === 'mimitubo');

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
            <span className="detail-section-label">Certification</span>
            <h2>認定情報</h2>
          </div>
          <div className="detail-cert-box">
            <span className="detail-cert-icon" aria-hidden="true">🏅</span>
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
            <h2>店内の様子</h2>
          </div>
          <div className="detail-gallery-grid">
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
