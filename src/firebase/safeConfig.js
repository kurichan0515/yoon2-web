image.png// 安全なFirebase設定ファイル
// このファイルはFirebase SDKエラーを完全に回避します

console.log('🔥 [Firebase Debug] safeConfig.js loaded');

// モックFirebaseサービス
const createMockFirebaseServices = () => {
  console.log('🔥 [Firebase Debug] Creating mock Firebase services');
  const mockAuth = {
    currentUser: null,
    signInWithEmailAndPassword: () => Promise.resolve({ user: null }),
    signOut: () => Promise.resolve(),
    onAuthStateChanged: (callback) => {
      // 即座にnullユーザーでコールバックを実行
      setTimeout(() => callback(null), 0);
      return () => {}; // 空のunsubscribe関数
    }
  };

  const mockFirestore = {
    collection: () => ({
      add: () => Promise.resolve({ id: 'mock-id' }),
      get: () => Promise.resolve({ docs: [] }),
      doc: () => ({
        get: () => Promise.resolve({ exists: false }),
        set: () => Promise.resolve(),
        update: () => Promise.resolve(),
        delete: () => Promise.resolve()
      })
    })
  };

  const mockStorage = {
    ref: () => ({
      put: () => Promise.resolve({ ref: { getDownloadURL: () => Promise.resolve('mock-url') } }),
      getDownloadURL: () => Promise.resolve('mock-url')
    })
  };

  return {
    auth: mockAuth,
    firestore: mockFirestore,
    storage: mockStorage
  };
};

// 安全なFirebase設定の初期化
let firebaseServices = null;

const initializeSafeFirebase = () => {
  console.log('🔥 [Firebase Debug] initializeSafeFirebase called');
  
  if (firebaseServices) {
    console.log('🔥 [Firebase Debug] Firebase services already initialized');
    return firebaseServices;
  }

  try {
    console.log('🔥 [Firebase Debug] Checking Firebase SDK availability');
    console.log('🔥 [Firebase Debug] window object:', typeof window);
    console.log('🔥 [Firebase Debug] window.firebase:', typeof window !== 'undefined' ? window.firebase : 'undefined');
    
    // Firebase SDKが利用可能かチェック
    if (typeof window !== 'undefined' && window.firebase) {
      console.log('🔥 [Firebase Debug] Firebase SDK is available, initializing...');
      // 実際のFirebase SDKを使用
      const { initializeApp } = require('firebase/app');
      const { getFirestore } = require('firebase/firestore');
      const { getAuth } = require('firebase/auth');
      const { getStorage } = require('firebase/storage');

      const firebaseConfig = {
        apiKey: "AIzaSyDemo1234567890abcdefghijklmnop",
        authDomain: "demo-project.firebaseapp.com",
        projectId: "demo-project",
        storageBucket: "demo-project.appspot.com",
        messagingSenderId: "123456789012",
        appId: "1:123456789012:web:abcdef123456"
      };

      const app = initializeApp(firebaseConfig);
      firebaseServices = {
        app,
        auth: getAuth(app),
        db: getFirestore(app),
        storage: getStorage(app)
      };
      
      console.log('🔥 [Firebase Debug] Firebase initialized successfully');
    } else {
      console.log('🔥 [Firebase Debug] Firebase SDK not available in window object');
      throw new Error('Firebase SDK not available');
    }
  } catch (error) {
    console.warn('🔥 [Firebase Debug] Firebase SDK not available, using mock services:', error.message);
    console.log('🔥 [Firebase Debug] Error details:', error);
    firebaseServices = createMockFirebaseServices();
  }

  return firebaseServices;
};

// 初期化を実行
console.log('🔥 [Firebase Debug] Starting Firebase initialization');
firebaseServices = initializeSafeFirebase();
console.log('🔥 [Firebase Debug] Firebase initialization completed');

// 安全なエクスポート
export const auth = firebaseServices.auth;
export const db = firebaseServices.db || firebaseServices.firestore;
export const storage = firebaseServices.storage;
export default firebaseServices.app;
