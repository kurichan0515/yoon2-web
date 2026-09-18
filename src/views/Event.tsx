'use client';

import React, { useEffect, useRef, memo, RefCallback } from 'react';
import { Building2, Waves, HeartHandshake, Store, Briefcase } from 'lucide-react';
import appConfig from '../config/appConfig';
import { trackLineAddConversion } from '../services/googleAdsService';
import './Event.css';

const TARGET_FACILITIES = [
  { Icon: Building2, label: 'ホテル・宿泊施設' },
  { Icon: Waves, label: '温泉・温浴施設' },
  { Icon: HeartHandshake, label: '老人ホーム・福祉施設' },
  { Icon: Store, label: 'マルシェ・地域イベント' },
  { Icon: Briefcase, label: '企業様の福利厚生イベント など' },
];

const Event = memo(() => {
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

  const addToRefs: RefCallback<HTMLElement> = (el) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el);
  };

  const lineUrl = appConfig.shop.lineUrl || appConfig.social.line.url;

  return (
    <div className="event-page">
      <section className="event-hero">
        <div className="hero-background" style={{ backgroundImage: "url('/images/shop/play-room.jpg')" }}>
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content fade-in">
            <span className="section-label">Event Host Recruitment</span>
            <h1>出張イヤーエステイベント先<br />募集中</h1>
            <p className="hero-description">
              耳かき・イヤーエステを体験していただける出張イベントを<br className="pc-only" />
              開催させていただける施設様を募集しています
            </p>
          </div>
        </div>
      </section>

      <section className="section event-facilities-section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Target</span>
            <h2>こんな施設様におすすめです</h2>
          </div>
          <ul className="event-facilities-list">
            {TARGET_FACILITIES.map(item => (
              <li key={item.label}>
                <span className="event-facilities-icon" aria-hidden="true">
                  <item.Icon size={22} strokeWidth={1.75} />
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section event-message-section" ref={addToRefs}>
        <div className="container">
          <p className="event-message">
            「うちでも開催してほしい！」<br />
            「イベントを探している」<br />
            「一度詳しく話を聞いてみたい」
          </p>
          <p className="event-message-sub">
            という施設様・主催者様へ
          </p>
        </div>
      </section>

      <section className="section event-cta-section" ref={addToRefs}>
        <div className="container">
          <h2 className="event-cta-title">まずはお気軽にご相談ください</h2>
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="event-cta-btn"
            onClick={() => trackLineAddConversion()}
          >
            💬 公式LINEで問い合わせる
            <span className="visually-hidden">（新しいウィンドウで開きます）</span>
          </a>
        </div>
      </section>
    </div>
  );
});

Event.displayName = 'Event';

export default Event;
