import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  Firestore,
} from 'firebase/firestore';
import { Course, CourseProps } from '@/domain/course/Course';
import { ICourseRepository } from '@/domain/course/ICourseRepository';
import { CourseCategoryValue } from '@/domain/course/CourseCategory';

const COLLECTION = 'courses';

function toProps(id: string, data: Record<string, unknown>): CourseProps {
  return {
    id,
    name: data.name as string,
    description: data.description as string,
    price: data.price as number,
    duration: data.duration as string,
    image: (data.image as string) ?? '',
    category: data.category as CourseCategoryValue,
    createdAt: (data.createdAt as { toDate(): Date })?.toDate?.() ?? new Date(),
    updatedAt: (data.updatedAt as { toDate(): Date })?.toDate?.() ?? new Date(),
  };
}

export class FirebaseCourseRepository implements ICourseRepository {
  constructor(private readonly db: Firestore) {}

  async findById(id: string): Promise<Course | null> {
    const snap = await getDoc(doc(this.db, COLLECTION, id));
    if (!snap.exists()) return null;
    return Course.reconstruct(toProps(snap.id, snap.data()));
  }

  async findAll(): Promise<Course[]> {
    const snap = await getDocs(collection(this.db, COLLECTION));
    return snap.docs.map(d => Course.reconstruct(toProps(d.id, d.data())));
  }

  async findByCategory(category: CourseCategoryValue): Promise<Course[]> {
    const q = query(collection(this.db, COLLECTION), where('category', '==', category));
    const snap = await getDocs(q);
    return snap.docs.map(d => Course.reconstruct(toProps(d.id, d.data())));
  }

  async save(course: Course): Promise<Course> {
    const props = course.toProps();
    await setDoc(doc(this.db, COLLECTION, props.id), {
      name: props.name,
      description: props.description,
      price: props.price,
      duration: props.duration,
      image: props.image,
      category: props.category,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
    return course;
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(this.db, COLLECTION, id));
  }
}
