# 開発ガイド

yoon² イヤーエステサロン ホームページの開発に関する詳細ガイドです。

## 目次

- [開発環境の準備](#開発環境の準備)
- [コーディング規約](#コーディング規約)
- [コンポーネント設計](#コンポーネント設計)
- [状態管理](#状態管理)
- [API設計](#api設計)
- [テスト戦略](#テスト戦略)
- [デバッグ手法](#デバッグ手法)
- [パフォーマンス最適化](#パフォーマンス最適化)

## 開発環境の準備

### 推奨開発環境

#### Visual Studio Code 拡張機能

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "firebase.vscode-firebase-explorer"
  ]
}
```

#### 設定ファイル

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.autoFixOnSave": true,
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "files.associations": {
    "*.js": "javascriptreact"
  }
}
```

### 開発ワークフロー

#### 1. ブランチ戦略

```bash
# 機能開発
git checkout -b feature/booking-form
git checkout -b feature/admin-dashboard

# バグ修正
git checkout -b bugfix/calendar-display

# ホットフィックス
git checkout -b hotfix/urgent-fix
```

#### 2. コミット規約

```bash
# 機能追加
git commit -m "feat: add booking form validation"

# バグ修正
git commit -m "fix: resolve calendar date display issue"

# ドキュメント更新
git commit -m "docs: update setup guide"

# リファクタリング
git commit -m "refactor: improve component structure"
```

## コーディング規約

### JavaScript/React規約

#### 1. コンポーネント設計

```javascript
// ✅ 良い例
import React, { useState, useEffect } from 'react';
// PropTypesは現在使用していません（将来実装予定）
import './Component.css';

const Component = ({ title, onAction }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // 副作用の処理
  }, []);

  const handleClick = () => {
    onAction(state);
  };

  return (
    <div className="component">
      <h2>{title}</h2>
      <button onClick={handleClick}>Action</button>
    </div>
  );
};

// PropTypesは現在使用していません（将来実装予定）
// Component.propTypes = {
//   title: PropTypes.string.isRequired,
//   onAction: PropTypes.func.isRequired,
// };

export default Component;
```

#### 2. 命名規約

```javascript
// コンポーネント: PascalCase
const BookingForm = () => {};

// 関数: camelCase
const handleSubmit = () => {};

// 定数: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';

// ファイル名: kebab-case
// booking-form.js
// admin-dashboard.js
```

#### 3. インポート順序

```javascript
// 1. React関連
import React, { useState, useEffect } from 'react';

// 2. 外部ライブラリ
import moment from 'moment';
import { initializeApp } from 'firebase/app';

// 3. 内部モジュール（絶対パス）
import Header from '../components/Header';
import { authService } from '../services/authService';

// 4. 相対パス
import './Component.css';
```

### CSS規約

#### 1. BEM記法の使用

```css
/* Block */
.booking-form {}

/* Element */
.booking-form__title {}
.booking-form__input {}

/* Modifier */
.booking-form--large {}
.booking-form__input--error {}
```

#### 2. レスポンシブデザイン

```css
/* Mobile First */
.container {
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

## コンポーネント設計

### コンポーネント階層

```
App
├── Header
│   ├── Navigation
│   └── UserMenu
├── Main
│   ├── Home
│   │   ├── Hero
│   │   ├── About
│   │   ├── Menu
│   │   └── SocialFeed
│   ├── ShopInfo
│   │   ├── ShopOverview
│   │   ├── Access
│   │   └── Services
│   ├── Booking
│   │   └── BookingForm
│   └── AdminDashboard
│       ├── BookingList
│       └── BookingDetail
└── Footer
    ├── Contact
    └── SocialLinks
```

### コンポーネントの責任分離

#### 1. プレゼンテーションコンポーネント

```javascript
// components/Button.js
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick,
  disabled = false 
}) => {
  return (
    <button 
      className={`btn btn--${variant} btn--${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

#### 2. コンテナコンポーネント

```javascript
// pages/Booking.js
const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getAllBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <BookingForm onSubmit={handleSubmit} />
      <BookingList bookings={bookings} loading={loading} />
    </div>
  );
};
```

### カスタムフック

```javascript
// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { onAuthStateChange } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
};
```

## 状態管理

### ローカル状態管理

```javascript
// useState の使用例
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: ''
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};
```

### グローバル状態管理（将来実装）

```javascript
// Context API の使用例
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  const value = {
    user,
    setUser,
    bookings,
    setBookings
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
```

## API設計

### Firebase Services

#### 1. 認証サービス

```javascript
// services/authService.js
export const authService = {
  // 管理者ログイン
  signInAdmin: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const isAdmin = await checkAdminRole(userCredential.user.uid);
      
      if (!isAdmin) {
        throw new Error('管理者権限がありません');
      }
      
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  // ログアウト
  signOut: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  }
};
```

#### 2. 予約サービス

```javascript
// services/bookingService.js
export const bookingService = {
  // 予約追加
  addBooking: async (bookingData) => {
    try {
      const docRef = await addDoc(collection(db, 'bookings'), {
        ...bookingData,
        createdAt: serverTimestamp(),
        status: 'pending'
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  // 予約取得
  getBookings: async (filters = {}) => {
    try {
      let q = query(collection(db, 'bookings'));
      
      if (filters.date) {
        q = query(q, where('date', '==', filters.date));
      }
      
      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw error;
    }
  }
};
```

### エラーハンドリング

```javascript
// utils/errorHandler.js
export const handleApiError = (error, context = '') => {
  console.error(`Error in ${context}:`, error);
  
  if (error.code === 'auth/user-not-found') {
    return 'ユーザーが見つかりません';
  }
  
  if (error.code === 'auth/wrong-password') {
    return 'パスワードが間違っています';
  }
  
  if (error.code === 'permission-denied') {
    return 'アクセス権限がありません';
  }
  
  return 'エラーが発生しました。しばらくしてから再試行してください。';
};
```

## テスト戦略

### ユニットテスト

```javascript
// __tests__/components/Button.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

describe('Button Component', () => {
  test('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 統合テスト

```javascript
// __tests__/pages/Booking.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Booking from '../pages/Booking';
import { bookingService } from '../services/bookingService';

// モック
jest.mock('../services/bookingService');

describe('Booking Page', () => {
  beforeEach(() => {
    bookingService.addBooking.mockResolvedValue('booking-id');
  });

  test('submits booking form successfully', async () => {
    render(<Booking />);
    
    // フォーム入力
    fireEvent.change(screen.getByLabelText('お名前'), {
      target: { value: 'テスト太郎' }
    });
    
    fireEvent.change(screen.getByLabelText('メールアドレス'), {
      target: { value: 'test@example.com' }
    });
    
    // 送信
    fireEvent.click(screen.getByRole('button', { name: '予約する' }));
    
    await waitFor(() => {
      expect(bookingService.addBooking).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'テスト太郎',
          email: 'test@example.com'
        })
      );
    });
  });
});
```

### E2Eテスト（将来実装）

```javascript
// cypress/integration/booking.spec.js
describe('Booking Flow', () => {
  it('should complete booking process', () => {
    cy.visit('/booking');
    
    // フォーム入力
    cy.get('[data-testid="name-input"]').type('テスト太郎');
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="phone-input"]').type('080-1234-5678');
    
    // 日付選択
    cy.get('[data-testid="date-input"]').click();
    cy.get('[data-testid="calendar"]').contains('15').click();
    
    // 時間選択
    cy.get('[data-testid="time-select"]').select('14:00');
    
    // 送信
    cy.get('[data-testid="submit-button"]').click();
    
    // 確認画面の表示
    cy.url().should('include', '/booking-confirmation');
    cy.contains('予約が完了しました');
  });
});
```

## デバッグ手法

### 開発者ツールの活用

#### 1. React Developer Tools

```javascript
// コンポーネントの状態確認
const Component = () => {
  const [state, setState] = useState({});
  
  // デバッグ用ログ
  useEffect(() => {
    console.log('Component state:', state);
  }, [state]);
  
  return <div>...</div>;
};
```

#### 2. Firebase Emulator の活用

```bash
# エミュレータでのデバッグ
firebase emulators:start --debug

# Firestore データの確認
# http://localhost:4000 で Emulator UI にアクセス
```

### ログ戦略

```javascript
// utils/logger.js
export const logger = {
  info: (message, data = {}) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${message}`, data);
    }
  },
  
  error: (message, error = {}) => {
    console.error(`[ERROR] ${message}`, error);
    
    // 本番環境では外部サービスに送信
    if (process.env.NODE_ENV === 'production') {
      // Sentry などに送信
    }
  },
  
  warn: (message, data = {}) => {
    console.warn(`[WARN] ${message}`, data);
  }
};
```

## パフォーマンス最適化

### コンポーネント最適化

#### 1. React.memo の使用

```javascript
const ExpensiveComponent = React.memo(({ data }) => {
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});
```

#### 2. useMemo と useCallback

```javascript
const Component = ({ items, onItemClick }) => {
  // 重い計算をメモ化
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);
  
  // 関数をメモ化
  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);
  
  return (
    <div>
      <div>Total: {expensiveValue}</div>
      {items.map(item => (
        <button key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </button>
      ))}
    </div>
  );
};
```

### 画像最適化

```javascript
// 遅延読み込み
const LazyImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className="image-container">
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
          {...props}
        />
      )}
    </div>
  );
};
```

### バンドル最適化

```javascript
// 動的インポート（将来実装予定）
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// 現在の実装：独自のstate管理によるページ切り替え
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  
  const renderPage = () => {
    switch (currentPage) {
      case 'shop': return <ShopInfo />;
      case 'booking': return <Booking />;
      case 'admin-dashboard': return <AdminDashboard />;
      default: return <Home />;
    }
  };
  
  return (
    <div className="App">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
};
```

## 次のステップ

- [アーキテクチャドキュメント](../architecture/ARCHITECTURE.md)
- [画面フロー設計](../architecture/SCREEN_FLOW.md)
- [デプロイメントガイド](../deployment/DEPLOYMENT.md)
