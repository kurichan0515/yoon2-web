export const BOOKING_SOURCE = {
  HOT_PEPPER: 'ホットペッパービューティー',
  LINE: 'LINE直接予約',
  PHONE: '電話予約',
  WALK_IN: '来店予約',
  OTHER: 'その他',
} as const;

export type BookingSourceValue = (typeof BOOKING_SOURCE)[keyof typeof BOOKING_SOURCE];

export class BookingSource {
  private constructor(private readonly value: BookingSourceValue) {}

  static of(value: string): BookingSource {
    const valid = Object.values(BOOKING_SOURCE) as string[];
    if (!valid.includes(value)) return new BookingSource(BOOKING_SOURCE.OTHER);
    return new BookingSource(value as BookingSourceValue);
  }

  static hotPepper() { return new BookingSource(BOOKING_SOURCE.HOT_PEPPER); }
  static line()      { return new BookingSource(BOOKING_SOURCE.LINE); }
  static phone()     { return new BookingSource(BOOKING_SOURCE.PHONE); }
  static walkIn()    { return new BookingSource(BOOKING_SOURCE.WALK_IN); }
  static other()     { return new BookingSource(BOOKING_SOURCE.OTHER); }

  get isHotPepper(): boolean { return this.value === BOOKING_SOURCE.HOT_PEPPER; }
  toString(): string         { return this.value; }
  equals(other: BookingSource): boolean { return this.value === other.value; }
}
