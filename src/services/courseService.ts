/**
 * @deprecated 新規コードは src/application/course/ の UseCase を直接使用すること。
 */
import { courseUseCases } from '../infrastructure/container';
import { CreateCourseInput } from '../domain/course/Course';
import { CourseCategoryValue } from '../domain/course/CourseCategory';

type ServiceResult<T> = { success: true; data: T } | { success: false; error: string };

const courseService = {
  async createCourse(courseData: CreateCourseInput): Promise<ServiceResult<unknown>> {
    try { return { success: true, data: await courseUseCases.create.execute(courseData) }; }
    catch (e) { return { success: false, error: (e as Error).message }; }
  },
  async getAllCourses(): Promise<ServiceResult<unknown[]>> {
    try { return { success: true, data: await courseUseCases.getAll.execute() }; }
    catch (e) { return { success: false, error: (e as Error).message }; }
  },
  async getCourseById(id: string): Promise<ServiceResult<unknown>> {
    try {
      const courses = await courseUseCases.getAll.execute();
      const course = courses.find(c => c.id === id);
      if (!course) throw new Error(`Course ${id} not found`);
      return { success: true, data: course };
    } catch (e) { return { success: false, error: (e as Error).message }; }
  },
  async getCoursesByCategory(category: CourseCategoryValue): Promise<ServiceResult<unknown[]>> {
    try { return { success: true, data: await courseUseCases.getAll.execute(category) }; }
    catch (e) { return { success: false, error: (e as Error).message }; }
  },
  async updateCourse(id: string, updateData: Partial<CreateCourseInput>): Promise<ServiceResult<unknown>> {
    try { return { success: true, data: await courseUseCases.update.execute(id, updateData) }; }
    catch (e) { return { success: false, error: (e as Error).message }; }
  },
  async deleteCourse(id: string): Promise<ServiceResult<void>> {
    try { await courseUseCases.delete.execute(id); return { success: true, data: undefined }; }
    catch (e) { return { success: false, error: (e as Error).message }; }
  },
};

export default courseService;
