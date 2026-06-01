export class TimeSlotError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeSlotError';
  }
}

export class TimeSlot {
  private constructor(
    readonly start: Date,
    readonly end: Date,
  ) {}

  static of(start: Date, end: Date): TimeSlot {
    if (end <= start) throw new TimeSlotError('end must be after start');
    return new TimeSlot(start, end);
  }

  static fromHour(date: Date, hour: number): TimeSlot {
    const start = new Date(date);
    start.setHours(hour, 0, 0, 0);
    const end = new Date(start);
    end.setHours(hour + 1, 0, 0, 0);
    return new TimeSlot(start, end);
  }

  get durationMinutes(): number {
    return (this.end.getTime() - this.start.getTime()) / 60_000;
  }

  get startHour(): number { return this.start.getHours(); }

  overlaps(other: TimeSlot): boolean {
    return this.start < other.end && this.end > other.start;
  }

  timeLabel(): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(this.start.getHours())}:${pad(this.start.getMinutes())}`;
  }

  equals(other: TimeSlot): boolean {
    return this.start.getTime() === other.start.getTime() &&
           this.end.getTime() === other.end.getTime();
  }
}
