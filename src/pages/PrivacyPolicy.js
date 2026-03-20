import React, { useEffect, useRef, memo } from 'react';
import { setPageMeta } from '../utils/seoHelper';
import logger from '../utils/logger';
import './PrivacyPolicy.css';

const PrivacyPolicy = memo(() => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    // ページの一番上にスクロール
    window.scrollTo(0, 0);
    
    // SEOメタタグを設定
    setPageMeta({
      title: 'プライバシーポリシー | yoon² 松山の耳つぼ・イヤーエステ',
      description: 'yoon²（ゆんゆん、松山の耳つぼ・イヤーエステ専門サロン）のプライバシーポリシー。個人情報の取り扱い、クッキーの使用、Google AdSenseについて説明しています。',
      path: '/privacy'
    });
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="privacy-policy-page">
      {/* Hero Section */}
      <section className="privacy-hero">
        <div className="hero-background" style={{backgroundImage: "url('/images/shop/play-room.jpg')"}}>
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content fade-in">
            <span className="section-label">Privacy Policy</span>
            <h1>プライバシーポリシー</h1>
            <p className="hero-description">
              yoon²ゆんゆんでは、お客様の個人情報を適切に管理し、保護することをお約束いたします。
            </p>
          </div>
        </div>
      </section>

      {/* プライバシーポリシー内容 */}
      <section className="section privacy-content-section" ref={addToRefs}>
        <div className="container">
          <div className="privacy-content">
            <div className="privacy-intro">
              <p>
                yoon²ゆんゆん（以下「当サロン」）は、お客様の個人情報の保護を重要な責務と考えております。
                本プライバシーポリシーは、当サロンのウェブサイト（https://yoon2.com）における個人情報の取り扱いについて説明するものです。
              </p>
            </div>

            <div className="privacy-section" ref={addToRefs}>
              <h2>1. 個人情報の収集について</h2>
              <p>
                当サロンは、以下の場合に個人情報を収集する場合があります：
              </p>
              <ul>
                <li>LINEでの予約・お問い合わせ時</li>
                <li>電話でのお問い合わせ時</li>
                <li>店舗でのご来店時</li>
              </ul>
              <p>
                収集する情報には、お名前、連絡先（電話番号、メールアドレス）、ご予約内容などが含まれます。
              </p>
            </div>

            <div className="privacy-section" ref={addToRefs}>
              <h2>2. 個人情報の利用目的</h2>
              <p>収集した個人情報は、以下の目的で利用いたします：</p>
              <ul>
                <li>ご予約の確認・管理</li>
                <li>サービス提供のための連絡</li>
                <li>お問い合わせへの対応</li>
                <li>サービス改善のための分析</li>
              </ul>
            </div>

            <div className="privacy-section" ref={addToRefs}>
              <h2>3. 個人情報の管理</h2>
              <p>
                当サロンは、お客様の個人情報を適切に管理し、不正アクセス、紛失、破壊、改ざん、漏洩などを防止するため、
                セキュリティ対策を講じています。
              </p>
            </div>

            <div className="privacy-section" ref={addToRefs}>
              <h2>4. 個人情報の第三者提供</h2>
              <p>
                当サロンは、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
              </p>
            </div>

            <div className="privacy-section" ref={addToRefs}>
              <h2>5. クッキー（Cookie）について</h2>
              <p>
                当サイトでは、サービス向上のため、クッキーを使用しています。
                クッキーは、お客様のブラウザに保存される小さなテキストファイルです。
                クッキーの使用により、お客様の個人を特定する情報は収集されません。
              </p>
              <p>
                お客様は、ブラウザの設定によりクッキーの受け入れを拒否することができますが、
                その場合、一部の機能が正常に動作しない場合があります。
              </p>
            </div>

            <div className="privacy-section" ref={addToRefs}>
              <h2>6. Google AdSenseについて</h2>
              <p>
                当サイトでは、第三者配信の広告サービス「Google AdSense」を利用しています。
                Google AdSenseは、お客様の興味に応じた広告を表示するため、当サイトや他のサイトへのアクセス情報を使用する場合があります。
              </p>
              <p>
                お客様は、<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Googleの広告設定</a>から、
                パーソナライズ広告を無効にすることができます。
              </p>
              <p>
                また、<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Googleのポリシーと規約</a>もご確認ください。
              </p>
            </div>

            <div className="privacy-section" ref={addToRefs}>
              <h2>7. アクセス解析ツールについて</h2>
              <p>
                当サイトでは、サービス向上のため、Google Analyticsなどのアクセス解析ツールを使用しています。
                これらのツールは、クッキーを使用してデータを収集します。
                収集されたデータは匿名で、個人を特定するものではありません。
              </p>
            </div>

            <div className="privacy-section" ref={addToRefs}>
              <h2>8. 個人情報の開示・訂正・削除</h2>
              <p>
                お客様ご本人から、個人情報の開示、訂正、削除のご請求があった場合、
                ご本人確認の上、速やかに対応いたします。
              </p>
              <p>
                お問い合わせは、LINEまたは電話にてお願いいたします。
              </p>
            </div>

            <div className="privacy-section" ref={addToRefs}>
              <h2>9. プライバシーポリシーの変更</h2>
              <p>
                当サロンは、必要に応じて本プライバシーポリシーを変更する場合があります。
                変更後のプライバシーポリシーは、本ページに掲載した時点で効力を生じるものとします。
              </p>
            </div>

            <div className="privacy-section" ref={addToRefs}>
              <h2>10. お問い合わせ</h2>
              <p>
                本プライバシーポリシーに関するお問い合わせは、以下までご連絡ください：
              </p>
              <div className="contact-info">
                <p><strong>yoon²ゆんゆん</strong></p>
                <p>住所: 愛媛県松山市北久米町438</p>
                <p>電話: 080-8478-1163</p>
                <p>
                  LINE: <a href="https://lin.ee/lyyKSqu" target="_blank" rel="noopener noreferrer">公式LINEアカウント</a>
                </p>
              </div>
            </div>

            <div className="privacy-footer" ref={addToRefs}>
              <p className="last-updated">最終更新日: 2026年1月15日</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

PrivacyPolicy.displayName = 'PrivacyPolicy';

export default PrivacyPolicy;
