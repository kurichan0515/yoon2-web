# イヤーエステ ホームページ

友達のイヤーエステサロン「yoon² ユンユン」のホームページを作成するプロジェクトです。

## 目次

- [概要](#概要)
- [主な機能](#主な機能)
- [技術スタック](#技術スタック)
- [セットアップ](#セットアップ)
- [開発](#開発)
- [テスト](#テスト)
- [デプロイ](#デプロイ)
- [プロジェクト構造](#プロジェクト構造)
- [開発環境の詳細設定](#開発環境の詳細設定)
- [今後の実装予定](#今後の実装予定)
- [ライセンス](#ライセンス)

## 概要

このプロジェクトは、React（フロントエンド）とFirebase（バックエンド）を使用してイヤーエステサロン「yoon² ユンユン」のホームページを構築します。

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

#### 通常の起動方法
```bash
npm start
```
ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認できます。

#### Docker環境での起動
```bash
# セットアップスクリプトの実行（初回のみ）
npm run docker:setup

# 開発環境の起動
npm run docker:dev

# または直接コマンド
docker compose -f docker-compose.dev.yml up
```

アクセス先：
- **React開発サーバー**: http://localhost:3000
- **Firebase Emulator UI**: http://localhost:4000
- **Firestore Emulator**: http://localhost:5000
- **Firebase Auth Emulator**: http://localhost:5001

## テスト

### 1. ユニットテスト（React Testing Library）

```bash
# 全てのテストを実行
npm test

# テストを継続的に監視
npm test -- --watch

# カバレッジレポートを生成
npm test -- --coverage --watchAll=false
```

### 2. Firebaseエミュレータを使用した統合テスト

```bash
# Firebaseエミュレータを起動
npm run firebase:emulator

# または Docker環境で
npm run docker:dev
```

エミュレータ環境での確認ポイント：
- **認証機能**: http://localhost:5001
- **Firestore データ**: http://localhost:5000
- **全体的な動作**: http://localhost:4000 (Emulator UI)

### 3. Docker環境でのテスト

```bash
# Docker環境でのテスト実行
docker compose -f docker-compose.dev.yml exec react-app-dev npm test

# ログの確認
npm run docker:logs

# 環境の停止
npm run docker:down
```

### 4. 手動テスト・ブラウザ確認

以下の機能を手動でテストしてください：

#### 基本機能
- [ ] ページの読み込み
- [ ] レスポンシブデザイン（モバイル・タブレット・デスクトップ）
- [ ] ナビゲーション

#### SNS連携
- [ ] X（Twitter）リンクの動作
- [ ] Instagramリンクの動作

#### 予約機能（実装後）
- [ ] 予約フォームの表示
- [ ] 予約データの送信
- [ ] 予約確認画面

### プロダクションビルド
```bash
npm run build
```

## デプロイ

### 検証環境へのデプロイ

#### 1. 環境準備

##### 環境変数の設定
```bash
# .envファイルを作成（env.exampleをコピー）
cp env.example .env

# .envファイルを編集して以下の値を設定
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_TWITTER_URL=https://twitter.com/your_account
REACT_APP_INSTAGRAM_URL=https://instagram.com/your_account
```

##### Firebase CLIの設定
```bash
# Firebase CLIにログイン
npm run firebase:login

# プロジェクトの確認
firebase projects:list

# プロジェクトを選択（必要に応じて）
firebase use your-project-id
```

#### 2. デプロイ前のテスト

```bash
# 1. ユニットテストの実行
npm test -- --coverage --watchAll=false

# 2. プロダクションビルドのテスト
npm run build

# 3. ローカルでビルド版を確認
npx serve -s build
# http://localhost:3000 で確認

# 4. Firebase Emulatorでの最終確認
npm run firebase:emulator
```

#### 3. Firebase Hostingへのデプロイ

##### ステージング環境（検証環境）
```bash
# ビルド
npm run build

# ステージング環境へデプロイ
firebase hosting:channel:deploy staging --expires 7d

# または本番環境へデプロイ
npm run firebase:deploy
```

##### デプロイ後の確認
```bash
# デプロイ状況の確認
firebase hosting:channel:list

# サイトのURL確認
firebase hosting:sites:list
```

#### 4. Docker環境でのデプロイ準備

```bash
# 本番用Dockerイメージのビルド
docker build -t yoon2-homepage:latest .

# イメージの確認
docker images | grep yoon2-homepage

# コンテナでの動作確認
docker run -p 3000:3000 yoon2-homepage:latest
```

### デプロイ時のチェックリスト

#### セキュリティ確認
- [ ] 環境変数に機密情報が含まれていないか
- [ ] Firebase Rulesが適切に設定されているか
- [ ] 不要なコンソールログが削除されているか
- [ ] APIキーが適切に制限されているか

#### 機能確認
- [ ] 全ページが正常に表示されるか
- [ ] SNSリンクが正常に動作するか
- [ ] モバイル・タブレットでの表示確認
- [ ] パフォーマンス（Lighthouse等）
- [ ] SEO設定の確認

#### Firestore設定確認
```bash
# Firestoreルールの確認
firebase firestore:rules:get

# インデックスの確認
firebase firestore:indexes

# ルールのデプロイ（必要に応じて）
firebase deploy --only firestore:rules,firestore:indexes
```

### 運用・監視

#### ログの確認
```bash
# Firebase Function logs（Functions使用時）
firebase functions:log

# Firebase Hosting logs
firebase hosting:logs
```

#### パフォーマンス監視
- Firebase Performance Monitoring
- Google Analytics（設定している場合）
- Lighthouseスコアの定期確認

### トラブルシューティング

#### よくある問題と解決方法

1. **ビルドエラー**
   ```bash
   # キャッシュクリア
   npm ci
   rm -rf build
   npm run build
   ```

2. **環境変数が反映されない**
   ```bash
   # .envファイルの確認
   cat .env
   
   # 再起動
   npm start
   ```

3. **Firebase認証エラー**
   ```bash
   # 再ログイン
   firebase logout
   firebase login
   ```

## プロジェクト構造

```
react-firebase-project/
├── public/                      # 静的ファイル
│   ├── images/                 # 画像ファイル
│   │   └── menus/              # メニュー画像
│   └── index.html              # HTMLテンプレート
├── src/                        # ソースコード
│   ├── components/             # Reactコンポーネント
│   ├── pages/                  # ページコンポーネント
│   ├── services/               # Firebase関連のサービス
│   ├── styles/                 # CSS/スタイルファイル
│   ├── utils/                  # ユーティリティ関数
│   └── App.js                  # メインアプリケーション
├── functions/                  # Firebase Functions
├── firebase-export/            # Firebaseエミュレータデータ
├── scripts/                    # セットアップスクリプト
│   └── docker-setup.sh         # Docker環境セットアップ
├── logs/                       # ログファイル
├── build/                      # ビルド出力（自動生成）
├── docker-compose.dev.yml      # Docker開発環境設定
├── docker-compose.yml          # Docker本番環境設定
├── Dockerfile.dev              # Docker開発用イメージ
├── Dockerfile                  # Docker本番用イメージ
├── firebase.json               # Firebase設定
├── firestore.rules             # Firestoreセキュリティルール
├── firestore.indexes.json      # Firestoreインデックス
├── env.example                 # 環境変数テンプレート
├── package.json                # Node.js依存関係
└── README.md                   # このファイル
```

## 開発環境の詳細設定

### Docker環境の詳細

#### 開発用 docker-compose.dev.yml の構成
- **react-app-dev**: React開発サーバー（ポート3000）
- **firebase-emulator-dev**: Firebase Emulatorスイート（ポート4000, 5000, 5001, 9000）
- **test-db**: PostgreSQLテストデータベース（ポート5433）

#### 環境変数の管理
```bash
# 必要な環境変数（.envファイルに設定）
REACT_APP_FIREBASE_API_KEY          # Firebase APIキー
REACT_APP_FIREBASE_AUTH_DOMAIN      # Firebase認証ドメイン
REACT_APP_FIREBASE_PROJECT_ID       # FirebaseプロジェクトID
REACT_APP_FIREBASE_STORAGE_BUCKET   # Firebase Storage バケット
REACT_APP_FIREBASE_MESSAGING_SENDER_ID  # Firebase Messaging送信者ID
REACT_APP_FIREBASE_APP_ID           # Firebase アプリID
REACT_APP_TWITTER_URL               # TwitterアカウントURL
REACT_APP_INSTAGRAM_URL             # InstagramアカウントURL
```

### Firebase Emulator Suite の詳細

#### エミュレータサービス
- **Authentication**: ポート5001 - ユーザー認証のテスト
- **Firestore**: ポート5000 - データベースのテスト
- **Hosting**: ポート9000 - ホスティングのテスト
- **Emulator UI**: ポート4000 - 統合管理画面

#### エミュレータでのテストワークフロー
```bash
# 1. エミュレータ起動
npm run firebase:emulator

# 2. テストデータのインポート（任意）
firebase emulators:export ./firebase-export

# 3. テスト実行
npm test

# 4. 手動テスト
# - http://localhost:4000 でEmulator UI確認
# - http://localhost:3000 でアプリ確認

# 5. データのエクスポート（任意）
firebase emulators:export ./firebase-export
```

#### 推奨テストフロー
1. **ローカル開発**: `npm start` でReactアプリのみ起動
2. **統合テスト**: `npm run docker:dev` でフル環境起動
3. **本格テスト**: `npm run firebase:emulator` + `npm test`
4. **最終確認**: プロダクションビルド + serve でテスト

### CI/CD パイプライン（推奨）

```yaml
# .github/workflows/deploy.yml の例
name: Deploy to Firebase
on:
  push:
    branches: [ main ]
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
    - name: Run tests
      run: npm test -- --coverage --watchAll=false
    - name: Build
      run: npm run build
    - name: Deploy to Firebase
      uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: '${{ secrets.GITHUB_TOKEN }}'
        firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
        projectId: your-project-id
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
