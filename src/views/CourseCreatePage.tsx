import React, { useState, ChangeEvent, FormEvent } from 'react';
import { courseUseCases } from '../infrastructure/container';
import { COURSE_CATEGORY, COURSE_CATEGORY_LABELS, CourseCategoryValue } from '../domain/course/CourseCategory';
import { CourseValidationError } from '../domain/course/Course';
import './CourseCreatePage.css';

interface FormData {
  name: string;
  description: string;
  price: string;
  duration: string;
  category: CourseCategoryValue;
  image: string;
}

const INITIAL_FORM: FormData = {
  name: '', description: '', price: '', duration: '',
  category: COURSE_CATEGORY.RECOMMEND as CourseCategoryValue,
  image: '',
};

interface Props {
  onNavigate?: (page: string) => void;
}

const CourseCreatePage = ({ onNavigate }: Props) => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormData(prev => ({ ...prev, image: ev.target?.result as string ?? '' }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      await courseUseCases.create.execute({ ...formData, price: Number(formData.price) });
      setSubmitMessage('コースが正常に作成されました！');
      setFormData(INITIAL_FORM);
      setTimeout(() => onNavigate?.('home'), 3000);
    } catch (err: unknown) {
      if (err instanceof CourseValidationError) {
        setErrors(err.errors);
      } else {
        setSubmitMessage(`エラー: ${(err as Error).message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="course-create-page">
      <div className="container">
        <div className="create-header">
          <h1>コース作成</h1>
          <p>新しいコースを作成して、お客様に提供するサービスを追加してください</p>
        </div>
        <div className="create-form-container">
          <form onSubmit={handleSubmit} className="create-form">
            {[
              { id: 'name', label: 'コース名', type: 'text', placeholder: '例: yoon²極メニュー' },
              { id: 'price', label: '価格', type: 'number', placeholder: '例: 8000', min: '0' },
              { id: 'duration', label: '時間', type: 'text', placeholder: '例: 90分' },
            ].map(({ id, label, type, placeholder, min }) => (
              <div key={id} className="form-group">
                <label htmlFor={id} className="form-label">{label} <span className="required">*</span></label>
                <input type={type} id={id} name={id}
                  value={formData[id as keyof FormData]} onChange={handleInputChange}
                  className={`form-input ${errors[id] ? 'error' : ''}`}
                  placeholder={placeholder} min={min} />
                {errors[id] && <span className="error-message">{errors[id]}</span>}
              </div>
            ))}
            <div className="form-group">
              <label htmlFor="description" className="form-label">説明 <span className="required">*</span></label>
              <textarea id="description" name="description" value={formData.description}
                onChange={handleInputChange} className={`form-textarea ${errors.description ? 'error' : ''}`}
                placeholder="コースの詳細な説明を入力してください" rows={4} />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="category" className="form-label">カテゴリ <span className="required">*</span></label>
              <select id="category" name="category" value={formData.category}
                onChange={handleInputChange} className={`form-select ${errors.category ? 'error' : ''}`}>
                {Object.entries(COURSE_CATEGORY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label as string}</option>
                ))}
              </select>
              {errors.category && <span className="error-message">{errors.category}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="image" className="form-label">画像</label>
              <input type="file" id="image" name="image" onChange={handleImageChange}
                className="form-file" accept="image/*" />
              <div className="file-help">推奨サイズ: 400x300px、対応形式: JPG, PNG, GIF</div>
            </div>
            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('エラー') ? 'error' : 'success'}`}>
                {submitMessage}
              </div>
            )}
            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
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
