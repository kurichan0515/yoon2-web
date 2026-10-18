'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Instagram, MapPin, Clock, Phone, Calendar, ArrowRight, MessageCircle, Car, Train } from 'lucide-react';
import appConfig from '../config/appConfig';
import { trackPageView } from '../services/analyticsService';
import { trackPageView as trackGoogleAdsPageView } from '../services/googleAdsService';
import { FAQ_DATA } from '../data/faqData';
import { MENU_DATA, HOTPEPPER_URL } from '../data/menuData';
import { trackHotpepperClick, trackLineClick, trackTelClick } from '../services/analyticsService';
import './HomeSns.css';
import './HeroBackground.css';

// ---- 型定義 ----

interface NavLink { name: string; href: string; action: (() => void) | null; }

interface MenuItem {
  id: string; name: string; price: number; originalPrice?: number;
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
  googleMapsUrl?: string; description?: string; notes?: string[];
  hours?: { weekday?: string; weekend?: string };
  access?: { stations?: string[]; parkingPhotos?: { parkingLot?: string; routeToShop?: string; accessGuide?: string } };
}

const hideImg = (e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = 'none'; };
const shop = appConfig.shop as ShopCfg;
const social = appConfig.social as { line: { url: string; note?: string }; instagram: { url: string; username?: string } };

// ---- Navbar ----
interface NavbarProps { isScrolled: boolean; isMobileMenuOpen: boolean; setIsMobileMenuOpen: (v: boolean) => void; }
const Navbar = ({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }: NavbarProps) => {
  const navLinks: NavLink[] = [
    { name: 'HOME',     href: '/sns',     action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { name: 'SERVICES', href: '#courses', action: null },
    { name: 'SHOP',     href: '#shop',    action: null },
    { name: 'RESERVE',  href: '#reserve', action: null },
  ];
  const handleNavClick = (e: React.MouseEvent, link: NavLink) => { if (link.action) { e.preventDefault(); link.action(); } };
  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md py-2 sm:py-4' : 'bg-transparent py-3 sm:py-6'}`} aria-label="メインナビゲーション">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex justify-between items-center">
        <button type="button" className="text-xl sm:text-2xl font-bold text-white cursor-pointer whitespace-nowrap bg-transparent border-0"
          style={{ fontFamily: "'League Spartan', sans-serif", letterSpacing: '-0.05em' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          yoon²
        </button>
        <div className="hidden md:flex space-x-4 lg:space-x-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} onClick={e => handleNavClick(e, link)}
              className="text-xs lg:text-sm tracking-widest text-white/70 hover:text-[#3B82F6] transition-colors whitespace-nowrap">
              {link.name}
            </a>
          ))}
        </div>
        <button type="button" className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'} aria-expanded={isMobileMenuOpen}>
          {isMobileMenuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#101827] z-40 flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:hidden px-4">
          {navLinks.map(link => (
            <a key={link.name} href={link.href}
              className="text-xl sm:text-2xl tracking-[0.2em] sm:tracking-[0.3em] text-white whitespace-nowrap"
              onClick={e => { handleNavClick(e, link); setIsMobileMenuOpen(false); }}>
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

// ---- Hero ----
const Hero = () => {
  const lineUrl = (shop.lineUrl ?? social.line.url) as string;
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
      <div className="relative z-20 text-center px-4 sm:px-6">
        <h1 className="text-3xl sm:text-5xl md:text-8xl text-white font-light mb-1 sm:mb-2" style={{ fontFamily: "'League Spartan', sans-serif", letterSpacing: '-0.05em' }}>yoon²</h1>
        <p className="text-white/80 text-sm sm:text-base mb-4 sm:mb-6" style={{ fontFamily: 'Cinzel, serif' }} aria-label="読み方">ゆんゆん</p>
        <p className="text-white text-sm sm:text-base md:text-lg tracking-wide sm:tracking-widest mb-2">松山の耳つぼ・イヤーエステ専門サロン</p>
        <p className="text-white/80 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] mb-6 sm:mb-8" style={{ fontFamily: 'Cinzel, serif' }}>ear esthetic &amp; acupressure salon</p>
        <p className="text-white/90 max-w-lg mx-auto mb-6 sm:mb-8 text-xs sm:text-sm md:text-base leading-relaxed tracking-wide sm:tracking-wider px-2">
          「取れる」快感と、耳から広がる深い眠り。<br />
          迷走神経を優しく撫でる新感覚タッチで、蓄積した脳疲労をリセット。
        </p>
        <div className="mx-auto mb-5 sm:mb-6 inline-block bg-white/95 px-5 sm:px-6 py-2.5 shadow-md shadow-black/20" aria-label="ホットペッパービューティー 評価4.93">
          <div className="flex items-center justify-center gap-2 leading-none">
            <span className="text-[#c9a96e] text-base sm:text-lg tracking-wider" aria-hidden="true">★★★★★</span>
            <span className="text-[#2c2c2c] text-xl sm:text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>4.93</span>
          </div>
          <p className="text-gray-500 text-[0.65rem] sm:text-xs text-center mt-1">ホットペッパービューティー</p>
        </div>
        <div className="mb-6 sm:mb-8 p-3 sm:p-4 border border-white/15 max-w-md mx-auto">
          <p className="text-white text-xs sm:text-sm mb-2 sm:mb-3 tracking-wide">SNSからご来店の方へ</p>
          <p className="text-white/90 text-[0.65rem] sm:text-xs leading-relaxed">公式LINEから簡単予約！当日予約OK・駐車場完備</p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 justify-center px-2">
          <a href={lineUrl} target="_blank" rel="noopener noreferrer"
            className="px-6 sm:px-10 py-3 sm:py-4 bg-white text-black font-semibold text-xs sm:text-sm tracking-wide sm:tracking-widest hover:bg-[#3B82F6] hover:text-white transition-all duration-300 transform hover:-translate-y-1 inline-block text-center shadow-lg shadow-white/20"
            onClick={() => trackLineClick('SNS Hero')}>
            <span className="line-booking-text"><span className="line-booking-line1">📱 LINEで予約</span><span className="line-booking-line2">お問い合わせ</span></span>
            <span className="sr-only">（新しいウィンドウで開きます）</span>
          </a>
          <button type="button" onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="px-6 sm:px-10 py-3 sm:py-4 border border-white text-white font-semibold text-xs sm:text-sm tracking-wide sm:tracking-widest hover:bg-white/10 transition-all duration-300 whitespace-nowrap">
            コースを見る
          </button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};

// ---- ConcernSnsSection ----
const CONCERNS = [
  { num: '01', text: '休んでも疲れが取れない、頭や目が重い' },
  { num: '02', text: '自分の耳の中がどうなっているか見てみたい' },
  { num: '03', text: '肩こりや頭痛、むくみをどうにかしたい' },
  { num: '04', text: '全身の冷えやむくみもまとめてケアしたい' },
];

function ConcernSnsSection() {
  return (
    <section id="concern" className="py-12 sm:py-16 md:py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <span className="text-[#3B82F6] text-xs tracking-[0.15em] block mb-3 font-normal uppercase">FOR YOU</span>
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide sm:tracking-widest font-light" style={{ fontFamily: 'Cinzel, serif' }}>こんなお悩み、<br />抱えていませんか？</h2>
        </div>
        <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-12" aria-label="お悩みリスト">
          {CONCERNS.map(item => (
            <li key={item.num} className="flex items-center gap-4 sm:gap-6 bg-[#161B22] border border-white/5 hover:border-[#3B82F6]/30 transition-all duration-300 p-4 sm:p-5">
              <span className="text-[#3B82F6] text-lg sm:text-xl font-bold tracking-wider flex-shrink-0 w-8 text-right" aria-hidden="true">{item.num}</span>
              <span className="text-white/80 text-sm sm:text-base tracking-wide">{item.text}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-white/5 pt-6 sm:pt-8 text-center">
          <p className="text-white/70 text-sm sm:text-base tracking-wide">
            そのお悩み、yoon²の<span className="text-[#3B82F6] font-semibold">耳からのアプローチ</span>で解決できます
          </p>
          <Link href="/about" className="inline-block mt-3 text-white/50 text-xs sm:text-sm hover:text-[#3B82F6] transition-colors border-b border-white/20 hover:border-[#3B82F6] pb-0.5">
            yoon²についてはこちら<span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---- MenuDiagnosisSnsSection ----
interface DiagnosisCard {
  key: string; tag: string; name: string; target: string; contents: string[]; desc: string;
  images: string[]; detailHref?: string; tabKey?: string;
  cardClass: string; tagClass: string; textClass: string; bulletClass: string; dividerClass: string; btnClass: string;
}

const DIAGNOSIS_CARDS: DiagnosisCard[] = [
  {
    key: 'ear', tag: '愛媛県初！', name: 'イヤーエステ',
    target: '自分の耳の中を見てみたい方、休んでも疲れが取れない方へ',
    contents: ['イヤースコープで見る耳かき', '自律神経を刺激してすっきり'],
    desc: 'モニターを見ながらのプロの耳掃除で、耳の中をすっきり綺麗に。自律神経を刺激する耳掃除で、頭や目の重だるさもリセットできる愛媛県初の新感覚メニュー。',
    images: ['/images/menus/ear-treatment-2.jpg'], detailHref: '/menu/ear-este',
    cardClass: 'bg-[#2563EB]', tagClass: 'text-white', textClass: 'text-white', bulletClass: 'text-white', dividerClass: 'bg-white/40',
    btnClass: 'bg-white text-[#2563EB] hover:bg-white/90',
  },
  {
    key: 'oil', tag: '男性におすすめ', name: 'オイルリンパ',
    target: '冷えやむくみ・全身の疲れをリセットしたい方へ',
    contents: ['全身オイルトリートメント', 'リンパの流れを整える'],
    desc: '五行和漢オイルでリンパの滞りをじっくり丁寧に流し、冷え性やむくみ、身体の重だるさをスッキリ解消。深いリラックスと巡りの良さを同時に体感。',
    images: ['/images/menus/oil-treatment.jpg'], detailHref: '/menu/oil-lymph',
    cardClass: 'bg-[#047857]', tagClass: 'text-white', textClass: 'text-white', bulletClass: 'text-white', dividerClass: 'bg-white/40',
    btnClass: 'bg-white text-[#047857] hover:bg-white/90',
  },
  {
    key: 'ear-oil', tag: '迷ったらコレ', name: 'イヤーエステ×オイルリンパ',
    target: '耳も全身もまるごとリセットしたい方へ',
    contents: ['イヤースコープで見る耳かき', '3種から選べる全身オイル'],
    desc: '耳元の心地よい刺激で緊張を解きほぐした後、全身オイルリンパへ。その日の体調に合わせてオイルを選び、お疲れを根本からスッキリ解放。',
    images: ['/images/menus/ear-treatment-2.jpg', '/images/menus/oil-treatment.jpg'], tabKey: 'ear-oil',
    cardClass: 'bg-[#161B22] border border-white/5 hover:border-[#3B82F6]/30 transition-all duration-300', tagClass: 'text-[#3B82F6]', textClass: 'text-white/70', bulletClass: 'text-[#3B82F6]', dividerClass: 'bg-white/20',
    btnClass: 'border border-[#3B82F6]/50 text-[#3B82F6] hover:bg-[#3B82F6]/10',
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
    <section id="diagnosis" className="py-12 sm:py-16 md:py-24 bg-[#101827]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <span className="text-[#3B82F6] text-xs tracking-[0.15em] block mb-3 font-normal uppercase">MENU GUIDE</span>
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide sm:tracking-widest font-light" style={{ fontFamily: 'Cinzel, serif' }}>あなたにぴったりの<br />メニューはどちらですか？</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {DIAGNOSIS_CARDS.map(card => (
            <article key={card.key} className={`${card.cardClass} flex flex-col overflow-hidden`}>
              <div className="flex aspect-[4/3]" aria-hidden="true">
                {card.images.map(src => (
                  <div key={src} className="relative flex-1">
                    <Image src={src} alt="" fill sizes={card.images.length > 1 ? '(max-width: 640px) 50vw, 200px' : '(max-width: 640px) 100vw, 400px'} style={{ objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <div className={`${card.tagClass} text-[0.65rem] sm:text-xs font-semibold tracking-[0.3em] mb-3`}>{card.tag}</div>
                <h3 className="text-white text-xl sm:text-2xl font-medium tracking-wide mb-3">{card.name}</h3>
                <div className={`w-8 h-[1px] ${card.dividerClass} mb-4`} aria-hidden="true" />
                <p className={`${card.textClass} text-xs sm:text-sm mb-4 tracking-wide`}>{card.target}</p>
                <ul className="space-y-1 mb-5" aria-label="内容">
                  {card.contents.map(t => (
                    <li key={t} className={`flex items-center gap-2 ${card.textClass} text-xs sm:text-sm`}>
                      <span className={`${card.bulletClass} flex-shrink-0`} aria-hidden="true">›</span>{t}
                    </li>
                  ))}
                </ul>
                <p className={`${card.textClass} text-xs leading-relaxed flex-1`}>{card.desc}</p>
                <button type="button" onClick={() => scrollToMenu(card.tabKey)} className={`mt-6 w-full py-2.5 sm:py-3 text-xs font-semibold tracking-widest transition-colors ${card.btnClass}`}>
                  料金・詳細を見る<span className="sr-only">（{card.name}）</span>
                </button>
                {card.detailHref && (
                  <Link href={card.detailHref} className={`mt-3 text-center ${card.textClass} text-xs tracking-wide underline underline-offset-4 hover:opacity-80`}>
                    詳しく見る<span aria-hidden="true"> →</span>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
        <Link href="/event" className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 bg-[#161B22] border border-white/10 hover:border-[#3B82F6]/50 transition-colors px-4 py-4 text-white/80 text-xs sm:text-sm tracking-wide">
          <span>出張イベント開催先 募集中</span>
          <span className="text-[#3B82F6]">詳しくはこちら →</span>
        </Link>
      </div>
    </section>
  );
}

// ---- FlowSnsSection ----
const FLOW_STEPS = [
  { num: '01', icon: '👂', title: 'カウンセリング', desc: 'スコープで耳の中を一緒に確認。お悩みや気になる点をヒアリングします。', highlight: false },
  { num: '02', icon: '✨', title: '施術',           desc: '痛みなし・優しいタッチ。完全個室でリラックスできる環境で丁寧に施術。', highlight: false },
  { num: '03', icon: '😴', title: 'もみほぐし',     desc: '迷走神経を優しく刺激。ここで寝落ちされるお客様が続出です。', highlight: true },
  { num: '04', icon: '🌿', title: 'アフターケア',   desc: 'スッキリした状態を確認。お悩みに合わせたアドバイスをお伝えします。', highlight: false },
];

function FlowSnsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-[#101827]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <span className="text-[#3B82F6] text-xs tracking-[0.15em] block mb-3 font-normal uppercase">FLOW</span>
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide sm:tracking-widest font-light" style={{ fontFamily: 'Cinzel, serif' }}>初めての方も安心！<br />ご来店からの流れ</h2>
        </div>
        <div className="flex flex-col max-w-2xl mx-auto" role="list">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.num} className="flex gap-4 sm:gap-6 relative" role="listitem">
              {i < FLOW_STEPS.length - 1 && <div className="absolute left-[23px] sm:left-[27px] top-12 bottom-0 w-[1px] bg-white/10" aria-hidden="true" />}
              <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-xl sm:text-2xl z-10 ${step.highlight ? 'bg-[#3B82F6]' : 'bg-[#161B22] border border-white/10'}`} aria-hidden="true">
                {step.icon}
              </div>
              <div className={`flex-1 ${i < FLOW_STEPS.length - 1 ? 'pb-8 sm:pb-10' : ''}`}>
                <div className="text-[#3B82F6] text-[0.6rem] sm:text-[0.65rem] tracking-[0.3em] mb-1">{step.num}</div>
                <h3 className={`text-base sm:text-lg font-medium tracking-wide mb-2 ${step.highlight ? 'text-[#3B82F6]' : 'text-white'}`}>{step.title}</h3>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-white/50 text-[0.65rem] sm:text-xs tracking-widest mt-6 sm:mt-8">完全個室・全施術痛みなし</p>
      </div>
    </section>
  );
}

// ---- ReviewsSnsSection ----
const SNS_REVIEWS = [
  { id: 'r1', text: '耳の中をスコープで確認しながら施術。不眠も改善して、通う価値しかないです！', age: '30代女性' },
  { id: 'r2', text: '完全個室で男性でも安心。仕事疲れが施術後スッと消えました。',              age: '40代男性' },
  { id: 'r3', text: 'オイルリンパと耳のセットで全身ぽかぽか。気づいたら寝ていました。',        age: '20代女性' },
];

function ReviewsSnsSection() {
  return (
    <section id="reviews" className="py-12 sm:py-16 md:py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <span className="text-[#3B82F6] text-xs tracking-[0.15em] block mb-3 font-normal uppercase">REVIEWS</span>
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide sm:tracking-widest font-light mb-3" style={{ fontFamily: 'Cinzel, serif' }}>お客様の声</h2>
          <p className="text-white/50 text-xs tracking-wide">ホットペッパービューティーにて多数の高評価をいただいています</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {SNS_REVIEWS.map(r => (
            <div key={r.id} className="group bg-[#161B22] border border-white/5 hover:border-[#3B82F6]/30 transition-all duration-300 p-5 sm:p-6 flex flex-col gap-3">
              <div className="text-[#3B82F6] text-xs font-semibold tracking-wide" aria-label="高評価">★ 高評価</div>
              <p className="text-white/75 text-xs sm:text-sm leading-relaxed flex-1">「{r.text}」</p>
              <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-1">
                <span className="text-white/50 text-xs font-semibold">{r.age}</span>
                <span className="text-white/50 text-[0.65rem]">ホットペッパー</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href={HOTPEPPER_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/50 text-xs sm:text-sm hover:text-[#3B82F6] transition-colors duration-200 border-b border-white/20 hover:border-[#3B82F6] pb-1"
            onClick={() => trackHotpepperClick('SNS Reviews')}>
            すべての口コミを見る <ArrowRight size={14} aria-hidden />
            <span className="sr-only">（ホットペッパービューティー、新しいウィンドウで開きます）</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ---- MenuSnsCard ----
const SNS_BADGE: Record<string, string> = {
  '初回限定': 'border border-[#3B82F6]/60 text-[#3B82F6]',
  '人気': 'border border-[#3B82F6]/60 text-[#3B82F6]',
  'プレミアム': 'border border-white/30 text-white/70',
  'オプション': 'border border-white/20 text-white/50',
  '平日限定': 'border border-[#3B82F6]/60 text-[#3B82F6]',
  '指名限定': 'border border-white/30 text-white/70',
};

function MenuSnsCard({ menu, lineUrl }: { menu: MenuItem; lineUrl: string }) {
  return (
    <article className={`group bg-[#161B22] border ${menu.recommended ? 'border-[#3B82F6]/40' : 'border-white/5'} hover:border-[#3B82F6]/50 transition-all duration-300 p-5 sm:p-6 flex flex-col gap-3`}>
      {menu.badge && (
        <span className={`inline-block self-start px-2 py-0.5 text-xs font-medium tracking-[0.08em] uppercase ${SNS_BADGE[menu.badge] ?? 'border border-white/20 text-white/50'}`}>{menu.badge}</span>
      )}
      <h3 className="text-white text-base sm:text-lg font-medium tracking-wide leading-snug">{menu.name}</h3>
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-[#3B82F6] text-2xl sm:text-3xl font-bold tracking-tight">¥{menu.price.toLocaleString()}</span>
        {menu.originalPrice && <span className="text-white/50 text-sm line-through">¥{menu.originalPrice.toLocaleString()}</span>}
      </div>
      <div className="flex items-center gap-1.5 text-white/50 text-xs"><Clock size={12} aria-hidden /><span>約{menu.time}分</span></div>
      <p className="text-white/60 text-xs sm:text-sm leading-relaxed flex-1">{menu.description}</p>
      <div className="flex flex-col gap-2 mt-auto pt-2">
        <a href={HOTPEPPER_URL} target="_blank" rel="noopener noreferrer"
          className="block text-center px-4 py-2.5 bg-[#2563EB] text-white text-xs font-semibold tracking-widest hover:bg-[#1d4ed8] transition-colors duration-200"
          onClick={() => trackHotpepperClick(menu.name)}>
          今すぐ予約する
          <span className="sr-only">（{menu.name}、新しいウィンドウで開きます）</span>
        </a>
        <a href={lineUrl} target="_blank" rel="noopener noreferrer"
          className="block text-center px-4 py-2.5 border border-[#3B82F6]/50 text-[#3B82F6] text-xs font-semibold tracking-widest hover:bg-[#3B82F6]/10 transition-colors duration-200"
          onClick={() => trackLineClick(menu.name)}>
          LINEで予約・相談
          <span className="sr-only">（{menu.name}、新しいウィンドウで開きます）</span>
        </a>
      </div>
    </article>
  );
}

// ---- MenuSnsSection ----
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
    <section id="courses" className="py-12 sm:py-16 md:py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <span className="text-[#3B82F6] text-xs tracking-[0.15em] block mb-3 font-normal uppercase">MENU &amp; PRICE</span>
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide sm:tracking-widest font-light mb-3" style={{ fontFamily: 'Cinzel, serif' }}>メニュー・料金</h2>
          <p className="text-white/50 text-xs tracking-wide">あなたに合った癒しのメニューをお選びください</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6" role="tablist" aria-label="メニューカテゴリ">
          {menus.map((cat, i) => (
            <button key={cat.categoryKey} role="tab" aria-selected={i === activeTab}
              aria-controls={`menu-sns-panel-${cat.categoryKey}`} id={`menu-sns-tab-${cat.categoryKey}`}
              className={`px-3 sm:px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-200 whitespace-nowrap min-h-[40px] ${i === activeTab ? 'bg-[#2563EB] text-white' : 'bg-white/5 text-white/50 border border-white/10 hover:border-[#3B82F6]/50 hover:text-white/80'}`}
              onClick={() => handleTabChange(i)}
              onKeyDown={e => {
                if (e.key === 'ArrowRight') handleTabChange((i + 1) % menus.length);
                if (e.key === 'ArrowLeft') handleTabChange((i - 1 + menus.length) % menus.length);
              }}>
              {cat.category}
            </button>
          ))}
        </div>
        <p className="text-white/50 text-xs tracking-widest mb-6 sm:mb-8">{current.description}</p>
        <div id={`menu-sns-panel-${current.categoryKey}`} role="tabpanel"
          aria-labelledby={`menu-sns-tab-${current.categoryKey}`}
          className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 transition-opacity duration-200 ${fading ? 'opacity-0' : 'opacity-100'}`}>
          {visibleMenus.map(menu => <MenuSnsCard key={menu.id} menu={menu} lineUrl={lineUrl} />)}
        </div>
      </div>
    </section>
  );
}

// ---- FaqSnsItem ----
interface FaqSnsItemProps { item: FaqItemData; isOpen: boolean; onToggle: () => void; lineUrl: string; }

function FaqSnsItem({ item, isOpen, onToggle, lineUrl }: FaqSnsItemProps) {
  const isHotpepper = (url = '') => /beauty\.hotpepper\.jp/.test(url);
  const { content } = item;
  const renderAnswer = () => {
    if (!content) return null;
    const { paragraphs, label, listItems, note, afterParagraphs, priceItems } = content;
    return (
      <div className="space-y-2 text-white/70 text-xs sm:text-sm leading-relaxed">
        {paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
        {label && <p className="text-white/90 font-semibold text-xs tracking-wide mt-2">{label}</p>}
        {listItems && (
          <ul className="space-y-1 mt-1">
            {listItems.map((li, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#3B82F6] flex-shrink-0 mt-0.5">›</span>
                {li.href ? (
                  <a href={li.href} target="_blank" rel="noopener noreferrer"
                    className="text-[#3B82F6] underline underline-offset-2 hover:text-[#60A5FA] transition-colors"
                    onClick={() => { if (isHotpepper(li.href)) trackHotpepperClick('SNS FAQ Link'); }}>
                    {li.text}
                  </a>
                ) : li.hrefKey === 'line' ? (
                  <a href={lineUrl} target="_blank" rel="noopener noreferrer"
                    className="text-[#3B82F6] underline underline-offset-2 hover:text-[#60A5FA] transition-colors"
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
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#3B82F6] flex-shrink-0 mt-0.5">›</span>
                <span>{pi.label}: 通常{pi.from} → <span className="text-[#3B82F6] font-semibold">{pi.to}</span></span>
              </li>
            ))}
          </ul>
        )}
        {afterParagraphs?.map((p, i) => <p key={`after-${i}`} className="mt-1">{p}</p>)}
        {note && <p className="mt-2 pl-3 border-l-2 border-[#3B82F6]/50 text-white/60 italic text-xs">{note}</p>}
      </div>
    );
  };
  return (
    <div className={`border-b border-white/5 last:border-b-0 transition-colors ${isOpen ? 'bg-white/5' : ''}`}>
      <button className="w-full flex justify-between items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left min-h-[52px] hover:bg-white/5 transition-colors"
        onClick={onToggle} aria-expanded={isOpen} aria-controls={`faq-sns-answer-${item.id}`}>
        <span className="text-white/90 text-xs sm:text-sm font-medium tracking-wide flex-1 leading-relaxed">{item.question}</span>
        <span className={`flex-shrink-0 w-5 h-5 flex items-center justify-center text-lg font-light transition-transform duration-300 ${isOpen ? 'text-[#3B82F6] rotate-45' : 'text-white/40'}`} aria-hidden="true">
          +
        </span>
      </button>
      <div id={`faq-sns-answer-${item.id}`} className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
        <div className="px-4 sm:px-6 pb-4 sm:pb-5 border-t border-white/5 pt-3 sm:pt-4">{renderAnswer()}</div>
      </div>
    </div>
  );
}

// ---- FaqSnsSection ----
const CATEGORY_COLORS: Record<string, { dot: string; label: string }> = {
  reservation:  { dot: 'bg-[#3B82F6]', label: 'text-[#3B82F6]' },
  'first-visit': { dot: 'bg-[#3B82F6]', label: 'text-[#3B82F6]' },
  mens:          { dot: 'bg-[#3B82F6]', label: 'text-[#3B82F6]' },
  access:        { dot: 'bg-[#3B82F6]', label: 'text-[#3B82F6]' },
  payment:       { dot: 'bg-[#3B82F6]', label: 'text-[#3B82F6]' },
};

function FaqSnsSection({ lineUrl }: { lineUrl: string }) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const toggleItem = (id: string) => setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <span className="text-[#3B82F6] text-xs tracking-[0.15em] block mb-3 font-normal uppercase">FAQ</span>
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide sm:tracking-widest font-light mb-3" style={{ fontFamily: 'Cinzel, serif' }}>よくある質問</h2>
          <p className="text-white/50 text-xs tracking-wide">ご不明な点はお気軽にお問い合わせください</p>
        </div>
        <div className="flex flex-col gap-4 sm:gap-6 max-w-3xl mx-auto">
          {(FAQ_DATA as FaqCategory[]).map(category => {
            const color = CATEGORY_COLORS[category.categoryKey] ?? { dot: 'bg-[#3B82F6]', label: 'text-[#3B82F6]' };
            return (
              <div key={category.categoryKey} className="bg-[#161B22] border border-white/5 overflow-hidden">
                <div className="flex items-center gap-2 px-4 sm:px-6 py-3 border-b border-white/5">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${color.dot}`} aria-hidden="true" />
                  <h3 className={`text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase ${color.label}`}>{category.category}</h3>
                </div>
                <div>
                  {category.items.map(item => (
                    <FaqSnsItem key={item.id} item={item} isOpen={!!openItems[item.id]}
                      onToggle={() => toggleItem(item.id)} lineUrl={lineUrl} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 sm:mt-12 max-w-3xl mx-auto">
          <div className="bg-[#161B22] border border-white/5 p-4 sm:p-6 text-center">
            <p className="text-white/60 text-xs sm:text-sm tracking-wide mb-4">その他のご質問はお気軽にお問い合わせください</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={lineUrl} target="_blank" rel="noopener noreferrer"
                className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-[#2563EB] text-white font-semibold text-xs sm:text-sm tracking-widest hover:bg-[#1d4ed8] transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap text-center"
                onClick={() => trackLineClick('SNS FAQ Contact CTA')}>
                LINEでお問い合わせ →
                <span className="sr-only">（新しいウィンドウで開きます）</span>
              </a>
              <a href={`tel:${(appConfig.shop.phone as string).replace(/-/g, '')}`}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 border border-white/20 text-white/70 text-xs sm:text-sm tracking-widest hover:border-[#3B82F6] hover:text-white transition-all duration-300 whitespace-nowrap"
                onClick={() => trackTelClick('SNS FAQ Contact CTA')}>
                <Phone size={14} aria-hidden />{appConfig.shop.phone as string}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- HomeSns (main) ----
const HomeSns = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView('SNSLanding', { section: 'main', source: 'sns' });
    trackGoogleAdsPageView();
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lineUrl = (shop.lineUrl ?? social.line.url) as string;
  const instagramUrl = (shop.instagramUrl ?? social.instagram.url) as string;

  return (
    <div className="bg-[#0A0A0A] text-white selection:bg-[#3B82F6] selection:text-white font-sans">
      <Navbar isScrolled={isScrolled} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <Hero />

      <MenuDiagnosisSnsSection />
      <ConcernSnsSection />
      <FlowSnsSection />

      <ReviewsSnsSection />
      <MenuSnsSection lineUrl={lineUrl} />
      <FaqSnsSection lineUrl={lineUrl} />

      <section id="shop" className="py-12 sm:py-16 md:py-24 px-3 sm:px-6 max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <span className="text-[#3B82F6] text-xs tracking-[0.15em] block mb-3 font-normal uppercase whitespace-nowrap">ACCESS</span>
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide sm:tracking-widest font-light" style={{ fontFamily: 'Cinzel, serif' }}>Shop Information</h2>
        </div>
        <div className="bg-[#161B22] p-4 sm:p-6 md:p-8 lg:p-16 border border-white/5 flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12">
          <div className="flex-1">
            <div className="space-y-4 sm:space-y-6">
              {[
                { icon: <MapPin className="text-[#3B82F6] shrink-0 w-4 h-4 sm:w-5 sm:h-5" />, label: '住所', content: <p className="text-xs sm:text-sm break-words !text-white/70">{shop.address}</p> },
                { icon: <Car className="text-[#3B82F6] shrink-0 w-4 h-4 sm:w-5 sm:h-5" />, label: '駐車場のご案内', content: (
                  <div>
                    <p className="text-xs sm:text-sm !text-white/70">店舗前に駐車スペースがございません。店舗近くの専用駐車場（北久米町412番地）をご利用ください。</p>
                    <a href="https://maps.google.com/?cid=10357450395002350789" target="_blank" rel="noopener noreferrer"
                      className="inline-block mt-2 px-4 py-2 border border-white/20 text-white/70 text-xs tracking-wide hover:border-[#3B82F6] hover:text-white transition-colors">
                      駐車場の地図を見る
                    </a>
                  </div>
                ) },
                { icon: <Train className="text-[#3B82F6] shrink-0 w-4 h-4 sm:w-5 sm:h-5" />, label: '最寄り駅', content: shop.access?.stations?.filter(Boolean).map((s, i) => <p key={i} className="text-xs sm:text-sm !text-white/70">{s}</p>) },
                { icon: <Clock className="text-[#3B82F6] shrink-0 w-4 h-4 sm:w-5 sm:h-5" />, label: '営業時間', content: <p className="text-xs sm:text-sm !text-white/70">{shop.hours?.weekday}（木曜定休）</p> },
                { icon: <Phone className="text-[#3B82F6] shrink-0 w-4 h-4 sm:w-5 sm:h-5" />, label: '電話番号', content: <p className="text-xs sm:text-sm break-all !text-white/70"><a href={`tel:${(shop.phone ?? '').replace(/-/g, '')}`} onClick={() => trackTelClick('SNS Shop Info')}>{shop.phone}</a></p> },
              ].map(({ icon, label, content }) => (
                <div key={label} className="flex items-start gap-2 sm:gap-3 md:gap-4 text-white/70">
                  {icon}
                  <div className="min-w-0 flex-1"><h3 className="text-white mb-1 text-sm sm:text-base">{label}</h3>{content}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 sm:mt-8 md:mt-10 flex gap-3 sm:gap-4">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 bg-white/5 hover:bg-[#3B82F6] transition-colors flex-shrink-0" aria-label="Instagram"><Instagram className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden /></a>
              <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 bg-white/5 hover:bg-[#3B82F6] transition-colors flex-shrink-0" aria-label="LINEで予約" onClick={() => trackLineClick('SNS Shop Info')}><Calendar className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden /></a>
            </div>
          </div>
          <div className="flex-1 h-64 md:h-auto bg-[#0A0A0A] relative overflow-hidden border border-white/10">
            <iframe src={shop.googleMapsUrl ?? ''} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="店舗地図" />
          </div>
        </div>
        {shop.access?.parkingPhotos?.accessGuide && (
          <div className="mb-8 sm:mb-12">
            <p className="text-[#3B82F6] text-xs tracking-[0.15em] uppercase mb-2">Access</p>
            <h3 className="text-white text-base sm:text-lg tracking-wide mb-1">アクセス案内</h3>
            <p className="text-white/50 text-xs mb-1">お車でのアクセス方法をご確認ください</p>
            <p className="text-white/50 text-xs mb-3">駐車場：北久米町412番地</p>
            <div className="bg-[#161B22] border border-white/5 overflow-hidden">
              <img src={shop.access.parkingPhotos.accessGuide} alt="駐車場・店舗へのアクセスマップ" width={800} height={600} className="w-full h-auto" loading="lazy" onError={hideImg} />
            </div>
          </div>
        )}
        {shop.access?.parkingPhotos?.parkingLot && (
          <div className="mb-8 sm:mb-12">
            <p className="text-[#3B82F6] text-xs tracking-[0.15em] uppercase mb-2">Parking</p>
            <h3 className="text-white text-base sm:text-lg tracking-wide mb-1">駐車場</h3>
            <p className="text-white/50 text-xs mb-3">お車でお越しの際はこちらをご利用ください</p>
            <div className="bg-[#161B22] border border-white/5 overflow-hidden">
              <img src={shop.access.parkingPhotos.parkingLot} alt="駐車場の様子" width={800} height={450} className="w-full h-auto" loading="lazy" onError={hideImg} />
            </div>
          </div>
        )}
        {shop.access?.parkingPhotos?.routeToShop && (
          <div className="mb-8 sm:mb-12">
            <p className="text-[#3B82F6] text-xs tracking-[0.15em] uppercase mb-2">Route</p>
            <h3 className="text-white text-base sm:text-lg tracking-wide mb-1">駐車場から店舗までの道順</h3>
            <p className="text-white/50 text-xs mb-3">駐車場から店舗までの道のりをご案内します</p>
            <div className="bg-[#161B22] border border-white/5 overflow-hidden">
              <img src={shop.access.parkingPhotos.routeToShop} alt="駐車場から店舗までの道順" width={800} height={450} className="w-full h-auto" loading="lazy" onError={hideImg} />
            </div>
          </div>
        )}
        {shop.notes && shop.notes.length > 0 && (
          <div className="bg-[#161B22] p-4 sm:p-6 md:p-8 border border-white/5">
            <h3 className="text-white text-sm sm:text-base md:text-lg mb-1 tracking-wide">営業時間</h3>
            <p className="text-white/70 text-xs sm:text-sm mb-1">月〜水・金〜日・祝　{shop.hours?.weekday ?? '10:00 - 20:00'}</p>
            <p className="text-white/50 text-xs mb-4 sm:mb-6">定休日：木曜日</p>
            <h3 className="text-white text-sm sm:text-base md:text-lg mb-3 sm:mb-4 tracking-wide">ご確認事項</h3>
            <ul className="space-y-1.5 sm:space-y-2">{shop.notes.map((note, i) => <li key={i} className="text-white/70 text-xs sm:text-sm">{note}</li>)}</ul>
          </div>
        )}
      </section>

      <section id="reserve" className="py-12 sm:py-16 md:py-24 bg-[#101827]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-[#3B82F6] text-xs tracking-[0.15em] block mb-3 font-normal uppercase whitespace-nowrap">RESERVATION</span>
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide sm:tracking-widest font-light mb-3 sm:mb-4" style={{ fontFamily: 'Cinzel, serif' }}>ご予約・お問い合わせ</h2>
            <p className="text-white/80 text-sm sm:text-base md:text-lg tracking-wide max-w-2xl mx-auto px-2">SNSからご来店の方も大歓迎！公式LINEから簡単にご予約いただけます</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <a href={lineUrl} target="_blank" rel="noopener noreferrer"
              className="group bg-gradient-to-br from-[#161B22] to-[#0A0A0A] p-4 sm:p-6 md:p-8 lg:p-12 border-2 border-[#3B82F6]/30 hover:border-[#3B82F6] transition-all duration-500 relative overflow-hidden shadow-lg shadow-[#3B82F6]/20 hover:shadow-[#3B82F6]/40"
              onClick={() => trackLineClick('SNS Reserve Card')}>
              <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-10 group-hover:opacity-100 transition-opacity"><MessageCircle className="text-[#3B82F6] w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" /></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#3B82F6]/20 flex items-center justify-center group-hover:bg-[#3B82F6]/30 transition-colors flex-shrink-0"><MessageCircle className="text-[#3B82F6] w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" /></div>
                  <div className="min-w-0 flex-1"><h3 className="text-white text-lg sm:text-xl md:text-2xl tracking-wide sm:tracking-wider mb-1 whitespace-nowrap">LINE</h3><p className="text-white/50 text-xs sm:text-sm">公式LINEで予約・お問い合わせ</p></div>
                </div>
                <p className="text-white/70 leading-relaxed mb-4 sm:mb-6 tracking-wide text-xs sm:text-sm">{social.line.note ?? 'ご予約やお問い合わせの際はお手数ですが公式LINEにメッセージをお願いします'}</p>
                <div className="flex items-center gap-2 text-[#3B82F6] group-hover:gap-3 sm:group-hover:gap-4 transition-all">
                  <span className="text-xs sm:text-sm font-semibold tracking-wide sm:tracking-widest uppercase"><span className="line-booking-line1">LINEで予約</span><span className="line-booking-line2">お問い合わせ</span></span>
                  <ArrowRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-2 transition-transform flex-shrink-0" />
                </div>
                <span className="sr-only">（新しいウィンドウで開きます）</span>
              </div>
            </a>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer"
              className="group bg-[#161B22] p-4 sm:p-6 md:p-8 lg:p-12 border border-white/5 hover:border-[#3B82F6]/50 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-10 group-hover:opacity-100 transition-opacity"><Instagram className="text-[#3B82F6] w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" /></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#3B82F6]/20 flex items-center justify-center group-hover:bg-[#3B82F6]/30 transition-colors flex-shrink-0"><Instagram className="text-[#3B82F6] w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" /></div>
                  <div className="min-w-0 flex-1"><h3 className="text-white text-lg sm:text-xl md:text-2xl tracking-wide sm:tracking-wider mb-1 whitespace-nowrap">Instagram</h3><p className="text-white/50 text-xs sm:text-sm">最新情報・施術の様子</p></div>
                </div>
                <p className="text-white/70 leading-relaxed mb-4 sm:mb-6 tracking-wide text-xs sm:text-sm">{social.instagram.username ?? '@yoo.n.yoo.n'}で最新の施術の様子やお知らせを配信しています。</p>
                <div className="flex items-center gap-2 text-[#3B82F6] group-hover:gap-3 sm:group-hover:gap-4 transition-all">
                  <span className="text-xs sm:text-sm font-semibold tracking-wide sm:tracking-widest uppercase whitespace-nowrap">VIEW PROFILE</span>
                  <ArrowRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-2 transition-transform flex-shrink-0" />
                </div>
                <span className="sr-only">（新しいウィンドウで開きます）</span>
              </div>
            </a>
          </div>
          <div className="mt-8 sm:mt-12 text-center px-2">
            <div className="bg-[#161B22] border border-white/10 p-4 sm:p-6 max-w-2xl mx-auto">
              <p className="text-white font-semibold mb-2 text-sm sm:text-base md:text-lg">公式LINEで簡単予約</p>
              <p className="text-white/70 text-xs sm:text-sm tracking-wide mb-3 sm:mb-4">ご予約・お問い合わせは公式LINEからお気軽にどうぞ。24時間受付中！</p>
              <a href={lineUrl} target="_blank" rel="noopener noreferrer"
                className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-[#2563EB] text-white font-semibold text-xs sm:text-sm tracking-wide sm:tracking-widest hover:bg-[#1d4ed8] transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap"
                onClick={() => trackLineClick('SNS Reserve CTA')}>
                LINEを開く →
                <span className="sr-only">（新しいウィンドウで開きます）</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 sm:py-12 border-t border-white/5 text-center px-3">
        <div className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 whitespace-nowrap" style={{ fontFamily: "'League Spartan', sans-serif", letterSpacing: '-0.05em' }}>yoon²</div>
        <p className="text-white/50 text-[0.65rem] sm:text-xs tracking-wide sm:tracking-widest break-words">&copy; 2025-{new Date().getFullYear()} {appConfig.shop.name}. All rights reserved.</p>
        <p className="mt-3">
          <a href="/privacy" className="text-white/50 text-[0.65rem] sm:text-xs tracking-wide hover:text-white/70 transition-colors">プライバシーポリシー</a>
        </p>
      </footer>

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 md:hidden">
        <a href={lineUrl} target="_blank" rel="noopener noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 bg-[#3B82F6] text-white flex items-center justify-center shadow-lg shadow-blue-500/20"
          aria-label="LINEで予約（新しいウィンドウで開きます）" onClick={() => trackLineClick('SNS Floating')}>
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />
        </a>
      </div>
    </div>
  );
};

export default HomeSns;
