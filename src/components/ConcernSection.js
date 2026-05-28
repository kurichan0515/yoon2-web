import React, { useRef, useEffect } from 'react';
import './ConcernSection.css';

const CONCERNS = [
  { num: '01', text: '休んでも疲れが取れない、頭や目が重い' },
  { num: '02', text: '自分の耳の中がどうなっているか見てみたい' },
  { num: '03', text: '肩こりや頭痛、むくみをどうにかしたい' },
  { num: '04', text: '不調をケアしたいけど、オシャレも楽しみたい' },
];

function ConcernSection() {
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

  return (
    <section className="concern-section section" ref={sectionRef}>
      <div className="container">
        <div className="concern-header">
          <span className="section-label">For You</span>
          <h2 className="concern-title">こんなお悩み、<br />抱えていませんか？</h2>
        </div>

        <ul className="concern-list" aria-label="お悩みリスト">
          {CONCERNS.map((item) => (
            <li key={item.num} className="concern-item">
              <span className="concern-num" aria-hidden="true">{item.num}</span>
              <span className="concern-text">{item.text}</span>
            </li>
          ))}
        </ul>

        <div className="concern-lead">
          <div className="concern-lead-line" aria-hidden="true" />
          <p className="concern-lead-text">
            そのお悩み、yoon²の<em>耳からのアプローチ</em>で解決できます
          </p>
        </div>
      </div>
    </section>
  );
}

export default ConcernSection;
