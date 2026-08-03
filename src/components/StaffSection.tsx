'use client';

import React, { useRef, useEffect } from 'react';
import './StaffSection.css';

interface Staff {
  id: string;
  name: string;
  role: string;
  photo: string;
  message: string;
}

const STAFF: Staff[] = [
  {
    id: 'chiharu',
    name: 'chiharu',
    role: 'オーナー',
    photo: '/images/staff/chiharu.jpg',
    message: '仮テキスト：お客様一人ひとりに寄り添った施術を心がけています。',
  },
  {
    id: 'yuki',
    name: 'yuki',
    role: 'スタッフ',
    photo: '/images/staff/yuki.jpg',
    message: '仮テキスト：心地よい時間を過ごしていただけるよう努めます。',
  },
];

const hideImgShowPlaceholder = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  img.style.display = 'none';
  const ph = img.nextElementSibling as HTMLElement | null;
  if (ph) ph.style.display = 'flex';
};

function StaffSection() {
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
    <section id="staff" className="staff-section section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Staff</span>
          <h2>スタッフ紹介</h2>
          <p>仮テキスト：あなたを担当するスタッフです</p>
        </div>
        <div className="staff-grid">
          {STAFF.map(staff => (
            <div key={staff.id} className="staff-card">
              <div className="staff-photo-wrapper">
                <img src={staff.photo} alt={`${staff.name}の写真`}
                  className="staff-photo" width={320} height={320} loading="lazy"
                  onError={hideImgShowPlaceholder} />
                <div className="staff-photo-placeholder" style={{ display: 'none' }} aria-hidden="true">
                  <span>写真準備中</span>
                </div>
              </div>
              <h3 className="staff-name">{staff.name}</h3>
              <p className="staff-role">{staff.role}</p>
              <p className="staff-message">{staff.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StaffSection;
