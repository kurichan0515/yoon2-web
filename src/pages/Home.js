import React, { useEffect, useRef, memo, useState } from 'react';
import SocialFeed from '../components/SocialFeed';
import AdSense from '../components/common/AdSense';
import courseService from '../services/courseService';
import { COURSE_CATEGORIES, COURSE_CATEGORY_LABELS } from '../types/courseTypes';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { trackPageView } from '../services/analyticsService';
import { trackPageView as trackGoogleAdsPageView } from '../services/googleAdsService';
import { setPageMeta } from '../utils/seoHelper';
import appConfig from '../config/appConfig';
import logger from '../utils/logger';
import './Home.css';

const Home = memo(() => {
  logger.debug('Home component rendered');
  
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);
  const courseCardsRef = useRef([]);
  
  // Courses state
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    logger.debug('Home useEffect called');
    // ページの一番上にスクロール
    window.scrollTo(0, 0);
    
    // SEOメタタグを設定
    setPageMeta({
      title: 'yoon²ゆんゆん - イヤーエステ・耳つぼ専門店',
      description: 'yoon²ゆんゆん - イヤーエステ・耳つぼ専門店。松山市清水町で心身のリラクゼーションを提供します。イヤーエステと耳つぼで心身のバランスを整える専門サロンです。',
      path: '/'
    });
    
    // インプレッションを記録
    trackPageView('Home', {
      section: 'main'
    });
    
    // Google Adsページビューを記録
    trackGoogleAdsPageView('/', 'Home - yoon²ゆんゆん');
    
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

  // Load courses
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setCoursesLoading(true);
        const result = await courseService.getAllCourses();
        if (result.success) {
          setCourses(result.data);
        } else {
          setCoursesError(result.error);
        }
      } catch (err) {
        setCoursesError('コースの読み込みに失敗しました');
      } finally {
        setCoursesLoading(false);
      }
    };
    loadCourses();
  }, []);

  // コースカード用のスクロールアニメーション用のIntersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // 少し遅延を入れて順番にアニメーション
          setTimeout(() => {
            entry.target.classList.add('fade-in-up');
          }, index * 100); // 各カードに100msずつ遅延
        }
      });
    }, observerOptions);

    // 各コースカードを監視
    courseCardsRef.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [courses, selectedCategory]);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const { shop } = appConfig;

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-background" style={{backgroundImage: "url('/images/hero/wait-room.png')"}}>
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content fade-in">
            <h1>yoon²</h1>
            <p className="hero-subtitle">ear esthetic & acupressure salon</p>
            <p className="hero-description">
              イヤーエステと耳つぼで至福のひととき<br />
              プロの技術で心身ともにリラックスできる特別な時間をお届けします
            </p>
            <div className="hero-actions">
              <a
                href={appConfig.shop.lineUrl || appConfig.social.line.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary hero-cta line-booking-btn"
                aria-label="LINEで予約・お問い合わせ（新しいウィンドウで開きます）"
              >
                <span className="line-booking-text">
                  <span className="line-booking-line1">LINEで予約</span>
                  <span className="line-booking-line2">お問い合わせ</span>
                </span>
              </a>
              <button 
                onClick={() => {
                  const coursesSection = document.getElementById('courses');
                  if (coursesSection) {
                    coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="btn-secondary"
                style={{ whiteSpace: 'nowrap' }}
              >
                コースを見る
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Announcement Section */}
      <section className="announcement-section section" ref={addToRefs}>
        <div className="container">
          <div className="announcement-card">
            <img 
              src="/images/announcements/notification01.png" 
              alt="店舗移転のお知らせ"
              className="announcement-image"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="image-placeholder announcement-placeholder" style={{display: 'none'}} aria-hidden="true">
              <span>お知らせ画像</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section section" ref={addToRefs}>
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <span className="section-label">About Us</span>
              <h2>サービスの特徴</h2>
              <p>
                イヤーエステと耳つぼで心身のバランスを整える専門サロンです。
                お客様一人ひとりに合わせたオーダーメイドの施術で、深いリラクゼーションを提供いたします。
              </p>
              <p>
                ドライヘッドスパとの組み合わせで、頭部全体の疲れを解消し、
                日常のストレスから解放される特別な時間をお過ごしいただけます。
              </p>
            </div>
            <div className="about-image">
              <img 
                src="/images/shop/play-room.png" 
                alt="店内の様子 - リラクゼーション空間"
                className="about-image-content"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="image-placeholder" style={{display: 'none'}} aria-hidden="true">
                <span>イヤーエステ・耳つぼの様子</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="courses-section section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Services</span>
            <h2>サービス・コース一覧</h2>
            <p>お客様のご要望に合わせたイヤーエステ・耳つぼ・ドライヘッドスパメニューをご用意しております</p>
          </div>

          {coursesLoading ? (
            <LoadingSpinner message="コース情報を読み込み中..." />
          ) : coursesError ? (
            <ErrorMessage
              error={typeof coursesError === 'string' ? new Error(coursesError) : coursesError}
              title="コース情報の読み込みに失敗しました"
              message="コース情報を取得できませんでした。しばらく時間をおいて再度お試しください。"
              showDetails={process.env.NODE_ENV === 'development'}
            />
          ) : (
            <>
              {/* カテゴリフィルター */}
              <div className="category-filter">
                <button 
                  className={`filter-button ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  すべて
                </button>
                {Object.values(COURSE_CATEGORIES).map(category => (
                  <button
                    key={category}
                    className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {COURSE_CATEGORY_LABELS[category]}
                  </button>
                ))}
              </div>

              {/* コース一覧 */}
              <div className="courses-grid">
                {filteredCourses.map((course, index) => (
                  <div 
                    key={course.id} 
                    ref={(el) => (courseCardsRef.current[index] = el)}
                    className="course-card scroll-animate"
                  >
                    <div className="course-image">
                      <img 
                        src={course.image} 
                        alt={`${course.name}の画像`}
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="image-placeholder" style={{display: 'none'}} aria-hidden="true">
                        <span>{course.name}</span>
                      </div>
                    </div>
                    <div className="course-content">
                      <div className="course-header-info">
                        <h3 className="course-title">{course.name}</h3>
                        <span className="course-category">
                          {COURSE_CATEGORY_LABELS[course.category]}
                        </span>
                      </div>
                      <p className="course-description">{course.description}</p>
                      <div className="course-details">
                        <div className="course-duration">
                          <span className="detail-label">時間:</span>
                          <span className="detail-value">{course.duration}</span>
                        </div>
                        <div className="course-price">
                          <span className="detail-label">価格:</span>
                          <span className="detail-value">¥{course.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="no-courses">
                  <h3>該当するコースが見つかりませんでした</h3>
                  <p>他のカテゴリを選択してください</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Shop Info Section */}
      <section id="shop" className="shop-section section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Shop Information</span>
            <h2>店舗情報</h2>
            <p>お気軽にお越しください</p>
          </div>

          <div className="shop-info-content">
            <div className="shop-info-details">
              <div className="info-card">
                <div className="info-icon">📍</div>
                <div className="info-content">
                  <h4>住所</h4>
                  <p>{shop?.address || '住所情報を取得中...'}</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">🚃</div>
                <div className="info-content">
                  <h4>最寄り駅</h4>
                  {shop?.access?.stations?.filter(station => station).map((station, index) => (
                    <p key={index}>{station}</p>
                  ))}
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">🕐</div>
                <div className="info-content">
                  <h4>営業時間</h4>
                  <p>{shop?.hours?.weekday || '10:00 - 20:00'}</p>
                  <p>{shop?.hours?.weekend || '10:00 - 20:00'}</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">📞</div>
                <div className="info-content">
                  <h4>電話番号</h4>
                  <p>{shop?.phone || '080-8478-1163'}</p>
                </div>
              </div>
            </div>
            <div className="map-container">
              <iframe
                src={shop?.googleMapsUrl || appConfig.shop.googleMapsUrl}
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="yoon²ゆんゆん 店舗位置"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 駐車場写真セクション */}
      {shop?.access?.parkingPhotos?.parkingLot && (
        <section className="parking-section section" ref={addToRefs}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">Parking</span>
              <h2>駐車場</h2>
              <p className="section-header-description">お車でお越しの際はこちらをご利用ください</p>
            </div>
            <div className="parking-photo-container">
              <div className="parking-image-wrapper">
                <img 
                  src={shop?.access?.parkingPhotos?.parkingLot || appConfig.shop.access.parkingPhotos.parkingLot}
                  alt="駐車場の様子"
                  className="parking-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const placeholder = e.target.nextElementSibling;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div className="image-placeholder" style={{display: 'none'}} aria-hidden="true">
                  <span>駐車場の写真</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 駐車場から店舗までの写真セクション */}
      {shop?.access?.parkingPhotos?.routeToShop && (
        <section className="route-section section" ref={addToRefs}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">Route</span>
              <h2>駐車場から店舗までの道順</h2>
              <p className="section-header-description">駐車場から店舗までの道のりをご案内します</p>
            </div>
            <div className="route-photo-container">
              <div className="route-image-wrapper">
                <img 
                  src={shop?.access?.parkingPhotos?.routeToShop || appConfig.shop.access.parkingPhotos.routeToShop}
                  alt="駐車場から店舗までの道順"
                  className="route-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const placeholder = e.target.nextElementSibling;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div className="image-placeholder" style={{display: 'none'}} aria-hidden="true">
                  <span>駐車場から店舗までの写真</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 営業時間セクション */}
      <section className="hours-section section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Business Hours</span>
            <h2>営業時間</h2>
            <p>ご来店をお待ちしております</p>
          </div>
          <div className="hours-content">
            <div className="hours-grid">
              <div className="hours-card">
                <h4>平日</h4>
                <p className="hours-time">{shop?.hours?.weekday || '10:00 - 20:00'}</p>
                <p className="hours-note">月曜日〜金曜日</p>
              </div>
              <div className="hours-card">
                <h4>土日祝</h4>
                <p className="hours-time">{shop?.hours?.weekend || '10:00 - 20:00'}</p>
                <p className="hours-note">土曜日・日曜日・祝日</p>
              </div>
            </div>
            {shop?.notes && shop.notes.length > 0 && (
              <div className="hours-notes">
                <h4>📋 ご確認事項</h4>
                <ul>
                  {shop.notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="social-section section" ref={addToRefs}>
        <div className="container">
          <SocialFeed />
        </div>
      </section>

      {/* Reserve/Contact Section */}
      <section id="reserve" className="reserve-section section" ref={addToRefs}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Reservation & Contact</span>
            <h2>ご予約・お問い合わせ</h2>
            <p>お気軽にお問い合わせください</p>
          </div>
          
          <div className="contact-info">
            <h4 className="contact-heading">
              <span className="contact-heading-line1">💬 ご予約</span>
              <span className="contact-heading-line2">お問い合わせについて</span>
            </h4>
            <p>ご予約やお問い合わせは<strong>公式LINE</strong>にメッセージをお願いします。</p>
            <a
              href={appConfig.shop.lineUrl || appConfig.social.line.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary line-booking-btn"
              style={{ marginTop: '1rem', display: 'inline-block' }}
            >
              <span className="line-booking-text">
                <span className="line-booking-line1">LINEで予約</span>
                <span className="line-booking-line2">お問い合わせ</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* AdSense広告 - SNSセクション後 */}
      <section className="adsense-section section" ref={addToRefs}>
        <div className="container">
          <AdSense 
            adSlot="2647640133" 
            adFormat="auto"
            className="adsense-social"
          />
        </div>
      </section>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
