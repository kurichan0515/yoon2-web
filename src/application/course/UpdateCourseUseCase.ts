import { Course, CreateCourseInput } from '@/domain/course/Course';
import { ICourseRepository } from '@/domain/course/ICourseRepository';

export class UpdateCourseUseCase {
  constructor(private readonly repo: ICourseRepository) {}

  async execute(id: string, input: Partial<CreateCourseInput>): Promise<Course> {
    const existing = await this.repo.findById(id);
    if (!existing) throw new Error(`Course ${id} not found`);
    const updated = existing.update(input);
    return this.repo.save(updated);
  }
}
