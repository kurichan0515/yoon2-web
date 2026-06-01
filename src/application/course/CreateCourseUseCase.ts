import { Course, CreateCourseInput } from '@/domain/course/Course';
import { ICourseRepository } from '@/domain/course/ICourseRepository';

export class CreateCourseUseCase {
  constructor(private readonly repo: ICourseRepository) {}

  async execute(input: CreateCourseInput): Promise<Course> {
    const id = Date.now().toString();
    const course = Course.create(input, id);
    return this.repo.save(course);
  }
}
