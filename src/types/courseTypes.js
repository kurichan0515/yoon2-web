// Course data types and interfaces

export const COURSE_CATEGORIES = {
  RECOMMEND: 'recommend',
  MIMITUBO: 'mimitubo',
  EAR_ESTE: 'ear-este',
  DRY_HEAD: 'dry-head'
};

export const COURSE_CATEGORY_LABELS = {
  [COURSE_CATEGORIES.RECOMMEND]: 'おすすめメニュー',
  [COURSE_CATEGORIES.MIMITUBO]: '耳つぼ',
  [COURSE_CATEGORIES.EAR_ESTE]: 'イヤーエステ',
  [COURSE_CATEGORIES.DRY_HEAD]: 'ドライヘッドスパ'
};

// Course data structure
export const createCourseData = (data) => ({
  id: data.id || '',
  name: data.name || '',
  description: data.description || '',
  price: data.price || 0,
  duration: data.duration || '',
  image: data.image || '',
  category: data.category || COURSE_CATEGORIES.RECOMMEND,
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString()
});

// Course form validation
export const validateCourseForm = (formData) => {
  const errors = {};
  
  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'コース名は必須です';
  }
  
  if (!formData.description || formData.description.trim() === '') {
    errors.description = '説明は必須です';
  }
  
  if (!formData.price || formData.price <= 0) {
    errors.price = '価格は0より大きい値である必要があります';
  }
  
  if (!formData.duration || formData.duration.trim() === '') {
    errors.duration = '時間は必須です';
  }
  
  if (!formData.category) {
    errors.category = 'カテゴリは必須です';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Course service interface
export const COURSE_SERVICE_METHODS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list'
};

