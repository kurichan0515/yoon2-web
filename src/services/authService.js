// 認証関連のFirebaseサービス
import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

// 管理者ログイン
export const signInAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // 管理者権限をチェック
    const isAdmin = await checkAdminRole(user.uid);
    if (!isAdmin) {
      await signOut(auth);
      throw new Error('管理者権限がありません');
    }
    
    return user;
  } catch (error) {
    console.error('ログインエラー:', error);
    throw error;
  }
};

// 管理者権限のチェック
export const checkAdminRole = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.role === 'admin';
    }
    return false;
  } catch (error) {
    console.error('権限チェックエラー:', error);
    return false;
  }
};

// 管理者ユーザーの作成
export const createAdminUser = async (email, password, adminData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // ユーザードキュメントを作成
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: 'admin',
      createdAt: new Date(),
      ...adminData
    });
    
    return user;
  } catch (error) {
    console.error('管理者ユーザー作成エラー:', error);
    throw error;
  }
};

// ログアウト
export const signOutAdmin = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('ログアウトエラー:', error);
    throw error;
  }
};

// 認証状態の監視
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// 現在のユーザーを取得
export const getCurrentUser = () => {
  return auth.currentUser;
};

// 認証状態をチェック
export const isAuthenticated = () => {
  return !!auth.currentUser;
};
