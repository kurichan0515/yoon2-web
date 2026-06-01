import { Course, CreateCourseInput } from './Course';
import { CourseCategoryValue } from './CourseCategory';

export interface ICourseRepository {
  findById(id: string): Promise<Course | null>;
  findAll(): Promise<Course[]>;
  findByCategory(category: CourseCategoryValue): Promise<Course[]>;
  save(course: Course): Promise<Course>;
  delete(id: string): Promise<void>;
}
