const mockFn = () => jest.fn();
const mockDoc = () => ({ exists: () => false, data: () => ({}) });
const mockQuery = () => ({ docs: [] });

module.exports = {
  // app
  initializeApp: jest.fn(() => ({})),
  getApps: jest.fn(() => []),
  // firestore
  getFirestore: jest.fn(() => ({ _delegate: true })),
  collection: jest.fn(() => ({})),
  addDoc: jest.fn(() => Promise.resolve({ id: 'mock-id' })),
  getDocs: jest.fn(() => Promise.resolve({ docs: [] })),
  query: jest.fn(q => q),
  orderBy: jest.fn(),
  where: jest.fn(),
  doc: jest.fn(() => ({})),
  getDoc: jest.fn(() => Promise.resolve(mockDoc())),
  setDoc: jest.fn(() => Promise.resolve()),
  deleteDoc: jest.fn(() => Promise.resolve()),
  // auth
  getAuth: jest.fn(() => ({ currentUser: null })),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: 'test-uid', email: 'test@test.com' } })),
  signOut: jest.fn(() => Promise.resolve()),
  onAuthStateChanged: jest.fn((auth, cb) => { cb(null); return () => {}; }),
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: 'test-uid' } })),
  updateProfile: jest.fn(() => Promise.resolve()),
  // storage
  getStorage: jest.fn(() => ({})),
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(() => Promise.resolve('mock-url')),
};
