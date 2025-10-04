import React, { useState, useEffect } from 'react';
import courseService from '../services/courseService';
import { COURSE_CATEGORIES, COURSE_CATEGORY_LABELS } from '../types/courseTypes';
import './CoursePage.css';

const CoursePage = ({ onNavigate }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadCourses();
  }, []);

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
        <div className="loading-container">
          <h2>読み込み中...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="course-page">
        <div className="error-container">
          <h2>エラーが発生しました</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="course-page">
      <div className="container">
        {/* ヘッダー */}
        <div className="course-header">
          <h1>コース一覧</h1>
          <p>お客様のご要望に合わせたイヤーエステ・耳つぼ・ドライヘッドスパメニューをご用意しております</p>
        </div>

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
                    alt={course.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="image-placeholder" style={{display: 'none'}}>
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
    </div>
  );
};

export default CoursePage;

