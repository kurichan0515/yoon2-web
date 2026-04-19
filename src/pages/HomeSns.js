import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Instagram, MapPin, Clock, Phone, Calendar, ArrowRight, ChevronRight, User, MessageCircle } from 'lucide-react';
import appConfig from '../config/appConfig';
import AdSense from '../components/common/AdSense';
import courseService from '../services/courseService';
import { COURSE_CATEGORIES, COURSE_CATEGORY_LABELS } from '../types/courseTypes';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { setPageMeta } from '../utils/seoHelper';
import { trackPageView } from '../services/analyticsService';
import { trackPageView as trackGoogleAdsPageView } from '../services/googleAdsService';
import logger from '../utils/logger';
import { FAQ_DATA, getFaqStructuredData } from '../data/faqData';
import { MENU_DATA, HOTPEPPER_URL, getMenuStructuredData } from '../data/menuData';
import './HomeSns.css';
import './Home.css';

// --- Components ---

const Navbar = ({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navigate = useNavigate();

  const navLinks = [
    { name: 'HOME', href: '/sns', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { name: 'ABOUT', href: '#about', action: null },
    { name: 'SERVICES', href: '#courses', action: null },
    { name: 'SHOP', href: '#shop', action: null },
    { name: 'RESERVE', href: '#reserve', action: null },
  ];

  const handleNavClick = (e, link) => {
    if (link.action) {
      e.preventDefault();
      link.action();
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md py-2 sm:py-4' : 'bg-transparent py-3 sm:py-6'}`} aria-label="メインナビゲーション">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex justify-between items-center">
        <button
          type="button"
          className="text-xl sm:text-2xl font-bold text-white cursor-pointer whitespace-nowrap bg-transparent border-0"
          style={{ fontFamily: "'League Spartan', sans-serif", letterSpacing: '-0.05em' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="トップへ"
        >
          yoon²
        </button>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4 lg:space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link)}
              className="text-xs lg:text-sm tracking-widest text-white/70 hover:text-[#3B82F6] transition-colors whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#101827] z-40 flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:hidden px-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xl sm:text-2xl tracking-[0.2em] sm:tracking-[0.3em] text-white whitespace-nowrap"
              onClick={(e) => {
                handleNavClick(e, link);
                setIsMobileMenuOpen(false);
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const lineUrl = appConfig.shop.lineUrl || appConfig.social.line.url;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay — Home.js と同じ処理 */}
      <div
        className="absolute inset-0 z-0 hero-background"
        style={{ backgroundImage: "url('/images/shop/play-room.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.35)' }} />
      </div>

      <div className="relative z-20 text-center px-4 sm:px-6">
        <h1 className="text-3xl sm:text-5xl md:text-8xl text-white font-bold mb-1 sm:mb-2" style={{ fontFamily: "'League Spartan', sans-serif", letterSpacing: '-0.05em' }}>
          yoon²
        </h1>
        <p className="text-white/80 text-sm sm:text-base mb-4 sm:mb-6" style={{ fontFamily: 'Cinzel, serif' }} aria-label="読み方">ゆんゆん</p>
        <p className="text-white/80 text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.5em] mb-6 sm:mb-8 animate-fade-in-up" style={{ fontFamily: 'Cinzel, serif' }} aria-hidden="true">
          EAR ESTHETIC & ACUPRESSURE
        </p>
        <p className="text-white/90 max-w-lg mx-auto mb-6 sm:mb-8 text-xs sm:text-sm md:text-base leading-relaxed tracking-wide sm:tracking-wider px-2">
          深い夜の静寂に包まれるような、究極の癒やし体験。<br className="sm:hidden" />
          耳から整う、心と身体の休息。
        </p>
        {/* SNS導線向け：予約CTAを強調 */}
        <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 max-w-md mx-auto">
          <p className="text-white text-xs sm:text-sm mb-2 sm:mb-3 tracking-wide">✨ SNSからご来店の方へ</p>
          <p className="text-white/90 text-[0.65rem] sm:text-xs leading-relaxed">
            公式LINEから簡単予約！当日予約OK・駐車場完備
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 justify-center px-2">
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-10 py-3 sm:py-4 bg-white text-black font-semibold text-xs sm:text-sm tracking-wide sm:tracking-widest hover:bg-[#3B82F6] hover:text-white transition-all duration-300 transform hover:-translate-y-1 inline-block text-center shadow-lg shadow-white/20"
            aria-label="LINEで予約・お問い合わせ（新しいウィンドウで開きます）"
          >
            <span className="line-booking-text">
              <span className="line-booking-line1">📱 LINEで予約</span>
              <span className="line-booking-line2">お問い合わせ</span>
            </span>
          </a>
          <button
            type="button"
            onClick={() => {
              const coursesSection = document.getElementById('courses');
              if (coursesSection) {
                coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="px-6 sm:px-10 py-3 sm:py-4 border border-white text-white font-semibold text-xs sm:text-sm tracking-wide sm:tracking-widest hover:bg-white/10 transition-all duration-300 whitespace-nowrap"
            aria-label="サービスメニューへスクロール"
          >
            VIEW SERVICES
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};

const MenuCard = ({ title, price, description }) => (
  <div className="group bg-[#161B22] p-8 border border-white/5 hover:border-[#3B82F6]/50 transition-all duration-500 relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
      <ChevronRight className="text-[#3B82F6]" size={40} />
    </div>
    <h3 className="text-white text-xl mb-2 tracking-wider">{title}</h3>
    <p className="text-[#3B82F6] font-bold mb-4 tracking-tighter">¥{price.toLocaleString()} ~</p>
    <p className="text-white/50 text-sm leading-relaxed">{description}</p>
    <div className="mt-6 w-10 h-[1px] bg-white/20 group-hover:w-full group-hover:bg-[#3B82F6] transition-all duration-700" />
  </div>
);

const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-8 sm:mb-12 md:mb-16">
    <span className="text-[#3B82F6] text-[0.65rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.4em] block mb-2 font-bold uppercase whitespace-nowrap">{subtitle}</span>
    <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide sm:tracking-widest font-light" style={{ fontFamily: 'Cinzel, serif' }}>{title}</h2>
  </div>
);

// ダークテーマ用バッジスタイル
const SNS_BADGE = {
  '初回限定': 'bg-red-600 text-white',
  '人気':     'bg-yellow-500 text-black',
  'プレミアム':'bg-amber-800 text-white',
  'オプション':'bg-gray-600 text-white',
};

// ダークテーマ用メニューカード
function MenuSnsCard({ menu, lineUrl }) {
  return (
    <article className={`group bg-[#161B22] border ${menu.recommended ? 'border-[#3B82F6]/40' : 'border-white/5'} hover:border-[#3B82F6]/50 transition-all duration-300 p-5 sm:p-6 flex flex-col gap-3`}>
      {menu.badge && (
        <span className={`inline-block self-start px-2 py-0.5 rounded text-xs font-semibold tracking-wide ${SNS_BADGE[menu.badge] || 'bg-gray-600 text-white'}`}>
          {menu.badge}
        </span>
      )}
      <h3 className="text-white text-base sm:text-lg font-medium tracking-wide leading-snug">{menu.name}</h3>
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-[#3B82F6] text-2xl sm:text-3xl font-bold tracking-tight">¥{menu.price.toLocaleString()}</span>
        {menu.originalPrice && (
          <span className="text-white/30 text-sm line-through">¥{menu.originalPrice.toLocaleString()}</span>
        )}
      </div>
      <div className="flex items-center gap-1.5 text-white/40 text-xs">
        <Clock size={12} aria-hidden />
        <span>約{menu.time}分</span>
      </div>
      <p className="text-white/60 text-xs sm:text-sm leading-relaxed flex-1">{menu.description}</p>
      <div className="flex flex-col gap-2 mt-auto pt-2">
        <a
          href={HOTPEPPER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center px-4 py-2.5 bg-[#3B82F6] text-white text-xs font-semibold tracking-widest hover:bg-[#2563EB] transition-colors duration-200"
          aria-label={`${menu.name}をホットペッパーで予約`}
        >
          ホットペッパーで予約
        </a>
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center px-4 py-2.5 border border-[#3B82F6]/50 text-[#3B82F6] text-xs font-semibold tracking-widest hover:bg-[#3B82F6]/10 transition-colors duration-200"
          aria-label={`${menu.name}についてLINEで相談`}
        >
          LINEで相談
        </a>
      </div>
      <div className="w-8 h-px bg-white/10 group-hover:w-full group-hover:bg-[#3B82F6] transition-all duration-500 mt-1" />
    </article>
  );
}

function MenuSnsSection({ lineUrl }) {
  const [activeTab, setActiveTab] = useState(0);
  const [fading, setFading] = useState(false);

  // SEO構造化データ
  useEffect(() => {
    const id = 'menu-structured-data-sns';
    if (document.getElementById(id)) return;
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = getMenuStructuredData();
    document.head.appendChild(script);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  const handleTabChange = (i) => {
    if (i === activeTab) return;
    setFading(true);
    setTimeout(() => { setActiveTab(i); setFading(false); }, 180);
  };

  const current = MENU_DATA[activeTab];

  return (
    <section id="courses" className="py-12 sm:py-16 md:py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <SectionHeading title="メニュー・料金" subtitle="MENU & PRICE" />

        {/* タブ */}
        <div
          className="flex flex-wrap gap-2 mb-4 sm:mb-6"
          role="tablist"
          aria-label="メニューカテゴリ"
        >
          {MENU_DATA.map((cat, i) => (
            <button
              key={cat.categoryKey}
              role="tab"
              aria-selected={i === activeTab}
              aria-controls={`menu-sns-panel-${cat.categoryKey}`}
              id={`menu-sns-tab-${cat.categoryKey}`}
              className={`px-3 sm:px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-200 whitespace-nowrap min-h-[40px] ${
                i === activeTab
                  ? 'bg-[#3B82F6] text-white'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:border-[#3B82F6]/50 hover:text-white/80'
              }`}
              onClick={() => handleTabChange(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') handleTabChange((i + 1) % MENU_DATA.length);
                if (e.key === 'ArrowLeft') handleTabChange((i - 1 + MENU_DATA.length) % MENU_DATA.length);
              }}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* カテゴリ説明 */}
        <p className="text-white/40 text-xs tracking-widest mb-6 sm:mb-8">{current.description}</p>

        {/* メニューグリッド */}
        <div
          id={`menu-sns-panel-${current.categoryKey}`}
          role="tabpanel"
          aria-labelledby={`menu-sns-tab-${current.categoryKey}`}
          className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 transition-opacity duration-200 ${fading ? 'opacity-0' : 'opacity-100'}`}
        >
          {current.menus.map(menu => (
            <MenuSnsCard key={menu.id} menu={menu} lineUrl={lineUrl} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ダークテーマ用FAQアイテム
function FaqSnsItem({ item, isOpen, onToggle, lineUrl }) {
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
                  <a href={li.href} target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] underline underline-offset-2 hover:text-[#60A5FA] transition-colors">{li.text}</a>
                ) : li.hrefKey === 'line' ? (
                  <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] underline underline-offset-2 hover:text-[#60A5FA] transition-colors">{li.text}</a>
                ) : (
                  <span>{li.text}</span>
                )}
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
        {note && (
          <p className="mt-2 pl-3 border-l-2 border-[#3B82F6]/50 text-white/60 italic text-xs">{note}</p>
        )}
      </div>
    );
  };

  return (
    <div className={`border-b border-white/5 last:border-b-0 transition-colors ${isOpen ? 'bg-white/5' : ''}`}>
      <button
        className="w-full flex justify-between items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left min-h-[52px] hover:bg-white/5 transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-sns-answer-${item.id}`}
      >
        <span className="text-white/90 text-xs sm:text-sm font-medium tracking-wide flex-1 leading-relaxed">{item.question}</span>
        <span
          className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center text-base transition-all duration-300 ${
            isOpen
              ? 'bg-[#3B82F6] border-[#3B82F6] text-white'
              : 'border-white/30 text-white/50'
          }`}
          aria-hidden="true"
        >
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div
        id={`faq-sns-answer-${item.id}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
      >
        <div className="px-4 sm:px-6 pb-4 sm:pb-5 border-t border-white/5 pt-3 sm:pt-4">
          {renderAnswer()}
        </div>
      </div>
    </div>
  );
}

// カテゴリ別アクセントカラー（ダークテーマ）
const CATEGORY_COLORS = {
  reservation: { dot: 'bg-blue-400',   label: 'text-blue-400'   },
  'first-visit': { dot: 'bg-green-400', label: 'text-green-400' },
  mens:          { dot: 'bg-amber-500', label: 'text-amber-500' },
  access:        { dot: 'bg-orange-400',label: 'text-orange-400'},
  payment:       { dot: 'bg-yellow-400',label: 'text-yellow-400'},
};

function FaqSnsSection({ lineUrl }) {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));

  // SEO構造化データ（HomeSns専用 — ページ遷移時にHome側と衝突しないようIDを分ける）
  useEffect(() => {
    const id = 'faq-structured-data-sns';
    const existing = document.getElementById(id);
    if (existing) return;
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = getFaqStructuredData();
    document.head.appendChild(script);
    return () => { const el = document.getElementById(id); if (el) el.remove(); };
  }, []);

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* セクションヘッダー */}
        <SectionHeading title="よくある質問" subtitle="FAQ" />

        {/* FAQカテゴリ一覧 */}
        <div className="flex flex-col gap-4 sm:gap-6 max-w-3xl mx-auto">
          {FAQ_DATA.map(category => {
            const color = CATEGORY_COLORS[category.categoryKey] || { dot: 'bg-[#3B82F6]', label: 'text-[#3B82F6]' };
            return (
              <div
                key={category.categoryKey}
                className="bg-[#161B22] border border-white/5 overflow-hidden"
              >
                {/* カテゴリタイトル */}
                <div className="flex items-center gap-2 px-4 sm:px-6 py-3 border-b border-white/5">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${color.dot}`} aria-hidden="true" />
                  <h3 className={`text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase ${color.label}`}>
                    {category.category}
                  </h3>
                </div>
                {/* FAQアイテム */}
                <div>
                  {category.items.map(item => (
                    <FaqSnsItem
                      key={item.id}
                      item={item}
                      isOpen={!!openItems[item.id]}
                      onToggle={() => toggleItem(item.id)}
                      lineUrl={lineUrl}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* お問い合わせCTA */}
        <div className="mt-8 sm:mt-12 max-w-3xl mx-auto">
          <div className="bg-[#161B22] border border-white/5 p-4 sm:p-6 text-center">
            <p className="text-white/60 text-xs sm:text-sm tracking-wide mb-4">
              その他のご質問はお気軽にお問い合わせください
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-[#3B82F6] text-white font-semibold text-xs sm:text-sm tracking-widest hover:bg-[#2563EB] transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap text-center"
                aria-label="LINEでお問い合わせ（新しいウィンドウで開きます）"
              >
                LINEでお問い合わせ →
              </a>
              <a
                href={`tel:${appConfig.shop.phone.replace(/-/g, '')}`}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 border border-white/20 text-white/70 text-xs sm:text-sm tracking-widest hover:border-[#3B82F6] hover:text-white transition-all duration-300 whitespace-nowrap"
                aria-label={`電話で問い合わせ: ${appConfig.shop.phone}`}
              >
                <Phone size={14} aria-hidden />
                {appConfig.shop.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const HomeSns = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const courseCardsRef = useRef([]);
  
  // Courses state
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // ページの一番上にスクロール
    window.scrollTo(0, 0);
    
    // SEOメタタグを設定（SNS導線向け）
    setPageMeta({
      title: 'yoon² | 松山の耳つぼ・イヤーエステ SNSからのご予約',
      description: '愛媛県松山市の耳つぼ・イヤーエステ専門サロン。初回3,500円～、オンライン予約OK。公式LINEから簡単予約。北久米駅徒歩5分、駐車場完備。',
      path: '/sns'
    });
    
    // インプレッションを記録
    trackPageView('SNSLanding', {
      section: 'main',
      source: 'sns'
    });
    
    // Google Adsページビューを記録
    trackGoogleAdsPageView('/sns', 'SNS Landing - yoon²ゆんゆん');
    
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load courses
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setCoursesLoading(true);
        const result = await courseService.getAllCourses();
        if (result.success) {
          setCourses(result.data);
        } else {
          setCoursesError(result.error);
        }
      } catch (err) {
        setCoursesError('コースの読み込みに失敗しました');
      } finally {
        setCoursesLoading(false);
      }
    };
    loadCourses();
  }, []);

  // コースカード用のスクロールアニメーション用のIntersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('fade-in-up');
          }, index * 100);
        }
      });
    }, observerOptions);

    courseCardsRef.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [courses, selectedCategory]);

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const lineUrl = appConfig.shop.lineUrl || appConfig.social.line.url;
  const instagramUrl = appConfig.shop.instagramUrl || appConfig.social.instagram.url;
  const instagramUsername = appConfig.social.instagram.username?.replace('@', '') || 'yoo.n.yoo.n';
  const { shop } = appConfig;

  return (
    <div className="bg-[#0A0A0A] text-white selection:bg-[#3B82F6] selection:text-white font-sans">
      <Navbar 
        isScrolled={isScrolled} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      <Hero />

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-24 px-3 sm:px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 border border-[#3B82F6]/20 group-hover:border-[#3B82F6]/40 transition-all duration-700" />
            <img 
              src="/images/about/concept-interior.jpg"
              alt="店内の様子"
              width={600}
              height={400}
              className="relative z-10 w-full grayscale hover:grayscale-0 transition-all duration-1000"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800';
              }}
            />
          </div>
          <div>
            <SectionHeading title="Concept" subtitle="ABOUT US" />
            <p className="text-white/85 leading-relaxed sm:leading-loose mb-6 sm:mb-8 tracking-wide text-sm sm:text-base">
              {appConfig.shop.description || 'yoon²（ユンユン）は、プロフェッショナルな技術で日常の喧騒をリセットするイヤーエステサロンです。専門のスコープを用いた精密な施術と、深いリラクゼーションをもたらすドライヘッドスパを組み合わせ、お客様お一人おひとりの「休息の時間」を大切にしています。この洗練されたWebサイトのデザインは、当店のこだわり抜いた施術クオリティと、研ぎ澄まされた癒やしの世界観を表現しています。'}
            </p>
            <button
              type="button"
              onClick={() => {
                const coursesSection = document.getElementById('courses');
                if (coursesSection) {
                  coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="flex items-center gap-2 text-white hover:text-[#3B82F6] transition-colors group text-sm sm:text-base whitespace-nowrap"
              aria-label="サービスメニューへスクロール"
            >
              VIEW SERVICES <ArrowRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-2 transition-transform" aria-hidden />
            </button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <MenuSnsSection lineUrl={lineUrl} />

      {/* Reserve Section - SNS導線向けに強調 */}
      <section id="reserve" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-[#101827] to-[#0A0A0A] relative overflow-hidden">
        {/* 装飾的な背景要素 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#3B82F6] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-[#3B82F6] text-[0.65rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.4em] block mb-2 font-bold uppercase whitespace-nowrap">RESERVATION</span>
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide sm:tracking-widest font-light mb-3 sm:mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
              ご予約・お問い合わせ
            </h2>
            <p className="text-white/80 text-sm sm:text-base md:text-lg tracking-wide max-w-2xl mx-auto px-2">
              SNSからご来店の方も大歓迎！公式LINEから簡単にご予約いただけます
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* LINE Card - SNS導線向けに強調 */}
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-[#161B22] to-[#0A0A0A] p-4 sm:p-6 md:p-8 lg:p-12 border-2 border-[#3B82F6]/30 hover:border-[#3B82F6] transition-all duration-500 relative overflow-hidden shadow-lg shadow-[#3B82F6]/20 hover:shadow-[#3B82F6]/40"
              aria-label="LINEで予約・お問い合わせ（新しいウィンドウで開きます）"
            >
              <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <MessageCircle className="text-[#3B82F6] w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#3B82F6]/20 rounded-full flex items-center justify-center group-hover:bg-[#3B82F6]/30 transition-colors flex-shrink-0">
                    <MessageCircle className="text-[#3B82F6] w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white text-lg sm:text-xl md:text-2xl tracking-wide sm:tracking-wider mb-1 whitespace-nowrap">LINE</h3>
                    <p className="text-white/50 text-xs sm:text-sm">公式LINEで予約・お問い合わせ</p>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed mb-4 sm:mb-6 tracking-wide text-xs sm:text-sm">
                  {appConfig.social.line.note || 'ご予約やお問い合わせの際はお手数ですが公式LINEにメッセージをお願いします'}
                </p>
                <div className="bg-[#3B82F6]/20 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 border border-[#3B82F6]/30">
                  <p className="text-white text-xs sm:text-sm font-semibold mb-1">✨ SNSからのご来店特典</p>
                  <p className="text-white/80 text-[0.65rem] sm:text-xs">当日予約OK・駐車場完備・駅から徒歩5分</p>
                </div>
                <div className="flex items-center gap-2 text-[#3B82F6] group-hover:gap-3 sm:group-hover:gap-4 transition-all">
                  <span className="line-booking-text text-xs sm:text-sm font-semibold tracking-wide sm:tracking-widest uppercase">
                    <span className="line-booking-line1">LINEで予約</span>
                    <span className="line-booking-line2">お問い合わせ</span>
                  </span>
                  <ArrowRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-2 transition-transform flex-shrink-0" />
                </div>
                <div className="mt-4 sm:mt-6 w-8 sm:w-10 h-[1px] bg-white/20 group-hover:w-full group-hover:bg-[#3B82F6] transition-all duration-700" />
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#161B22] p-4 sm:p-6 md:p-8 lg:p-12 border border-white/5 hover:border-[#3B82F6]/50 transition-all duration-500 relative overflow-hidden"
              aria-label="Instagramで最新情報を見る（新しいウィンドウで開きます）"
            >
              <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <Instagram className="text-[#3B82F6] w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#3B82F6]/20 rounded-full flex items-center justify-center group-hover:bg-[#3B82F6]/30 transition-colors flex-shrink-0">
                    <Instagram className="text-[#3B82F6] w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white text-lg sm:text-xl md:text-2xl tracking-wide sm:tracking-wider mb-1 whitespace-nowrap">Instagram</h3>
                    <p className="text-white/50 text-xs sm:text-sm">最新情報・施術の様子</p>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed mb-4 sm:mb-6 tracking-wide text-xs sm:text-sm">
                  {appConfig.social.instagram.username || '@yoo.n.yoo.n'}で最新の施術の様子やお知らせを配信しています。
                  フォローして最新情報をチェックしてください。
                </p>
                <div className="flex items-center gap-2 text-[#3B82F6] group-hover:gap-3 sm:group-hover:gap-4 transition-all">
                  <span className="text-xs sm:text-sm font-semibold tracking-wide sm:tracking-widest uppercase whitespace-nowrap">VIEW PROFILE</span>
                  <ArrowRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-2 transition-transform flex-shrink-0" />
                </div>
                <div className="mt-4 sm:mt-6 w-8 sm:w-10 h-[1px] bg-white/20 group-hover:w-full group-hover:bg-[#3B82F6] transition-all duration-700" />
              </div>
            </a>
          </div>

          {/* Additional Info - SNS導線向け */}
          <div className="mt-8 sm:mt-12 text-center px-2">
            <div className="bg-[#161B22] border border-white/10 p-4 sm:p-6 rounded-lg max-w-2xl mx-auto">
              <p className="text-white font-semibold mb-2 text-sm sm:text-base md:text-lg">📱 公式LINEで簡単予約</p>
              <p className="text-white/70 text-xs sm:text-sm tracking-wide mb-3 sm:mb-4">
                ご予約・お問い合わせは公式LINEからお気軽にどうぞ。24時間受付中！
              </p>
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-[#3B82F6] text-white font-semibold text-xs sm:text-sm tracking-wide sm:tracking-widest hover:bg-[#2563EB] transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap"
                aria-label="LINEを開く（新しいウィンドウで開きます）"
              >
                LINEを開く →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense広告 - Reserve Section後 */}
      <section className="py-12 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <AdSense 
            adSlot="2647640133" 
            adFormat="auto"
            className="adsense-reserve"
          />
        </div>
      </section>

      {/* Shop Info */}
      <section id="shop" className="py-12 sm:py-16 md:py-24 px-3 sm:px-6 max-w-7xl mx-auto">
        <SectionHeading title="Shop Information" subtitle="ACCESS" />
        <div className="bg-[#161B22] p-4 sm:p-6 md:p-8 lg:p-16 border border-white/5 flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12">
          <div className="flex-1">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-2 sm:gap-3 md:gap-4 text-white/70">
                <MapPin className="text-[#3B82F6] shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-white mb-1 text-sm sm:text-base">住所</h4>
                  <p className="text-xs sm:text-sm break-words">{shop?.address || appConfig.shop.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 md:gap-4 text-white/70">
                <MapPin className="text-[#3B82F6] shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-white mb-1 text-sm sm:text-base">最寄り駅</h4>
                  {shop?.access?.stations?.filter(station => station).map((station, index) => (
                    <p key={index} className="text-xs sm:text-sm">{station}</p>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 md:gap-4 text-white/70">
                <Clock className="text-[#3B82F6] shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-white mb-1 text-sm sm:text-base">営業時間</h4>
                  <p className="text-xs sm:text-sm">{shop?.hours?.weekday || appConfig.shop.hours.weekday}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 md:gap-4 text-white/70">
                <Phone className="text-[#3B82F6] shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-white mb-1 text-sm sm:text-base">電話番号</h4>
                  <p className="text-xs sm:text-sm break-all">{shop?.phone || appConfig.shop.phone}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 sm:mt-8 md:mt-10 flex gap-3 sm:gap-4">
              <a 
                href={instagramUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 bg-white/5 hover:bg-[#3B82F6] transition-colors rounded-full flex-shrink-0"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden />
              </a>
              <a 
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 bg-white/5 hover:bg-[#3B82F6] transition-colors rounded-full flex-shrink-0"
                aria-label="LINEで予約"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden />
              </a>
            </div>
          </div>
          <div className="flex-1 h-64 md:h-auto bg-[#0A0A0A] relative overflow-hidden border border-white/10 rounded">
            <iframe
              src={shop?.googleMapsUrl || appConfig.shop.googleMapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="店舗地図"
            />
          </div>
        </div>

        {/* 駐車場写真セクション */}
        {shop?.access?.parkingPhotos?.parkingLot && (
          <div className="mb-8 sm:mb-12">
            <div className="mb-8 sm:mb-12">
              <span className="text-[#3B82F6] text-[0.65rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.4em] block mb-2 font-bold uppercase whitespace-nowrap">ACCESS</span>
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide sm:tracking-widest font-light mb-3 sm:mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
                Parking
              </h2>
              <p className="text-white/60 text-[0.65rem] sm:text-xs md:text-sm text-center whitespace-nowrap">お車でお越しの際はこちらをご利用ください</p>
            </div>
            <div className="bg-[#161B22] border border-white/5 overflow-hidden rounded-lg">
              <img 
                src={shop?.access?.parkingPhotos?.parkingLot || appConfig.shop.access.parkingPhotos.parkingLot}
                alt="駐車場の様子"
                width={800}
                height={450}
                className="w-full h-auto"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        )}

        {/* 駐車場から店舗までの写真セクション */}
        {shop?.access?.parkingPhotos?.routeToShop && (
          <div className="mb-8 sm:mb-12">
            <div className="mb-8 sm:mb-12">
              <span className="text-[#3B82F6] text-[0.65rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.4em] block mb-2 font-bold uppercase whitespace-nowrap">ACCESS</span>
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide sm:tracking-widest font-light mb-3 sm:mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
                Route to Shop
              </h2>
              <p className="text-white/60 text-[0.65rem] sm:text-xs md:text-sm text-center whitespace-nowrap">駐車場から店舗までの道のりをご案内します</p>
            </div>
            <div className="bg-[#161B22] border border-white/5 overflow-hidden rounded-lg">
              <img 
                src={shop?.access?.parkingPhotos?.routeToShop || appConfig.shop.access.parkingPhotos.routeToShop}
                alt="駐車場から店舗までの道順"
                width={800}
                height={450}
                className="w-full h-auto"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        )}

{shop?.notes && shop.notes.length > 0 && (
          <div className="bg-[#161B22] p-4 sm:p-6 md:p-8 border border-white/5">
            <h4 className="text-white text-sm sm:text-base md:text-lg mb-3 sm:mb-4">📋 ご確認事項</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {shop.notes.map((note, index) => (
                <li key={index} className="text-white/70 text-xs sm:text-sm">{note}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* FAQ Section */}
      <FaqSnsSection lineUrl={lineUrl} />

      {/* Social Section - HomeSnsデザインに合わせてカスタマイズ */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <SectionHeading title="Follow Us" subtitle="SOCIAL" />
          <div className="bg-[#161B22] border border-white/5 p-4 sm:p-6 md:p-8 lg:p-12 rounded-lg">
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 flex-wrap">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] rounded-full flex items-center justify-center flex-shrink-0">
                  <Instagram className="text-white w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </div>
                <div className="text-left min-w-0 flex-1">
                  <h3 className="text-white text-lg sm:text-xl md:text-2xl tracking-wide sm:tracking-wider mb-1 whitespace-nowrap">@{instagramUsername}</h3>
                  <p className="text-white/50 text-xs sm:text-sm">最新情報・施術の様子</p>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed mb-6 sm:mb-8 tracking-wide max-w-2xl mx-auto text-xs sm:text-sm px-2">
                最新の投稿やお得な情報をお届けしています。<br className="hidden sm:block" />
                Instagramでフォローして最新情報をチェックしてください。
              </p>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white font-semibold text-xs sm:text-sm tracking-wide sm:tracking-widest hover:opacity-90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-purple-500/20 whitespace-nowrap"
                aria-label="Instagramを見る（新しいウィンドウで開きます）"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden />
                Instagramを見る
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 border-t border-white/5 text-center px-3">
        <div className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 whitespace-nowrap" style={{ fontFamily: "'League Spartan', sans-serif", letterSpacing: '-0.05em' }}>
          yoon²
        </div>
        <p className="text-white/30 text-[0.65rem] sm:text-xs tracking-wide sm:tracking-widest break-words">
          &copy; 2025 yoon² EAR ESTHETIC SALON. ALL RIGHTS RESERVED.
        </p>
      </footer>

      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 md:hidden">
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 bg-[#3B82F6] text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20"
          aria-label="LINEで予約（新しいウィンドウで開きます）"
        >
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />
        </a>
      </div>
    </div>
  );
};

export default HomeSns;
