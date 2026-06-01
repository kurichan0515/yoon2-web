import { Course } from '@/domain/course/Course';
import { ICourseRepository } from '@/domain/course/ICourseRepository';
import { CourseCategoryValue, COURSE_CATEGORY } from '@/domain/course/CourseCategory';

const INITIAL_COURSES: Parameters<typeof Course.reconstruct>[0][] = [
  {
    id: '1',
    name: 'yoon²極メニュー',
    description: 'イヤーエステと耳つぼの組み合わせで、最高のリラクゼーションを提供します。',
    price: 8000,
    duration: '90分',
    image: '/images/menus/recommend-menu.jpg',
    category: COURSE_CATEGORY.RECOMMEND,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: '最上級メニュー',
    description: 'ドライヘッドスパとイヤーエステの組み合わせで、頭部全体の疲れを解消します。',
    price: 10000,
    duration: '120分',
    image: '/images/menus/recommend-menu.jpg',
    category: COURSE_CATEGORY.RECOMMEND,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: '耳つぼ（付け放題）',
    description: '耳つぼの基本施術で、体のバランスを整えます。',
    price: 3000,
    duration: '60分',
    image: '/images/menus/mimitubo-menu.jpg',
    category: COURSE_CATEGORY.MIMITUBO,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'イヤーエステ',
    description: '耳の専門的なケアで、深いリラクゼーションを提供します。',
    price: 5000,
    duration: '60分',
    image: '/images/menus/ear-este-menu.jpg',
    category: COURSE_CATEGORY.EAR_ESTE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'ドライヘッドスパ',
    description: '頭部のマッサージで、頭の疲れを解消します。',
    price: 4000,
    duration: '45分',
    image: '/images/menus/ear-este-menu.jpg',
    category: COURSE_CATEGORY.DRY_HEAD,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class MockCourseRepository implements ICourseRepository {
  private courses: Course[] = INITIAL_COURSES.map(Course.reconstruct);

  async findById(id: string): Promise<Course | null> {
    return this.courses.find(c => c.id === id) ?? null;
  }

  async findAll(): Promise<Course[]> {
    return [...this.courses];
  }

  async findByCategory(category: CourseCategoryValue): Promise<Course[]> {
    return this.courses.filter(c => c.category.toString() === category);
  }

  async save(course: Course): Promise<Course> {
    const idx = this.courses.findIndex(c => c.id === course.id);
    if (idx >= 0) {
      this.courses[idx] = course;
    } else {
      this.courses.push(course);
    }
    return course;
  }

  async delete(id: string): Promise<void> {
    this.courses = this.courses.filter(c => c.id !== id);
  }
}
