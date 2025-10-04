# 環境セットアップガイド

開発・ステージング・本番環境のセットアップ手順を説明します。

## 目次

- [開発環境](#開発環境)
- [ステージング環境](#ステージング環境)
- [本番環境](#本番環境)
- [環境変数の管理](#環境変数の管理)
- [環境別設定](#環境別設定)

## 開発環境

### ローカル開発環境

#### 1. 基本的なセットアップ

```bash
# リポジトリのクローン
git clone <repository-url>
cd react-firebase-project

# 依存関係のインストール
npm install

# 環境変数の設定
cp env.example .env
# .envファイルを編集
```

#### 2. 開発サーバーの起動

```bash
# 通常の起動
npm start

# カスタムポートで起動
PORT=3001 npm start

# デバッグモードで起動
DEBUG=* npm start
```

#### 3. Firebase Emulator環境

```bash
# Firebase Emulatorの起動
npm run firebase:emulator

# 特定のサービスのみ起動
firebase emulators:start --only firestore,auth

# デバッグモードで起動
firebase emulators:start --debug
```

**アクセス先**:
- React App: http://localhost:3000
- Emulator UI: http://localhost:4000
- Firestore: http://localhost:5000
- Auth: http://localhost:5001

### Docker開発環境

#### 1. Docker環境のセットアップ

```bash
# 初回セットアップ
npm run docker:setup

# 開発環境の起動
npm run docker:dev

# ログの確認
npm run docker:logs

# 環境の停止
npm run docker:down
```

#### 2. Docker Compose設定

```yaml
# docker-compose.dev.yml
version: '3.8'
services:
  react-app-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    depends_on:
      - firebase-emulator-dev

  firebase-emulator-dev:
    image: node:18-alpine
    working_dir: /app
    command: firebase emulators:start
    ports:
      - "4000:4000"
      - "5000:5000"
      - "5001:5001"
      - "9000:9000"
    volumes:
      - .:/app
```

## ステージング環境

### Firebase Hosting ステージング

#### 1. ステージングチャンネルの作成

```bash
# ステージング環境にデプロイ
firebase hosting:channel:deploy staging --expires 7d

# チャンネル一覧の確認
firebase hosting:channel:list

# ステージング環境のURL確認
firebase hosting:channel:open staging
```

#### 2. ステージング環境の設定

```bash
# ステージング用の環境変数設定
cp .env .env.staging

# ステージング用Firebaseプロジェクトの設定
firebase use staging-project-id
```

### ステージング環境の特徴

- **期限付きURL**: 7日間有効
- **独立した環境**: 本番環境に影響しない
- **テストデータ**: 実際のデータを使用可能
- **パフォーマンステスト**: 本番環境と同等の性能

## 本番環境

### Firebase Hosting 本番

#### 1. 本番デプロイの準備

```bash
# 本番用Firebaseプロジェクトの選択
firebase use production-project-id

# 本番用環境変数の確認
cat .env.production
```

#### 2. 本番デプロイ

```bash
# ビルド
npm run build

# 本番デプロイ
firebase deploy

# デプロイ状況の確認
firebase hosting:sites:list
```

#### 3. 本番環境の監視

```bash
# ログの確認
firebase hosting:logs

# パフォーマンスの確認
firebase performance:monitoring
```

### 本番環境の特徴

- **高可用性**: Firebase HostingのCDN
- **自動SSL**: HTTPS対応
- **グローバル配信**: 世界中のエッジサーバー
- **監視・ログ**: 詳細なアクセスログ

## 環境変数の管理

### 環境別設定ファイル

```
.env                    # 開発環境（デフォルト）
.env.local             # ローカル開発用（gitignore）
.env.staging           # ステージング環境
.env.production        # 本番環境
.env.example           # テンプレート
```

### 環境変数の優先順位

1. `.env.local`（最優先）
2. `.env.staging` / `.env.production`
3. `.env`（デフォルト）

### セキュアな環境変数管理

#### 1. 機密情報の管理

```bash
# .env.local（gitignoreに含まれる）
REACT_APP_FIREBASE_API_KEY=your_secret_key
# 管理者認証はFirebase Authenticationを使用（環境変数不要）
```

#### 2. 環境変数の検証

```javascript
// src/utils/configValidator.js
export const validateEnvironment = () => {
  const requiredVars = [
    'REACT_APP_FIREBASE_API_KEY',
    'REACT_APP_FIREBASE_PROJECT_ID',
    'REACT_APP_SHOP_NAME'
  ];
  
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('Missing environment variables:', missing);
    return false;
  }
  
  return true;
};
```

## 環境別設定

### 開発環境の設定

```bash
# .env
NODE_ENV=development
REACT_APP_ENV=development
REACT_APP_DEBUG=true
REACT_APP_FIREBASE_PROJECT_ID=yoon2-salon-dev
```

### ステージング環境の設定

```bash
# .env.staging
NODE_ENV=production
REACT_APP_ENV=staging
REACT_APP_DEBUG=false
REACT_APP_FIREBASE_PROJECT_ID=yoon2-salon-staging
```

### 本番環境の設定

```bash
# .env.production
NODE_ENV=production
REACT_APP_ENV=production
REACT_APP_DEBUG=false
REACT_APP_FIREBASE_PROJECT_ID=yoon2-salon-prod
```

### 環境別ビルドスクリプト

```json
{
  "scripts": {
    "build": "react-scripts build",
    "deploy:staging": "npm run build && firebase hosting:channel:deploy staging",
    "deploy:production": "npm run build && firebase deploy"
  }
}
```

## 環境切り替えの自動化

### スクリプトによる環境切り替え

```bash
#!/bin/bash
# scripts/switch-env.sh

case $1 in
  "dev")
    cp .env .env.current
    firebase use dev-project-id
    echo "Switched to development environment"
    ;;
  "staging")
    cp .env.staging .env.current
    firebase use staging-project-id
    echo "Switched to staging environment"
    ;;
  "production")
    cp .env.production .env.current
    firebase use production-project-id
    echo "Switched to production environment"
    ;;
  *)
    echo "Usage: $0 {dev|staging|production}"
    exit 1
    ;;
esac
```

### GitHub Actions での環境管理

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main, staging]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build for staging
        if: github.ref == 'refs/heads/staging'
        run: npm run build
        env:
          REACT_APP_FIREBASE_PROJECT_ID: ${{ secrets.STAGING_PROJECT_ID }}
      
      - name: Build for production
        if: github.ref == 'refs/heads/main'
        run: npm run build
        env:
          REACT_APP_FIREBASE_PROJECT_ID: ${{ secrets.PRODUCTION_PROJECT_ID }}
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
```

## 環境の監視とログ

### 開発環境の監視

```bash
# 開発サーバーのログ
npm start

# Firebase Emulatorのログ
firebase emulators:start --debug

# Docker環境のログ
npm run docker:logs
```

### 本番環境の監視

```bash
# Firebase Hosting のログ
firebase hosting:logs

# Firebase Functions のログ
firebase functions:log

# リアルタイムログの監視
firebase hosting:logs --follow
```

### パフォーマンス監視

```javascript
// Firebase Performance Monitoring
import { getPerformance } from 'firebase/performance';

const perf = getPerformance(app);

// カスタムメトリクスの追加
import { trace } from 'firebase/performance';

const t = trace(perf, 'custom_trace');
t.start();
// 処理
t.stop();
```

## トラブルシューティング

詳細なトラブルシューティングについては、[トラブルシューティングガイド](../guides/TROUBLESHOOTING.md)を参照してください。

### 環境関連の問題

1. **環境変数が読み込まれない**: 環境変数の確認と開発サーバーの再起動
2. **Firebase プロジェクトの切り替え**: `firebase use` でプロジェクト確認・切り替え
3. **ビルドエラーの解決**: キャッシュクリアと依存関係の再インストール

## 次のステップ

- [詳細セットアップガイド](./DETAILED_SETUP.md)
- [Docker環境での開発](./DOCKER_GUIDE.md)
- [設定ガイド](./CONFIGURATION_GUIDE.md)
- [デプロイメントガイド](../deployment/DEPLOYMENT.md)
