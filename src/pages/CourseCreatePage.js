import React, { useState } from 'react';
import courseService from '../services/courseService';
import { COURSE_CATEGORIES, COURSE_CATEGORY_LABELS, validateCourseForm } from '../types/courseTypes';
import './CourseCreatePage.css';

const CourseCreatePage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: COURSE_CATEGORIES.RECOMMEND,
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // エラーをクリア
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ファイルをBase64に変換（簡易実装）
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // バリデーション
    const validation = validateCourseForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const result = await courseService.createCourse(formData);
      if (result.success) {
        setSubmitMessage('コースが正常に作成されました！');
        // フォームをリセット
        setFormData({
          name: '',
          description: '',
          price: '',
          duration: '',
          category: COURSE_CATEGORIES.RECOMMEND,
          image: ''
        });
        // 3秒後にホームページに遷移
        setTimeout(() => {
          onNavigate('home');
        }, 3000);
      } else {
        setSubmitMessage(`エラー: ${result.error}`);
      }
    } catch (error) {
      setSubmitMessage(`エラー: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="course-create-page">
      <div className="container">
        {/* ヘッダー */}
        <div className="create-header">
          <h1>コース作成</h1>
          <p>新しいコースを作成して、お客様に提供するサービスを追加してください</p>
        </div>

        {/* フォーム */}
        <div className="create-form-container">
          <form onSubmit={handleSubmit} className="create-form">
            {/* コース名 */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                コース名 <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="例: yoon²極メニュー"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            {/* 説明 */}
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                説明 <span className="required">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`form-textarea ${errors.description ? 'error' : ''}`}
                placeholder="コースの詳細な説明を入力してください"
                rows="4"
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            {/* 価格と時間 */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price" className="form-label">
                  価格 <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`form-input ${errors.price ? 'error' : ''}`}
                  placeholder="例: 8000"
                  min="0"
                />
                {errors.price && <span className="error-message">{errors.price}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="duration" className="form-label">
                  時間 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className={`form-input ${errors.duration ? 'error' : ''}`}
                  placeholder="例: 90分"
                />
                {errors.duration && <span className="error-message">{errors.duration}</span>}
              </div>
            </div>

            {/* カテゴリ */}
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                カテゴリ <span className="required">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`form-select ${errors.category ? 'error' : ''}`}
              >
                {Object.entries(COURSE_CATEGORY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.category && <span className="error-message">{errors.category}</span>}
            </div>

            {/* 画像 */}
            <div className="form-group">
              <label htmlFor="image" className="form-label">
                画像
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="form-file"
                accept="image/*"
              />
              <div className="file-help">
                推奨サイズ: 400x300px、対応形式: JPG, PNG, GIF
              </div>
            </div>

            {/* 送信メッセージ */}
            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('エラー') ? 'error' : 'success'}`}>
                {submitMessage}
              </div>
            )}

            {/* ボタン */}
            <div className="form-actions">
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? '作成中...' : 'コースを作成'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseCreatePage;

