import { CourseCategory, CourseCategoryValue } from './CourseCategory';

export interface CourseProps {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  category: CourseCategoryValue;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCourseInput {
  name: string;
  description: string;
  price: number;
  duration: string;
  image?: string;
  category: CourseCategoryValue;
}

export class CourseValidationError extends Error {
  constructor(public readonly errors: Record<string, string>) {
    super('Course validation failed');
    this.name = 'CourseValidationError';
  }
}

export class Course {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly duration: string;
  readonly image: string;
  readonly category: CourseCategory;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(props: CourseProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.duration = props.duration;
    this.image = props.image;
    this.category = CourseCategory.of(props.category);
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(input: CreateCourseInput, id: string): Course {
    Course.validate(input);
    const now = new Date();
    return new Course({
      id,
      name: input.name.trim(),
      description: input.description.trim(),
      price: input.price,
      duration: input.duration.trim(),
      image: input.image ?? '',
      category: input.category,
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstruct(props: CourseProps): Course {
    return new Course(props);
  }

  update(input: Partial<CreateCourseInput>): Course {
    const merged = {
      name: input.name ?? this.name,
      description: input.description ?? this.description,
      price: input.price ?? this.price,
      duration: input.duration ?? this.duration,
      image: input.image ?? this.image,
      category: input.category ?? (this.category.toString() as CourseCategoryValue),
    };
    Course.validate(merged);
    return new Course({
      ...this.toProps(),
      ...merged,
      category: merged.category,
      updatedAt: new Date(),
    });
  }

  private static validate(input: Partial<CreateCourseInput>): void {
    const errors: Record<string, string> = {};
    if (!input.name?.trim()) errors.name = 'コース名は必須です';
    if (!input.description?.trim()) errors.description = '説明は必須です';
    if (!input.price || input.price <= 0) errors.price = '価格は0より大きい値である必要があります';
    if (!input.duration?.trim()) errors.duration = '時間は必須です';
    if (!input.category) errors.category = 'カテゴリは必須です';
    if (Object.keys(errors).length > 0) throw new CourseValidationError(errors);
  }

  toProps(): CourseProps {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      duration: this.duration,
      image: this.image,
      category: this.category.toString() as CourseCategoryValue,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
