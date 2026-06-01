import { IBookingRepository, AvailableSlot } from '@/domain/booking/IBookingRepository';
import { TimeSlot } from '@/domain/booking/TimeSlot';

const BUSINESS_HOURS = { start: 10, end: 20 } as const;

export class GetAvailableSlotsUseCase {
  constructor(private readonly repo: IBookingRepository) {}

  async execute(date: Date, includeBookingDetails = false): Promise<AvailableSlot[]> {
    const bookings = await this.repo.findByDate(date);

    return Array.from(
      { length: BUSINESS_HOURS.end - BUSINESS_HOURS.start },
      (_, i) => {
        const hour = BUSINESS_HOURS.start + i;
        const slot = TimeSlot.fromHour(date, hour);
        const booking = bookings.find(b => !b.isAllDay && b.startHour === hour);

        const result: AvailableSlot = { slot, available: !booking };
        if (booking && includeBookingDetails) result.booking = booking;
        return result;
      }
    );
  }
}
