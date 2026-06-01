import { Booking } from './Booking';
import { TimeSlot } from './TimeSlot';

export interface AvailableSlot {
  slot: TimeSlot;
  available: boolean;
  booking?: Booking;
}

export interface IBookingRepository {
  findByDateRange(start: Date, end: Date): Promise<Booking[]>;
  findByDate(date: Date): Promise<Booking[]>;
}
