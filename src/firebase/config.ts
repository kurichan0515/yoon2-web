'use client';

import { createMockFirebase } from './fallback';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;
let isInitialized = false;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? 'AIzaSyDemo1234567890abcdefghijklmnop',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? 'demo-project.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? 'demo-project.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '123456789012',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '1:123456789012:web:abcdef123456',
};

export const initializeFirebase = () => {
  if (isInitialized) return { app, db, auth, storage };
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
    isInitialized = true;
    return { app, db, auth, storage };
  } catch (error) {
    console.error('🔥 Firebase initialization error:', error);
    const mock = createMockFirebase();
    auth = mock.auth as unknown as Auth;
    db = mock.firestore as unknown as Firestore;
    storage = mock.storage as unknown as FirebaseStorage;
    isInitialized = true;
    return { app, db, auth, storage };
  }
};

export { db, auth, storage };
export default app;
