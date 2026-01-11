// Firebase SDKが利用できない場合のフォールバック機能

// モックFirebase機能
export const createMockFirebase = () => {
  const mockAuth = {
    currentUser: null,
    signInWithEmailAndPassword: () => Promise.resolve({ user: null }),
    signOut: () => Promise.resolve(),
    onAuthStateChanged: (callback) => {
      callback(null);
      return () => {};
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

// Firebase SDKの可用性をチェック（モジュラーSDK v9+対応）
export const isFirebaseAvailable = () => {
  try {
    // モジュラーSDKが利用可能かチェック
    // 動的インポートで確認（ESモジュール環境）
    if (typeof window !== 'undefined') {
      // モジュラーSDKは直接インポートできるかで判断
      // 実際のインポートはconfig.jsで行うため、ここでは常にtrueを返す
      // エラーハンドリングはconfig.jsのtry-catchで行う
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
