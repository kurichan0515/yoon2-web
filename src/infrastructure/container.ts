import { MockCourseRepository } from './mock/MockCourseRepository';
import { FirebaseCourseRepository } from './firebase/FirebaseCourseRepository';
import { GetAllCoursesUseCase } from '@/application/course/GetAllCoursesUseCase';
import { CreateCourseUseCase } from '@/application/course/CreateCourseUseCase';
import { UpdateCourseUseCase } from '@/application/course/UpdateCourseUseCase';
import { DeleteCourseUseCase } from '@/application/course/DeleteCourseUseCase';
import { GoogleCalendarBookingRepository } from './google/GoogleCalendarBookingRepository';
import { GetAvailableSlotsUseCase } from '@/application/booking/GetAvailableSlotsUseCase';
import { GetMonthlyStatsUseCase } from '@/application/booking/GetMonthlyStatsUseCase';
import { GetBookingsByDateRangeUseCase } from '@/application/booking/GetBookingsByDateRangeUseCase';

function buildCourseRepo() {
  if (typeof window === 'undefined') return new MockCourseRepository();
  try {
    const { db } = require('../firebase/config');
    if (db) return new FirebaseCourseRepository(db);
  } catch {
    // Firebase未初期化時はMockで代替
  }
  return new MockCourseRepository();
}

const courseRepo = buildCourseRepo();

export const courseUseCases = {
  getAll: new GetAllCoursesUseCase(courseRepo),
  create: new CreateCourseUseCase(courseRepo),
  update: new UpdateCourseUseCase(courseRepo),
  delete: new DeleteCourseUseCase(courseRepo),
} as const;

// Booking: Google Calendar API経由
const bookingRepo = new GoogleCalendarBookingRepository(
  process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID ?? '',
  process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? '',
);

export const bookingUseCases = {
  getByDateRange: new GetBookingsByDateRangeUseCase(bookingRepo),
  getAvailableSlots: new GetAvailableSlotsUseCase(bookingRepo),
  getMonthlyStats: new GetMonthlyStatsUseCase(bookingRepo),
} as const;
