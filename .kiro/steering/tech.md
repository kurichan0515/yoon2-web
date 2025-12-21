# 技術スタック（Technology Stack）

## アーキテクチャ概要

**シングルページアプリケーション (SPA) + BaaS (Backend as a Service)**

React をフロントエンドとし、Firebase をバックエンドとして利用するモダンなWebアプリケーションアーキテクチャ。サーバーレス構成により、インフラ管理の負担を最小限に抑えながら、スケーラブルで高性能なシステムを実現しています。

## フロントエンド

### コアテクノロジー
- **React 19.1.1**: UIライブラリ（最新メジャーバージョン）
- **React Router DOM 7.9.1**: クライアントサイドルーティング
- **React Scripts 5.0.1**: Create React App ベースのビルド構成

### UI/UXライブラリ
- **React Big Calendar 1.19.4**: カレンダービューコンポーネント（予約スケジュール表示）
- **React Calendar 6.0.0**: カレンダーピッカーコンポーネント（日付選択）
- **Moment.js 2.30.1**: 日時操作ライブラリ

### スタイリング
- **CSS Modules / Plain CSS**: コンポーネント単位でのスタイル管理
- モダンでクリーンなデザイン、モバイルファースト対応

## バックエンド / BaaS

### Firebase 12.3.0
- **Firebase Authentication**: ユーザー認証（管理者ログイン）
- **Cloud Firestore**: NoSQLデータベース（予約データ、店舗情報、ユーザー情報）
- **Firebase Hosting**: 静的サイトホスティング
- **Firebase Emulator Suite**: ローカル開発環境

### データモデル
```
Firestore Collections:
├── bookings          # 予約データ
├── shop_info         # 店舗情報
├── users             # ユーザー情報
└── admin_settings    # 管理者設定
```

## 外部API連携

### Google APIs
- **Google Calendar API**: カレンダー統合機能
- **Google Auth Library 10.3.0**: Google認証
- **Google APIs Client 160.0.0**: APIクライアントライブラリ

## 開発環境

### パッケージマネージャー
- **npm**: Node.js パッケージ管理

### コンテナ化
- **Docker**: 開発環境のコンテナ化
- **Docker Compose**: マルチコンテナアプリケーション管理
  - React アプリケーション（ポート 3000）
  - Firebase Emulator Suite（ポート 4000, 5000, 5001, 9000）
  - PostgreSQL（ポート 5432）※オプション

### テスト
- **Jest**: テストフレームワーク（React Scripts内包）
- **React Testing Library 16.3.0**: React コンポーネントテスト
- **Testing Library DOM 10.4.1**: DOM テストユーティリティ
- **Testing Library User Event 13.5.0**: ユーザーインタラクションシミュレーション
- **Testing Library Jest DOM 6.8.0**: DOM マッチャー拡張

### その他開発ツール
- **Web Vitals 2.1.4**: Webパフォーマンス測定

## よく使うコマンド

### ローカル開発
```bash
npm start                    # 開発サーバー起動（ポート 3000）
npm test                     # テスト実行
npm run build               # プロダクションビルド
```

### Docker 開発環境
```bash
npm run docker:dev          # Docker開発環境起動
npm run docker:build        # Dockerイメージビルド
npm run docker:down         # Docker環境停止
npm run docker:logs         # Dockerログ確認
npm run docker:setup        # Docker環境セットアップ
```

### Firebase 関連
```bash
npm run firebase:emulator   # Firebase エミュレーター起動
npm run firebase:deploy     # Firebaseへデプロイ
npm run firebase:login      # Firebase認証
npm run firebase:init       # Firebase初期化
```

## 環境変数

### Firebase 設定（必須）
```bash
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
```

### 店舗情報設定
```bash
REACT_APP_SHOP_NAME           # 店舗名
REACT_APP_SHOP_PHONE          # 電話番号
REACT_APP_SHOP_ADDRESS        # 住所
REACT_APP_SHOP_HOURS_OPEN     # 営業開始時間
REACT_APP_SHOP_HOURS_CLOSE    # 営業終了時間
REACT_APP_SHOP_HOURS_NOTE     # 営業時間の注記
REACT_APP_SHOP_HOLIDAYS       # 定休日
```

### アクセス情報
```bash
REACT_APP_SHOP_ACCESS_STATION1    # 最寄り駅1
REACT_APP_SHOP_ACCESS_STATION2    # 最寄り駅2
REACT_APP_SHOP_ACCESS_STATION3    # バス停
REACT_APP_SHOP_ACCESS_LANDMARKS   # 目印
REACT_APP_SHOP_ACCESS_PARKING     # 駐車場情報
```

### SNS連携
```bash
REACT_APP_TWITTER_URL
REACT_APP_INSTAGRAM_URL
REACT_APP_LINE_URL
```

### 料金設定
```bash
REACT_APP_PRICE_MIMITUBO_NEW         # 耳つぼ（初回）
REACT_APP_PRICE_MIMITUBO_PAIR        # 耳つぼ（ペア）
REACT_APP_PRICE_MIMITUBO_REPEAT      # 耳つぼ（リピーター）
REACT_APP_PRICE_EAR_ESTE_TRIAL_MALE  # イヤーエステ体験（男性）
REACT_APP_PRICE_EAR_ESTE_TRIAL_FEMALE # イヤーエステ体験（女性）
REACT_APP_PRICE_EAR_ESTE_40          # イヤーエステ40分
REACT_APP_PRICE_EAR_ESTE_60          # イヤーエステ60分
```

### Google Calendar API
```bash
REACT_APP_GOOGLE_API_KEY
REACT_APP_GOOGLE_CALENDAR_ID
```

## ポート設定

### 開発環境
- **3000**: React 開発サーバー
- **4000**: Firebase Emulator UI
- **5000**: Firestore Emulator
- **5001**: Authentication Emulator
- **9000**: Hosting Emulator
- **5432**: PostgreSQL（オプション）

## セキュリティ設定

### Firestore セキュリティルール
- 予約データ: 作成は誰でも可、読み取り・更新・削除は認証済みユーザーのみ
- 店舗情報: 読み取りは誰でも可、書き込みは認証済みユーザーのみ
- ユーザー情報: 自分のデータのみアクセス可能
- 管理者設定: 管理者ロールを持つユーザーのみアクセス可能

## ビルド設定

### プロダクションビルド
- **出力ディレクトリ**: `build/`
- **Firebase Hosting**: `build/` をホスティングソースとして使用
- **SPA対応**: すべてのルートを `/index.html` にリライト
- **キャッシュ制御**: `no-cache, no-store, must-revalidate`

### ブラウザサポート
**プロダクション**:
- >0.2%のブラウザシェア
- 廃止されていないブラウザ
- Opera Mini を除く

**開発**:
- Chrome 最新版
- Firefox 最新版
- Safari 最新版

## 開発ガイドライン

### 環境分離
- **開発**: Docker + Firebase Emulator（ローカル完結）
- **ステージング**: Firebase Hosting + Firebase サービス
- **プロダクション**: Firebase Hosting + Firebase サービス

### コード品質
- ESLint は開発中無効化（`ESLINT_NO_DEV_ERRORS=true`）
- 本番ビルド時も ESLint プラグイン無効化
- テストは Jest + React Testing Library で実施

### Git ワークフロー
- `.env` ファイルは `.gitignore` に含める
- `env.example` をテンプレートとして使用
- `node_modules/` はバージョン管理対象外

