# デプロイメントガイド

yoon² イヤーエステサロン ホームページのデプロイメント手順と運用について説明します。

**簡易手順のみ見たい場合** → [DEPLOY_INSTRUCTIONS.md](DEPLOY_INSTRUCTIONS.md)

## 目次

- [デプロイメント概要](#デプロイメント概要)
- [環境別デプロイ](#環境別デプロイ)
- [CI/CD設定](#cicd設定)
- [監視・ログ](#監視ログ)
- [ロールバック手順](#ロールバック手順)
- [トラブルシューティング](#トラブルシューティング)

## デプロイメント概要

### デプロイメント戦略

```
開発環境 → ステージング環境 → 本番環境
    ↓           ↓           ↓
 ローカル     Firebase      Firebase
 開発        Hosting       Hosting
            (ステージング)   (本番)
```

### 使用技術

- **ホスティング**: Firebase Hosting
- **CDN**: Firebase CDN（グローバル配信）
- **SSL**: 自動SSL証明書
- **ドメイン**: カスタムドメイン対応

## 環境別デプロイ

### 開発環境

#### ローカル開発

```bash
# 開発サーバー起動
npm start

# アクセス先
http://localhost:3000
```

#### Firebase Emulator

```bash
# エミュレータ起動
npm run firebase:emulator

# アクセス先
- React App: http://localhost:3000
- Emulator UI: http://localhost:4000
- Firestore: http://localhost:5000
- Auth: http://localhost:5001
```

### ステージング環境

#### デプロイ手順

```bash
# 1. ビルド
npm run build

# 2. ステージング環境にデプロイ
firebase hosting:channel:deploy staging --expires 7d

# 3. デプロイ状況確認
firebase hosting:channel:list
```

#### ステージング環境の特徴

- **期限付きURL**: 7日間有効
- **独立した環境**: 本番環境に影響しない
- **テストデータ**: 実際のデータを使用可能
- **パフォーマンステスト**: 本番環境と同等の性能

#### アクセス方法

```bash
# ステージングURLの取得
firebase hosting:channel:open staging

# または
firebase hosting:channel:list
```

### 本番環境

#### デプロイ手順

```bash
# 1. ビルド
npm run build

# 2. 本番環境にデプロイ
firebase deploy

# 3. デプロイ状況確認
firebase hosting:sites:list
```

#### 本番環境の特徴

- **高可用性**: Firebase HostingのCDN
- **自動SSL**: HTTPS対応
- **グローバル配信**: 世界中のエッジサーバー
- **監視・ログ**: 詳細なアクセスログ

## CI/CD設定

### GitHub Actions

#### 基本的なワークフロー

```yaml
# .github/workflows/deploy.yml
name: Deploy to Firebase

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test -- --coverage --watchAll=false
      
      - name: Build
        run: npm run build
        env:
          REACT_APP_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/staging'
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build for staging
        run: npm run build
        env:
          REACT_APP_FIREBASE_PROJECT_ID: ${{ secrets.STAGING_PROJECT_ID }}
          REACT_APP_FIREBASE_API_KEY: ${{ secrets.STAGING_FIREBASE_API_KEY }}
      
      - name: Deploy to Firebase Staging
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: ${{ secrets.STAGING_PROJECT_ID }}
          channelId: staging

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build for production
        run: npm run build
        env:
          REACT_APP_FIREBASE_PROJECT_ID: ${{ secrets.PRODUCTION_PROJECT_ID }}
          REACT_APP_FIREBASE_API_KEY: ${{ secrets.PRODUCTION_FIREBASE_API_KEY }}
      
      - name: Deploy to Firebase Production
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: ${{ secrets.PRODUCTION_PROJECT_ID }}
```

#### 必要なSecrets

GitHubリポジトリのSettings > Secrets and variables > Actionsで設定：

```
FIREBASE_SERVICE_ACCOUNT    # Firebase Service Account JSON
STAGING_PROJECT_ID         # ステージング環境のプロジェクトID
PRODUCTION_PROJECT_ID      # 本番環境のプロジェクトID
STAGING_FIREBASE_API_KEY   # ステージング環境のAPIキー
PRODUCTION_FIREBASE_API_KEY # 本番環境のAPIキー
```

### デプロイメント戦略

#### 1. ブルー・グリーンデプロイメント

```bash
# ステージング環境でテスト
firebase hosting:channel:deploy staging --expires 7d

# テスト完了後、本番環境にデプロイ
firebase deploy
```

#### 2. カナリアリリース

```bash
# 一部のユーザーに新機能を公開
firebase hosting:channel:deploy canary --expires 3d

# 問題がなければ本番環境にデプロイ
firebase deploy
```

## 監視・ログ

### Firebase Hosting の監視

#### アクセスログの確認

```bash
# リアルタイムログ
firebase hosting:logs --follow

# 特定の期間のログ
firebase hosting:logs --since 2024-01-01 --until 2024-01-31
```

#### パフォーマンス監視

```javascript
// Firebase Performance Monitoring
import { getPerformance } from 'firebase/performance';

const perf = getPerformance(app);

// カスタムメトリクス
import { trace } from 'firebase/performance';

const t = trace(perf, 'page_load');
t.start();
// ページ読み込み処理
t.stop();
```

### エラー監視

#### Firebase Crashlytics（将来実装）

```javascript
// エラーの自動収集
import { getAnalytics } from 'firebase/analytics';
import { getCrashlytics } from 'firebase/crashlytics';

const analytics = getAnalytics(app);
const crashlytics = getCrashlytics(app);

// カスタムエラーの報告
crashlytics.recordError(error);
```

#### カスタムエラー監視

```javascript
// utils/errorMonitoring.js
export const reportError = (error, context = {}) => {
  console.error('Error occurred:', error, context);
  
  // 外部サービスに送信（Sentry等）
  if (process.env.NODE_ENV === 'production') {
    // Sentry.captureException(error, { extra: context });
  }
};
```

### アラート設定

#### Firebase Console での設定

1. **Firebase Console** → **Monitoring** → **Alerts**
2. **Create Alert** をクリック
3. 条件を設定：
   - エラー率が閾値を超えた場合
   - レスポンス時間が閾値を超えた場合
   - アクセス数が異常に多い場合

#### 通知設定

```yaml
# アラート条件例
- name: "High Error Rate"
  condition: "error_rate > 0.05"
  notification: "email:admin@example.com"
  
- name: "Slow Response"
  condition: "response_time > 2000ms"
  notification: "slack:#alerts"
```

## ロールバック手順

### 緊急ロールバック

#### 1. 前のバージョンに戻す

```bash
# デプロイ履歴の確認
firebase hosting:releases:list

# 前のバージョンにロールバック
firebase hosting:releases:rollback

# 特定のリリースにロールバック
firebase hosting:releases:rollback <release-id>
```

#### 2. データベースのロールバック

```bash
# Firestore のバックアップから復元
firebase firestore:export gs://your-bucket/backup-2024-01-15

# バックアップから復元
firebase firestore:import gs://your-bucket/backup-2024-01-15
```

### 段階的ロールバック

#### 1. ステージング環境での検証

```bash
# ステージング環境でテスト
firebase hosting:channel:deploy staging --expires 1d

# 問題がなければ本番環境に適用
firebase deploy
```

#### 2. カナリアリリースでの検証

```bash
# 一部のユーザーに新機能を公開
firebase hosting:channel:deploy canary --expires 1d

# 問題がなければ全ユーザーに公開
firebase deploy
```

## トラブルシューティング

詳細なトラブルシューティングについては、[トラブルシューティングガイド](../guides/TROUBLESHOOTING.md)を参照してください。

### デプロイ関連の問題

1. **デプロイが失敗する**: Firebase CLIの更新と再ログイン
2. **ビルドが失敗する**: 依存関係の再インストールとキャッシュクリア
3. **環境変数が反映されない**: 環境変数の確認と再ビルド
4. **サイトが表示されない**: デプロイ状況の確認と再デプロイ

## 運用チェックリスト

### デプロイ前チェック

- [ ] テストが全て通る
- [ ] ビルドが成功する
- [ ] 環境変数が正しく設定されている
- [ ] セキュリティ設定が適切
- [ ] パフォーマンステストが通る

### デプロイ後チェック

- [ ] サイトが正常に表示される
- [ ] 全ページがアクセス可能
- [ ] フォームが正常に動作する
- [ ] 管理者機能が正常に動作する
- [ ] モバイル表示が正常
- [ ] パフォーマンスが良好

### 定期メンテナンス

- [ ] 依存関係の更新
- [ ] セキュリティパッチの適用
- [ ] パフォーマンス監視
- [ ] ログの確認
- [ ] バックアップの確認

## 次のステップ

- [環境セットアップガイド](../setup/ENVIRONMENT_SETUP.md)
- [設定ガイド](../setup/CONFIGURATION_GUIDE.md)
- [アーキテクチャドキュメント](../architecture/ARCHITECTURE.md)
- [ユーザーガイド](../guides/USER_GUIDE.md)
