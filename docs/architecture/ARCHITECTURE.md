# yoon² イヤーエステサロン ホームページ - アーキテクチャドキュメント

## 概要

このドキュメントは、イヤーエステサロン「yoon² ユンユン」のホームページのアーキテクチャについて詳細に説明します。

## 技術スタック

### フロントエンド
- **React** (v19.1.1) - UIライブラリ
- **React DOM** (v19.1.1) - DOM操作
- **React Router DOM** (v7.9.1) - ルーティング（※現在は独自のstate管理によるページ切り替え）
- **React Scripts** (v5.0.1) - 開発環境・ビルドツール

### バックエンド・データベース
- **Firebase** (v12.3.0) - バックエンドサービス
  - **Firebase Hosting** - 静的サイトホスティング
  - **Firebase Firestore** - NoSQLデータベース（予約情報管理）
  - **Firebase Authentication** - 認証機能（管理者ログイン）
  - **Firebase Emulator Suite** - 開発環境

### 外部サービス連携
- **Google APIs** (v160.0.0) - Google Calendar連携
- **Google Auth Library** (v10.3.0) - Google認証
- **React Big Calendar** (v1.19.4) - カレンダー表示
- **React Calendar** (v6.0.0) - 日付選択

### 開発・デプロイ環境
- **Docker** - コンテナ化開発環境
- **Docker Compose** - 複数サービス管理
- **Node.js** - JavaScript実行環境
- **npm** - パッケージ管理

## アーキテクチャ概要

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Pages     │  │ Components  │  │      Services       │  │
│  │             │  │             │  │                     │  │
│  │ • Home      │  │ • Header    │  │ • authService       │  │
│  │ • ShopInfo  │  │ • Footer    │  │ • bookingService    │  │
│  │ • Booking   │  │ • BookingForm│ │ • calendarService   │  │
│  │ • Calendar  │  │ • Calendar  │  │                     │  │
│  │ • Admin     │  │ • QRCodes   │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    Configuration Layer                       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              appConfig.js                               │ │
│  │  • Firebase設定 • 店舗情報 • SNS設定 • サービス情報    │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    Firebase Backend                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Firestore   │  │    Auth     │  │      Hosting        │  │
│  │             │  │             │  │                     │  │
│  │ • bookings  │  │ • 管理者認証 │  │ • 静的サイト配信     │  │
│  │ • users     │  │ • ロール管理 │  │ • CDN配信           │  │
│  │             │  │             │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Services                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ LINE API    │  │ Instagram   │  │   Google Calendar   │  │
│  │             │  │             │  │                     │  │
│  │ • 予約受付   │  │ • SNS連携   │  │ • 予約管理          │  │
│  │ • 問い合わせ │  │ • 情報発信   │  │ • スケジュール同期   │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## プロジェクト構造

```
react-firebase-project/
├── public/                      # 静的ファイル
│   ├── images/                 # 画像ファイル
│   │   ├── menus/              # メニュー画像
│   │   └── qr-codes/           # QRコード画像
│   └── index.html              # HTMLテンプレート
│
├── src/                        # ソースコード
│   ├── components/             # 再利用可能なReactコンポーネント
│   │   ├── Header.js           # ナビゲーションヘッダー
│   │   ├── Footer.js           # フッター
│   │   ├── AdminHeader.js      # 管理者用ヘッダー
│   │   ├── BookingForm.js      # 予約フォーム
│   │   ├── Calendar.js         # カレンダー表示
│   │   ├── QRCodes.js          # QRコード表示
│   │   └── SocialFeed.js       # SNS連携表示
│   │
│   ├── pages/                  # ページコンポーネント
│   │   ├── Home.js             # ホームページ
│   │   ├── ShopInfo.js         # 店舗情報ページ
│   │   ├── Booking.js          # 予約ページ
│   │   ├── BookingConfirmation.js # 予約確認ページ
│   │   ├── CalendarPage.js     # カレンダーページ
│   │   ├── AdminLogin.js       # 管理者ログインページ
│   │   └── AdminDashboard.js   # 管理者ダッシュボード
│   │
│   ├── services/               # Firebase関連のサービス
│   │   ├── authService.js      # 認証サービス
│   │   ├── bookingService.js   # 予約管理サービス
│   │   └── calendarService.js  # カレンダーサービス
│   │
│   ├── firebase/               # Firebase設定
│   │   └── config.js           # Firebase初期化設定
│   │
│   ├── config/                 # アプリケーション設定
│   │   └── appConfig.js        # 統一設定ファイル
│   │
│   ├── styles/                 # CSS/スタイルファイル
│   ├── utils/                  # ユーティリティ関数
│   └── App.js                  # メインアプリケーション
│
├── functions/                  # Firebase Functions（サーバーサイド処理）
├── firebase-export/            # Firebaseエミュレータデータ
├── scripts/                    # セットアップスクリプト
├── logs/                       # ログファイル
├── build/                      # ビルド出力（自動生成）
│
├── docker-compose.dev.yml      # Docker開発環境設定
├── docker-compose.yml          # Docker本番環境設定
├── Dockerfile.dev              # Docker開発用イメージ
├── Dockerfile                  # Docker本番用イメージ
├── firebase.json               # Firebase設定
├── firestore.rules             # Firestoreセキュリティルール
├── firestore.indexes.json      # Firestoreインデックス
├── env.example                 # 環境変数テンプレート
└── package.json                # Node.js依存関係
```

## データベース設計（Firestore）

### Collections

#### 1. bookings（予約情報）
```javascript
{
  id: "auto-generated-id",
  name: "お客様名",
  email: "customer@example.com",
  phone: "080-1234-5678",
  date: "2024-01-15",
  time: "14:00",
  service: "イヤーエステ 60分コース",
  message: "備考・要望",
  status: "pending", // pending, confirmed, cancelled
  createdAt: Timestamp,
  updatedAt: Timestamp,
  cancelledAt: Timestamp // キャンセル時のみ
}
```

#### 2. users（ユーザー情報）
```javascript
{
  id: "user-uid",
  email: "admin@example.com",
  role: "admin", // admin, user
  name: "管理者名",
  createdAt: Timestamp
}
```

## 認証・認可システム

### 認証フロー
1. **管理者ログイン**: Firebase Authenticationを使用
2. **ロールベース認可**: Firestoreでユーザーロールを管理
3. **セッション管理**: Firebase Authの自動セッション管理

### セキュリティルール（firestore.rules）
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 予約データ: 読み取りは全員、書き込みは認証済みユーザーのみ
    match /bookings/{bookingId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // ユーザーデータ: 管理者のみアクセス可能
    match /users/{userId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## 状態管理

### アプリケーション状態
- **React State**: 各コンポーネントのローカル状態
- **Props Drilling**: 親から子への状態受け渡し
- **Context API**: 認証状態の共有（将来的な拡張）

### データフロー
```
User Action → Component → Service → Firebase → Component Update
```

## API設計

### Firebase Services

#### authService.js
- `signInAdmin(email, password)` - 管理者ログイン
- `checkAdminRole(uid)` - 管理者権限チェック
- `signOutAdmin()` - ログアウト
- `onAuthStateChange(callback)` - 認証状態監視

#### bookingService.js
- `addBooking(bookingData)` - 予約追加
- `getAllBookings()` - 全予約取得
- `getBookingsByDate(date)` - 日付別予約取得
- `getAvailableTimes(date)` - 利用可能時間取得
- `updateBooking(id, data)` - 予約更新
- `cancelBooking(id)` - 予約キャンセル

#### calendarService.js
- Google Calendar API連携（将来実装予定）

## 設定管理

### appConfig.js
アプリケーションの全設定を一元管理：

```javascript
{
  firebase: {
    // Firebase設定（環境変数から取得）
  },
  social: {
    // SNS連携設定
    twitter: { url, username },
    instagram: { url, username },
    line: { url, note }
  },
  shop: {
    // 店舗情報
    name, phone, address, hours, services, facilities
  },
  booking: {
    // 予約設定
    availableTimes, advanceBookingDays, minAdvanceHours
  }
}
```

## 開発環境

### Docker構成
```yaml
# docker-compose.dev.yml
services:
  react-app-dev:
    # React開発サーバー (port: 3000)
  
  firebase-emulator-dev:
    # Firebase Emulator Suite
    # - Auth: 5001
    # - Firestore: 5000
    # - Hosting: 9000
    # - UI: 4000
```

### 環境変数
```bash
# .env
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_TWITTER_URL=
REACT_APP_INSTAGRAM_URL=
REACT_APP_LINE_URL=
```

## デプロイメント

### Firebase Hosting
1. **ビルド**: `npm run build`
2. **デプロイ**: `firebase deploy`
3. **ステージング**: `firebase hosting:channel:deploy staging`

### CI/CD（推奨）
- GitHub Actions
- 自動テスト実行
- 自動デプロイ

## パフォーマンス最適化

### フロントエンド
- **Code Splitting**: React.lazy()（将来実装）
- **Image Optimization**: WebP形式、適切なサイズ
- **Bundle Size**: 不要なライブラリの削除

### バックエンド
- **Firestore Indexes**: クエリ最適化
- **Caching**: Firebase Hosting CDN
- **Security Rules**: 効率的なルール設計

## 監視・ログ

### 開発環境
- **Console Logs**: 開発時のデバッグ
- **Firebase Emulator Logs**: エミュレータでの動作確認

### 本番環境
- **Firebase Performance Monitoring**
- **Firebase Crashlytics**（モバイル対応時）
- **Google Analytics**（設定済み）

## セキュリティ

### データ保護
- **HTTPS**: Firebase Hostingで自動対応
- **CORS**: Firebase設定で制御
- **Input Validation**: フロントエンド・バックエンド両方で実装

### 認証セキュリティ
- **Password Policy**: Firebase Authのデフォルト
- **Session Management**: Firebase Authで自動管理
- **Role-based Access**: Firestoreルールで制御

## 今後の拡張予定

### 機能追加
- [ ] Google Calendar連携
- [ ] メール通知システム
- [ ] 顧客管理システム
- [ ] 売上分析ダッシュボード
- [ ] モバイルアプリ（React Native）

### 技術的改善
- [ ] TypeScript導入
- [ ] Redux/Zustand導入（状態管理）
- [ ] PWA対応
- [ ] テスト自動化（Jest, Cypress）
- [ ] CI/CD パイプライン構築

## トラブルシューティング

### よくある問題
1. **Firebase接続エラー**: 環境変数の確認
2. **ビルドエラー**: 依存関係の再インストール
3. **認証エラー**: Firebase設定の確認
4. **Dockerエラー**: ポート競合の確認

### デバッグ手順
1. **開発環境**: `npm start` + Chrome DevTools
2. **Firebase**: Emulator UIでデータ確認
3. **本番環境**: Firebase Consoleでログ確認

---

このアーキテクチャドキュメントは、プロジェクトの成長に合わせて継続的に更新されます。
