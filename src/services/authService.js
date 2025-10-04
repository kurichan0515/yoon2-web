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

class AuthService {
  constructor() {
    this.auth = getAuth();
    this.isInitialized = false;
  }

  // 管理者ログイン
  async signInAdmin(email, password) {
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
      console.error('管理者ログインエラー:', error);
      throw error;
    }
  }

  // 管理者権限をチェック
  async checkAdminRole(uid) {
    try {
      const adminDoc = await getDoc(doc(db, 'admins', uid));
      return adminDoc.exists() && adminDoc.data().isAdmin === true;
    } catch (error) {
      console.error('管理者権限チェックエラー:', error);
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
      console.error('管理者アカウント作成エラー:', error);
      throw error;
    }
  }

  // ログアウト
  async signOut() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('ログアウトエラー:', error);
      throw error;
    }
  }

  // 認証状態の監視
  onAuthStateChange(callback) {
    return onAuthStateChanged(this.auth, callback);
  }

  // 現在のユーザーを取得
  getCurrentUser() {
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
      console.error('管理者情報更新エラー:', error);
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
      console.error('ログイン履歴記録エラー:', error);
    }
  }
}

// シングルトンインスタンス
const authService = new AuthService();

export default authService;

// 個別関数もエクスポート
export const signInAdmin = (email, password) => authService.signInAdmin(email, password);
export const signOutAdmin = () => authService.signOut();
export const onAuthStateChange = (callback) => authService.onAuthStateChange(callback);
export const checkAdminRole = (uid) => authService.checkAdminRole(uid);
export const getCurrentUser = () => authService.getCurrentUser();
export const isAdmin = () => authService.isAdmin();
export const createAdminAccount = (email, password, displayName) => authService.createAdminAccount(email, password, displayName);
