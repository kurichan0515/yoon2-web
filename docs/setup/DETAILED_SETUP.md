# 詳細セットアップガイド

yoon² イヤーエステサロン ホームページの完全なセットアップ手順です。

## 目次

- [前提条件](#前提条件)
- [開発環境のセットアップ](#開発環境のセットアップ)
- [Firebase設定](#firebase設定)
- [環境変数の設定](#環境変数の設定)
- [開発サーバーの起動](#開発サーバーの起動)
- [テスト環境の構築](#テスト環境の構築)
- [本番環境のデプロイ](#本番環境のデプロイ)
- [トラブルシューティング](#トラブルシューティング)

## 前提条件

### 必要なソフトウェア

- **Node.js** (v14以上推奨)
  ```bash
  # Node.jsのバージョン確認
  node --version
  
  # npmのバージョン確認
  npm --version
  ```

- **Git**
  ```bash
  # Gitのバージョン確認
  git --version
  ```

- **Firebase CLI**（本格運用時）
  ```bash
  # Firebase CLIのインストール
  npm install -g firebase-tools
  
  # バージョン確認
  firebase --version
  ```

### 推奨開発環境

- **Visual Studio Code** + 拡張機能
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint
  - Firebase

- **ブラウザ**
  - Chrome（推奨）
  - Firefox
  - Safari

## 開発環境のセットアップ

### 1. リポジトリのクローン

```bash
# リポジトリをクローン
git clone <repository-url>
cd react-firebase-project

# 最新の変更を取得
git pull origin main
```

### 2. 依存関係のインストール

```bash
# 依存関係をインストール
npm install

# または yarn を使用する場合
yarn install
```

### 3. プロジェクト構造の確認

```bash
# プロジェクト構造を確認
tree -I 'node_modules|build' -L 3
```

期待される構造：
```
react-firebase-project/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── ...
├── docs/
├── package.json
└── README.md
```

## Firebase設定

### 1. Firebaseプロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com/)にアクセス
2. 「プロジェクトを作成」をクリック
3. プロジェクト名を入力（例：`yoon2-salon`）
4. Google Analyticsの設定（推奨：有効）
5. プロジェクトを作成

### 2. Firebase Hostingの有効化

1. Firebase Consoleでプロジェクトを選択
2. 左メニューから「Hosting」を選択
3. 「始める」をクリック
4. セットアップ手順に従う

### 3. Firestore Databaseの設定

1. 左メニューから「Firestore Database」を選択
2. 「データベースを作成」をクリック
3. セキュリティルールの設定：
   - **テストモード**：開発時（誰でも読み書き可能）
   - **本番モード**：本番環境（セキュリティルール適用）

### 4. Authenticationの設定

1. 左メニューから「Authentication」を選択
2. 「始める」をクリック
3. 「Sign-in method」タブを選択
4. 「メール/パスワード」を有効化
5. 管理者用アカウントを作成

### 5. Firebase設定情報の取得

1. 左メニューから「プロジェクトの設定」を選択
2. 「全般」タブを選択
3. 「アプリ」セクションで「</>」をクリック
4. アプリ名を入力（例：`yoon2-web`）
5. 設定オブジェクトをコピー

## 環境変数の設定

### 1. 環境変数ファイルの作成

```bash
# テンプレートをコピー
cp env.example .env

# ファイルを編集
nano .env
```

### 2. 必要な環境変数

```bash
# Firebase設定（必須）
REACT_APP_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_FIREBASE_AUTH_DOMAIN=yoon2-salon.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=yoon2-salon
REACT_APP_FIREBASE_STORAGE_BUCKET=yoon2-salon.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890

# SNS設定
REACT_APP_TWITTER_URL=https://twitter.com/yoon2_salon
REACT_APP_INSTAGRAM_URL=https://instagram.com/yoo.n.yoo.n
REACT_APP_LINE_URL=https://lin.ee/lyyKSqu

# 店舗情報
REACT_APP_SHOP_NAME=yoon²ゆんゆん
REACT_APP_SHOP_PHONE=080-8478-1163
REACT_APP_SHOP_ADDRESS=愛媛県松山市清水町３丁目２０１－２ ８Ｄｒｏｐｓ １０２号室
REACT_APP_SHOP_ACCESS_STATION1=高砂町駅から徒歩1分
REACT_APP_SHOP_ACCESS_STATION2=清水町駅から徒歩6分
REACT_APP_SHOP_ACCESS_STATION3=東西線清水町三バス停まで徒歩4分
REACT_APP_SHOP_ACCESS_LANDMARKS=勝山中学校の隣
REACT_APP_SHOP_ACCESS_PARKING=駐車場あり(兼久駐車場)

# 営業時間
REACT_APP_SHOP_HOURS_OPEN=10:00
REACT_APP_SHOP_HOURS_CLOSE=20:00
REACT_APP_SHOP_HOURS_WEEKDAY=10:00 - 20:00
REACT_APP_SHOP_HOURS_WEEKEND=10:00 - 20:00
REACT_APP_SHOP_HOURS_NOTE=営業時間外でも対応できることがあります。お気軽にお問い合わせください。
REACT_APP_SHOP_HOLIDAYS=不定休

# 料金設定（オプション - appConfig.jsでハードコードされている値）
# これらの環境変数は現在使用されていません
# REACT_APP_PRICE_MIMITUBO_NEW=4000
# REACT_APP_PRICE_MIMITUBO_PAIR=3800
# REACT_APP_PRICE_MIMITUBO_REPEAT=3500
# REACT_APP_PRICE_EAR_ESTE_TRIAL_MALE=4500
# REACT_APP_PRICE_EAR_ESTE_TRIAL_FEMALE=4000
# REACT_APP_PRICE_EAR_ESTE_40=5000
# REACT_APP_PRICE_EAR_ESTE_60=7000
```

### 3. 環境変数の確認

```bash
# 環境変数が正しく読み込まれているか確認
npm run start
```

## 開発サーバーの起動

### 1. 基本的な起動

```bash
# 開発サーバーを起動
npm start
```

### 2. カスタムポートでの起動

```bash
# ポート3001で起動
PORT=3001 npm start

# または
npm start -- --port 3001
```

### 3. 本番ビルドのテスト

```bash
# 本番用ビルドを作成
npm run build

# ビルド結果をローカルで確認
npx serve -s build
```

## テスト環境の構築

### 1. Firebase Emulatorの使用

```bash
# Firebase Emulatorを起動
npm run firebase:emulator

# または直接
firebase emulators:start
```

アクセス先：
- **Emulator UI**: http://localhost:4000
- **Firestore**: http://localhost:5000
- **Auth**: http://localhost:5001
- **Hosting**: http://localhost:9000

### 2. Docker環境での開発

```bash
# Docker環境のセットアップ（初回のみ）
npm run docker:setup

# Docker環境で開発サーバーを起動
npm run docker:dev

# ログの確認
npm run docker:logs

# 環境の停止
npm run docker:down
```

## 本番環境のデプロイ

### 1. Firebase CLIの設定

```bash
# Firebaseにログイン
firebase login

# プロジェクトを選択
firebase use your-project-id

# プロジェクト一覧を確認
firebase projects:list
```

### 2. 本番デプロイ

```bash
# ビルド
npm run build

# デプロイ
firebase deploy

# または
npm run firebase:deploy
```

### 3. ステージング環境へのデプロイ

```bash
# ステージング環境にデプロイ
firebase hosting:channel:deploy staging --expires 7d

# デプロイ状況の確認
firebase hosting:channel:list
```

## トラブルシューティング

詳細なトラブルシューティングについては、[トラブルシューティングガイド](../guides/TROUBLESHOOTING.md)を参照してください。

### よくある問題

1. **依存関係のエラー**: `rm -rf node_modules package-lock.json && npm install`
2. **Firebase接続エラー**: 環境変数の確認とFirebaseプロジェクトの有効性確認
3. **ポート競合エラー**: `PORT=3001 npm start`
4. **ビルドエラー**: 依存関係の再インストール
5. **Firebase Emulatorのエラー**: Firebase CLIの更新とEmulatorの再起動

## 次のステップ

- [Docker環境での開発](./DOCKER_GUIDE.md)
- [設定ガイド](./CONFIGURATION_GUIDE.md)
- [Google Calendar連携](./GOOGLE_CALENDAR_SETUP.md)
- [アーキテクチャドキュメント](../architecture/ARCHITECTURE.md)
