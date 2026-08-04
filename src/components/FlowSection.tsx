'use client';

import React, { useRef, useEffect } from 'react';
import './FlowSection.css';

interface Step { num: string; icon: string; title: string; desc: string; highlight?: boolean; }

const STEPS: Step[] = [
  { num: '01', icon: '👂', title: 'カウンセリング', desc: 'スコープで耳の中を一緒に確認。お悩みや気になる点をヒアリングします。' },
  { num: '02', icon: '✨', title: '施術',           desc: '痛みなし・優しいタッチ。完全個室でリラックスできる環境で丁寧に施術。' },
  { num: '03', icon: '😴', title: 'もみほぐし',     desc: '迷走神経を優しく刺激。ここで寝落ちされるお客様が続出です。', highlight: true },
  { num: '04', icon: '🌿', title: 'アフターケア',   desc: 'スッキリした状態を確認。お悩みに合わせたアドバイスをお伝えします。' },
];

function FlowSection() {
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

  return (
    <section id="flow" className="flow-section section" ref={sectionRef}>
      <div className="container">
        <div className="flow-header">
          <span className="section-label">Flow</span>
          <h2 className="flow-title">初めての方も安心！<br />ご来店からの流れ</h2>
        </div>
        <div className="flow-timeline" role="list">
          {STEPS.map((step, i) => (
            <div key={step.num} className={`flow-step${step.highlight ? ' flow-step--highlight' : ''}`} role="listitem">
              {i < STEPS.length - 1 && <div className="flow-step-line" aria-hidden="true" />}
              <div className="flow-step-circle" aria-hidden="true">
                <span className="flow-step-icon">{step.icon}</span>
              </div>
              <div className="flow-step-content">
                <div className="flow-step-num" aria-hidden="true">{step.num}</div>
                <h3 className="flow-step-title">{step.title}</h3>
                <p className="flow-step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="flow-note">完全個室・全施術痛みなし</p>
        <a
          href="https://mimitubojapan.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flow-certification-badge"
        >
          <span aria-hidden="true">🏅</span>
          一般社団法人日本フランス式耳つぼ協会認定
        </a>
      </div>
    </section>
  );
}

export default FlowSection;
