import React, { useEffect, useRef } from 'react';
import BookingForm from '../components/BookingForm';
import { trackPageView as trackGoogleAdsPageView } from '../services/googleAdsService';
import './Booking.css';

const Booking = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    // ページの一番上にスクロール
    window.scrollTo(0, 0);
    
    // Google Adsページビューを記録
    trackGoogleAdsPageView('/booking', 'Booking - ご予約・お問い合わせ');
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="booking-page">
      {/* Hero Section */}
      <section className="booking-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
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

      {/* 予約フォームセクション */}
      <section className="section booking-form-section" ref={addToRefs}>
        <div className="container">
          <BookingForm />
        </div>
      </section>

      {/* 予約の流れセクション */}
      <section className="section booking-flow-section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">How to Book</span>
            <h2>ご予約の流れ</h2>
            <p>簡単3ステップでご予約いただけます</p>
          </div>
          <div className="booking-flow">
            <div className="flow-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>LINEで友だち追加</h4>
                <p>QRコードを読み取るか、ボタンから公式LINEを友だち追加してください</p>
              </div>
            </div>
            <div className="flow-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>メッセージを送信</h4>
                <p>ご希望の日時、サービス内容をメッセージでお送りください</p>
              </div>
            </div>
            <div className="flow-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>予約確定</h4>
                <p>空き状況を確認してお返事いたします。予約が確定しましたらご来店ください</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* よくある質問セクション */}
      <section className="section faq-section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">FAQ</span>
            <h2>よくあるご質問</h2>
            <p>ご不明な点がございましたらお気軽にお問い合わせください</p>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <h4>Q. 予約の変更・キャンセルはできますか？</h4>
              <p>A. 前日までにLINEでご連絡いただければ変更・キャンセル可能です。当日キャンセルの場合はキャンセル料が発生する場合があります。</p>
            </div>
            <div className="faq-item">
              <h4>Q. 施術時間はどのくらいですか？</h4>
              <p>A. メニューによって異なりますが、30分〜90分程度です。詳しくはサービスメニューをご確認ください。</p>
            </div>
            <div className="faq-item">
              <h4>Q. 支払い方法は何がありますか？</h4>
              <p>A. 現金、各種クレジットカード、電子マネーをご利用いただけます。</p>
            </div>
            <div className="faq-item">
              <h4>Q. 駐車場はありますか？</h4>
              <p>A. 申し訳ございませんが、専用駐車場はございません。近隣のコインパーキングをご利用ください。</p>
            </div>
            <div className="faq-item">
              <h4>Q. 初回の方でも大丈夫ですか？</h4>
              <p>A. はい、初回の方も大歓迎です。カウンセリングを行い、お客様に合った施術をご提案いたします。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 注意事項セクション */}
      <section className="section notes-section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Important</span>
            <h2>ご来店前のお願い</h2>
            <p>快適にお過ごしいただくために</p>
          </div>
          <div className="notes-content">
            <div className="notes-grid">
              <div className="note-card">
                <div className="note-icon">⏰</div>
                <h4>お時間について</h4>
                <p>施術時間に余裕を持ってお越しください。遅刻される場合は必ずご連絡をお願いいたします。</p>
              </div>
              <div className="note-card">
                <div className="note-icon">👕</div>
                <h4>服装について</h4>
                <p>リラックスできる服装でお越しください。お着替えもご用意しております。</p>
              </div>
              <div className="note-card">
                <div className="note-icon">💄</div>
                <h4>メイクについて</h4>
                <p>施術によってはメイクを落としていただく場合があります。メイク直し用品をお持ちください。</p>
              </div>
              <div className="note-card">
                <div className="note-icon">🏥</div>
                <h4>体調について</h4>
                <p>体調がすぐれない場合は無理をせず、日程変更をご相談ください。</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;