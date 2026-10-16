import React from 'react';
import './BrandConcept.css';

// 五行アイコン（線画）。注記は漢字1字のみ（身体機能・効果は記載しない）
const ELEMENTS: { kanji: string; icon: React.ReactNode }[] = [
  {
    kanji: '木',
    icon: (
      <>
        <path d="M24 42V18" />
        <path d="M24 26l-7-7M24 31l8-8M24 21l-4-5" />
        <path d="M12 42h24" />
      </>
    ),
  },
  {
    kanji: '土',
    icon: (
      <>
        <path d="M6 36l11-14 7 8 5-6 13 12" />
        <path d="M6 41h36" />
      </>
    ),
  },
  {
    kanji: '水',
    icon: (
      <>
        <path d="M24 8c-6 9-10 15-10 20a10 10 0 0 0 20 0c0-5-4-11-10-20z" />
        <path d="M19 30a5 5 0 0 0 5 5" />
      </>
    ),
  },
  {
    kanji: '火',
    icon: (
      <>
        <path d="M24 6c2 7 10 11 10 21a10 10 0 0 1-20 0c0-5 3-8 5-11 1 4 3 6 5 6-1-6 0-11 0-16z" />
      </>
    ),
  },
  {
    kanji: '金',
    icon: (
      <>
        <circle cx="24" cy="24" r="13" />
        <circle cx="24" cy="24" r="6" />
      </>
    ),
  },
];

function BrandConcept() {
  return (
    <section id="concept" className="brand-concept section" aria-labelledby="brand-concept-title">
      <div className="container">
        <div className="brand-concept-inner">
          <span className="section-label">Brand Concept</span>
          <h2 id="brand-concept-title" className="brand-concept-title">
            東洋医学 <span className="brand-concept-times" aria-hidden="true">×</span><span className="visually-hidden">と</span> ゆんゆん
          </h2>
          <span className="rule rule--short" aria-hidden="true" />
          <p className="brand-concept-text">
            古くから伝わる東洋の知恵と、耳かきのやさしい刺激で、
            <br className="brand-concept-br" />
            心と身体のバランスを整える。
            <br />
            それが、ゆんゆんのイヤーエステです。
          </p>
          <ul className="gogyo-list" aria-label="五行">
            {ELEMENTS.map(el => (
              <li key={el.kanji} className="gogyo-item">
                <svg className="gogyo-icon" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" focusable="false">
                  {el.icon}
                </svg>
                <span className="gogyo-kanji">{el.kanji}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default BrandConcept;
