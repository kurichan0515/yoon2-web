type Unsubscribe = () => void;

interface MockAuth {
  currentUser: null;
  signInWithEmailAndPassword: () => Promise<{ user: null }>;
  signOut: () => Promise<void>;
  onAuthStateChanged: (cb: (user: null) => void) => Unsubscribe;
}

interface MockDoc {
  get: () => Promise<{ exists: boolean }>;
  set: () => Promise<void>;
  update: () => Promise<void>;
  delete: () => Promise<void>;
}

interface MockCollection {
  add: () => Promise<{ id: string }>;
  get: () => Promise<{ docs: never[] }>;
  doc: () => MockDoc;
}

interface MockFirestore { collection: () => MockCollection; }
interface MockStorage { ref: () => { put: () => Promise<{ ref: { getDownloadURL: () => Promise<string> } }>; getDownloadURL: () => Promise<string> }; }

export interface MockFirebaseServices {
  auth: MockAuth;
  firestore: MockFirestore;
  storage: MockStorage;
}

export const createMockFirebase = (): MockFirebaseServices => ({
  auth: {
    currentUser: null,
    signInWithEmailAndPassword: () => Promise.resolve({ user: null }),
    signOut: () => Promise.resolve(),
    onAuthStateChanged: (cb) => { cb(null); return () => {}; },
  },
  firestore: {
    collection: () => ({
      add: () => Promise.resolve({ id: 'mock-id' }),
      get: () => Promise.resolve({ docs: [] }),
      doc: () => ({
        get: () => Promise.resolve({ exists: false }),
        set: () => Promise.resolve(),
        update: () => Promise.resolve(),
        delete: () => Promise.resolve(),
      }),
    }),
  },
  storage: {
    ref: () => ({
      put: () => Promise.resolve({ ref: { getDownloadURL: () => Promise.resolve('mock-url') } }),
      getDownloadURL: () => Promise.resolve('mock-url'),
    }),
  },
});

export const isFirebaseAvailable = (): boolean => {
  try { return typeof window !== 'undefined'; }
  catch { return false; }
};
