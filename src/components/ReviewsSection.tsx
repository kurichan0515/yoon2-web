'use client';

import React, { useRef, useEffect } from 'react';
import { HOTPEPPER_URL } from '../data/menuData';
import { trackReviewsView } from '../services/analyticsService';
import './ReviewsSection.css';

interface Review { id: string; text: string; age: string; source: string; }

const REVIEWS: Review[] = [
  { id: 'r1', text: '耳の中をスコープで確認しながら施術。不眠も改善して、通う価値しかないです！', age: '30代女性', source: 'ホットペッパー' },
  { id: 'r2', text: '完全個室で男性でも安心。仕事疲れが施術後スッと消えました。',              age: '40代男性', source: 'ホットペッパー' },
  { id: 'r3', text: 'ジュエリーつけ放題なのに肩まで軽くなった！また絶対来ます。',              age: '20代女性', source: 'ホットペッパー' },
];

function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const trackObs = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) { trackReviewsView(); trackObs.disconnect(); } }); }, { threshold: 0.3 }
    );
    const fadeObs = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) { el.classList.add('fade-in'); fadeObs.disconnect(); } }); }, { threshold: 0.05 }
    );
    trackObs.observe(el);
    fadeObs.observe(el);
    return () => { trackObs.disconnect(); fadeObs.disconnect(); };
  }, []);

  return (
    <section id="reviews" className="reviews-section section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Reviews</span>
          <h2>お客様の声</h2>
          <p className="reviews-overall-note">ホットペッパービューティーにて多数の高評価をいただいています</p>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map(r => (
            <div key={r.id} className="review-card">
              <div className="review-stars" aria-label="高評価">★ 高評価</div>
              <p className="review-text">「{r.text}」</p>
              <div className="reviewer-info">
                <span className="reviewer-age">{r.age}</span>
                <span className="reviewer-source">{r.source}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="reviews-cta">
          <a href={HOTPEPPER_URL} target="_blank" rel="noopener noreferrer" className="reviews-link"
            aria-label="ホットペッパービューティーですべての口コミを見る（新しいウィンドウで開きます）">
            すべての口コミを見る →
          </a>
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
