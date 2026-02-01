import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Instagram, MapPin, Clock, Phone, Calendar, ArrowRight, ChevronRight, User, MessageCircle } from 'lucide-react';
import appConfig from '../config/appConfig';
import AdSense from '../components/common/AdSense';
import SocialFeed from '../components/SocialFeed';
import courseService from '../services/courseService';
import { COURSE_CATEGORIES, COURSE_CATEGORY_LABELS } from '../types/courseTypes';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { setPageMeta } from '../utils/seoHelper';
import { trackPageView } from '../services/analyticsService';
import { trackPageView as trackGoogleAdsPageView } from '../services/googleAdsService';
import logger from '../utils/logger';
import './HomeNew.css';

// --- Components ---

const Navbar = ({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navigate = useNavigate();

  const navLinks = [
    { name: 'HOME', href: '/sns', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { name: 'ABOUT', href: '#about', action: null },
    { name: 'MENU', href: '#menu', action: null },
    { name: 'COURSES', href: '#courses', action: null },
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
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="text-2xl font-bold text-white cursor-pointer" 
          style={{ fontFamily: "'League Spartan', sans-serif", letterSpacing: '-0.05em' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          yoon²
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link)}
              className="text-sm tracking-widest text-white/70 hover:text-[#3B82F6] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#101827] z-40 flex flex-col items-center justify-center space-y-8 md:hidden">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-2xl tracking-[0.3em] text-white"
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
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/60 to-[#0A0A0A] z-10" />
        <img 
          src="/images/hero/wait-room.png" 
          alt="Relaxation Background" 
          className="w-full h-full object-cover opacity-40"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?auto=format&fit=crop&q=80&w=2000';
          }}
        />
      </div>

      <div className="relative z-20 text-center px-6">
        <h2 className="text-white/60 text-sm tracking-[0.5em] mb-4 animate-fade-in-up" style={{ fontFamily: 'Cinzel, serif' }}>
          EAR ESTHETIC & ACUPRESSURE
        </h2>
        <h1 className="text-5xl md:text-8xl text-white font-bold mb-8" style={{ fontFamily: "'League Spartan', sans-serif", letterSpacing: '-0.1em' }}>
          yoon²
        </h1>
        <p className="text-white/80 max-w-lg mx-auto mb-8 text-sm md:text-base leading-relaxed tracking-wider">
          深い夜の静寂に包まれるような、究極の癒やし体験。<br />
          耳から整う、心と身体の休息。
        </p>
        {/* SNS導線向け：予約CTAを強調 */}
        <div className="mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 max-w-md mx-auto">
          <p className="text-white text-sm mb-3 tracking-wide">✨ SNSからご来店の方へ</p>
          <p className="text-white/90 text-xs leading-relaxed">
            公式LINEから簡単予約！当日予約OK・駐車場完備
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-white text-black font-semibold text-sm tracking-widest hover:bg-[#3B82F6] hover:text-white transition-all duration-300 transform hover:-translate-y-1 inline-block text-center shadow-lg shadow-white/20"
          >
            📱 LINEで予約する
          </a>
          <button 
            onClick={() => {
              const menuSection = document.getElementById('menu');
              if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="px-10 py-4 border border-white text-white font-semibold text-sm tracking-widest hover:bg-white/10 transition-all duration-300"
          >
            VIEW MENU
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
  <div className="mb-16">
    <span className="text-[#3B82F6] text-xs tracking-[0.4em] block mb-2 font-bold uppercase">{subtitle}</span>
    <h2 className="text-white text-3xl md:text-4xl tracking-widest font-light" style={{ fontFamily: 'Cinzel, serif' }}>{title}</h2>
  </div>
);

const HomeNew = () => {
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
      title: 'yoon²ゆんゆん - イヤーエステ・耳つぼ専門店 | SNSからのご予約',
      description: 'yoon²ゆんゆん - イヤーエステ・耳つぼ専門店。松山市清水町で心身のリラクゼーションを提供します。公式LINEから簡単予約。当日予約OK・駐車場完備。',
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
  const { shop } = appConfig;

  return (
    <div className="bg-[#0A0A0A] text-white selection:bg-[#3B82F6] selection:text-white font-sans">
      <Navbar 
        isScrolled={isScrolled} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      <Hero />

      {/* Announcement Section */}
      <section className="py-12 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#161B22] border border-white/5 overflow-hidden rounded-lg">
            <img 
              src="/images/announcements/notification01.png" 
              alt="お知らせ"
              className="w-full h-auto"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 border border-[#3B82F6]/20 group-hover:border-[#3B82F6]/40 transition-all duration-700" />
            <img 
              src="/images/hero/wait-room.png" 
              alt="Salon Interior" 
              className="relative z-10 w-full grayscale hover:grayscale-0 transition-all duration-1000"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800';
              }}
            />
          </div>
          <div>
            <SectionHeading title="Concept" subtitle="ABOUT US" />
            <p className="text-white/70 leading-loose mb-8 tracking-wide">
              {appConfig.shop.description || 'yoon²（ユンユン）は、プロフェッショナルな技術で日常の喧騒をリセットするイヤーエステサロンです。専門のスコープを用いた精密な施術と、深いリラクゼーションをもたらすドライヘッドスパを組み合わせ、お客様お一人おひとりの「休息の時間」を大切にしています。この洗練されたWebサイトのデザインは、当店のこだわり抜いた施術クオリティと、研ぎ澄まされた癒やしの世界観を表現しています。'}
            </p>
            <button 
              onClick={() => window.location.href = '#menu'}
              className="flex items-center gap-2 text-white hover:text-[#3B82F6] transition-colors group"
            >
              VIEW MORE <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-[#101827]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Experience" subtitle="SERVICES" />
          <p className="text-white/60 text-center mb-12 tracking-wide max-w-2xl mx-auto">
            お客様のご要望に合わせたイヤーエステ・耳つぼ・ドライヘッドスパメニューをご用意しております
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* おすすめメニュー */}
            <div 
              className="group relative overflow-hidden bg-[#161B22] border border-white/5 hover:border-[#3B82F6]/50 transition-all duration-500 flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0A0A0A] flex items-center justify-center">
                <img 
                  src="/images/menus/recommend-menu.jpg" 
                  alt="おすすめメニューの画像"
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-1000"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-white text-xl mb-2 tracking-wider">おすすめメニュー</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  特別な組み合わせメニューで、より深いリラクゼーションを
                </p>
                <div className="mt-6 w-10 h-[1px] bg-white/20 group-hover:w-full group-hover:bg-[#3B82F6] transition-all duration-700" />
              </div>
            </div>

            {/* 耳つぼメニュー */}
            <div 
              className="group relative overflow-hidden bg-[#161B22] border border-white/5 hover:border-[#3B82F6]/50 transition-all duration-500 flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0A0A0A] flex items-center justify-center">
                <img 
                  src="/images/menus/mimitubo-menu.jpg" 
                  alt="耳つぼメニューの画像"
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-1000"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-white text-xl mb-2 tracking-wider">耳つぼメニュー</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  東洋医学に基づいた耳つぼで、心身のバランスを整えます
                </p>
                <div className="mt-6 w-10 h-[1px] bg-white/20 group-hover:w-full group-hover:bg-[#3B82F6] transition-all duration-700" />
              </div>
            </div>

            {/* イヤーエステ・ドライヘッドスパメニュー */}
            <div 
              className="group relative overflow-hidden bg-[#161B22] border border-white/5 hover:border-[#3B82F6]/50 transition-all duration-500 flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0A0A0A] flex items-center justify-center">
                <img 
                  src="/images/menus/ear-este-menu.jpg" 
                  alt="イヤーエステ・ドライヘッドスパメニューの画像"
                  className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-1000"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-white text-xl mb-2 tracking-wider">イヤーエステ・ドライヘッドスパ</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  専門のスコープを使った精密な施術と頭部のリラクゼーション
                </p>
                <div className="mt-6 w-10 h-[1px] bg-white/20 group-hover:w-full group-hover:bg-[#3B82F6] transition-all duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Course Menu" subtitle="COURSES" />
          <p className="text-white/60 text-center mb-12 tracking-wide max-w-2xl mx-auto">
            お客様のご要望に合わせたイヤーエステ・耳つぼ・ドライヘッドスパメニューをご用意しております
          </p>

          {coursesLoading ? (
            <div className="text-center py-12">
              <LoadingSpinner message="コース情報を読み込み中..." />
            </div>
          ) : coursesError ? (
            <div className="text-center py-12">
              <ErrorMessage
                error={typeof coursesError === 'string' ? new Error(coursesError) : coursesError}
                title="コース情報の読み込みに失敗しました"
                message="コース情報を取得できませんでした。しばらく時間をおいて再度お試しください。"
                showDetails={process.env.NODE_ENV === 'development'}
              />
            </div>
          ) : (
            <>
              {/* カテゴリフィルター */}
              <div className="flex justify-center gap-2 mb-12 flex-wrap">
                <button 
                  className={`px-6 py-2 text-sm tracking-wider transition-all ${
                    selectedCategory === 'all' 
                      ? 'bg-[#3B82F6] text-white border border-[#3B82F6]' 
                      : 'bg-[#161B22] text-white/70 border border-white/5 hover:border-[#3B82F6]/50'
                  }`}
                  onClick={() => setSelectedCategory('all')}
                >
                  すべて
                </button>
                {Object.values(COURSE_CATEGORIES).map(category => (
                  <button
                    key={category}
                    className={`px-6 py-2 text-sm tracking-wider transition-all ${
                      selectedCategory === category
                        ? 'bg-[#3B82F6] text-white border border-[#3B82F6]' 
                        : 'bg-[#161B22] text-white/70 border border-white/5 hover:border-[#3B82F6]/50'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {COURSE_CATEGORY_LABELS[category]}
                  </button>
                ))}
              </div>

              {/* コース一覧 */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course, index) => (
                  <div 
                    key={course.id} 
                    ref={(el) => (courseCardsRef.current[index] = el)}
                    className="group bg-[#161B22] border border-white/5 hover:border-[#3B82F6]/50 transition-all duration-500 overflow-hidden scroll-animate"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0A0A0A]">
                      <img 
                        src={course.image} 
                        alt={`${course.name}の画像`}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-white text-lg tracking-wider flex-1">{course.name}</h3>
                        <span className="bg-[#3B82F6]/20 text-[#3B82F6] px-2 py-1 text-xs tracking-wider ml-2">
                          {COURSE_CATEGORY_LABELS[course.category]}
                        </span>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed mb-4">{course.description}</p>
                      <div className="flex justify-between items-center pt-4 border-t border-white/5">
                        <div className="text-white/70 text-xs">
                          <span className="block">時間</span>
                          <span className="text-white font-semibold">{course.duration}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-white/70 text-xs block">価格</span>
                          <span className="text-[#3B82F6] font-bold">¥{course.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-12 text-white/50">
                  <h3 className="text-xl mb-2">該当するコースが見つかりませんでした</h3>
                  <p>他のカテゴリを選択してください</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Reserve Section - SNS導線向けに強調 */}
      <section id="reserve" className="py-24 bg-gradient-to-b from-[#101827] to-[#0A0A0A] relative overflow-hidden">
        {/* 装飾的な背景要素 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#3B82F6] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="text-[#3B82F6] text-xs tracking-[0.4em] block mb-2 font-bold uppercase">RESERVATION</span>
            <h2 className="text-white text-4xl md:text-5xl tracking-widest font-light mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
              ご予約・お問い合わせ
            </h2>
            <p className="text-white/60 text-lg tracking-wide max-w-2xl mx-auto">
              SNSからご来店の方も大歓迎！公式LINEから簡単にご予約いただけます
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* LINE Card - SNS導線向けに強調 */}
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-[#161B22] to-[#0A0A0A] p-8 md:p-12 border-2 border-[#3B82F6]/30 hover:border-[#3B82F6] transition-all duration-500 relative overflow-hidden shadow-lg shadow-[#3B82F6]/20 hover:shadow-[#3B82F6]/40"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <MessageCircle className="text-[#3B82F6]" size={40} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#3B82F6]/20 rounded-full flex items-center justify-center group-hover:bg-[#3B82F6]/30 transition-colors">
                    <MessageCircle className="text-[#3B82F6]" size={32} />
                  </div>
                  <div>
                    <h3 className="text-white text-2xl tracking-wider mb-1">LINE</h3>
                    <p className="text-white/50 text-sm">公式LINEで予約・お問い合わせ</p>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed mb-6 tracking-wide">
                  {appConfig.social.line.note || 'ご予約やお問い合わせの際はお手数ですが公式LINEにメッセージをお願いします'}
                </p>
                <div className="bg-[#3B82F6]/20 p-4 rounded-lg mb-6 border border-[#3B82F6]/30">
                  <p className="text-white text-sm font-semibold mb-1">✨ SNSからのご来店特典</p>
                  <p className="text-white/80 text-xs">当日予約OK・駐車場完備・駅から徒歩5分</p>
                </div>
                <div className="flex items-center gap-2 text-[#3B82F6] group-hover:gap-4 transition-all">
                  <span className="text-sm font-semibold tracking-widest uppercase">LINEで予約する</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </div>
                <div className="mt-6 w-10 h-[1px] bg-white/20 group-hover:w-full group-hover:bg-[#3B82F6] transition-all duration-700" />
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#161B22] p-8 md:p-12 border border-white/5 hover:border-[#3B82F6]/50 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <Instagram className="text-[#3B82F6]" size={40} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#3B82F6]/20 rounded-full flex items-center justify-center group-hover:bg-[#3B82F6]/30 transition-colors">
                    <Instagram className="text-[#3B82F6]" size={32} />
                  </div>
                  <div>
                    <h3 className="text-white text-2xl tracking-wider mb-1">Instagram</h3>
                    <p className="text-white/50 text-sm">最新情報・施術の様子</p>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed mb-6 tracking-wide">
                  {appConfig.social.instagram.username || '@yoo.n.yoo.n'}で最新の施術の様子やお知らせを配信しています。
                  フォローして最新情報をチェックしてください。
                </p>
                <div className="flex items-center gap-2 text-[#3B82F6] group-hover:gap-4 transition-all">
                  <span className="text-sm font-semibold tracking-widest uppercase">VIEW PROFILE</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </div>
                <div className="mt-6 w-10 h-[1px] bg-white/20 group-hover:w-full group-hover:bg-[#3B82F6] transition-all duration-700" />
              </div>
            </a>
          </div>

          {/* Additional Info - SNS導線向け */}
          <div className="mt-12 text-center">
            <div className="bg-[#161B22] border border-white/10 p-6 rounded-lg max-w-2xl mx-auto">
              <p className="text-white font-semibold mb-2 text-lg">📱 公式LINEで簡単予約</p>
              <p className="text-white/70 text-sm tracking-wide mb-4">
                ご予約・お問い合わせは公式LINEからお気軽にどうぞ。24時間受付中！
              </p>
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-[#3B82F6] text-white font-semibold text-sm tracking-widest hover:bg-[#2563EB] transition-all duration-300 transform hover:-translate-y-1"
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
      <section id="shop" className="py-24 px-6 max-w-7xl mx-auto">
        <SectionHeading title="Shop Information" subtitle="ACCESS" />
        <div className="bg-[#161B22] p-8 md:p-16 border border-white/5 flex flex-col md:flex-row gap-12 mb-12">
          <div className="flex-1">
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-white/70">
                <MapPin className="text-[#3B82F6] shrink-0" size={20} />
                <div>
                  <h4 className="text-white mb-1">住所</h4>
                  <p>{shop?.address || appConfig.shop.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-white/70">
                <MapPin className="text-[#3B82F6] shrink-0" size={20} />
                <div>
                  <h4 className="text-white mb-1">最寄り駅</h4>
                  {shop?.access?.stations?.filter(station => station).map((station, index) => (
                    <p key={index}>{station}</p>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-4 text-white/70">
                <Clock className="text-[#3B82F6] shrink-0" size={20} />
                <div>
                  <h4 className="text-white mb-1">営業時間</h4>
                  <p>{shop?.hours?.weekday || appConfig.shop.hours.weekday}</p>
                  <p>{shop?.hours?.weekend || appConfig.shop.hours.weekend}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-white/70">
                <Phone className="text-[#3B82F6] shrink-0" size={20} />
                <div>
                  <h4 className="text-white mb-1">電話番号</h4>
                  <p>{shop?.phone || appConfig.shop.phone}</p>
                </div>
              </div>
            </div>
            <div className="mt-10 flex gap-4">
              <a 
                href={instagramUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-[#3B82F6] transition-colors rounded-full"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-[#3B82F6] transition-colors rounded-full"
              >
                <Calendar size={20} />
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
          <div className="mb-12">
            <SectionHeading title="Parking" subtitle="ACCESS" />
            <div className="bg-[#161B22] border border-white/5 overflow-hidden rounded-lg">
              <img 
                src={shop?.access?.parkingPhotos?.parkingLot || appConfig.shop.access.parkingPhotos.parkingLot}
                alt="駐車場の様子"
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
          <div className="mb-12">
            <SectionHeading title="Route to Shop" subtitle="ACCESS" />
            <div className="bg-[#161B22] border border-white/5 overflow-hidden rounded-lg">
              <img 
                src={shop?.access?.parkingPhotos?.routeToShop || appConfig.shop.access.parkingPhotos.routeToShop}
                alt="駐車場から店舗までの道順"
                className="w-full h-auto"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        )}

        {/* 営業時間セクション */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#161B22] p-8 border border-white/5 text-center">
            <h4 className="text-white text-xl mb-4 tracking-wider">平日</h4>
            <p className="text-[#3B82F6] text-2xl font-bold mb-2">{shop?.hours?.weekday || appConfig.shop.hours.weekday}</p>
            <p className="text-white/50 text-sm">月曜日〜金曜日</p>
          </div>
          <div className="bg-[#161B22] p-8 border border-white/5 text-center">
            <h4 className="text-white text-xl mb-4 tracking-wider">土日祝</h4>
            <p className="text-[#3B82F6] text-2xl font-bold mb-2">{shop?.hours?.weekend || appConfig.shop.hours.weekend}</p>
            <p className="text-white/50 text-sm">土曜日・日曜日・祝日</p>
          </div>
        </div>
        {shop?.notes && shop.notes.length > 0 && (
          <div className="bg-[#161B22] p-8 border border-white/5">
            <h4 className="text-white text-lg mb-4">📋 ご確認事項</h4>
            <ul className="space-y-2">
              {shop.notes.map((note, index) => (
                <li key={index} className="text-white/70">{note}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Social Section */}
      <section className="py-24 bg-[#101827]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#161B22] border border-white/5 p-8 rounded-lg">
            <SocialFeed />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <div className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'League Spartan', sans-serif", letterSpacing: '-0.05em' }}>
          yoon²
        </div>
        <p className="text-white/30 text-xs tracking-widest">
          &copy; 2024 yoon² EAR ESTHETIC SALON. ALL RIGHTS RESERVED.
        </p>
      </footer>

      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#3B82F6] text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20"
        >
          <Calendar />
        </a>
      </div>
    </div>
  );
};

export default HomeNew;
