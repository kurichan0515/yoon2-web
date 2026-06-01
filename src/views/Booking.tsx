import React, { useEffect, useRef, RefCallback } from 'react';
import BookingForm from '../components/BookingForm';
import { trackPageView as trackGoogleAdsPageView } from '../services/googleAdsService';
import './Booking.css';

const Booking = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    trackGoogleAdsPageView();
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('fade-in'); }),
      { threshold: 0.1 }
    );
    sectionsRef.current.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const addToRefs: RefCallback<HTMLElement> = (el) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el);
  };

  return (
    <div className="booking-page">
      <section className="booking-hero">
        <div className="hero-background"><div className="hero-overlay"></div></div>
        <div className="container">
          <div className="hero-content fade-in">
            <span className="section-label">Booking</span>
            <h1>ご予約・お問い合わせ</h1>
            <p className="hero-description">
              ご予約は公式LINEから承っております<br />
              24時間受付で、お気軽にメッセージをお送りください
            </p>
          </div>
        </div>
      </section>
      <section className="section booking-form-section" ref={addToRefs}>
        <div className="container"><BookingForm /></div>
      </section>
      <section className="section booking-flow-section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">How to Book</span>
            <h2>ご予約の流れ</h2>
            <p>簡単3ステップでご予約いただけます</p>
          </div>
          <div className="booking-flow">
            {[
              ['1', 'LINEで友だち追加', 'QRコードを読み取るか、ボタンから公式LINEを友だち追加してください'],
              ['2', 'メッセージを送信', 'ご希望の日時、サービス内容をメッセージでお送りください'],
              ['3', '予約確定', '空き状況を確認してお返事いたします。予約が確定しましたらご来店ください'],
            ].map(([num, title, desc]) => (
              <div key={num} className="flow-step">
                <div className="step-number">{num}</div>
                <div className="step-content"><h4>{title}</h4><p>{desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section faq-section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">FAQ</span>
            <h2>よくあるご質問</h2>
            <p>ご不明な点がございましたらお気軽にお問い合わせください</p>
          </div>
          <div className="faq-list">
            {[
              ['予約の変更・キャンセルはできますか？', '前日までにLINEでご連絡いただければ変更・キャンセル可能です。当日キャンセルの場合はキャンセル料が発生する場合があります。'],
              ['施術時間はどのくらいですか？', 'メニューによって異なりますが、30分〜90分程度です。詳しくはサービスメニューをご確認ください。'],
              ['支払い方法は何がありますか？', '現金、各種クレジットカード、電子マネーをご利用いただけます。'],
              ['駐車場はありますか？', '申し訳ございませんが、専用駐車場はございません。近隣のコインパーキングをご利用ください。'],
              ['初回の方でも大丈夫ですか？', 'はい、初回の方も大歓迎です。カウンセリングを行い、お客様に合った施術をご提案いたします。'],
            ].map(([q, a]) => (
              <div key={q} className="faq-item">
                <h4>Q. {q}</h4><p>A. {a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section notes-section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Important</span>
            <h2>ご来店前のお願い</h2>
            <p>快適にお過ごしいただくために</p>
          </div>
          <div className="notes-content">
            <div className="notes-grid">
              {[
                ['⏰', 'お時間について', '施術時間に余裕を持ってお越しください。遅刻される場合は必ずご連絡をお願いいたします。'],
                ['👕', '服装について', 'リラックスできる服装でお越しください。お着替えもご用意しております。'],
                ['💄', 'メイクについて', '施術によってはメイクを落としていただく場合があります。メイク直し用品をお持ちください。'],
                ['🏥', '体調について', '体調がすぐれない場合は無理をせず、日程変更をご相談ください。'],
              ].map(([icon, title, desc]) => (
                <div key={title} className="note-card">
                  <div className="note-icon">{icon}</div>
                  <h4>{title}</h4><p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
