import React, { useEffect, useRef, RefCallback } from 'react';
import appConfig from '../config/appConfig';
import './BookingConfirmation.css';


interface Service { id: string; name: string; duration: string; price: number; description: string; }

const BookingConfirmation = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('fade-in'); }),
      { threshold: 0.1 }
    );
    sectionsRef.current.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
    const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_PAGEVIEW_CONVERSION_LABEL;
    if (!adsId || !label) return;
    window.gtag?.('event', 'conversion', { send_to: `${adsId}/${label}` });
  }, []);

  const addToRefs: RefCallback<HTMLElement> = (el) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el);
  };

  const openLine = () => {
    const url = appConfig.social.line.url as string;
    const w = window.open(url, '_blank', 'noopener,noreferrer');
    if (!w) window.location.href = url;
  };

  const shop = appConfig.shop as {
    name: string; address: string; phone: string; holidays: string;
    hours: { weekday: string; weekend: string };
    services: Service[];
    lineUrl: string;
  };
  const social = appConfig.social as { line: { url: string; note: string } };

  return (
    <div className="booking-confirmation">
      <section className="confirmation-hero">
        <div className="hero-background"><div className="hero-overlay"></div></div>
        <div className="container">
          <div className="hero-content fade-in">
            <span className="section-label">Booking</span>
            <h1>ご予約について</h1>
            <p className="hero-description">
              現在、ご予約は公式LINEから承っております<br />お気軽にメッセージをお送りください
            </p>
          </div>
        </div>
      </section>
      <section className="section line-booking-section" ref={addToRefs}>
        <div className="container">
          <div className="line-booking-content">
            <div className="booking-method-card primary">
              <div className="method-header">
                <div className="method-icon">💬</div>
                <div className="method-info">
                  <h2>公式LINEで予約</h2>
                  <p className="method-subtitle">おすすめの予約方法</p>
                </div>
              </div>
              <div className="method-description">
                <p>24時間受付で、お気軽にメッセージをお送りいただけます。<br />空き状況の確認や詳しいご相談も可能です。</p>
              </div>
              <div className="method-benefits">
                {[['⏰','24時間受付','いつでもメッセージを送れます'],['💬','気軽に相談','不安なことは何でもお聞きください'],['📅','空き状況確認','リアルタイムで確認できます']].map(([icon,title,desc]) => (
                  <div key={title} className="benefit-item">
                    <span className="benefit-icon">{icon}</span>
                    <div className="benefit-content"><h4>{title}</h4><p>{desc}</p></div>
                  </div>
                ))}
              </div>
              <button onClick={openLine} className="line-booking-button">
                <span className="button-icon">💬</span>LINEで予約・お問い合わせ
              </button>
              <p className="method-note">{social.line.note}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section services-preview-section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Services</span>
            <h2>主なサービス・料金</h2>
            <p>お客様のご要望に合わせた施術をご提供いたします</p>
          </div>
          <div className="services-preview-grid">
            {shop.services.slice(0, 6).map(s => (
              <div key={s.id} className="service-preview-card">
                <div className="service-preview-content">
                  <h4>{s.name}</h4>
                  <div className="service-preview-details">
                    <span className="service-duration">{s.duration}</span>
                    <span className="service-price">¥{s.price.toLocaleString()}</span>
                  </div>
                  <p className="service-description">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="services-note">詳しいメニューや料金については、LINEでお気軽にお問い合わせください。</p>
        </div>
      </section>
      <section className="section important-info-section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Important</span>
            <h2>ご予約について</h2>
            <p>ご来店前にご確認ください</p>
          </div>
          <div className="important-info-grid">
            {[
              ['📱','LINEでのご予約','公式LINEにメッセージをお送りください。空き状況を確認してお返事いたします。'],
              ['⏰','営業時間',`平日: ${shop.hours.weekday}\n土日祝: ${shop.hours.weekend}`],
              ['🏪','店舗情報',`${shop.address}\nTEL: ${shop.phone}`],
              ['💡','キャンセル・変更','前日までにLINEでご連絡ください。当日キャンセルはキャンセル料が発生する場合があります。'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="info-card">
                <div className="info-icon">{icon}</div>
                <div className="info-content"><h4>{title}</h4><p>{desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section action-section" ref={addToRefs}>
        <div className="container">
          <div className="action-content">
            <div className="action-header">
              <h2>他のページもご覧ください</h2>
              <p>サロンについて詳しく知りたい方はこちら</p>
            </div>
            <div className="action-buttons">
              <button onClick={() => { window.location.href = '/'; }} className="action-button primary">
                ホームページに戻る
              </button>
              <button onClick={() => { document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) ?? (window.location.href = '/#shop'); }} className="action-button secondary">
                店舗情報を見る
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingConfirmation;
