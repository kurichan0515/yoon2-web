# 耳かき屋さん ホームページ

友達の耳かき屋さんのホームページを作成するプロジェクトです。

## 概要

このプロジェクトは、React（フロントエンド）とFirebase（バックエンド）を使用して耳かき屋さんのホームページを構築します。

## 主な機能

- **店舗情報の表示**
- **SNS連携**
  - X（旧Twitter）アカウント情報の表示
  - Instagramアカウント情報の表示
- **予約機能**
  - オンライン予約システム
  - 予約情報の管理
- **レスポンシブデザイン**
  - モバイル・タブレット・デスクトップ対応

## 技術スタック

### フロントエンド
- **React** (v19.1.1) - UIライブラリ
- **React DOM** (v19.1.1) - DOM操作
- **Create React App** - 開発環境

### バックエンド・ホスティング
- **Firebase** (v12.3.0) - バックエンドサービス
  - Firebase Hosting - 静的サイトホスティング
  - Firebase Firestore - データベース（予約情報管理）
  - Firebase Authentication - 認証機能（必要に応じて）

## セットアップ

### 前提条件
- Node.js (v14以上)
- npm または yarn
- Firebase CLI

### インストール

1. リポジトリをクローン
```bash
git clone <repository-url>
cd react-firebase-project
```

2. 依存関係をインストール
```bash
npm install
```

3. Firebase CLIをインストール（まだの場合）
```bash
npm install -g firebase-tools
```

4. Firebaseにログイン
```bash
firebase login
```

5. Firebaseプロジェクトを初期化
```bash
firebase init
```

## 開発

### 開発サーバーの起動
```bash
npm start
```
ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認できます。

### テストの実行
```bash
npm test
```

### プロダクションビルド
```bash
npm run build
```

## デプロイ

### Firebase Hostingへのデプロイ
```bash
npm run build
firebase deploy
```

## プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
├── pages/              # ページコンポーネント
├── services/           # Firebase関連のサービス
├── styles/             # CSS/スタイルファイル
├── utils/              # ユーティリティ関数
└── App.js              # メインアプリケーション
```

## 今後の実装予定

- [ ] 店舗情報ページ
- [ ] SNS連携機能（X、Instagram）
- [ ] 予約システム
- [ ] 予約管理画面
- [ ] レスポンシブデザインの最適化
- [ ] SEO対策

## ライセンス

このプロジェクトは個人使用のためのものです。
