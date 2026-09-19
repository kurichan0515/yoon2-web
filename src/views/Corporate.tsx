'use client';

import React from 'react';
import { Heart, Sparkles, Gift, MessageCircle, Ear, Droplets, Award, BadgePercent } from 'lucide-react';
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

interface CommonMenuItem { name: string; time: string; forWhom: string; icon: React.ReactNode; accent: string; accentBg: string; }

const COMMON_MENUS: CommonMenuItem[] = [
  {
    name: 'イヤーエステ', time: '60分',
    forWhom: '眼精疲労、脳疲労、睡眠不足に',
    icon: <Ear className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />,
    accent: '#2196F3', accentBg: '#E3F2FD',
  },
  {
    name: 'オイルリンパ', time: '60分',
    forWhom: '首・肩のコリ、全身の重だるさに',
    icon: <Droplets className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />,
    accent: '#4CAF50', accentBg: '#E8F5E9',
  },
];

interface CorporatePlan {
  id: string; label: string; title: string; subtitle: string;
  accent: string; accentBg: string; icon: React.ReactNode;
  bullets: string[]; footnote: string;
}

const CORPORATE_PLANS: CorporatePlan[] = [
  {
    id: 'plan-a',
    label: 'プランA',
    title: '法人限定・共通回数券（まとめ買い）',
    subtitle: '頑張る社員へのご褒美・インセンティブに',
    accent: '#c9a96e', accentBg: '#f8f1e4',
    icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />,
    bullets: [
      '会社がチケットをまとめて購入し、福利厚生として社員様に配布',
      '10枚セット／30枚セットからお選びいただけます',
    ],
    footnote: '有効期限：発行より1年間。成績優秀者へのギフト、社内イベントの景品等に最適です。',
  },
  {
    id: 'plan-b',
    label: 'プランB',
    title: '社員様限定・優待割引プラン',
    subtitle: 'まずはここから！企業様の費用負担なし',
    accent: '#4CAF50', accentBg: '#E8F5E9',
    icon: <BadgePercent className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />,
    bullets: [
      '貴社（企業側）の費用負担は完全ゼロ。リスクなしで導入いただけます',
      'ご来店時、貴社従業員様限定の優待価格でご利用いただけます',
      '利用条件：お会計時に貴社の「社員証」または「名刺」をご提示ください',
    ],
    footnote: '社内掲示板やイントラネット等でご紹介いただくだけで、すぐに福利厚生メニューを増やせます。',
  },
];

const FLOW_STEPS = [
  '公式LINEから「法人契約について」とメッセージ',
  '従業員数・利用シーンをヒアリング',
  'プラン内容・お見積りをご案内',
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

      {/* 法人限定福利厚生メニュー */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#faf9f7]">
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <div className="mb-4 sm:mb-6 text-center">
            <span className="text-[#c9a96e] text-xs tracking-[0.15em] block mb-3 font-normal uppercase">MENU &amp; PRICE</span>
            <h2 className="text-[#2c2c2c] text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide sm:tracking-widest font-light mb-4" style={{ fontFamily: headingFont }}>
              【60分一律価格】yoon² 法人限定福利厚生メニュー
            </h2>
            <p className="text-[#6b6b6b] text-sm sm:text-base tracking-wide max-w-2xl mx-auto">
              貴社の予算や目的に合わせて、2つのスタイルからお選びいただけます。
            </p>
            <p className="text-[#8e8e8e] text-xs sm:text-sm tracking-wide mt-2">※全プラン「1年契約（自動更新）」となります。</p>
          </div>

          {/* 共通メニュー */}
          <div className="mb-10 sm:mb-14 max-w-3xl mx-auto">
            <p className="text-center text-[#6b6b6b] text-xs sm:text-sm tracking-wide mb-4 sm:mb-6">
              当日の体調や気分に合わせて、以下の2つのメニューから毎回自由にお選びいただけます。
            </p>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {COMMON_MENUS.map(menu => (
                <div key={menu.name} className="flex items-center gap-3 sm:gap-4 bg-white border border-[#e5e0d7] p-4 sm:p-5 shadow-sm">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ backgroundColor: menu.accentBg, color: menu.accent }}
                  >
                    {menu.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#2c2c2c] text-sm sm:text-base font-medium tracking-wide">{menu.name} {menu.time}</p>
                    <p className="text-[#6b6b6b] text-xs sm:text-sm mt-0.5">⇒ {menu.forWhom}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* プランA/B/C */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {CORPORATE_PLANS.map(plan => (
              <article
                key={plan.id}
                className="bg-white border border-[#e5e0d7] overflow-hidden transition-all duration-300 shadow-sm flex flex-col"
              >
                <div className="h-2" style={{ backgroundColor: plan.accent }} aria-hidden="true" />
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 flex items-center justify-center rounded-full flex-shrink-0"
                      style={{ backgroundColor: plan.accentBg, color: plan.accent }}
                    >
                      {plan.icon}
                    </div>
                    <span
                      className="inline-block px-2.5 py-1 text-xs font-semibold tracking-[0.08em] text-white"
                      style={{ backgroundColor: plan.accent }}
                    >
                      {plan.label}
                    </span>
                  </div>
                  <p className="text-[#8e8e8e] text-xs sm:text-sm tracking-wide mb-1">{plan.subtitle}</p>
                  <h3 className="text-[#2c2c2c] text-base sm:text-lg font-medium tracking-wide mb-3 leading-snug">「{plan.title}」</h3>

                  <span
                    className="inline-block self-start px-2.5 py-1 mb-4 text-xs font-medium tracking-[0.08em] uppercase border"
                    style={{ borderColor: plan.accent, color: plan.accent }}
                  >
                    お問い合わせでご案内
                  </span>

                  <ul className="space-y-1.5 mb-4" aria-label="内容">
                    {plan.bullets.map(b => (
                      <li key={b} className="flex items-start gap-2 text-[#2c2c2c] text-xs sm:text-sm leading-relaxed">
                        <span className="flex-shrink-0 font-bold mt-0.5" style={{ color: plan.accent }} aria-hidden="true">›</span>{b}
                      </li>
                    ))}
                  </ul>

                  <p className="text-[#8e8e8e] text-xs mt-auto pt-4 border-t border-[#e5e0d7] leading-relaxed">{plan.footnote}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="text-center text-[#8e8e8e] text-xs sm:text-sm tracking-wide mt-8 sm:mt-10">
            料金・割引・お申込みにつきましては公式LINEよりお問い合わせください
          </p>
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
