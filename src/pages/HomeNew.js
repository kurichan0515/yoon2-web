import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Instagram, MapPin, Clock, Phone, Calendar, ArrowRight, ChevronRight, User, MessageCircle } from 'lucide-react';
import appConfig from '../config/appConfig';
import './HomeNew.css';

// --- Components ---

const Navbar = ({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navigate = useNavigate();

  const navLinks = [
    { name: 'HOME', href: '/new', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { name: 'ABOUT', href: '#about', action: null },
    { name: 'MENU', href: '#menu', action: null },
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
        <p className="text-white/80 max-w-lg mx-auto mb-12 text-sm md:text-base leading-relaxed tracking-wider">
          深い夜の静寂に包まれるような、究極の癒やし体験。<br />
          耳から整う、心と身体の休息。
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-white text-black font-semibold text-sm tracking-widest hover:bg-[#3B82F6] hover:text-white transition-all duration-300 transform hover:-translate-y-1 inline-block text-center"
          >
            BOOK NOW
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lineUrl = appConfig.shop.lineUrl || appConfig.social.line.url;
  const instagramUrl = appConfig.shop.instagramUrl || appConfig.social.instagram.url;

  return (
    <div className="bg-[#0A0A0A] text-white selection:bg-[#3B82F6] selection:text-white font-sans">
      <Navbar 
        isScrolled={isScrolled} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      <Hero />

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

      {/* Reserve Section */}
      <section id="reserve" className="py-24 bg-[#101827]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Reservation & Contact" subtitle="RESERVE" />
          <div className="grid md:grid-cols-2 gap-8">
            {/* LINE Card */}
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#161B22] p-8 md:p-12 border border-white/5 hover:border-[#3B82F6]/50 transition-all duration-500 relative overflow-hidden"
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
                <div className="flex items-center gap-2 text-[#3B82F6] group-hover:gap-4 transition-all">
                  <span className="text-sm font-semibold tracking-widest uppercase">OPEN LINE</span>
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

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-white/50 text-sm tracking-wide">
              ご予約・お問い合わせは公式LINEからお気軽にどうぞ
            </p>
          </div>
        </div>
      </section>

      {/* Shop Info */}
      <section id="shop" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-[#161B22] p-8 md:p-16 border border-white/5 flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <SectionHeading title="Shop Information" subtitle="ACCESS" />
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-white/70">
                <MapPin className="text-[#3B82F6] shrink-0" size={20} />
                <p>
                  {appConfig.shop.address}<br />
                  {appConfig.shop.access.stations[0] && appConfig.shop.access.stations[0]}
                </p>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <Clock className="text-[#3B82F6] shrink-0" size={20} />
                <p>{appConfig.shop.hours.weekday} ({appConfig.shop.holidays})</p>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <Phone className="text-[#3B82F6] shrink-0" size={20} />
                <p>{appConfig.shop.phone}</p>
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
          <div className="flex-1 h-64 md:h-auto bg-[#0A0A0A] relative overflow-hidden border border-white/10">
            {/* Map Placeholder */}
            <iframe
              src={appConfig.shop.googleMapsUrl}
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
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <div className="text-xl font-bold tracking-[-0.6em] text-white mb-6" style={{ fontFamily: "'League Spartan', sans-serif" }}>
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
