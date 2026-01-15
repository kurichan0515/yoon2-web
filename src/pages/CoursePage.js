import React, { useState, useEffect } from 'react';
import courseService from '../services/courseService';
import { COURSE_CATEGORIES, COURSE_CATEGORY_LABELS } from '../types/courseTypes';
import AdSense from '../components/common/AdSense';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { setPageMeta } from '../utils/seoHelper';
import './CoursePage.css';

const CoursePage = ({ onNavigate }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // ページの一番上にスクロール
    window.scrollTo(0, 0);
    
    // SEOメタタグを設定
    setPageMeta({
      title: 'コース・メニュー',
      description: 'yoon²ゆんゆんのコース・メニュー一覧。イヤーエステ、耳つぼ、ドライヘッドスパなど、お客様のご要望に合わせたオーダーメイドの施術メニューをご用意しております。',
      path: '/courses'
    });
    
    loadCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // loadCoursesは安定した関数なので依存配列から除外

  const loadCourses = async () => {
    try {
      setLoading(true);
      const result = await courseService.getAllCourses();
      if (result.success) {
        setCourses(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('コースの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);


  if (loading) {
    return (
      <div className="course-page">
        <LoadingSpinner message="コース情報を読み込み中..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="course-page">
        <div className="container">
          <ErrorMessage
            error={typeof error === 'string' ? new Error(error) : error}
            title="コース情報の読み込みに失敗しました"
            message="コース情報を取得できませんでした。しばらく時間をおいて再度お試しください。"
            onRetry={loadCourses}
            showDetails={process.env.NODE_ENV === 'development'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="course-page">
      {/* Hero Section */}
      <section className="course-hero">
        <div className="hero-background" style={{backgroundImage: "url('/images/hero/wait-room.png')"}}>
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content fade-in">
            <span className="section-label">Courses</span>
            <h1>コース一覧</h1>
            <p className="hero-description">
              お客様のご要望に合わせたイヤーエステ・耳つぼ・ドライヘッドスパメニューをご用意しております
            </p>
          </div>
        </div>
      </section>

      {/* ヘッドスパ専用画像セクション */}
      <section className="head-spa-section">
        <div className="container">
          <div className="head-spa-content">
            <div className="head-spa-image-wrapper">
              <img 
                src="/images/hero/head-spa.png" 
                alt="ヘッドスパ施術の様子"
                className="head-spa-image"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="image-placeholder head-spa-placeholder" style={{display: 'none'}} aria-hidden="true">
                <span>ヘッドスパ施術の様子</span>
              </div>
            </div>
            <div className="head-spa-text">
              <span className="section-label">Head Spa</span>
              <h2>ヘッドスパで深いリラクゼーション</h2>
              <p>
                プロの技術によるヘッドマッサージで、頭部全体の疲れを解消し、
                日常のストレスから解放される特別な時間をお過ごしいただけます。
              </p>
              <p>
                頭皮から首筋、肩まで丁寧にケアし、心身ともにリフレッシュできる
                至福のひとときをご提供いたします。
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{paddingTop: 'var(--spacing-xxl)'}}>

        {/* カテゴリフィルター */}
        <div className="category-filter">
          <button 
            className={`filter-button ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            すべて
          </button>
          {Object.values(COURSE_CATEGORIES).map(category => (
            <button
              key={category}
              className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {COURSE_CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>

        {/* コース一覧 */}
        <div className="courses-grid">
          {filteredCourses.map(course => {
            // yoon²極メニューと最上級メニューをグループ化
            const isGroupedCourse = course.name.includes('極メニュー') || course.name.includes('最上級メニュー');
            
            return (
              <div key={course.id} className={`course-card ${isGroupedCourse ? 'grouped-course' : ''}`}>
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
                    <h3>{course.name}</h3>
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
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="no-courses">
            <h3>該当するコースが見つかりませんでした</h3>
            <p>他のカテゴリを選択してください</p>
          </div>
        )}
      </div>

      {/* AdSense広告 - コース一覧後 */}
      <section className="adsense-section section">
        <div className="container">
          <AdSense 
            adSlot="2647640133" 
            adFormat="auto"
            className="adsense-course"
          />
        </div>
      </section>
    </div>
  );
};

export default CoursePage;

