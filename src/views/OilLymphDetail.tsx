import Image from 'next/image';
import appConfig from '../config/appConfig';
import Breadcrumb from '../components/common/Breadcrumb';
import ReservationCTA from '../components/common/ReservationCTA';
import './MenuDetail.css';

const oilMenus = appConfig.shop.services.filter(s => s.category === 'oil' && !s.id.includes('opt'));

const OILS = [
  {
    name: '厳選ボタニカルオイル',
    description: '肌なじみのよい植物由来オイルを使用。摩擦を抑えながら滑らかに滑り、リンパの流れに沿った丁寧な圧をしっかり伝えます。ベタつきが少なく、施術後もさらっとした付け心地です。',
  },
  {
    name: '低刺激・敏感肌対応',
    description: '香りや添加物を抑えた処方を選定。肌が敏感な方や妊娠中の方にも安心して受けていただけるよう配慮しています。気になる香りの強さなども、施術前にお気軽にご相談ください。',
  },
  {
    name: '巡りを整える効果',
    description: '滞ったリンパの流れを促し、冷えやむくみ、身体の重だるさにアプローチ。深いリラックスと巡りの良さを同時に体感できます。一定のリズムで圧をかけることで、施術中に眠ってしまう方も多いメニューです。',
  },
];

const RECOMMENDS = [
  '夕方になると脚がパンパンにむくむ',
  '冷え性で手足が冷たいことが多い',
  'デスクワークで身体全体が重だるい',
  '自分の時間でしっかりリラックスしたい',
];

const FLOW = [
  { title: 'カウンセリング', desc: '当日の体調やお悩みをヒアリングし、圧の強さやオイルの使い方を調整します。むくみが気になる部位や、避けてほしい箇所があれば遠慮なくお伝えください。' },
  { title: 'オイルウォームアップ', desc: '手のひらでオイルを温めながら、肌に優しくなじませていきます。いきなり強い圧をかけず、身体を施術に慣らしていく大切な工程です。' },
  { title: '全身オイルトリートメント', desc: '厳選オイルを使用し、脚・お腹・背中・腕など、滞ったリンパを丁寧に流していきます。60分コースは全身を中心に、90分コースはさらに時間をかけてじっくりと。' },
  { title: '仕上げ・水分補給', desc: '施術後はお身体を休めていただき、お水をお渡しして巡りをサポートします。施術直後は身体が温まりやすいので、ゆっくり深呼吸してから起き上がっていただいています。' },
];

const FAQ = [
  { q: '妊娠中でも受けられますか？', a: '低刺激の処方に配慮していますが、安定期に入っていない場合や体調によりお受けできないことがあります。ご予約時に妊娠中である旨を必ずお伝えください。' },
  { q: 'オイルで肌荒れしないか心配です。', a: '添加物を抑えたオイルを使用していますが、心配な方は事前にパッチテストのご相談も可能です。施術中に違和感があればすぐにお申し付けください。' },
  { q: 'どのくらいの頻度で通えばいいですか？', a: '個人差はありますが、むくみや冷えが気になる方は2〜4週間に1回程度のご利用がおすすめです。まずは1回受けていただき、ご自身のペースを見つけていただければと思います。' },
  { q: '60分と90分、どちらを選べばいいですか？', a: '初めての方や短時間でリフレッシュしたい方は60分、脚から背中までじっくり流したい方は90分がおすすめです。迷う場合はご予約時にご相談ください。' },
];

export default function OilLymphDetail() {
  return (
    <div className="detail-page">
      <div className="detail-breadcrumb-wrap">
        <div className="container">
          <Breadcrumb
            items={[
              { name: 'トップ', href: '/' },
              { name: 'メニュー', href: '/?menu=oil' },
              { name: 'オイルリンパ' },
            ]}
          />
        </div>
      </div>

      <section className="detail-hero">
        <div className="detail-hero-bg">
          <Image
            src="/images/menus/oil-treatment.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="detail-hero-overlay" />
        </div>
        <div className="detail-hero-content">
          <span className="detail-hero-label">Oil Lymph Treatment</span>
          <h1 className="detail-hero-title">厳選オイルで巡りを整える、オイルリンパトリートメント</h1>
          <p className="detail-hero-copy">
            肌にやさしい厳選オイルで、滞ったリンパをじっくり丁寧に流す。冷えやむくみ、身体の重だるさをほぐし、深い巡りとリラックスへ導きます。
          </p>
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
            <span className="detail-section-label">About the Oil</span>
            <h2>こだわりのオイル</h2>
          </div>
          <div className="detail-oil-grid">
            {OILS.map(oil => (
              <div className="detail-oil-card" key={oil.name}>
                <h3>{oil.name}</h3>
                <p>{oil.description}</p>
              </div>
            ))}
          </div>
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
          {oilMenus.length > 0 && (
            <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
              {oilMenus.map(m => `${m.duration}（¥${m.price.toLocaleString()}）`).join(' / ')} からお選びいただけます。
            </p>
          )}
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
                src="/images/menus/oil-treatment.jpg"
                alt="オイルリンパトリートメントの施術風景"
                width={480}
                height={360}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="detail-gallery-item">
              <Image
                src="/images/menus/oil-treatment-2.jpg"
                alt="脚のオイルトリートメント"
                width={480}
                height={360}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="detail-gallery-item">
              <Image
                src="/images/menus/oil-treatment-3.jpg"
                alt="ふくらはぎのオイルトリートメント"
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
        heading="オイルリンパで、巡りとリラックスを"
        description="厳選オイルによる全身トリートメントを、公式LINEから簡単にご予約いただけます。"
        sourceLabel="オイルリンパ詳細ページ"
      />
    </div>
  );
}
