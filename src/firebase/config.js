// Firebase設定ファイル
import { createMockFirebase } from './fallback.js';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase SDKの安全な読み込み
let app = null;
let db = null;
let auth = null;
let storage = null;
let isInitialized = false;

// Firebase設定（環境変数から取得、フォールバック値も設定）
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDemo1234567890abcdefghijklmnop",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789012:web:abcdef123456"
};

// Firebase初期化（安全な読み込み）
const initializeFirebase = () => {
  if (isInitialized) {
    return { app, db, auth, storage };
  }

  try {
    console.log('🔥 [Config Debug] Starting Firebase initialization');
    console.log('🔥 [Config Debug] Using modular Firebase SDK (v9+)');
    
    // モジュラーSDKを直接使用
    console.log('🔥 [Config Debug] Initializing Firebase app...');
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
