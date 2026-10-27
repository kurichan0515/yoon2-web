'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import appConfig from '../config/appConfig';
import { GOGYO_ELEMENTS } from '../components/BrandConcept';
import { trackPageView } from '../services/analyticsService';
import { trackPageView as trackGoogleAdsPageView } from '../services/googleAdsService';
import { FAQ_DATA } from '../data/faqData';
import { MENU_DATA, HOTPEPPER_URL } from '../data/menuData';
import { trackHotpepperClick, trackLineClick, trackTelClick } from '../services/analyticsService';
import './HomeSns.css';
import './HeroBackground.css';

// /sns: 配色（黒・紺・青）とフォントは独自のまま、画面構成は通常版トップに揃える

// ---- 型定義 ----

interface MenuItem {
  id: string; name: string; price: number; originalPrice?: number; priceFrom?: boolean;
  time: number; description: string; badge?: string;
  recommended?: boolean; newCustomer?: boolean;
}
interface MenuCategory { category: string; categoryKey: string; description: string; menus: MenuItem[]; }

interface FaqListItem { text: string; href?: string; hrefKey?: string; }
interface FaqPriceItem { label: string; from: string; to: string; }
interface FaqContent {
  paragraphs?: string[]; label?: string; listItems?: FaqListItem[];
  note?: string; afterParagraphs?: string[]; priceItems?: FaqPriceItem[];
}
interface FaqItemData { id: string; question: string; answerText: string; content?: FaqContent; }
interface FaqCategory { category: string; categoryKey: string; items: FaqItemData[]; }

interface ShopCfg {
  address?: string; phone?: string; lineUrl?: string; instagramUrl?: string;
  googleMapsUrl?: string; description?: string; notes?: string[]; holidays?: string;
  hours?: { weekday?: string; weekend?: string };
  access?: {
    stations?: string[]; landmarks?: string; parking?: string;
    parkingPhotos?: { parkingLot?: string; routeToShop?: string; accessGuide?: string };
  };
}

const hideImg = (e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = 'none'; };
const shop = appConfig.shop as ShopCfg;
const social = appConfig.social as { line: { url: string; note?: string }; instagram: { url: string; username?: string } };

// ---- 共通スタイル ----
const CINZEL: React.CSSProperties = { fontFamily: 'Cinzel, serif' };
// 縦書きは和文の縦組み字形が必要なため明朝スタック（Cinzel は欧文のみ）
const VERTICAL: React.CSSProperties = { fontFamily: 'var(--font-serif)' };
const SPARTAN: React.CSSProperties = { fontFamily: "'League Spartan', sans-serif", letterSpacing: '-0.05em' };
const BTN_BASE = 'group inline-flex items-center justify-center gap-3 min-h-[48px] px-8 rounded-full text-sm font-medium tracking-widest text-center transition-opacity duration-300';
const BTN_PRIMARY = `${BTN_BASE} bg-[#2563EB] text-white hover:opacity-85`;
const BTN_SECONDARY = `${BTN_BASE} border border-solid border-white/60 text-white hover:opacity-75`;
const TEXT_LINK = 'inline-flex items-center min-h-[44px] text-white/70 text-xs sm:text-sm tracking-wide underline underline-offset-[0.4em] decoration-white/30 hover:text-white transition-colors';

const Arrow = () => (
  <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
);

function SectionHeader({ label, title, desc }: { label: string; title: React.ReactNode; desc?: string }) {
  return (
    <div className="text-center mb-10 sm:mb-14">
      <span className="block text-[#3B82F6] text-xs tracking-[0.2em] uppercase mb-3">{label}</span>
      <h2 className="text-white text-[1.375rem] sm:text-2xl md:text-3xl tracking-widest font-light leading-relaxed" style={CINZEL}>{title}</h2>
      {desc && <p className="text-white/60 text-xs sm:text-sm tracking-wide mt-3">{desc}</p>}
    </div>
  );
}

// ---- Header ----
const NAV_LINKS = [
  { name: 'HOME', href: '#top' },
  { name: 'MENU', href: '#courses' },
  { name: 'ABOUT', href: '/about' },
  { name: 'ACCESS', href: '#shop' },
  { name: 'CONTACT', href: '#reserve' },
];

interface HeaderProps { isScrolled: boolean; isMenuOpen: boolean; setIsMenuOpen: (v: boolean) => void; lineUrl: string; }
const Header = ({ isScrolled, isMenuOpen, setIsMenuOpen, lineUrl }: HeaderProps) => {
  const handleClick = (e: React.MouseEvent, href: string) => {
    setIsMenuOpen(false);
    if (href === '#top') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const solid = isScrolled || isMenuOpen;
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${solid ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-5 h-[70px] flex items-center justify-between gap-6">
        <button type="button" className="text-2xl font-bold text-white bg-transparent border-0 cursor-pointer whitespace-nowrap min-h-[44px]"
          style={SPARTAN} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          yoon²
        </button>
        <nav className="hidden lg:flex items-center gap-9" aria-label="メインナビゲーション">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <li key={link.name}>
                <a href={link.href} onClick={e => handleClick(e, link.href)}
                  className="inline-flex items-center min-h-[44px] text-white/80 text-xs tracking-[0.2em] hover:text-[#3B82F6] transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <a href={lineUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center min-h-[40px] px-5 rounded-full bg-[#2563EB] text-white text-xs font-medium tracking-widest hover:opacity-85 transition-opacity"
            onClick={() => trackLineClick('SNS Header')}>
            LINEで予約
            <span className="sr-only">（新しいウィンドウで開きます）</span>
          </a>
        </nav>
        <button type="button" className="lg:hidden relative w-11 h-11 -mr-2.5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'} aria-expanded={isMenuOpen} aria-controls="sns-drawer">
          <span className={`absolute left-[11px] w-[22px] h-px bg-white transition-all duration-300 ${isMenuOpen ? 'top-[22px] rotate-[35deg]' : 'top-[15px]'}`} />
          <span className={`absolute left-[11px] top-[22px] w-[22px] h-px bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`absolute left-[11px] w-[22px] h-px bg-white transition-all duration-300 ${isMenuOpen ? 'top-[22px] -rotate-[35deg]' : 'top-[29px]'}`} />
        </button>
      </div>
      {isMenuOpen && (
        <div id="sns-drawer" className="lg:hidden bg-[#0A0A0A] border-t border-white/10 px-6 pt-3 pb-8 max-h-[calc(100svh-70px)] overflow-y-auto">
          <ul className="mb-6 divide-y divide-white/10">
            {NAV_LINKS.map(link => (
              <li key={link.name}>
                <a href={link.href} onClick={e => handleClick(e, link.href)}
                  className="flex items-center min-h-[56px] text-white text-sm tracking-[0.2em]">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <a href={lineUrl} target="_blank" rel="noopener noreferrer" className={`${BTN_PRIMARY} w-full`}
            onClick={() => { trackLineClick('SNS Drawer'); setIsMenuOpen(false); }}>
            LINEで予約<Arrow />
            <span className="sr-only">（新しいウィンドウで開きます）</span>
          </a>
        </div>
      )}
    </header>
  );
};

// ---- Hero ----
const Hero = ({ lineUrl }: { lineUrl: string }) => (
  <section className="hero relative min-h-screen min-h-[100svh] flex flex-col justify-center overflow-hidden pt-[102px] pb-24 sm:pb-28">
    <div className="absolute inset-0 z-0 hero-background">
      <picture>
        <source media="(max-width: 768px)" srcSet="/images/hero/hero-sp.webp" type="image/webp" />
        <source media="(max-width: 768px)" srcSet="/images/hero/hero-sp.jpg" />
        <source srcSet="/images/shop/play-room.webp" type="image/webp" />
        <img src="/images/shop/play-room.jpg" alt="" fetchPriority="high" decoding="async" className="hero-bg-img" />
      </picture>
      <div className="hero-overlay" />
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.35)' }} />
    </div>
    <div className="relative z-20 w-full max-w-7xl mx-auto px-6 flex justify-center">
      <div className="text-center max-w-xl px-4">
        <h1 className="text-[3.5rem] sm:text-7xl md:text-8xl text-white font-light leading-none mb-5" style={SPARTAN}>yoon²</h1>
        <p className="text-white text-[0.9375rem] sm:text-base tracking-[0.3em] mb-1.5" style={CINZEL} aria-label="読み方">【ユンユン】</p>
        <p className="text-white text-base sm:text-lg tracking-[0.2em] sm:tracking-[0.24em] mb-9 sm:mb-11">
          <span className="inline-block">松山の見える耳かき・</span><span className="inline-block">イヤーエステ専門サロン</span>
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a href={lineUrl} target="_blank" rel="noopener noreferrer"
            className={`${BTN_PRIMARY} w-full max-w-[260px] sm:w-auto sm:min-w-[200px]`}
            onClick={() => trackLineClick('SNS Hero')}>
            ご予約はこちら<Arrow />
            <span className="sr-only">（LINE、新しいウィンドウで開きます）</span>
          </a>
          <button type="button" onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className={`${BTN_SECONDARY} w-full max-w-[260px] sm:w-auto sm:min-w-[200px]`}>
            コースを見る<Arrow />
          </button>
        </div>
      </div>
      {/* 縦書きサブコピー＋細い縦線 */}
      <p className="absolute right-3.5 sm:right-6 md:right-[4vw] bottom-[-8px] sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 flex items-center gap-3.5 sm:gap-5 text-white text-[0.8125rem] sm:text-sm md:text-base tracking-[0.32em] md:tracking-[0.4em] whitespace-nowrap [writing-mode:vertical-rl]"
        style={VERTICAL}>
        耳から、心地よく整える。
        <span aria-hidden="true" className="block w-px h-9 sm:h-12 md:h-[72px] bg-white/60" />
      </p>
    </div>
    {/* 下端の緩い波形 */}
    <svg className="absolute inset-x-0 -bottom-px z-20 w-full h-8 sm:h-12 md:h-[72px] fill-[#0A0A0A]" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M0 48C180 20 360 8 540 22s360 52 540 50 270-30 360-44V80H0z" />
    </svg>
  </section>
);

// ---- ヒーロー直下（説明・評価・SNS向け案内） ----
const HeroIntro = () => (
  <section className="bg-[#0A0A0A] pt-10 pb-16 px-5 text-center" aria-label="yoon²の特徴">
    <p className="text-white/90 text-sm sm:text-[0.9375rem] leading-loose tracking-wide max-w-xl mx-auto mb-6 text-left sm:text-center">
      イヤースコープで耳の中を一緒に見ながら、やさしく耳掃除。<br className="hidden sm:inline" />
      「取れる」快感と、耳から広がる深い眠り。<br className="hidden sm:inline" />
      迷走神経を優しく撫でる新感覚タッチで、蓄積した脳疲労をリセット。
    </p>
    <div className="inline-flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 py-2.5 border-y border-white/15" aria-label="ホットペッパービューティー 評価4.93">
      <span className="text-[#c9a96e] text-sm tracking-[0.15em]" aria-hidden="true">★★★★★</span>
      <span className="text-white text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>4.93</span>
      <span className="text-white/60 text-xs tracking-widest">ホットペッパービューティー</span>
    </div>
    <div className="mt-8 max-w-md mx-auto">
      <p className="text-white text-xs sm:text-sm tracking-widest mb-1.5">SNSからご来店の方へ</p>
      <p className="text-white/70 text-xs leading-relaxed">公式LINEから簡単予約！当日予約OK・駐車場完備</p>
    </div>
  </section>
);

// ---- BRAND CONCEPT ----
const BrandConceptSns = () => (
  <section id="concept" className="bg-[#0A0A0A] py-16 sm:py-24 md:py-28 px-5" aria-labelledby="sns-concept-title">
    <div className="max-w-3xl mx-auto text-center">
      <span className="block text-[#3B82F6] text-xs tracking-[0.2em] uppercase mb-3">Brand Concept</span>
      <h2 id="sns-concept-title" className="text-white text-2xl md:text-3xl tracking-[0.14em] font-light mb-7" style={CINZEL}>
        東洋医学 <span className="text-[#3B82F6]" aria-hidden="true">×</span><span className="sr-only">と</span> ゆんゆん
      </h2>
      <span aria-hidden="true" className="block w-12 h-px bg-[#3B82F6] mx-auto mb-9" />
      <p className="text-white/90 text-[0.9375rem] sm:text-base leading-[2.1] tracking-wider mb-12 sm:mb-14 text-left sm:text-center">
        古くから伝わる東洋の知恵と、耳かきのやさしい刺激で、<br className="hidden sm:inline" />
        心と身体のバランスを整える。<br />
        それが、ゆんゆんのイヤーエステです。
      </p>
      <ul className="flex justify-center gap-[clamp(16px,5vw,56px)]" aria-label="五行">
        {GOGYO_ELEMENTS.map(el => (
          <li key={el.kanji} className="flex flex-col items-center gap-3.5">
            <svg className="w-10 h-10 md:w-[52px] md:h-[52px] fill-none stroke-[#3B82F6] [stroke-width:1.2] [stroke-linecap:round] [stroke-linejoin:round]"
              viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" focusable="false">
              {el.icon}
            </svg>
            <span className="min-w-[32px] md:min-w-[40px] pt-3.5 border-t border-white/15 text-white text-base md:text-lg text-center" style={CINZEL}>{el.kanji}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// ---- 縦書きコピーの写真帯 ----
const PhotoCopySns = ({ image, lines, align }: { image: string; lines: string[]; align: 'left' | 'right' }) => (
  <section className={`relative flex items-center justify-center min-h-[380px] md:min-h-[clamp(360px,52vw,560px)] px-6 md:px-[8vw] py-16 overflow-hidden bg-black ${align === 'right' ? 'sm:justify-end' : 'sm:justify-start'}`}>
    <img src={image} alt="" width={1600} height={1067} loading="lazy" decoding="async"
      className="absolute inset-0 w-full !h-full object-cover" />
    <div aria-hidden="true" className="absolute inset-0 bg-black/55" />
    <p className="relative z-10 [writing-mode:vertical-rl] text-white text-xl md:text-2xl leading-[2.2] tracking-[0.32em] pr-5 border-r border-white/50" style={VERTICAL}>
      {lines.map((line, i) => (
        <span key={i} className={`block ${i > 0 ? 'pt-[2.4em]' : ''}`}>{line}</span>
      ))}
    </p>
  </section>
);

// ---- Menu Guide ----
interface DiagnosisCard {
  key: string; tag: string; name: string; target: string; contents: string[]; desc: string;
  images: string[]; detailHref?: string; tabKey?: string; primary?: boolean;
}

const DIAGNOSIS_CARDS: DiagnosisCard[] = [
  {
    key: 'ear', tag: '愛媛県初！', name: 'イヤーエステ',
    target: '自分の耳の中を見てみたい方、休んでも疲れが取れない方へ',
    contents: ['イヤースコープで見る耳かき', '自律神経を刺激してすっきり'],
    desc: 'モニターを見ながらのプロの耳掃除で、耳の中をすっきり綺麗に。自律神経を刺激する耳掃除で、頭や目の重だるさもリセットできる愛媛県初の新感覚メニュー。',
    images: ['/images/menus/ear-treatment-2.jpg'], detailHref: '/menu/ear-este',
  },
  {
    key: 'oil', tag: '男性におすすめ', name: 'オイルリンパ',
    target: '冷えやむくみ・全身の疲れをリセットしたい方へ',
    contents: ['全身オイルトリートメント', 'リンパの流れを整える'],
    desc: '3種から選べるオイルでリンパの滞りをじっくり丁寧に流し、冷え性やむくみ、身体の重だるさをスッキリ解消。深いリラックスと巡りの良さを同時に体感。',
    images: ['/images/menus/oil-treatment.jpg'], detailHref: '/menu/oil-lymph',
  },
  {
    key: 'ear-oil', tag: '迷ったらコレ', name: 'イヤーエステ×オイルリンパ',
    target: '耳も全身もまるごとリセットしたい方へ',
    contents: ['イヤースコープで見る耳かき', '3種から選べる全身オイル'],
    desc: '耳元の心地よい刺激で緊張を解きほぐした後、全身オイルリンパへ。その日の体調に合わせてオイルを選び、お疲れを根本からスッキリ解放。',
    images: ['/images/menus/ear-treatment-2.jpg', '/images/menus/oil-treatment.jpg'], tabKey: 'ear-oil', primary: true,
  },
];

function MenuDiagnosisSnsSection() {
  const scrollToMenu = (tabKey?: string) => {
    if (tabKey) window.dispatchEvent(new CustomEvent('menu-tab-select', { detail: { categoryKey: tabKey } }));
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
  };
  return (
    <section id="diagnosis" className="py-16 sm:py-24 md:py-28 bg-[#101827]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeader label="Menu Guide" title={<>あなたにぴったりのメニューは<br />どちらですか？</>} />
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-[520px] md:max-w-none mx-auto divide-y md:divide-y-0 md:divide-x divide-white/10">
          {DIAGNOSIS_CARDS.map(card => (
            <article key={card.key} className="flex flex-col py-10 first:pt-0 md:py-0 md:px-5 lg:px-8 md:first:pl-0 md:last:pr-0">
              <div className="flex gap-1 aspect-video md:aspect-[4/3] mb-7 overflow-hidden" aria-hidden="true">
                {card.images.map(src => (
                  <div key={src} className="relative flex-1">
                    <Image src={src} alt="" fill sizes={card.images.length > 1 ? '(max-width: 768px) 50vw, 200px' : '(max-width: 768px) 100vw, 400px'} style={{ objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
              <div className="text-[#3B82F6] text-xs tracking-[0.16em] mb-2">{card.tag}</div>
              <h3 className="text-white text-xl tracking-wider font-medium leading-relaxed">{card.name}</h3>
              <div className="w-8 h-px bg-[#3B82F6] mt-4 mb-[18px]" aria-hidden="true" />
              <p className="text-white text-sm font-medium leading-loose mb-3.5">{card.target}</p>
              <ul className="space-y-1 mb-4" aria-label="内容">
                {card.contents.map(t => (
                  <li key={t} className="relative pl-[1.4em] text-white/80 text-sm leading-relaxed">
                    <span className="absolute left-0 top-[0.9em] w-[0.8em] h-px bg-[#3B82F6]" aria-hidden="true" />{t}
                  </li>
                ))}
              </ul>
              <p className="text-white/70 text-sm leading-loose flex-1 mb-7">{card.desc}</p>
              <button type="button" onClick={() => scrollToMenu(card.tabKey)}
                className={`${card.primary ? BTN_PRIMARY : BTN_SECONDARY} w-full mt-auto`}>
                料金・詳細を見る<Arrow /><span className="sr-only">（{card.name}）</span>
              </button>
              {card.detailHref && (
                <Link href={card.detailHref} className={`${TEXT_LINK} self-center mt-1`}>
                  詳しく見る<span aria-hidden="true"> →</span>
                </Link>
              )}
            </article>
          ))}
        </div>
        <Link href="/event" className="mt-8 md:mt-[72px] flex flex-col sm:flex-row items-center justify-between gap-2 py-6 px-1 border-y border-white/10 text-white text-base tracking-widest hover:opacity-75 transition-opacity text-center"
          style={CINZEL}>
          <span>出張イベント開催先 募集中</span>
          <span className="text-[#3B82F6] text-xs sm:text-sm font-sans whitespace-nowrap">詳しくはこちら →</span>
        </Link>
      </div>
    </section>
  );
}

// ---- お悩み ----
const CONCERNS = [
  { num: '01', text: '休んでも疲れが取れない、頭や目が重い' },
  { num: '02', text: '自分の耳の中がどうなっているか見てみたい' },
  { num: '03', text: '肩こりや頭痛、むくみをどうにかしたい' },
  { num: '04', text: '全身の冷えやむくみもまとめてケアしたい' },
];

function ConcernSnsSection() {
  return (
    <section id="concern" className="py-16 sm:py-24 md:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeader label="For You" title={<>こんなお悩み、<br />抱えていませんか？</>} />
        <ul className="max-w-[680px] mx-auto border-t border-white/10" aria-label="お悩みリスト">
          {CONCERNS.map(item => (
            <li key={item.num} className="flex items-baseline gap-4 sm:gap-6 py-[18px] sm:py-[22px] border-b border-white/10">
              <span className="text-[#3B82F6] text-lg tracking-wider min-w-[2rem] flex-shrink-0" style={CINZEL} aria-hidden="true">{item.num}</span>
              <span className="text-white/90 text-[0.9375rem] sm:text-base leading-loose tracking-wide">{item.text}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-start gap-4 sm:gap-6 max-w-[680px] mx-auto mt-10 sm:mt-14">
          <div className="flex-shrink-0 w-6 sm:w-10 h-px mt-[1em] bg-[#3B82F6]" aria-hidden="true" />
          <div>
            <p className="text-white text-[0.9375rem] sm:text-[1.0625rem] leading-loose tracking-wider">
              そのお悩み、yoon²の<span className="text-[#3B82F6] font-semibold">耳からのアプローチ</span>で解決できます
            </p>
            <Link href="/about" className={TEXT_LINK}>
              yoon²についてはこちら<span aria-hidden="true"> →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- 流れ ----
const FLOW_STEPS = [
  { num: '01', title: 'カウンセリング', desc: 'スコープで耳の中を一緒に確認。お悩みや気になる点をヒアリングします。', highlight: false },
  { num: '02', title: '施術',           desc: '痛みなし・優しいタッチ。完全個室でリラックスできる環境で丁寧に施術。', highlight: false },
  { num: '03', title: 'もみほぐし',     desc: '迷走神経を優しく刺激。ここで寝落ちされるお客様が続出です。', highlight: true },
  { num: '04', title: 'アフターケア',   desc: 'スッキリした状態を確認。お悩みに合わせたアドバイスをお伝えします。', highlight: false },
];

function FlowSnsSection() {
  return (
    <section className="py-16 sm:py-24 md:py-28 bg-[#101827]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeader label="Flow" title={<>初めての方も安心！<br />ご来店からの流れ</>} />
        <div className="grid grid-cols-1 md:grid-cols-4 max-w-[480px] md:max-w-[1000px] mx-auto mb-10 md:mb-14 divide-y md:divide-y-0 md:divide-x divide-white/10" role="list">
          {FLOW_STEPS.map(step => (
            <div key={step.num} className="grid grid-cols-[3rem_1fr] md:flex md:flex-col py-6 md:py-0 md:px-4 lg:px-6" role="listitem">
              <div className="row-span-2 text-[#3B82F6] text-[1.375rem] md:text-[1.75rem] leading-none md:mb-[18px]" style={CINZEL} aria-hidden="true">{step.num}</div>
              <h3 className={`col-start-2 text-lg font-medium tracking-wider mb-2.5 ${step.highlight ? 'text-[#3B82F6]' : 'text-white'}`}>{step.title}</h3>
              <p className="col-start-2 text-white/70 text-sm leading-loose">{step.desc}</p>
            </div>
          ))}
        </div>
        <p className="table mx-auto px-7 py-2.5 border-y border-white/10 text-white/80 text-[0.9375rem] tracking-[0.16em]">完全個室・全施術痛みなし</p>
      </div>
    </section>
  );
}

// ---- 口コミ ----
const SNS_REVIEWS = [
  { id: 'r1', text: '耳の中をスコープで確認しながら施術。不眠も改善して、通う価値しかないです！', age: '30代女性' },
  { id: 'r2', text: '完全個室で男性でも安心。仕事疲れが施術後スッと消えました。',              age: '40代男性' },
  { id: 'r3', text: 'オイルリンパと耳のセットで全身ぽかぽか。気づいたら寝ていました。',        age: '20代女性' },
];

function ReviewsSnsSection() {
  return (
    <section id="reviews" className="py-16 sm:py-24 md:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeader label="Reviews" title="お客様の声" desc="ホットペッパービューティーにて多数の高評価をいただいています" />
        <div className="grid grid-cols-1 lg:grid-cols-3 max-w-[600px] lg:max-w-none mx-auto mb-10 lg:mb-14 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {SNS_REVIEWS.map(r => (
            <div key={r.id} className="flex flex-col gap-4 py-7 lg:py-2 lg:px-8">
              <div className="text-[#3B82F6] text-xs tracking-[0.12em]" aria-label="高評価">★ 高評価</div>
              <p className="text-white/90 text-[0.9375rem] leading-loose tracking-wide flex-1">「{r.text}」</p>
              <div className="flex justify-between items-center gap-2 pt-3.5 border-t border-white/10">
                <span className="text-white/80 text-[0.8125rem] font-medium">{r.age}</span>
                <span className="text-white/60 text-xs">ホットペッパー</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href={HOTPEPPER_URL} target="_blank" rel="noopener noreferrer" className={TEXT_LINK}
            onClick={() => trackHotpepperClick('SNS Reviews')}>
            すべての口コミを見る →
            <span className="sr-only">（ホットペッパービューティー、新しいウィンドウで開きます）</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ---- メニュー・料金 ----
const SNS_BADGE: Record<string, string> = {
  '初回限定': 'bg-[#2563EB] border-[#2563EB] text-white',
  '人気': 'border-[#3B82F6] text-[#3B82F6]',
  'プレミアム': 'border-white/60 text-white',
  'オプション': 'border-white/40 text-white/70',
  '平日限定': 'border-[#3B82F6] text-[#3B82F6]',
  '指名限定': 'border-white/60 text-white',
};

function MenuSnsCard({ menu, lineUrl }: { menu: MenuItem; lineUrl: string }) {
  return (
    <article className="relative flex flex-col gap-3 py-7 sm:py-9 border-b border-white/10">
      {menu.recommended && <span aria-hidden="true" className="absolute -top-px left-0 w-14 h-0.5 bg-[#3B82F6]" />}
      {menu.badge && (
        <span className={`self-start px-3 py-0.5 rounded-full border text-xs font-medium tracking-[0.08em] ${SNS_BADGE[menu.badge] ?? 'border-white/40 text-white/70'}`}>{menu.badge}</span>
      )}
      <h3 className="text-white text-[1.0625rem] sm:text-lg font-medium tracking-wide leading-relaxed">{menu.name}</h3>
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-[#3B82F6] text-2xl sm:text-[1.625rem] font-bold tracking-tight">¥{menu.price.toLocaleString()}{menu.priceFrom && '〜'}</span>
        {menu.originalPrice && <span className="text-white/60 text-sm line-through">¥{menu.originalPrice.toLocaleString()}</span>}
      </div>
      {menu.time > 0 && <div className="text-white/70 text-[0.8125rem] tracking-wider">約{menu.time}分</div>}
      <p className="text-white/70 text-sm leading-loose flex-1">{menu.description}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 mt-auto pt-3">
        <a href={HOTPEPPER_URL} target="_blank" rel="noopener noreferrer"
          className={`${BTN_PRIMARY} !px-4 !text-[0.8125rem] !tracking-wider`}
          onClick={() => trackHotpepperClick(menu.name)}>
          今すぐ予約する<Arrow />
          <span className="sr-only">（{menu.name}、新しいウィンドウで開きます）</span>
        </a>
        <a href={lineUrl} target="_blank" rel="noopener noreferrer"
          className={`${BTN_SECONDARY} !px-4 !text-[0.8125rem] !tracking-wider`}
          onClick={() => trackLineClick(menu.name)}>
          LINEで予約・相談<Arrow />
          <span className="sr-only">（{menu.name}、新しいウィンドウで開きます）</span>
        </a>
      </div>
    </article>
  );
}

const menus = MENU_DATA as MenuCategory[];

function MenuSnsSection({ lineUrl }: { lineUrl: string }) {
  const [activeTab, setActiveTab] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const categoryKey = (e as CustomEvent<{ categoryKey: string }>).detail?.categoryKey;
      const idx = menus.findIndex(cat => cat.categoryKey === categoryKey);
      if (idx >= 0) setActiveTab(idx);
    };
    window.addEventListener('menu-tab-select', handler);
    return () => window.removeEventListener('menu-tab-select', handler);
  }, []);

  const handleTabChange = (i: number) => {
    if (i === activeTab) return;
    setFading(true);
    setTimeout(() => { setActiveTab(i); setFading(false); }, 180);
  };

  const current = menus[activeTab] ?? menus[0]!;
  const visibleMenus = (appConfig.features as { firstVisitDiscount?: boolean }).firstVisitDiscount
    ? current.menus
    : current.menus.filter(m => !m.newCustomer);

  return (
    <section id="courses" className="py-16 sm:py-24 md:py-28 bg-[#101827] scroll-mt-[70px]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeader label="Menu & Price" title="メニュー・料金" desc="あなたに合った癒しのメニューをお選びください" />
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-7" role="tablist" aria-label="メニューカテゴリ">
          {menus.map((cat, i) => (
            <button key={cat.categoryKey} role="tab" aria-selected={i === activeTab}
              aria-controls={`menu-sns-panel-${cat.categoryKey}`} id={`menu-sns-tab-${cat.categoryKey}`}
              className={`min-h-[44px] px-3 sm:px-5 rounded-full border border-solid text-xs sm:text-[0.8125rem] tracking-wider whitespace-nowrap transition-colors duration-200 ${i === activeTab ? 'bg-[#2563EB] border-[#2563EB] text-white font-semibold' : 'border-white/30 text-white/80 hover:border-[#3B82F6] hover:text-white'}`}
              onClick={() => handleTabChange(i)}
              onKeyDown={e => {
                if (e.key === 'ArrowRight') handleTabChange((i + 1) % menus.length);
                if (e.key === 'ArrowLeft') handleTabChange((i - 1 + menus.length) % menus.length);
              }}>
              {cat.category}
            </button>
          ))}
        </div>
        <p className="text-center text-white/80 text-[0.9375rem] tracking-widest mb-8 sm:mb-12" style={CINZEL}>{current.description}</p>
        <div id={`menu-sns-panel-${current.categoryKey}`} role="tabpanel"
          aria-labelledby={`menu-sns-tab-${current.categoryKey}`}
          className={`grid grid-cols-1 md:grid-cols-2 md:gap-x-14 border-t border-white/10 transition-opacity duration-200 ${fading ? 'opacity-0' : 'opacity-100'}`}>
          {visibleMenus.map(menu => <MenuSnsCard key={menu.id} menu={menu} lineUrl={lineUrl} />)}
        </div>
      </div>
    </section>
  );
}

// ---- FAQ ----
interface FaqSnsItemProps { item: FaqItemData; isOpen: boolean; onToggle: () => void; lineUrl: string; }

function FaqSnsItem({ item, isOpen, onToggle, lineUrl }: FaqSnsItemProps) {
  const isHotpepper = (url = '') => /beauty\.hotpepper\.jp/.test(url);
  const { content } = item;
  const renderAnswer = () => {
    if (!content) return null;
    const { paragraphs, label, listItems, note, afterParagraphs, priceItems } = content;
    return (
      <div className="space-y-2 text-white/80 text-[0.8125rem] sm:text-sm leading-loose">
        {paragraphs?.map((p, i) => <p key={i} className="text-white/80">{p}</p>)}
        {label && <p className="text-white font-semibold text-xs tracking-wide mt-2">{label}</p>}
        {listItems && (
          <ul className="space-y-1 mt-1">
            {listItems.map((li, i) => (
              <li key={i} className="relative pl-[1.2em]">
                <span className="absolute left-0 top-[0.95em] w-[0.7em] h-px bg-[#3B82F6]" aria-hidden="true" />
                {li.href ? (
                  <a href={li.href} target="_blank" rel="noopener noreferrer"
                    className="text-[#60A5FA] underline underline-offset-2 hover:text-white transition-colors"
                    onClick={() => { if (isHotpepper(li.href)) trackHotpepperClick('SNS FAQ Link'); }}>
                    {li.text}
                  </a>
                ) : li.hrefKey === 'line' ? (
                  <a href={lineUrl} target="_blank" rel="noopener noreferrer"
                    className="text-[#60A5FA] underline underline-offset-2 hover:text-white transition-colors"
                    onClick={() => trackLineClick('SNS FAQ Link')}>
                    {li.text}
                  </a>
                ) : <span>{li.text}</span>}
              </li>
            ))}
          </ul>
        )}
        {priceItems && (
          <ul className="space-y-1 mt-1">
            {priceItems.map((pi, i) => (
              <li key={i} className="relative pl-[1.2em]">
                <span className="absolute left-0 top-[0.95em] w-[0.7em] h-px bg-[#3B82F6]" aria-hidden="true" />
                {pi.label}: 通常{pi.from} → <span className="text-[#60A5FA] font-semibold">{pi.to}</span>
              </li>
            ))}
          </ul>
        )}
        {afterParagraphs?.map((p, i) => <p key={`after-${i}`} className="mt-1 text-white/80">{p}</p>)}
        {note && <p className="mt-2 pl-4 border-l border-[#3B82F6] text-white/70 text-xs">{note}</p>}
      </div>
    );
  };
  return (
    <div className="border-b border-white/10">
      <button className="w-full flex justify-between items-center gap-3 sm:gap-4 px-1 py-4 sm:py-[18px] text-left min-h-[52px] hover:opacity-75 transition-opacity"
        onClick={onToggle} aria-expanded={isOpen} aria-controls={`faq-sns-answer-${item.id}`}>
        <span className="text-white text-sm sm:text-[0.9375rem] font-medium tracking-wide flex-1 leading-relaxed">{item.question}</span>
        <span className={`flex-shrink-0 w-5 h-5 flex items-center justify-center text-xl font-light transition-transform duration-300 ${isOpen ? 'text-[#3B82F6] rotate-45' : 'text-white/60'}`} aria-hidden="true">
          +
        </span>
      </button>
      <div id={`faq-sns-answer-${item.id}`} className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[600px]' : 'max-h-0'}`}>
        <div className="bg-[#161B22] px-5 sm:px-6 py-4 sm:py-5 mb-4">{renderAnswer()}</div>
      </div>
    </div>
  );
}

function FaqSnsSection({ lineUrl }: { lineUrl: string }) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const toggleItem = (id: string) => setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <section id="faq" className="py-16 sm:py-24 md:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeader label="FAQ" title="よくある質問" desc="ご不明な点はお気軽にお問い合わせください" />
        <div className="flex flex-col gap-10 sm:gap-14 max-w-3xl mx-auto">
          {(FAQ_DATA as FaqCategory[]).map(category => (
            <div key={category.categoryKey}>
              <h3 className="pb-3.5 border-b border-white/60 text-white text-base sm:text-[1.0625rem] font-medium tracking-widest" style={CINZEL}>{category.category}</h3>
              <div>
                {category.items.map(item => (
                  <FaqSnsItem key={item.id} item={item} isOpen={!!openItems[item.id]}
                    onToggle={() => toggleItem(item.id)} lineUrl={lineUrl} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14 sm:mt-[72px] max-w-3xl mx-auto py-10 px-4 border-y border-white/10 text-center">
          <p className="text-white text-base sm:text-[1.0625rem] tracking-wider mb-6" style={CINZEL}>その他のご質問はお気軽にお問い合わせください</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            <a href={lineUrl} target="_blank" rel="noopener noreferrer" className={BTN_PRIMARY}
              onClick={() => trackLineClick('SNS FAQ Contact CTA')}>
              LINEでお問い合わせ<Arrow />
              <span className="sr-only">（新しいウィンドウで開きます）</span>
            </a>
            <a href={`tel:${(appConfig.shop.phone as string).replace(/-/g, '')}`} className={BTN_SECONDARY}
              onClick={() => trackTelClick('SNS FAQ Contact CTA')}>
              {appConfig.shop.phone as string}<Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- 店舗情報・アクセス ----
function ShopSnsSection() {
  const infoRows: { label: string; content: React.ReactNode }[] = [
    { label: '住所', content: <p className="text-white/90 text-[0.9375rem] leading-loose break-words">{shop.address}</p> },
    { label: '駐車場のご案内', content: (
      <div>
        <p className="text-white/90 text-[0.9375rem] leading-loose">店舗前に駐車スペースがございません。店舗近くの専用駐車場（北久米町412番地）をご利用ください。</p>
        <a href="https://maps.google.com/?cid=10357450395002350789" target="_blank" rel="noopener noreferrer" className={`${BTN_SECONDARY} mt-3`}>
          駐車場の地図を見る<Arrow />
        </a>
      </div>
    ) },
    { label: '最寄り駅', content: shop.access?.stations?.filter(Boolean).map((s, i) => <p key={i} className="text-white/90 text-[0.9375rem] leading-loose">{s}</p>) },
    { label: '営業時間', content: <p className="text-white/90 text-[0.9375rem] leading-loose">{shop.hours?.weekday}（木曜定休）</p> },
    { label: '電話番号', content: <p className="text-white/90 text-[0.9375rem] leading-loose break-all"><a href={`tel:${(shop.phone ?? '').replace(/-/g, '')}`} className="text-white/90 underline underline-offset-4 decoration-white/30" onClick={() => trackTelClick('SNS Shop Info')}>{shop.phone}</a></p> },
  ];
  const photos = [
    shop.access?.parkingPhotos?.accessGuide && { label: 'Access', title: 'アクセス案内', descs: ['お車でのアクセス方法をご確認ください', '駐車場：北久米町412番地'], src: shop.access.parkingPhotos.accessGuide, alt: '駐車場・店舗へのアクセスマップ', h: 600 },
    shop.access?.parkingPhotos?.parkingLot && { label: 'Parking', title: '駐車場', descs: ['お車でお越しの際はこちらをご利用ください'], src: shop.access.parkingPhotos.parkingLot, alt: '駐車場の様子', h: 450 },
    shop.access?.parkingPhotos?.routeToShop && { label: 'Route', title: '駐車場から店舗までの道順', descs: ['駐車場から店舗までの道のりをご案内します'], src: shop.access.parkingPhotos.routeToShop, alt: '駐車場から店舗までの道順', h: 450 },
  ].filter(Boolean) as { label: string; title: string; descs: string[]; src: string; alt: string; h: number }[];

  return (
    <>
      <section id="shop" className="py-16 sm:py-24 md:py-28 bg-[#101827] scroll-mt-[70px]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <SectionHeader label="Shop Information" title="店舗情報" desc="お気軽にお越しください" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start">
            <div className="border-t border-white/10">
              {infoRows.map(({ label, content }) => (
                <div key={label} className="py-5 border-b border-white/10">
                  <h3 className="text-[#3B82F6] text-xs tracking-[0.2em] mb-1.5 font-normal">{label}</h3>
                  {content}
                </div>
              ))}
            </div>
            <div className="w-full h-[280px] md:h-[360px] bg-[#0A0A0A]">
              <iframe src={shop.googleMapsUrl ?? ''} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="店舗地図" />
            </div>
          </div>
        </div>
      </section>

      {photos.map(p => (
        <section key={p.label} className="py-16 sm:py-24 bg-[#0A0A0A] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="text-center mb-10 sm:mb-14">
              <span className="block text-[#3B82F6] text-xs tracking-[0.2em] uppercase mb-3">{p.label}</span>
              <h2 className="text-white text-[1.375rem] sm:text-2xl md:text-3xl tracking-widest font-light leading-relaxed mb-3" style={CINZEL}>{p.title}</h2>
              {p.descs.map(d => <p key={d} className="text-white/60 text-xs sm:text-sm tracking-wide mt-1">{d}</p>)}
            </div>
            <div className="max-w-[800px] mx-auto">
              <img src={p.src} alt={p.alt} width={800} height={p.h} className="block w-full h-auto" loading="lazy" onError={hideImg} />
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 sm:py-24 md:py-28 bg-[#101827]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <SectionHeader label="Business Hours" title="営業時間" desc="ご来店をお待ちしております" />
          <div className="max-w-[720px] mx-auto">
            <div className="text-center py-8 border-y border-white/10">
              <h3 className="text-white text-sm tracking-[0.12em] mb-2 font-medium">月〜水・金〜日・祝</h3>
              <p className="text-white text-[2rem] tracking-[0.08em] leading-normal" style={CINZEL}>{shop.hours?.weekday ?? '10:00 - 20:00'}</p>
              <p className="text-white/70 text-sm mt-1">定休日：木曜日</p>
            </div>
            {shop.notes && shop.notes.length > 0 && (
              <div className="mt-12">
                <h3 className="text-white text-[1.0625rem] tracking-widest text-center mb-4 font-medium" style={CINZEL}>ご確認事項</h3>
                <ul>
                  {shop.notes.map((note, i) => (
                    <li key={i} className="relative pl-5 py-2.5 border-b border-white/10 text-white/80 text-sm leading-loose">
                      <span className="absolute left-0.5 top-[1.35em] w-2 h-px bg-[#3B82F6]" aria-hidden="true" />{note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

// ---- 予約・お問い合わせ ----
function ReserveSnsSection({ lineUrl, instagramUrl }: { lineUrl: string; instagramUrl: string }) {
  return (
    <section id="reserve" className="py-16 sm:py-24 md:py-28 bg-[#0A0A0A] scroll-mt-[70px]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeader label="Reservation & Contact" title="ご予約・お問い合わせ" desc="SNSからご来店の方も大歓迎！公式LINEから簡単にご予約いただけます" />
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto border-y border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="py-10 md:px-10 text-center flex flex-col">
            <h3 className="text-white text-xl tracking-widest mb-1">LINE</h3>
            <p className="text-[#3B82F6] text-xs tracking-wider mb-4">公式LINEで予約・お問い合わせ</p>
            <p className="text-white/80 text-sm leading-loose mb-7 flex-1">{social.line.note ?? 'ご予約やお問い合わせの際はお手数ですが公式LINEにメッセージをお願いします'}</p>
            <a href={lineUrl} target="_blank" rel="noopener noreferrer" className={`${BTN_PRIMARY} self-center`}
              onClick={() => trackLineClick('SNS Reserve Card')}>
              <span className="line-booking-text"><span className="line-booking-line1">LINEで予約</span><span className="line-booking-line2">お問い合わせ</span></span><Arrow />
              <span className="sr-only">（新しいウィンドウで開きます）</span>
            </a>
          </div>
          <div className="py-10 md:px-10 text-center flex flex-col">
            <h3 className="text-white text-xl tracking-widest mb-1">Instagram</h3>
            <p className="text-[#3B82F6] text-xs tracking-wider mb-4">最新情報・施術の様子</p>
            <p className="text-white/80 text-sm leading-loose mb-7 flex-1">{social.instagram.username ?? '@yoo.n.yoo.n'}で最新の施術の様子やお知らせを配信しています。</p>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={`${BTN_SECONDARY} self-center`}>
              VIEW PROFILE<Arrow />
              <span className="sr-only">（新しいウィンドウで開きます）</span>
            </a>
          </div>
        </div>
        <div className="mt-12 sm:mt-14 text-center">
          <p className="text-white text-base sm:text-lg tracking-widest mb-2" style={CINZEL}>公式LINEで簡単予約</p>
          <p className="text-white/70 text-xs sm:text-sm tracking-wide mb-5">ご予約・お問い合わせは公式LINEからお気軽にどうぞ。24時間受付中！</p>
          <a href={lineUrl} target="_blank" rel="noopener noreferrer" className={`${BTN_PRIMARY} min-w-[260px]`}
            onClick={() => trackLineClick('SNS Reserve CTA')}>
            LINEを開く<Arrow />
            <span className="sr-only">（新しいウィンドウで開きます）</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ---- フッター ----
function FooterSns({ lineUrl }: { lineUrl: string }) {
  const stations = shop.access?.stations?.filter(Boolean) ?? [];
  return (
    <footer className="bg-[#101827] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-14 md:pt-[72px] pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-14">
          <div>
            <div className="text-[2rem] font-bold leading-none mb-3" style={SPARTAN}>yoon²</div>
            <h3 className="text-white text-base tracking-[0.12em] mb-4 font-normal">{appConfig.shop.name}</h3>
            <p className="text-white/70 text-sm leading-loose">{shop.description ?? 'イヤーエステと耳つぼで心身のバランスを整える専門サロンです。'}</p>
          </div>
          <div>
            <h4 className="text-white/70 text-xs tracking-[0.2em] pb-3 mb-4 border-b border-white/15 font-medium">店舗情報</h4>
            <p className="text-white/80 text-sm leading-loose my-1.5">{shop.address}</p>
            <p className="text-white/80 text-sm leading-loose my-1.5">{shop.hours?.weekday}</p>
            <p className="text-white/80 text-sm leading-loose my-1.5">定休日: {shop.holidays}</p>
          </div>
          <div>
            <h4 className="text-white/70 text-xs tracking-[0.2em] pb-3 mb-4 border-b border-white/15 font-medium">アクセス</h4>
            {stations.map((s, i) => <p key={i} className="text-white/80 text-sm leading-loose my-1.5">{s}</p>)}
            {shop.access?.landmarks && <p className="text-white/80 text-sm leading-loose my-1.5">{shop.access.landmarks}</p>}
            {shop.access?.parking && <p className="text-white/80 text-sm leading-loose my-1.5">{shop.access.parking}</p>}
          </div>
          <div>
            <h4 className="text-white/70 text-xs tracking-[0.2em] pb-3 mb-4 border-b border-white/15 font-medium">予約・お問い合わせ</h4>
            <a href={lineUrl} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 min-h-[44px] px-6 my-2 rounded-full border border-white/60 text-white text-sm tracking-widest hover:opacity-75 transition-opacity"
              onClick={() => trackLineClick('SNS Footer')}>
              LINEで予約<Arrow />
              <span className="sr-only">（新しいウィンドウで開きます）</span>
            </a>
          </div>
        </div>
        <div className="pt-7 border-t border-white/15 text-center">
          <p className="text-white/70 text-xs tracking-widest break-words">&copy; 2025-{new Date().getFullYear()} {appConfig.shop.name}. All rights reserved.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-7 gap-y-2">
            <Link href="/about" className="inline-flex items-center min-h-[44px] text-white/70 text-[0.8125rem] tracking-wide hover:text-white transition-colors">yoon²について</Link>
            <Link href="/event" className="inline-flex items-center min-h-[44px] text-white/70 text-[0.8125rem] tracking-wide hover:text-white transition-colors">出張イベント募集</Link>
            <Link href="/privacy" className="inline-flex items-center min-h-[44px] text-white/70 text-[0.8125rem] tracking-wide hover:text-white transition-colors">プライバシーポリシー</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---- HomeSns (main) ----
const HomeSns = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView('SNSLanding', { section: 'main', source: 'sns' });
    trackGoogleAdsPageView();
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lineUrl = (shop.lineUrl ?? social.line.url) as string;
  const instagramUrl = (shop.instagramUrl ?? social.instagram.url) as string;

  return (
    <div className="bg-[#0A0A0A] text-white selection:bg-[#3B82F6] selection:text-white font-sans overflow-x-hidden">
      <Header isScrolled={isScrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} lineUrl={lineUrl} />
      <main>
        <Hero lineUrl={lineUrl} />
        <HeroIntro />
        <BrandConceptSns />
        <MenuDiagnosisSnsSection />
        <PhotoCopySns image="/images/menus/ear-treatment-1.jpg" lines={['五感をやさしく満たす、', '特別な時間。']} align="right" />
        <ConcernSnsSection />
        <FlowSnsSection />
        <ReviewsSnsSection />
        <PhotoCopySns image="/images/menus/oil-treatment-2.jpg" lines={['五行の力で、', '本来のわたしに還る。']} align="left" />
        <MenuSnsSection lineUrl={lineUrl} />
        <FaqSnsSection lineUrl={lineUrl} />
        <ShopSnsSection />
        <ReserveSnsSection lineUrl={lineUrl} instagramUrl={instagramUrl} />
      </main>

      <FooterSns lineUrl={lineUrl} />

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 md:hidden">
        <a href={lineUrl} target="_blank" rel="noopener noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#3B82F6] text-white flex items-center justify-center shadow-lg shadow-blue-500/20"
          aria-label="LINEで予約（新しいウィンドウで開きます）" onClick={() => trackLineClick('SNS Floating')}>
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />
        </a>
      </div>
    </div>
  );
};

export default HomeSns;
