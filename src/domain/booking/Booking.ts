import { TimeSlot } from './TimeSlot';
import { BookingSource, BookingSourceValue } from './BookingSource';
import { CustomerPriority, CustomerPriorityValue } from './CustomerPriority';

export interface BookingDetails {
  customerName: string | null;
  service: string | null;
  phone: string | null;
  email: string | null;
  notes: string | null;
  customerType: '男性' | '女性' | '不明';
}

export interface BookingProps {
  id: string;
  title: string;
  slot: TimeSlot;
  isAllDay: boolean;
  source: BookingSourceValue;
  priority: CustomerPriorityValue;
  details: BookingDetails;
  rawDescription: string;
}

export class Booking {
  readonly id: string;
  readonly title: string;
  readonly slot: TimeSlot;
  readonly isAllDay: boolean;
  readonly source: BookingSource;
  readonly priority: CustomerPriority;
  readonly details: BookingDetails;

  private constructor(props: BookingProps) {
    this.id = props.id;
    this.title = props.title;
    this.slot = props.slot;
    this.isAllDay = props.isAllDay;
    this.source = BookingSource.of(props.source);
    this.priority = CustomerPriority.of(props.priority);
    this.details = props.details;
  }

  static reconstruct(props: BookingProps): Booking {
    return new Booking(props);
  }

  get isHotPepperBooking(): boolean { return this.source.isHotPepper; }
  get startHour(): number           { return this.slot.startHour; }

  overlaps(other: Booking): boolean {
    return this.slot.overlaps(other.slot);
  }
}
