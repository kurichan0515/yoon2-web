'use client';

import React, { useRef, useEffect } from 'react';
import './MenuDiagnosis.css';

function MenuDiagnosis() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) { el.classList.add('fade-in'); observer.disconnect(); } }); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="diagnosis" className="diagnosis-section section" ref={sectionRef}>
      <div className="container">
        <div className="diagnosis-header">
          <span className="section-label">Menu Guide</span>
          <h2 className="diagnosis-title">あなたにぴったりのメニューは<br />どちらですか？</h2>
        </div>
        <div className="diagnosis-cards">
          <article className="diagnosis-card diagnosis-card--dark">
            <div className="diagnosis-card-inner">
              <div className="diagnosis-card-tag">女性におすすめ</div>
              <h3 className="diagnosis-card-name">耳つぼジュエリー</h3>
              <div className="diagnosis-card-divider" aria-hidden="true" />
              <p className="diagnosis-card-target">慢性的な不調ケア＋オシャレを楽しみたい方へ</p>
              <ul className="diagnosis-card-contents" aria-label="内容">
                <li>耳つぼもみほぐし</li>
                <li>ジュエリーつけ放題</li>
              </ul>
              <p className="diagnosis-card-desc">
                耳つぼもみほぐしでカチカチの耳をほぐし血流UP！お悩みに合わせたジュエリーつけ放題で、24時間可愛く体質改善をサポート。耳掃除なしでその分もみほぐしをたっぷり。
              </p>
              <button className="diagnosis-card-btn diagnosis-card-btn--dark" onClick={scrollToMenu}>
                料金・詳細を見る
                <span className="visually-hidden">（耳つぼジュエリー）</span>
              </button>
            </div>
          </article>
          <article className="diagnosis-card diagnosis-card--oil">
            <div className="diagnosis-card-inner">
              <div className="diagnosis-card-tag">男性におすすめ</div>
              <h3 className="diagnosis-card-name">オイルリンパ</h3>
              <div className="diagnosis-card-divider" aria-hidden="true" />
              <p className="diagnosis-card-target">冷えやむくみ・全身の疲れをリセットしたい方へ</p>
              <ul className="diagnosis-card-contents" aria-label="内容">
                <li>全身オイルトリートメント</li>
                <li>リンパの流れを整える</li>
              </ul>
              <p className="diagnosis-card-desc">
                厳選オイルでリンパの滞りをじっくり丁寧に流し、冷え性やむくみ、身体の重だるさをスッキリ解消。深いリラックスと巡りの良さを同時に体感。
              </p>
              <button className="diagnosis-card-btn diagnosis-card-btn--oil" onClick={scrollToMenu}>
                料金・詳細を見る
                <span className="visually-hidden">（オイルリンパ）</span>
              </button>
            </div>
          </article>
          <article className="diagnosis-card diagnosis-card--light">
            <div className="diagnosis-card-inner">
              <div className="diagnosis-card-tag">迷ったらこれ</div>
              <h3 className="diagnosis-card-name">贅沢ロングコース</h3>
              <div className="diagnosis-card-divider" aria-hidden="true" />
              <p className="diagnosis-card-target">じっくり120分で全身の疲れをまるごとリセットしたい方へ</p>
              <ul className="diagnosis-card-contents" aria-label="内容">
                <li>オイルリンパ</li>
                <li>耳つぼもみほぐし</li>
                <li>ヘッドほぐし</li>
              </ul>
              <p className="diagnosis-card-desc">
                オイルでリンパを流した後、耳とヘッドをほぐし全身の疲労を取っていく至福の120分コース。いつも頑張っている自分へのご褒美に。
              </p>
              <button className="diagnosis-card-btn diagnosis-card-btn--light" onClick={scrollToMenu}>
                料金・詳細を見る
                <span className="visually-hidden">（贅沢ロングコース）</span>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default MenuDiagnosis;
