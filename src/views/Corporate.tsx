'use client';

import React from 'react';
import { Heart, Sparkles, Gift, MessageCircle, Ear, Droplets } from 'lucide-react';
import appConfig from '../config/appConfig';
import './HomeSns.css';
import './HeroBackground.css';

const headingFont = "'Cormorant Garamond', 'Playfair Display', serif";

interface UseCaseItem { icon: React.ReactNode; text: string; }

const USE_CASES: UseCaseItem[] = [
  { icon: <Heart className="text-[#c9a96e] w-5 h-5 sm:w-6 sm:h-6" aria-hidden />, text: '従業員様への福利厚生に' },
  { icon: <Sparkles className="text-[#c9a96e] w-5 h-5 sm:w-6 sm:h-6" aria-hidden />, text: '繁忙期後のリフレッシュに' },
  { icon: <Gift className="text-[#c9a96e] w-5 h-5 sm:w-6 sm:h-6" aria-hidden />, text: '社内表彰やプレゼントに' },
];

interface TicketPlan {
  id: string; name: string; time: string; forWhom: string; contents: string[];
  accent: string; accentBg: string; icon: React.ReactNode;
}

const TICKET_PLANS: TicketPlan[] = [
  {
    id: 'ear-este',
    name: 'イヤーエステチケット',
    time: '40分',
    forWhom: 'デスクワーク中心の方に',
    contents: ['耳かき', '耳つぼ／頭／首のほぐし'],
    accent: '#2196F3',
    accentBg: '#E3F2FD',
    icon: <Ear className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />,
  },
  {
    id: 'all-in-one',
    name: 'オールインワンチケット',
    time: '90〜100分',
    forWhom: '現場作業中心の方に',
    contents: ['耳かき', '耳つぼ／頭／首のほぐし', '全身オイルトリートメント'],
    accent: '#4CAF50',
    accentBg: '#E8F5E9',
    icon: <Droplets className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />,
  },
];

const FLOW_STEPS = [
  '公式LINEから「法人契約について」とメッセージ',
  '従業員数・利用シーンをヒアリング',
  'チケット枚数・お見積りをご案内',
  'ご契約後、チケット発行・ご利用開始',
];

const Corporate = () => {
  const lineUrl = (appConfig.shop.lineUrl ?? appConfig.social.line.url) as string;

  return (
    <div className="bg-[#faf9f7] text-[#2c2c2c] selection:bg-[#c9a96e] selection:text-white font-sans">
      {/* ヒーロー */}
      <section
        className="relative overflow-hidden pb-16 sm:pb-24 md:pb-32 px-3 sm:px-6 text-center"
        style={{ paddingTop: 'max(100px, env(safe-area-inset-top, 0px))' }}
      >
        <div className="hero-background">
          <picture>
            <source media="(max-width: 768px)" srcSet="/images/hero/hero-sp.webp" type="image/webp" />
            <source media="(max-width: 768px)" srcSet="/images/hero/hero-sp.jpg" />
            <source srcSet="/images/shop/play-room.webp" type="image/webp" />
            <img src="/images/shop/play-room.jpg" alt="" decoding="async" className="hero-bg-img" />
          </picture>
          <div className="hero-overlay" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-[#c9a96e] text-xs tracking-[0.15em] block mb-3 font-normal uppercase">FOR COMPANIES</span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl tracking-wide sm:tracking-widest font-light mb-6 sm:mb-8 text-white" style={{ fontFamily: headingFont, textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>法人契約プラン</h1>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed sm:leading-loose tracking-wide" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
            従業員様の日々の疲労やストレスケアに、イヤーエステを取り入れてみませんか？<br className="hidden sm:block" />
            yoon²では、企業様にまとめて施術チケットをご購入いただき、従業員様が自由に利用できる法人向けプランをご用意しています。<br className="hidden sm:block" />
            耳かきだけでなく、耳まわり・頭・首などをゆっくりほぐし、仕事の合間にも気持ちを切り替えられるひとときをお届けします。
          </p>
        </div>
      </section>

      {/* 活用シーン */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-3 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {USE_CASES.map(item => (
              <div key={item.text} className="flex items-center gap-3 bg-[#f4f1eb] border border-[#e5e0d7] p-4 sm:p-5">
                {item.icon}
                <span className="text-[#2c2c2c] text-sm sm:text-base tracking-wide">{item.text}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-[#8e8e8e] text-xs sm:text-sm tracking-wide">少人数の事業所様でもご利用いただけます</p>
        </div>
      </section>

      {/* チケット種別 */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#faf9f7]">
        <div className="max-w-5xl mx-auto px-3 sm:px-6">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <span className="text-[#c9a96e] text-xs tracking-[0.15em] block mb-3 font-normal uppercase">TICKET</span>
            <h2 className="text-[#2c2c2c] text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide sm:tracking-widest font-light" style={{ fontFamily: headingFont }}>選べる2種類のチケット</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {TICKET_PLANS.map(plan => (
              <article
                key={plan.id}
                className="bg-white border border-[#e5e0d7] overflow-hidden transition-all duration-300 shadow-sm flex flex-col"
              >
                <div className="h-2" style={{ backgroundColor: plan.accent }} aria-hidden="true" />
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full flex-shrink-0"
                      style={{ backgroundColor: plan.accentBg, color: plan.accent }}
                    >
                      {plan.icon}
                    </div>
                    <span
                      className="inline-block px-2.5 py-1 text-xs font-semibold tracking-[0.08em] uppercase text-white"
                      style={{ backgroundColor: plan.accent }}
                    >
                      お問い合わせでご案内
                    </span>
                  </div>
                  <h3 className="text-[#2c2c2c] text-lg sm:text-xl font-medium tracking-wide mb-2">{plan.name}</h3>
                  <p className="text-[#8e8e8e] text-xs sm:text-sm mb-4">約{plan.time}</p>
                  <p className="text-[#6b6b6b] text-xs sm:text-sm mb-4 tracking-wide">{plan.forWhom}</p>
                  <ul className="space-y-1.5 mb-6" aria-label="内容">
                    {plan.contents.map(c => (
                      <li key={c} className="flex items-center gap-2 text-[#2c2c2c] text-xs sm:text-sm">
                        <span className="flex-shrink-0 font-bold" style={{ color: plan.accent }} aria-hidden="true">›</span>{c}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[#8e8e8e] text-xs mt-auto pt-4 border-t border-[#e5e0d7]">料金・枚数につきましては公式LINEよりお問い合わせください</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ご利用の流れ */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-3 sm:px-6">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <span className="text-[#c9a96e] text-xs tracking-[0.15em] block mb-3 font-normal uppercase">FLOW</span>
            <h2 className="text-[#2c2c2c] text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide sm:tracking-widest font-light" style={{ fontFamily: headingFont }}>ご利用の流れ</h2>
          </div>
          <div className="flex flex-col" role="list">
            {FLOW_STEPS.map((step, i) => (
              <div key={step} className="flex gap-4 sm:gap-6 relative" role="listitem">
                {i < FLOW_STEPS.length - 1 && <div className="absolute left-[23px] sm:left-[27px] top-12 bottom-0 w-[1px] bg-[#e5e0d7]" aria-hidden="true" />}
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-[#f4f1eb] border border-[#e5e0d7] z-10">
                  <span className="text-[#c9a96e] text-sm sm:text-base font-bold">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className={`flex-1 flex items-center ${i < FLOW_STEPS.length - 1 ? 'pb-8 sm:pb-10' : ''}`}>
                  <p className="text-[#6b6b6b] text-sm sm:text-base leading-relaxed tracking-wide">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#faf9f7] text-center px-3 sm:px-6">
        <div className="max-w-xl mx-auto">
          <MessageCircle className="text-[#c9a96e] w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 sm:mb-6" aria-hidden />
          <p className="text-[#6b6b6b] text-sm sm:text-base mb-6 sm:mb-8 tracking-wide">法人契約についてのご相談・お見積りは公式LINEから承っております</p>
          <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            法人契約について公式LINEで相談する
            <span className="sr-only">（新しいウィンドウで開きます）</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Corporate;
