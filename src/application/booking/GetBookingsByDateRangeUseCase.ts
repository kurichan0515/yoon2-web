import { Booking } from '@/domain/booking/Booking';
import { IBookingRepository } from '@/domain/booking/IBookingRepository';

export class GetBookingsByDateRangeUseCase {
  constructor(private readonly repo: IBookingRepository) {}

  async execute(start: Date, end: Date): Promise<Booking[]> {
    return this.repo.findByDateRange(start, end);
  }
}
