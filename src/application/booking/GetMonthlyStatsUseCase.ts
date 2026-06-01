import { IBookingRepository } from '@/domain/booking/IBookingRepository';
import { Booking } from '@/domain/booking/Booking';

export interface MonthlyBookingStats {
  totalBookings: number;
  hotPepperBookings: number;
  directBookings: number;
  serviceBreakdown: Record<string, number>;
  sourceBreakdown: Record<string, number>;
  priorityBreakdown: Record<string, number>;
  customerTypeBreakdown: Record<string, number>;
  dailyStats: Record<string, number>;
  hourlyStats: Record<number, number>;
  revenueEstimate: number;
}

const SERVICE_PRICES: Record<string, number> = {
  'みみつぼ': 3500,
  '耳つぼ': 3500,
  'イヤーエステ': 5000,
  '耳エステ': 5000,
  'ドライヘッドスパ': 4800,
  'yoon²極メニュー': 11000,
  'yoon²最上級メニュー': 12500,
  'ヘッドスパ': 4800,
};

function estimatePrice(service: string | null): number {
  if (!service) return 5000;
  const match = Object.entries(SERVICE_PRICES).find(([key]) => service.includes(key));
  return match ? match[1] : 5000;
}

function increment(record: Record<string, number>, key: string): void {
  record[key] = (record[key] ?? 0) + 1;
}

export class GetMonthlyStatsUseCase {
  constructor(private readonly repo: IBookingRepository) {}

  async execute(year: number, month: number): Promise<MonthlyBookingStats> {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);
    const bookings = await this.repo.findByDateRange(start, end);

    const stats: MonthlyBookingStats = {
      totalBookings: bookings.length,
      hotPepperBookings: bookings.filter(b => b.isHotPepperBooking).length,
      directBookings: bookings.filter(b => !b.isHotPepperBooking).length,
      serviceBreakdown: {},
      sourceBreakdown: {},
      priorityBreakdown: {},
      customerTypeBreakdown: {},
      dailyStats: {},
      hourlyStats: {},
      revenueEstimate: 0,
    };

    bookings.forEach((b: Booking) => {
      increment(stats.serviceBreakdown, b.details.service ?? 'その他');
      increment(stats.sourceBreakdown, b.source.toString());
      increment(stats.priorityBreakdown, b.priority.toString());
      increment(stats.customerTypeBreakdown, b.details.customerType);

      const dateStr = b.slot.start.toISOString().split('T')[0]!;
      increment(stats.dailyStats, dateStr);

      const hour = b.slot.startHour;
      stats.hourlyStats[hour] = (stats.hourlyStats[hour] ?? 0) + 1;

      stats.revenueEstimate += estimatePrice(b.details.service);
    });

    return stats;
  }
}
