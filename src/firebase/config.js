// Firebase設定ファイル
import { createMockFirebase, isFirebaseAvailable } from './fallback.js';

// Firebase SDKの安全な読み込み
let app = null;
let db = null;
let auth = null;
let storage = null;
let isInitialized = false;

// Firebase設定（開発用の安全な設定）
const firebaseConfig = {
  apiKey: "AIzaSyDemo1234567890abcdefghijklmnop",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};

// Firebase初期化（安全な読み込み）
const initializeFirebase = () => {
  if (isInitialized) {
    return { app, db, auth, storage };
  }

  try {
    console.log('🔥 [Config Debug] Starting Firebase initialization');
    
    // Firebase SDKが利用可能かチェック
    if (!isFirebaseAvailable()) {
      console.warn('🔥 [Config Debug] Firebase SDK not available, using mock services');
      const mockFirebase = createMockFirebase();
      auth = mockFirebase.auth;
      db = mockFirebase.firestore;
      storage = mockFirebase.storage;
      isInitialized = true;
      return { app, db, auth, storage };
    }

    // Firebase互換性ファイルの問題を回避するため、モジュラーSDKのみを使用
    console.log('🔥 [Config Debug] Using modular Firebase SDK only');

    console.log('🔥 [Config Debug] Firebase SDK available, initializing...');
    
    // 直接インポートでFirebase SDKを読み込み
    const { initializeApp } = require('firebase/app');
    const { getFirestore } = require('firebase/firestore');
    const { getAuth } = require('firebase/auth');
    const { getStorage } = require('firebase/storage');

    console.log('🔥 [Config Debug] Firebase modules loaded, initializing app...');
    app = initializeApp(firebaseConfig);
    console.log('🔥 [Config Debug] Firebase app initialized');
    
    db = getFirestore(app);
    console.log('🔥 [Config Debug] Firestore initialized');
    
    auth = getAuth(app);
    console.log('🔥 [Config Debug] Auth initialized');
    
    storage = getStorage(app);
    console.log('🔥 [Config Debug] Storage initialized');
    
    console.log('🔥 [Config Debug] Firebase initialized successfully');
    isInitialized = true;
    return { app, db, auth, storage };
  } catch (error) {
    console.error('🔥 [Config Debug] Firebase initialization error:', error);
    console.log('🔥 [Config Debug] Falling back to mock Firebase services');
    
    // フォールバック: モックFirebaseサービスを使用
    const mockFirebase = createMockFirebase();
    auth = mockFirebase.auth;
    db = mockFirebase.firestore;
    storage = mockFirebase.storage;
    isInitialized = true;
    
    return { app, db, auth, storage };
  }
};

// 遅延初期化のためのゲッター関数
const getFirebaseServices = () => {
  if (!isInitialized) {
    return initializeFirebase();
  }
  return { app, db, auth, storage };
};

// 初期化を実行
initializeFirebase();

export { db, auth, storage };
export default app;
