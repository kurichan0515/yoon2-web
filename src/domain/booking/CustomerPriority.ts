export const CUSTOMER_PRIORITY = {
  VIP: 'VIP顧客',
  NEW: '新規顧客',
  REPEAT: 'リピーター',
  NORMAL: '通常',
} as const;

export type CustomerPriorityValue = (typeof CUSTOMER_PRIORITY)[keyof typeof CUSTOMER_PRIORITY];

export class CustomerPriority {
  private constructor(private readonly value: CustomerPriorityValue) {}

  static of(value: string): CustomerPriority {
    const valid = Object.values(CUSTOMER_PRIORITY) as string[];
    if (!valid.includes(value)) return new CustomerPriority(CUSTOMER_PRIORITY.NORMAL);
    return new CustomerPriority(value as CustomerPriorityValue);
  }

  static normal() { return new CustomerPriority(CUSTOMER_PRIORITY.NORMAL); }
  static vip()    { return new CustomerPriority(CUSTOMER_PRIORITY.VIP); }
  static newCustomer() { return new CustomerPriority(CUSTOMER_PRIORITY.NEW); }
  static repeat() { return new CustomerPriority(CUSTOMER_PRIORITY.REPEAT); }

  toString(): string { return this.value; }
  equals(other: CustomerPriority): boolean { return this.value === other.value; }
}
