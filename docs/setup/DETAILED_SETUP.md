# 詳細セットアップガイド

## 必要なソフトウェア

- Node.js v18 以上
- npm
- Git
- Firebase CLI (`npm i -g firebase-tools`)

## 1. リポジトリ・依存関係

```bash
git clone <repository-url>
cd yoon2-web
npm install
```

## 2. Firebase プロジェクト設定

1. [Firebase Console](https://console.firebase.google.com/) でプロジェクト作成
2. Authentication → メール/パスワード 有効化
3. Firestore Database 作成
4. プロジェクト設定 → ウェブアプリ追加 → 設定値を取得

## 3. 環境変数設定

```bash
cp env.example .env.local
```

`.env.local` に Firebase の設定値を入力。  
詳細: [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md)

## 4. 管理者アカウント作成

```bash
# ブラウザの開発者コンソールで実行
# (npm run dev 後)
window.setupAdmin()
```

詳細: [ADMIN_ACCESS.md](ADMIN_ACCESS.md)

## 5. Google Calendar API 設定 (オプション)

管理画面の予約詳細機能に使用。  
詳細: [GOOGLE_CALENDAR_SETUP.md](GOOGLE_CALENDAR_SETUP.md)

## 6. 開発サーバー起動

```bash
npm run dev
# http://localhost:3000
```

## 7. デプロイ

```bash
# Firebase CLI ログイン
firebase login

# 手動デプロイ (通常は GitHub Actions が自動実行)
npm run build
firebase deploy
```

詳細: [../deployment/DEPLOYMENT.md](../deployment/DEPLOYMENT.md)
