import React, { useRef, useEffect } from 'react';
import { HOTPEPPER_URL } from '../data/menuData';
import { trackReviewsView } from '../services/analyticsService';
import './ReviewsSection.css';

const REVIEWS = [
  {
    id: 'r1',
    text: '耳の中をイヤースコープで見ながら施術してもらえるので安心！不眠が改善されて本当に良かったです。',
    age: '30代女性',
    source: 'ホットペッパー',
  },
  {
    id: 'r2',
    text: '男性でも気軽に通えます。完全個室なので安心してリラックスできました。仕事のストレスが解消されました。',
    age: '40代男性',
    source: 'ホットペッパー',
  },
  {
    id: 'r3',
    text: '初回4,000円でこのクオリティ！愛媛県でここだけのイヤーエステ。リピート確定です。',
    age: '20代女性',
    source: 'ホットペッパー',
  },
];

function ReviewsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // 到達イベント（1回のみ）
    const trackObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { trackReviewsView(); trackObserver.disconnect(); } },
      { threshold: 0.3 }
    );
    trackObserver.observe(el);

    // フェードインアニメーション
    const fadeObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('fade-in'); fadeObserver.disconnect(); } },
      { threshold: 0.05 }
    );
    fadeObserver.observe(el);

    return () => { trackObserver.disconnect(); fadeObserver.disconnect(); };
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
          {REVIEWS.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-stars" aria-label="高評価">★ 高評価</div>
              <p className="review-text">「{review.text}」</p>
              <div className="reviewer-info">
                <span className="reviewer-age">{review.age}</span>
                <span className="reviewer-source">{review.source}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="reviews-cta">
          <a
            href={HOTPEPPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="reviews-link"
            aria-label="ホットペッパービューティーですべての口コミを見る（新しいウィンドウで開きます）"
          >
            すべての口コミを見る →
          </a>
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
