// Firebase設定ファイル
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import appConfig from '../config/appConfig';

// Firebase初期化
const app = initializeApp(appConfig.firebase);

// Firestore初期化
export const db = getFirestore(app);

// Auth初期化
export const auth = getAuth(app);

export default app;
