# プロジェクト構造（Project Structure）

## ルートディレクトリ構成

```
react-firebase-project/
├── .kiro/                    # Kiro AI-DLC 設定・仕様書
│   ├── steering/             # プロジェクトステアリングドキュメント
│   └── specs/                # 機能仕様書（Spec-Driven Development）
├── src/                      # ソースコード
├── public/                   # 静的ファイル
├── build/                    # ビルド出力（自動生成）
├── functions/                # Firebase Cloud Functions（未使用）
├── firebase-export/          # Firebase Emulator データエクスポート
├── docs/                     # ドキュメント
├── scripts/                  # ビルド・デプロイスクリプト
├── logs/                     # アプリケーションログ
├── node_modules/             # 依存パッケージ
├── package.json              # プロジェクト設定・依存関係
├── firebase.json             # Firebase設定
├── firestore.rules           # Firestoreセキュリティルール
├── firestore.indexes.json    # Firestoreインデックス定義
├── docker-compose.yml        # Docker Compose設定（本番用）
├── docker-compose.dev.yml    # Docker Compose設定（開発用）
├── Dockerfile                # Docker設定（本番用）
├── Dockerfile.dev            # Docker設定（開発用）
├── env.example               # 環境変数テンプレート
├── .env                      # 環境変数（未コミット）
└── AGENTS.md                 # AI-DLC ガイドライン
```

## ソースコード構造（`src/`）

### 概要
```
src/
├── components/          # 再利用可能なコンポーネント
├── pages/              # ページコンポーネント（ルート対応）
├── layouts/            # レイアウトコンポーネント
├── contexts/           # React Context（状態管理）
├── hooks/              # カスタムフック
├── services/           # ビジネスロジック・API呼び出し
├── firebase/           # Firebase設定・初期化
├── config/             # アプリケーション設定
├── utils/              # ユーティリティ関数
├── types/              # TypeScript型定義（必要に応じて）
├── styles/             # グローバルスタイル
├── __tests__/          # テストファイル
├── App.js              # ルートコンポーネント
├── App.css             # ルートスタイル
├── index.js            # エントリーポイント
├── index.css           # グローバルスタイル
├── setupTests.js       # テストセットアップ
└── reportWebVitals.js  # パフォーマンス計測
```

## コンポーネント構造（`src/components/`）

### パブリックコンポーネント
```
components/
├── common/                  # 共通コンポーネント
│   └── PrivateRoute.js      # 認証ルート保護
├── public/                  # お客様向けコンポーネント
├── admin/                   # 管理者専用コンポーネント
├── Header.js / Header.css   # ヘッダー（パブリック）
├── Footer.js / Footer.css   # フッター（パブリック）
├── Calendar.js / Calendar.css         # カレンダー表示
├── BookingForm.js / BookingForm.css   # 予約フォーム
├── SocialFeed.js / SocialFeed.css     # SNSフィード
├── QRCodes.js / QRCodes.css           # QRコード生成
└── __tests__/               # コンポーネントテスト
```

### 管理者コンポーネント
```
components/admin/ or components/
├── AdminHeader.js / AdminHeader.css                 # 管理者ヘッダー
├── AdminBookingDetails.js / AdminBookingDetails.css # 予約詳細
├── AnalyticsDashboard.js / AnalyticsDashboard.css   # 分析ダッシュボード
└── ...
```

## ページ構造（`src/pages/`）

### パブリックページ
```
pages/
├── Home.js / Home.css                           # トップページ
├── ShopInfo.js / ShopInfo.css                   # 店舗情報ページ
├── CalendarPage.js / CalendarPage.css           # カレンダーページ
├── CoursePage.js / CoursePage.css               # コース一覧ページ
├── CourseCreatePage.js / CourseCreatePage.css   # コース作成ページ
├── Booking.js / Booking.css                     # 予約ページ
├── BookingConfirmation.js / BookingConfirmation.css # 予約確認ページ
└── common/                                      # ページ共通コンポーネント
```

### 管理者ページ
```
pages/
├── AdminLogin.js / AdminLogin.css          # 管理者ログイン
├── AdminDashboard.js / AdminDashboard.css  # 管理者ダッシュボード
└── admin/                                  # 管理者専用ページ
    └── AdminSettings.js                    # 管理者設定
```

## レイアウト構造（`src/layouts/`）

```
layouts/
├── PublicLayout.js    # パブリックページ共通レイアウト
└── AdminLayout.js     # 管理者ページ共通レイアウト
```

## サービス層（`src/services/`）

```
services/
├── authService.js         # 認証関連ロジック
├── calendarService.js     # カレンダー関連ロジック
├── courseService.js       # コース管理ロジック
└── analyticsService.js    # 分析関連ロジック
```

### サービス層の責務
- Firebase との通信
- ビジネスロジックのカプセル化
- データの加工・整形
- エラーハンドリング

## コンテキスト（`src/contexts/`）

```
contexts/
└── AuthContext.js    # 認証状態管理
```

### Context の使用パターン
- グローバルな状態管理
- 認証情報の共有
- テーマ・言語設定など

## Firebase 設定（`src/firebase/`）

```
firebase/
└── (Firebase初期化コード)
```

- Firebase SDK の初期化
- 環境変数からの設定読み込み
- Firestore、Auth、Hosting の設定

## 設定ファイル（`src/config/`）

```
config/
└── (アプリケーション設定)
```

- アプリケーション定数
- API エンドポイント
- フィーチャーフラグ

## ルーティング構成

### パブリックルート（`/`）
```
/ (PublicLayout)
├── /                 → Home
├── /shop             → ShopInfo
├── /calendar         → CalendarPage
└── /courses          → CoursePage
```

### 管理者ルート（`/system`）
```
/system (AdminLayout)
├── /system/login     → AdminLogin（認証不要）
├── /system           → AdminDashboard（認証必要）
├── /system/analytics → AnalyticsDashboard（認証必要）
└── /system/settings  → AdminSettings（認証必要）
```

## ファイル命名規則

### コンポーネント
- **React コンポーネント**: PascalCase（例: `BookingForm.js`, `AdminHeader.js`）
- **スタイルファイル**: コンポーネント名.css（例: `BookingForm.css`）
- **テストファイル**: コンポーネント名.test.js（例: `BookingForm.test.js`）

### サービス・ユーティリティ
- **サービスファイル**: camelCase + Service（例: `authService.js`）
- **ユーティリティ**: camelCase + 機能名（例: `dateUtils.js`）
- **Context**: PascalCase + Context（例: `AuthContext.js`）

### ページ
- **ページコンポーネント**: PascalCase（例: `Home.js`, `AdminDashboard.js`）
- **ページスタイル**: ページ名.css（例: `Home.css`）

## インポート構成パターン

### コンポーネント内のインポート順序
```javascript
// 1. React・外部ライブラリ
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Context・フック
import { useAuth } from '../contexts/AuthContext';

// 3. サービス・ユーティリティ
import { calendarService } from '../services/calendarService';

// 4. コンポーネント
import Header from '../components/Header';

// 5. スタイル
import './Home.css';
```

### 相対パスの使用
- 同階層: `./ComponentName`
- 親階層: `../components/ComponentName`
- ルート階層からの絶対パスは使用しない（相対パスで統一）

## テスト構造

### テストファイル配置
```
__tests__/
├── components/
│   └── BookingForm.test.js
└── pages/
    └── Home.test.js
```

または、コンポーネントと同じディレクトリに配置:
```
components/
├── BookingForm.js
├── BookingForm.css
└── BookingForm.test.js
```

## 静的ファイル（`public/`）

```
public/
├── images/           # 画像ファイル
├── index.html        # HTMLテンプレート
├── manifest.json     # PWA設定
├── robots.txt        # クローラー設定
├── favicon.ico       # ファビコン
├── logo192.png       # アプリアイコン（小）
├── logo512.png       # アプリアイコン（大）
└── staging-auth.html # ステージング認証ページ
```

## 主要な設計原則

### コンポーネント設計
- **単一責任の原則**: 1コンポーネント = 1つの責務
- **再利用性**: 共通部分は `components/common/` に配置
- **プレゼンテーションとロジックの分離**: サービス層でロジックを管理

### 状態管理
- **ローカル状態**: useState（コンポーネント内のみで使用）
- **グローバル状態**: Context API（認証情報など）
- **サーバー状態**: Firebase リアルタイムリスナー

### スタイリング
- **コンポーネント単位**: 各コンポーネントに対応するCSSファイル
- **グローバルスタイル**: `src/styles/` または `src/index.css`
- **モバイルファースト**: レスポンシブデザイン対応

### ルーティング
- **レイアウト分離**: PublicLayout と AdminLayout で UI を分離
- **認証保護**: PrivateRoute で管理者ページを保護
- **Nested Routes**: React Router DOM 7 の最新パターンを使用

## ディレクトリ作成ガイドライン

### 新規機能追加時
1. 対応するページを `src/pages/` に作成
2. 再利用可能な部品は `src/components/` に作成
3. ビジネスロジックは `src/services/` に作成
4. 必要に応じて `src/hooks/` にカスタムフックを作成

### コンポーネント分割の基準
- 100行を超えるコンポーネントは分割を検討
- 3回以上使用される部品は共通コンポーネント化
- ドメイン固有のロジックはサービス層に移動

