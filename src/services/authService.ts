import {
  signInWithEmailAndPassword, signOut, onAuthStateChanged,
  createUserWithEmailAndPassword, updateProfile, Auth, User,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import logger from '../utils/logger';

class AuthService {
  private auth: Auth | null = null;
  private isInitialized = false;

  constructor() {
    logger.debug('AuthService constructor called');
    this.initializeAuth();
  }

  private initializeAuth() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { initializeFirebase, auth: firebaseAuth } = require('../firebase/config') as { initializeFirebase?: () => void; auth: Auth | null };
      if (typeof initializeFirebase === 'function') initializeFirebase();
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { auth: initializedAuth } = require('../firebase/config') as { auth: Auth | null };
      if (initializedAuth) { this.auth = initializedAuth; this.isInitialized = true; }
      else throw new Error('Firebase Auth not available from config');
    } catch (e) { logger.error('Auth initialization error:', e); }
  }

  async signInAdmin(email: string, password: string): Promise<User> {
    if (!this.isInitialized || !this.auth) throw new Error('Firebase Auth is not initialized');
    try {
      const { user } = await signInWithEmailAndPassword(this.auth, email, password);
      if (!(await this.checkAdminRole(user.uid))) {
        await this.signOut();
        throw new Error('管理者権限がありません');
      }
      return user;
    } catch (e) { logger.error('管理者ログインエラー:', e); throw e; }
  }

  async checkAdminRole(uid: string): Promise<boolean> {
    try {
      const snap = await getDoc(doc(db!, 'admins', uid));
      return snap.exists() && (snap.data() as { isAdmin?: boolean }).isAdmin === true;
    } catch (e) { logger.error('管理者権限チェックエラー:', e); return false; }
  }

  async createAdminAccount(email: string, password: string, displayName: string): Promise<User> {
    try {
      const { user } = await createUserWithEmailAndPassword(this.auth!, email, password);
      await updateProfile(user, { displayName });
      await setDoc(doc(db!, 'admins', user.uid), { email, displayName, isAdmin: true, createdAt: new Date(), lastLogin: null });
      return user;
    } catch (e) { logger.error('管理者アカウント作成エラー:', e); throw e; }
  }

  async signOut(): Promise<void> {
    if (!this.isInitialized || !this.auth) { logger.warn('Firebase Auth is not initialized, skipping signOut'); return; }
    try { await signOut(this.auth); }
    catch (e) { logger.error('ログアウトエラー:', e); throw e; }
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    if (!this.isInitialized || !this.auth) { callback(null); return () => {}; }
    return onAuthStateChanged(this.auth, callback);
  }

  getCurrentUser(): User | null {
    return this.auth?.currentUser ?? null;
  }

  async isAdmin(): Promise<boolean> {
    const user = this.getCurrentUser();
    return user ? this.checkAdminRole(user.uid) : false;
  }

  async updateAdminInfo(uid: string, data: Record<string, unknown>): Promise<void> {
    try { await setDoc(doc(db!, 'admins', uid), { ...data, updatedAt: new Date() }, { merge: true }); }
    catch (e) { logger.error('管理者情報更新エラー:', e); throw e; }
  }

  async recordLogin(uid: string): Promise<void> {
    try { await this.updateAdminInfo(uid, { lastLogin: new Date() }); }
    catch (e) { logger.error('ログイン履歴記録エラー:', e); }
  }
}

const authService = new AuthService();
export default authService;

export const signInAdmin = (email: string, password: string) => authService.signInAdmin(email, password);
export const signOutAdmin = () => authService.signOut();
export const onAuthStateChange = (callback: (user: User | null) => void) => authService.onAuthStateChange(callback);
export const checkAdminRole = (uid: string) => authService.checkAdminRole(uid);
export const getCurrentUser = () => authService.getCurrentUser();
export const isAdmin = () => authService.isAdmin();
export const createAdminAccount = (email: string, password: string, displayName: string) => authService.createAdminAccount(email, password, displayName);
