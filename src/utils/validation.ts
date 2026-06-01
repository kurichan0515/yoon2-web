export const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePhone = (phone: string): boolean =>
  /^(\d{2,4}-\d{2,4}-\d{4}|\d{10,11})$/.test(phone.replace(/\s/g, ''));

export const validateName = (name: string): boolean => {
  const l = name.trim().length;
  return l >= 2 && l <= 50;
};

export const validateDate = (date: string): boolean => {
  const d = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d >= today;
};

export const validateTime = (time: string): boolean =>
  /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  message?: string;
}

export const validateBookingForm = (formData: BookingFormData): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  if (!formData.name.trim()) errors.name = 'お名前を入力してください';
  else if (!validateName(formData.name)) errors.name = 'お名前は2文字以上50文字以下で入力してください';
  if (!formData.email.trim()) errors.email = 'メールアドレスを入力してください';
  else if (!validateEmail(formData.email)) errors.email = '正しいメールアドレスを入力してください';
  if (!formData.phone.trim()) errors.phone = '電話番号を入力してください';
  else if (!validatePhone(formData.phone)) errors.phone = '正しい電話番号を入力してください（例: 03-1234-5678）';
  if (!formData.date) errors.date = '希望日を選択してください';
  else if (!validateDate(formData.date)) errors.date = '未来の日付を選択してください';
  if (!formData.time) errors.time = '希望時間を選択してください';
  else if (!validateTime(formData.time)) errors.time = '正しい時間を選択してください';
  if (!formData.service) errors.service = 'サービスを選択してください';
  if (formData.message && formData.message.length > 500) errors.message = 'メッセージは500文字以内で入力してください';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateField = (fieldName: string, value: string): string => {
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
    case 'service': return value ? '' : 'サービスを選択してください';
    case 'message': return value && value.length > 500 ? 'メッセージは500文字以内で入力してください' : '';
    default: return '';
  }
};

export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

export const formatTime = (timeString: string): string => timeString;
