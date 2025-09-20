import React, { useState } from 'react';
import { addBooking, sendBookingConfirmationEmail } from '../services/bookingService';
import { validateBookingForm, validateField } from '../utils/validation';
import appConfig from '../config/appConfig';
import './BookingForm.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // リアルタイムバリデーション
    if (touched[name]) {
      const error = validateField(name, value, formData);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value, formData);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // 全フィールドをtouchedに設定
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // フォーム全体のバリデーション
    const validation = validateBookingForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      // 予約を追加
      const bookingId = await addBooking(formData);
      
      // 確認メールを送信
      await sendBookingConfirmationEmail({
        ...formData,
        id: bookingId
      });
      
      setSubmitStatus('success');
      
      // フォームをリセット
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: '',
        message: ''
      });
      setErrors({});
      setTouched({});
      
      // 3秒後に予約確認ページにリダイレクト
      setTimeout(() => {
        window.location.href = `/booking-confirmation?id=${bookingId}`;
      }, 3000);
      
    } catch (error) {
      console.error('予約エラー:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-form-container">
      <h2>予約フォーム</h2>
      
      {submitStatus === 'success' && (
        <div className="alert alert-success">
          <h3>✅ 予約が完了しました！</h3>
          <p>確認メールを送信いたしました。</p>
          <p>3秒後に予約確認ページに移動します...</p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="alert alert-error">
          予約の送信に失敗しました。もう一度お試しください。
        </div>
      )}

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="name">お名前 *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name ? 'error' : ''}
            required
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">メールアドレス *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? 'error' : ''}
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">電話番号 *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.phone ? 'error' : ''}
            required
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">希望日 *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.date ? 'error' : ''}
              required
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="time">希望時間 *</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.time ? 'error' : ''}
              required
            >
              <option value="">時間を選択</option>
              {appConfig.booking.availableTimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            {errors.time && <span className="error-message">{errors.time}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="service">サービス *</label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.service ? 'error' : ''}
            required
          >
            <option value="">サービスを選択</option>
            {appConfig.shop.services.map(service => (
              <option key={service.id} value={service.id}>
                {service.name} ({service.duration}) - ¥{service.price.toLocaleString()}
              </option>
            ))}
          </select>
          {errors.service && <span className="error-message">{errors.service}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">ご要望・メッセージ</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.message ? 'error' : ''}
            rows="4"
            placeholder="ご要望やご質問がございましたらお書きください"
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? '送信中...' : '予約を送信'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
