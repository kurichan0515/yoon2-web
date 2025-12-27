// Firebase Authentication サービス
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import logger from '../utils/logger';

class AuthService {
  constructor() {
    logger.debug('AuthService constructor called');
    this.auth = null;
    this.isInitialized = false;
    this.initializeAuth();
  }

  initializeAuth() {
    logger.debug('initializeAuth called');
    try {
      // Firebase設定を先に読み込む
      const { auth: firebaseAuth } = require('../firebase/config');
      logger.debug('Firebase config loaded', { authAvailable: !!firebaseAuth });
      
      if (firebaseAuth) {
        this.auth = firebaseAuth;
        this.isInitialized = true;
        logger.debug('Firebase Auth obtained successfully');
      } else {
        throw new Error('Firebase Auth not available from config');
      }
    } catch (error) {
      logger.error('Auth initialization error:', error);
      this.auth = null;
      this.isInitialized = false;
    }
  }

  // 管理者ログイン
  async signInAdmin(email, password) {
    if (!this.isInitialized || !this.auth) {
      throw new Error('Firebase Auth is not initialized');
    }
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      
      // 管理者権限をチェック
      const isAdmin = await this.checkAdminRole(user.uid);
      if (!isAdmin) {
        await this.signOut();
        throw new Error('管理者権限がありません');
      }
      
      return user;
    } catch (error) {
      logger.error('管理者ログインエラー:', error);
      throw error;
    }
  }

  // 管理者権限をチェック
  async checkAdminRole(uid) {
    try {
      const adminDoc = await getDoc(doc(db, 'admins', uid));
      return adminDoc.exists() && adminDoc.data().isAdmin === true;
    } catch (error) {
      logger.error('管理者権限チェックエラー:', error);
      return false;
    }
  }

  // 管理者アカウント作成（初期設定用）
  async createAdminAccount(email, password, displayName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      
      // プロフィール更新
      await updateProfile(user, {
        displayName: displayName
      });
      
      // Firestoreに管理者情報を保存
      await setDoc(doc(db, 'admins', user.uid), {
        email: email,
        displayName: displayName,
        isAdmin: true,
        createdAt: new Date(),
        lastLogin: null
      });
      
      return user;
    } catch (error) {
      logger.error('管理者アカウント作成エラー:', error);
      throw error;
    }
  }

  // ログアウト
  async signOut() {
    if (!this.isInitialized || !this.auth) {
      logger.warn('Firebase Auth is not initialized, skipping signOut');
      return;
    }
    try {
      await signOut(this.auth);
    } catch (error) {
      logger.error('ログアウトエラー:', error);
      throw error;
    }
  }

  // 認証状態の監視
  onAuthStateChange(callback) {
    if (!this.isInitialized || !this.auth) {
      logger.warn('Firebase Auth is not initialized, using mock callback');
      // モックコールバックを即座に実行
      callback(null);
      return () => {}; // 空のunsubscribe関数
    }
    return onAuthStateChanged(this.auth, callback);
  }

  // 現在のユーザーを取得
  getCurrentUser() {
    if (!this.isInitialized || !this.auth) {
      return null;
    }
    return this.auth.currentUser;
  }

  // 管理者権限の確認（同期版）
  async isAdmin() {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    return await this.checkAdminRole(user.uid);
  }

  // 管理者情報を更新
  async updateAdminInfo(uid, data) {
    try {
      await setDoc(doc(db, 'admins', uid), {
        ...data,
        updatedAt: new Date()
      }, { merge: true });
    } catch (error) {
      logger.error('管理者情報更新エラー:', error);
      throw error;
    }
  }

  // ログイン履歴を記録
  async recordLogin(uid) {
    try {
      await this.updateAdminInfo(uid, {
        lastLogin: new Date()
      });
    } catch (error) {
      logger.error('ログイン履歴記録エラー:', error);
    }
  }
}

// シングルトンインスタンス
const authService = new AuthService();
logger.debug('AuthService singleton created');

export default authService;

// 個別関数もエクスポート
export const signInAdmin = (email, password) => authService.signInAdmin(email, password);
export const signOutAdmin = () => authService.signOut();
export const onAuthStateChange = (callback) => authService.onAuthStateChange(callback);
export const checkAdminRole = (uid) => authService.checkAdminRole(uid);
export const getCurrentUser = () => authService.getCurrentUser();
export const isAdmin = () => authService.isAdmin();
export const createAdminAccount = (email, password, displayName) => authService.createAdminAccount(email, password, displayName);

