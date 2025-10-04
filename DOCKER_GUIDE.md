# 🐳 Docker環境構築ガイド

## 概要

このプロジェクトでは、Dockerを使用してローカル開発環境を構築し、Firebase Emulator Suiteと連携してテストを行います。

## 🚀 クイックスタート

### 1. 前提条件

- Docker Desktop がインストールされていること
- Docker Compose がインストールされていること
- Node.js 18以上（ローカル開発用）

### 2. セットアップ

```bash
# 1. 環境変数ファイルを作成
cp env.example .env

# 2. .envファイルを編集してFirebase設定を追加
# REACT_APP_FIREBASE_API_KEY=your_api_key
# REACT_APP_FIREBASE_PROJECT_ID=your_project_id
# など...

# 3. 自動セットアップスクリプトを実行
npm run docker:setup

# または手動でセットアップ
chmod +x scripts/docker-setup.sh
./scripts/docker-setup.sh
```

### 3. 開発サーバーの起動

```bash
# 開発環境を起動
npm run docker:dev

# または直接Docker Composeを使用
docker-compose -f docker-compose.dev.yml up
```

### 4. アクセス

- **React アプリケーション**: http://localhost:3000
- **Firebase Emulator UI**: http://localhost:4000
- **Firestore Emulator**: http://localhost:5000
- **Authentication Emulator**: http://localhost:5001
- **Hosting Emulator**: http://localhost:9000

## 📁 ファイル構成

```
├── Dockerfile                 # 本番用Dockerfile
├── Dockerfile.dev            # 開発用Dockerfile
├── docker-compose.yml        # 本番用Docker Compose
├── docker-compose.dev.yml    # 開発用Docker Compose
├── .dockerignore             # Docker除外ファイル
├── firebase.json             # Firebase設定
├── firestore.rules           # Firestoreセキュリティルール
├── firestore.indexes.json    # Firestoreインデックス
└── scripts/
    └── docker-setup.sh       # セットアップスクリプト
```

## 🛠️ 便利なコマンド

### Docker関連

```bash
# 開発環境の起動
npm run docker:dev

# バックグラウンドで起動
docker-compose -f docker-compose.dev.yml up -d

# 停止
npm run docker:down

# ログ確認
npm run docker:logs

# イメージの再ビルド
npm run docker:build
```

### Firebase関連

```bash
# Firebase Emulatorの起動
npm run firebase:emulator

# Firebaseにログイン
npm run firebase:login

# Firebaseプロジェクトの初期化
npm run firebase:init

# 本番環境にデプロイ
npm run firebase:deploy
```

## 🔧 開発環境の詳細

### サービス構成

1. **react-app-dev**: React開発サーバー
   - ポート: 3000
   - ホットリロード対応
   - ボリュームマウントでリアルタイム更新

2. **firebase-emulator-dev**: Firebase Emulator Suite
   - UI: 4000
   - Firestore: 5000
   - Authentication: 5001
   - Hosting: 9000

3. **test-db**: テスト用PostgreSQL
   - ポート: 5433
   - 開発・テスト用データベース

### 環境変数

以下の環境変数を`.env`ファイルで設定してください：

```env
# Firebase設定
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# SNS設定
REACT_APP_TWITTER_URL=your_twitter_url
REACT_APP_INSTAGRAM_URL=your_instagram_url
```

## 🐛 トラブルシューティング

### よくある問題

1. **ポートが既に使用されている**
   ```bash
   # 使用中のポートを確認
   lsof -i :3000
   
   # プロセスを終了
   kill -9 <PID>
   ```

2. **Dockerイメージのビルドエラー**
   ```bash
   # キャッシュをクリアして再ビルド
   docker-compose -f docker-compose.dev.yml build --no-cache
   ```

3. **Firebase Emulatorが起動しない**
   ```bash
   # Firebase CLIを再インストール
   npm install -g firebase-tools
   
   # プロジェクトを再初期化
   firebase init
   ```

4. **環境変数が読み込まれない**
   ```bash
   # .envファイルの存在確認
   ls -la .env
   
   # 環境変数の確認
   docker-compose -f docker-compose.dev.yml config
   ```

### ログの確認

```bash
# 全サービスのログ
docker-compose -f docker-compose.dev.yml logs

# 特定のサービスのログ
docker-compose -f docker-compose.dev.yml logs react-app-dev
docker-compose -f docker-compose.dev.yml logs firebase-emulator-dev

# リアルタイムログ
docker-compose -f docker-compose.dev.yml logs -f
```

## 🔄 データの永続化

### Firebase Emulator データ

Firebase Emulatorのデータは`firebase-export`ディレクトリに保存されます：

```bash
# データのエクスポート
firebase emulators:export ./firebase-export

# データのインポート
firebase emulators:start --import=./firebase-export
```

### PostgreSQL データ

PostgreSQLのデータはDockerボリュームに保存されます：

```bash
# ボリュームの確認
docker volume ls

# ボリュームの削除（データリセット）
docker volume rm react-firebase-project_test_db_data
```

## 🚀 本番環境への移行

### 本番用Dockerイメージのビルド

```bash
# 本番用イメージのビルド
docker build -t yoon2-app .

# 本番用コンテナの起動
docker run -p 3000:3000 yoon2-app
```

### Firebase Hostingへのデプロイ

```bash
# アプリケーションのビルド
npm run build

# Firebase Hostingにデプロイ
npm run firebase:deploy
```

## 📚 参考資料

- [Docker公式ドキュメント](https://docs.docker.com/)
- [Docker Compose公式ドキュメント](https://docs.docker.com/compose/)
- [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite)
- [React Docker化ガイド](https://create-react-app.dev/docs/deployment/#docker)

---

*最終更新: 2024年12月*
