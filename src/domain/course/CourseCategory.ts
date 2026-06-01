export const COURSE_CATEGORY = {
  RECOMMEND: 'recommend',
  MIMITUBO: 'mimitubo',
  EAR_ESTE: 'ear-este',
  DRY_HEAD: 'dry-head',
} as const;

export type CourseCategoryValue = (typeof COURSE_CATEGORY)[keyof typeof COURSE_CATEGORY];

export const COURSE_CATEGORY_LABELS: Record<CourseCategoryValue, string> = {
  [COURSE_CATEGORY.RECOMMEND]: 'おすすめメニュー',
  [COURSE_CATEGORY.MIMITUBO]: '耳つぼ',
  [COURSE_CATEGORY.EAR_ESTE]: 'イヤーエステ',
  [COURSE_CATEGORY.DRY_HEAD]: 'ドライヘッドスパ',
};

export class CourseCategory {
  private constructor(private readonly value: CourseCategoryValue) {}

  static of(value: string): CourseCategory {
    const valid = Object.values(COURSE_CATEGORY) as string[];
    if (!valid.includes(value)) {
      throw new Error(`Invalid CourseCategory: ${value}`);
    }
    return new CourseCategory(value as CourseCategoryValue);
  }

  static recommend() { return new CourseCategory(COURSE_CATEGORY.RECOMMEND); }
  static mimitubo()  { return new CourseCategory(COURSE_CATEGORY.MIMITUBO); }
  static earEste()   { return new CourseCategory(COURSE_CATEGORY.EAR_ESTE); }
  static dryHead()   { return new CourseCategory(COURSE_CATEGORY.DRY_HEAD); }

  get label(): string { return COURSE_CATEGORY_LABELS[this.value]; }
  toString(): string  { return this.value; }
  equals(other: CourseCategory): boolean { return this.value === other.value; }
}
