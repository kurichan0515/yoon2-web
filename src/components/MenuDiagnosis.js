'use client';

import React, { useRef, useEffect } from 'react';
import './MenuDiagnosis.css';

function MenuDiagnosis() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('fade-in');
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="diagnosis-section section" ref={sectionRef}>
      <div className="container">
        <div className="diagnosis-header">
          <span className="section-label">Menu Guide</span>
          <h2 className="diagnosis-title">あなたにぴったりのメニューは<br />どちらですか？</h2>
        </div>

        <div className="diagnosis-cards">
            {/* カードA: 耳つぼジュエリー（ダーク・推し） */}
          <article className="diagnosis-card diagnosis-card--dark">
            <div className="diagnosis-card-inner">
              <div className="diagnosis-card-tag">RECOMMENDED</div>
              <h3 className="diagnosis-card-name">耳つぼジュエリー</h3>
              <div className="diagnosis-card-divider" aria-hidden="true" />
              <p className="diagnosis-card-target">
                慢性的な不調ケア＋オシャレを楽しみたい方へ
              </p>
              <ul className="diagnosis-card-contents" aria-label="内容">
                <li>耳つぼもみほぐし</li>
                <li>ジュエリーつけ放題</li>
              </ul>
              <p className="diagnosis-card-desc">
                耳つぼもみほぐしでカチカチの耳をほぐし血流UP！お悩みに合わせたジュエリーつけ放題で、24時間可愛く体質改善をサポート。耳掃除なしでその分もみほぐしをたっぷり。
              </p>
              <button
                className="diagnosis-card-btn diagnosis-card-btn--dark"
                onClick={scrollToMenu}
                aria-label="耳つぼジュエリーの料金・詳細へ"
              >
                料金・詳細を見る
              </button>
            </div>
          </article>

          {/* カードB: イヤーエステ（ライト） */}
          <article className="diagnosis-card diagnosis-card--light">
            <div className="diagnosis-card-inner">
              <div className="diagnosis-card-tag">MENU B</div>
              <h3 className="diagnosis-card-name">イヤーエステ</h3>
              <div className="diagnosis-card-divider" aria-hidden="true" />
              <p className="diagnosis-card-target">
                とにかく癒されたい・スッキリしたい方へ
              </p>
              <ul className="diagnosis-card-contents" aria-label="内容">
                <li>耳掃除（スコープで確認しながら）</li>
                <li>耳つぼもみほぐし</li>
                <li>ジュエリーつけ放題</li>
              </ul>
              <p className="diagnosis-card-desc">
                スコープで耳の中を確認しながらプロの耳掃除でスッキリ。その後は耳つぼもみほぐし＋ジュエリーつけ放題まで、フルコースで癒しと不調ケアを同時に体験。
              </p>
              <button
                className="diagnosis-card-btn diagnosis-card-btn--light"
                onClick={scrollToMenu}
                aria-label="イヤーエステの料金・詳細へ"
              >
                料金・詳細を見る
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default MenuDiagnosis;
