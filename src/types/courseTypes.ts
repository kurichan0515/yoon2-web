/**
 * @deprecated 新規コードは src/domain/course/ を直接使用すること。
 */
import { COURSE_CATEGORY, COURSE_CATEGORY_LABELS } from '../domain/course/CourseCategory';
import { Course, CreateCourseInput } from '../domain/course/Course';

export const COURSE_CATEGORIES = COURSE_CATEGORY;
export { COURSE_CATEGORY_LABELS };

export const createCourseData = (data: Partial<CreateCourseInput> & { id?: string; createdAt?: string; updatedAt?: string }) => ({
  id: data.id ?? '',
  name: data.name ?? '',
  description: data.description ?? '',
  price: data.price ?? 0,
  duration: data.duration ?? '',
  image: (data as { image?: string }).image ?? '',
  category: data.category ?? COURSE_CATEGORY.RECOMMEND,
  createdAt: (data as { createdAt?: string }).createdAt ?? new Date().toISOString(),
  updatedAt: (data as { updatedAt?: string }).updatedAt ?? new Date().toISOString(),
});

export const validateCourseForm = (formData: Partial<CreateCourseInput>): { isValid: boolean; errors: Record<string, string> } => {
  try {
    Course.create(formData as CreateCourseInput, '__validate__');
    return { isValid: true, errors: {} };
  } catch (e) {
    if ((e as { name?: string }).name === 'CourseValidationError') {
      return { isValid: false, errors: (e as { errors: Record<string, string> }).errors };
    }
    throw e;
  }
};
