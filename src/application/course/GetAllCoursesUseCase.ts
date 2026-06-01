import { Course } from '@/domain/course/Course';
import { ICourseRepository } from '@/domain/course/ICourseRepository';
import { CourseCategoryValue } from '@/domain/course/CourseCategory';

export class GetAllCoursesUseCase {
  constructor(private readonly repo: ICourseRepository) {}

  async execute(category?: CourseCategoryValue): Promise<Course[]> {
    if (category) return this.repo.findByCategory(category);
    return this.repo.findAll();
  }
}
