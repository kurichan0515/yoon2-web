import { Admin } from './Admin';

export interface IAdminRepository {
  findByUid(uid: string): Promise<Admin | null>;
  save(admin: Admin): Promise<void>;
}
