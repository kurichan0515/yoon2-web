// フォームバリデーション用ユーティリティ

// メールアドレスの検証
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 電話番号の検証（日本の電話番号）
export const validatePhone = (phone) => {
  const phoneRegex = /^(\d{2,4}-\d{2,4}-\d{4}|\d{10,11})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// 名前の検証
export const validateName = (name) => {
  return name.trim().length >= 2 && name.trim().length <= 50;
};

// 日付の検証（未来の日付のみ）
export const validateDate = (date) => {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return selectedDate >= today;
};

// 時間の検証
export const validateTime = (time) => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

// 予約フォーム全体の検証
export const validateBookingForm = (formData) => {
  const errors = {};

  // 名前の検証
  if (!formData.name.trim()) {
    errors.name = 'お名前を入力してください';
  } else if (!validateName(formData.name)) {
    errors.name = 'お名前は2文字以上50文字以下で入力してください';
  }

  // メールアドレスの検証
  if (!formData.email.trim()) {
    errors.email = 'メールアドレスを入力してください';
  } else if (!validateEmail(formData.email)) {
    errors.email = '正しいメールアドレスを入力してください';
  }

  // 電話番号の検証
  if (!formData.phone.trim()) {
    errors.phone = '電話番号を入力してください';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = '正しい電話番号を入力してください（例: 03-1234-5678）';
  }

  // 日付の検証
  if (!formData.date) {
    errors.date = '希望日を選択してください';
  } else if (!validateDate(formData.date)) {
    errors.date = '未来の日付を選択してください';
  }

  // 時間の検証
  if (!formData.time) {
    errors.time = '希望時間を選択してください';
  } else if (!validateTime(formData.time)) {
    errors.time = '正しい時間を選択してください';
  }

  // サービスの検証
  if (!formData.service) {
    errors.service = 'サービスを選択してください';
  }

  // メッセージの検証（オプション）
  if (formData.message && formData.message.length > 500) {
    errors.message = 'メッセージは500文字以内で入力してください';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// リアルタイムバリデーション用の個別検証
export const validateField = (fieldName, value, formData = {}) => {
  switch (fieldName) {
    case 'name':
      if (!value.trim()) return 'お名前を入力してください';
      if (!validateName(value)) return 'お名前は2文字以上50文字以下で入力してください';
      return '';

    case 'email':
      if (!value.trim()) return 'メールアドレスを入力してください';
      if (!validateEmail(value)) return '正しいメールアドレスを入力してください';
      return '';

    case 'phone':
      if (!value.trim()) return '電話番号を入力してください';
      if (!validatePhone(value)) return '正しい電話番号を入力してください（例: 03-1234-5678）';
      return '';

    case 'date':
      if (!value) return '希望日を選択してください';
      if (!validateDate(value)) return '未来の日付を選択してください';
      return '';

    case 'time':
      if (!value) return '希望時間を選択してください';
      if (!validateTime(value)) return '正しい時間を選択してください';
      return '';

    case 'service':
      if (!value) return 'サービスを選択してください';
      return '';

    case 'message':
      if (value && value.length > 500) return 'メッセージは500文字以内で入力してください';
      return '';

    default:
      return '';
  }
};

// 日付フォーマット用ユーティリティ
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });
};

// 時間フォーマット用ユーティリティ
export const formatTime = (timeString) => {
  return timeString;
};
