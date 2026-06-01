import { ICourseRepository } from '@/domain/course/ICourseRepository';

export class DeleteCourseUseCase {
  constructor(private readonly repo: ICourseRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repo.findById(id);
    if (!existing) throw new Error(`Course ${id} not found`);
    await this.repo.delete(id);
  }
}
