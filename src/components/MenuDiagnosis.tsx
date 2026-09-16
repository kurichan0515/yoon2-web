'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
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
              <Link href="/menu/mimitsubo" className="diagnosis-card-more-link">
                詳しく見る
                <span aria-hidden="true"> →</span>
              </Link>
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
              <Link href="/menu/oil-lymph" className="diagnosis-card-more-link">
                詳しく見る
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
          </article>
          <article className="diagnosis-card diagnosis-card--light">
            <div className="diagnosis-card-inner">
              <div className="diagnosis-card-tag">愛媛県初！</div>
              <h3 className="diagnosis-card-name">イヤーエステ</h3>
              <div className="diagnosis-card-divider" aria-hidden="true" />
              <p className="diagnosis-card-target">自分の耳の中を見てみたい方、休んでも疲れが取れない方へ</p>
              <ul className="diagnosis-card-contents" aria-label="内容">
                <li>イヤースコープで見る耳かき</li>
                <li>自律神経を刺激してすっきり</li>
              </ul>
              <p className="diagnosis-card-desc">
                モニターを見ながらのプロの耳掃除で、耳の中をすっきり綺麗に。自律神経を刺激する耳掃除で、頭や目の重だるさもリセットできる愛媛県初の新感覚メニュー。
              </p>
              <button className="diagnosis-card-btn diagnosis-card-btn--light" onClick={scrollToMenu}>
                料金・詳細を見る
                <span className="visually-hidden">（イヤーエステ）</span>
              </button>
              <Link href="/menu/ear-este" className="diagnosis-card-more-link">
                詳しく見る
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
          </article>
        </div>
        <Link href="/event" className="diagnosis-event-banner">
          <span>出張イベント開催先 募集中</span>
          <span className="diagnosis-event-banner-arrow">詳しくはこちら →</span>
        </Link>
      </div>
    </section>
  );
}

export default MenuDiagnosis;
