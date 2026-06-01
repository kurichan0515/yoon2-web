/**
 * @deprecated 新規コードは src/application/booking/ の UseCase を直接使用すること。
 */
import { bookingUseCases } from '../infrastructure/container';

const calendarService = {
  async initialize(): Promise<void> {
    // GoogleCalendarBookingRepository は使用時に自己初期化する
    // このメソッドは後方互換のために維持
  },
  async getEvents(timeMin: string | null = null, timeMax: string | null = null) {
    const start = timeMin ? new Date(timeMin) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = timeMax ? new Date(timeMax) : new Date(new Date().getFullYear(), new Date().getMonth() + 2, 0);
    const bookings = await bookingUseCases.getByDateRange.execute(start, end);
    return bookings.map(b => ({
      id: b.id, title: b.title, start: b.slot.start, end: b.slot.end,
      isAllDay: b.isAllDay, isHotPepperBooking: b.isHotPepperBooking,
      bookingDetails: {
        customerName: b.details.customerName, service: b.details.service,
        phone: b.details.phone, email: b.details.email, notes: b.details.notes,
        bookingSource: b.source.toString(), priority: b.priority.toString(),
        customerType: b.details.customerType,
      },
    }));
  },
  async getAvailableTimeSlots(date: Date | string) {
    const slots = await bookingUseCases.getAvailableSlots.execute(new Date(date), true);
    return slots.map(s => ({ time: s.slot.timeLabel(), available: s.available, booking: s.booking ? { title: s.booking.title } : undefined }));
  },
  async getPublicAvailableTimeSlots(date: Date | string) {
    const slots = await bookingUseCases.getAvailableSlots.execute(new Date(date), false);
    return slots.map(s => ({ time: s.slot.timeLabel(), available: s.available }));
  },
  async getMonthlyBookingStats(year: number, month: number) {
    return bookingUseCases.getMonthlyStats.execute(year, month);
  },
};

export default calendarService;

export const getCalendarEvents = (timeMin: string | null, timeMax: string | null) => calendarService.getEvents(timeMin, timeMax);
export const getEventsByDate = (date: Date | string) => calendarService.getEvents(
  new Date(new Date(date).setHours(0, 0, 0, 0)).toISOString(),
  new Date(new Date(date).setHours(23, 59, 59, 999)).toISOString()
);
export const getAvailableTimeSlots = (date: Date | string) => calendarService.getAvailableTimeSlots(date);
export const getPublicAvailableTimeSlots = (date: Date | string) => calendarService.getPublicAvailableTimeSlots(date);
export const getMonthlyBookingStats = (year: number, month: number) => calendarService.getMonthlyBookingStats(year, month);
