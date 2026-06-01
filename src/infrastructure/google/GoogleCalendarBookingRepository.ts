import { Booking } from '@/domain/booking/Booking';
import { IBookingRepository } from '@/domain/booking/IBookingRepository';
import { TimeSlot } from '@/domain/booking/TimeSlot';
import { BOOKING_SOURCE, BookingSourceValue } from '@/domain/booking/BookingSource';
import { CUSTOMER_PRIORITY, CustomerPriorityValue } from '@/domain/booking/CustomerPriority';
import type { BookingDetails, BookingProps } from '@/domain/booking/Booking';

declare const window: Window & { gapi?: typeof gapi };

const HOT_PEPPER_KEYWORDS = [
  'ホットペッパー', 'hotpepper', 'hot pepper',
  'ホットペッパービューティー', 'hp予約', 'hotpepper.com', 'beauty.hotpepper.jp',
] as const;

const SERVICE_DURATIONS: Record<string, number> = {
  'みみつぼ': 60, '耳つぼ': 60,
  'イヤーエステ': 40, '耳エステ': 40,
  'ドライヘッドスパ': 40, 'yoon²極メニュー': 100, 'yoon²最上級メニュー': 100,
  'ヘッドスパ': 40,
};

export class GoogleCalendarBookingRepository implements IBookingRepository {
  private isInitialized = false;

  constructor(
    private readonly calendarId: string,
    private readonly apiKey: string,
  ) {}

  private async ensureInitialized(): Promise<void> {
    if (this.isInitialized) return;
    await this.loadGapiIfNeeded();
    await new Promise<void>((resolve, reject) => {
      window.gapi!.load('client', async () => {
        try {
          await window.gapi!.client.init({
            apiKey: this.apiKey,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          });
          this.isInitialized = true;
          resolve();
        } catch (e) { reject(e); }
      });
    });
  }

  private loadGapiIfNeeded(): Promise<void> {
    if (window.gapi) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google API script'));
      document.head.appendChild(script);
    });
  }

  async findByDate(date: Date): Promise<Booking[]> {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return this.findByDateRange(start, end);
  }

  async findByDateRange(start: Date, end: Date): Promise<Booking[]> {
    await this.ensureInitialized();
    const response = await window.gapi!.client.calendar.events.list({
      calendarId: this.calendarId,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 100,
      orderBy: 'startTime',
    });
    return (response.result.items ?? []).map(this.toBooking.bind(this));
  }

  private toBooking(event: gapi.client.calendar.Event): Booking {
    const startStr = event.start?.dateTime ?? event.start?.date ?? '';
    const endStr = event.end?.dateTime ?? event.end?.date ?? startStr;
    const isAllDay = !event.start?.dateTime;
    const startDate = new Date(startStr);
    const endDate = new Date(endStr);

    const slot = isAllDay
      ? TimeSlot.of(startDate, endDate)
      : TimeSlot.of(startDate, endDate);

    const props: BookingProps = {
      id: event.id ?? '',
      title: event.summary ?? '予約',
      slot,
      isAllDay,
      source: this.detectSource(event),
      priority: this.detectPriority(event),
      details: this.extractDetails(event),
      rawDescription: event.description ?? '',
    };
    return Booking.reconstruct(props);
  }

  private detectSource(event: gapi.client.calendar.Event): BookingSourceValue {
    const summary = (event.summary ?? '').toLowerCase();
    const description = (event.description ?? '').toLowerCase();
    const creatorEmail = (event.creator?.email ?? '').toLowerCase();

    if (
      HOT_PEPPER_KEYWORDS.some(k => summary.includes(k) || description.includes(k)) ||
      creatorEmail.includes('hotpepper')
    ) return BOOKING_SOURCE.HOT_PEPPER;

    if (summary.includes('line') || description.includes('line')) return BOOKING_SOURCE.LINE;
    if (summary.includes('電話') || description.includes('電話')) return BOOKING_SOURCE.PHONE;
    if (summary.includes('来店') || description.includes('来店')) return BOOKING_SOURCE.WALK_IN;
    return BOOKING_SOURCE.OTHER;
  }

  private detectPriority(event: gapi.client.calendar.Event): CustomerPriorityValue {
    const text = `${event.summary ?? ''} ${event.description ?? ''}`.toLowerCase();
    if (text.includes('vip') || text.includes('重要')) return CUSTOMER_PRIORITY.VIP;
    if (text.includes('新規') || text.includes('初回')) return CUSTOMER_PRIORITY.NEW;
    if (text.includes('リピ') || text.includes('常連')) return CUSTOMER_PRIORITY.REPEAT;
    return CUSTOMER_PRIORITY.NORMAL;
  }

  private extractDetails(event: gapi.client.calendar.Event): BookingDetails {
    const summary = event.summary ?? '';
    const description = event.description ?? '';

    return {
      customerName: this.extractPattern(description, [
        /お名前[：:]\s*([^\n\r]+)/, /氏名[：:]\s*([^\n\r]+)/,
        /名前[：:]\s*([^\n\r]+)/, /^([^さん]+)さん/,
      ]),
      service: this.extractService(summary, description),
      phone: this.extractPattern(description, [/(?:電話|TEL|Phone)[：:]?\s*([\d-]+)/i]),
      email: this.extractPattern(description, [/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/]),
      notes: this.extractPattern(description, [
        /備考[：:]\s*([^\n\r]+)/, /メモ[：:]\s*([^\n\r]+)/,
      ]),
      customerType: this.extractCustomerType(summary, description),
    };
  }

  private extractPattern(text: string, patterns: RegExp[]): string | null {
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) return match[1]?.trim() ?? null;
    }
    return null;
  }

  private extractService(summary: string, description: string): string | null {
    const service = this.extractPattern(description, [
      /メニュー[：:]\s*([^\n\r]+)/,
      /サービス[：:]\s*([^\n\r]+)/,
      /コース[：:]\s*([^\n\r]+)/,
    ]);
    if (service) return service;

    const text = `${summary} ${description}`;
    const knownServices = Object.keys(SERVICE_DURATIONS);
    const found = knownServices.find(s => text.includes(s));
    return found ?? null;
  }

  private extractCustomerType(summary: string, description: string): '男性' | '女性' | '不明' {
    const text = `${summary} ${description}`;
    if (text.includes('男性')) return '男性';
    if (text.includes('女性')) return '女性';
    return '不明';
  }
}
