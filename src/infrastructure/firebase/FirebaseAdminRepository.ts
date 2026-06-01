import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Admin, AdminProps } from '@/domain/auth/Admin';
import { IAdminRepository } from '@/domain/auth/IAdminRepository';
import type { Firestore } from 'firebase/firestore';

export class FirebaseAdminRepository implements IAdminRepository {
  constructor(private readonly db: Firestore) {}

  async findByUid(uid: string): Promise<Admin | null> {
    const snap = await getDoc(doc(this.db, 'admins', uid));
    if (!snap.exists()) return null;
    const data = snap.data();
    return Admin.reconstruct({
      uid,
      email: data.email ?? '',
      displayName: data.displayName ?? '',
      isAdmin: data.isAdmin === true,
      createdAt: data.createdAt?.toDate() ?? new Date(),
      lastLogin: data.lastLogin?.toDate() ?? null,
    } satisfies AdminProps);
  }

  async save(admin: Admin): Promise<void> {
    const props = admin.toProps();
    await setDoc(
      doc(this.db, 'admins', props.uid),
      {
        email: props.email,
        displayName: props.displayName,
        isAdmin: props.isAdmin,
        createdAt: props.createdAt,
        lastLogin: props.lastLogin,
        updatedAt: new Date(),
      },
      { merge: true }
    );
  }
}
