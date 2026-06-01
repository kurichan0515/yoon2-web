'use client';

import React, { useState, useEffect, useRef } from 'react';
import appConfig from '../config/appConfig';
import { FAQ_DATA, getFaqStructuredData } from '../data/faqData';
import { trackFaqView, trackHotpepperClick, trackLineClick } from '../services/analyticsService';
import './FAQ.css';

interface FaqListItem { text: string; href?: string; hrefKey?: string; }
interface FaqPriceItem { label: string; from: string; to: string; }
interface FaqContent {
  paragraphs?: string[];
  label?: string;
  listItems?: FaqListItem[];
  note?: string;
  afterParagraphs?: string[];
  priceItems?: FaqPriceItem[];
}
interface FaqItemData { id: string; question: string; answerText: string; content?: FaqContent; }
interface FaqCategory { category: string; categoryKey: string; items: FaqItemData[]; }

function renderContent(content: FaqContent | undefined, lineUrl: string) {
  if (!content) return null;
  const { paragraphs, label, listItems, note, afterParagraphs, priceItems } = content;
  const isHotpepper = (url = '') => /beauty\.hotpepper\.jp/.test(url);
  return (
    <>
      {paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
      {label && <p className="faq-answer-label">{label}</p>}
      {listItems && (
        <ul className="faq-list">
          {listItems.map((item, i) => (
            <li key={i}>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer"
                  onClick={() => { if (isHotpepper(item.href)) trackHotpepperClick('FAQ Link'); }}>
                  {item.text}
                </a>
              ) : item.hrefKey === 'line' ? (
                <a href={lineUrl} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackLineClick('FAQ Link')}>
                  {item.text}
                </a>
              ) : item.text}
            </li>
          ))}
        </ul>
      )}
      {priceItems && (
        <ul className="faq-list faq-list--price">
          {priceItems.map((item, i) => (
            <li key={i}>{item.label}: 通常{item.from} → <strong>{item.to}</strong></li>
          ))}
        </ul>
      )}
      {afterParagraphs?.map((p, i) => <p key={`after-${i}`}>{p}</p>)}
      {note && <p className="faq-answer-note">{note}</p>}
    </>
  );
}

interface FaqItemProps { item: FaqItemData; isOpen: boolean; onToggle: () => void; }

function FaqItem({ item, isOpen, onToggle }: FaqItemProps) {
  const lineUrl = appConfig.shop.lineUrl as string;
  return (
    <div className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
      <button className="faq-question" onClick={onToggle}
        aria-expanded={isOpen} aria-controls={`faq-answer-${item.id}`}>
        <span className="faq-question-text">{item.question}</span>
        <span className="faq-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      <div id={`faq-answer-${item.id}`} className="faq-answer-wrapper" role="region">
        <div className="faq-answer">{renderContent(item.content, lineUrl)}</div>
      </div>
    </div>
  );
}

function FAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const toggleItem = (id: string) => setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const once = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) { trackFaqView(); once.disconnect(); } }); },
      { threshold: 0.3 }
    );
    once.observe(el);
    return () => once.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) { el.classList.add('fade-in'); obs.disconnect(); } }); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (document.getElementById('faq-structured-data')) return;
    const script = document.createElement('script');
    script.id = 'faq-structured-data';
    script.type = 'application/ld+json';
    script.textContent = getFaqStructuredData();
    document.head.appendChild(script);
    return () => { document.getElementById('faq-structured-data')?.remove(); };
  }, []);

  return (
    <section id="faq" className="faq-section section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">FAQ</span>
          <h2>よくある質問</h2>
          <p>ご不明な点はお気軽にお問い合わせください</p>
        </div>
        <div className="faq-categories">
          {(FAQ_DATA as FaqCategory[]).map(category => (
            <div key={category.categoryKey} className={`faq-category faq-category--${category.categoryKey}`}>
              <h3 className="faq-category-title">{category.category}</h3>
              <div className="faq-items">
                {category.items.map(item => (
                  <FaqItem key={item.id} item={item}
                    isOpen={!!openItems[item.id]} onToggle={() => toggleItem(item.id)} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="faq-contact">
          <p className="faq-contact-text">その他のご質問はお気軽にお問い合わせください</p>
          <div className="faq-contact-actions">
            <a href={appConfig.shop.lineUrl as string} target="_blank" rel="noopener noreferrer"
              className="btn-primary line-booking-btn"
              aria-label="LINEでお問い合わせ（新しいウィンドウで開きます）"
              onClick={() => trackLineClick('FAQ Contact CTA')}>
              <span className="line-booking-text">
                <span className="line-booking-line1">LINEで予約</span>
                <span className="line-booking-line2">お問い合わせ</span>
              </span>
            </a>
            <a href={`tel:${(appConfig.shop.phone as string).replace(/-/g, '')}`}
              className="btn-secondary faq-tel-btn"
              aria-label={`電話で問い合わせ: ${appConfig.shop.phone}`}>
              {appConfig.shop.phone as string}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
