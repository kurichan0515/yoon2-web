# クイックスタートガイド

yoon² イヤーエステサロン ホームページのセットアップを素早く開始するためのガイドです。

## 前提条件

- Node.js (v14以上)
- npm または yarn
- Git
- Firebase CLI（オプション）

## 1. リポジトリのクローン

```bash
git clone <repository-url>
cd react-firebase-project
```

## 2. 依存関係のインストール

```bash
npm install
```

## 3. 環境変数の設定

```bash
# 環境変数ファイルをコピー
cp env.example .env

# .envファイルを編集
nano .env
```

### 必要な環境変数

```bash
# Firebase設定
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# SNS設定
REACT_APP_TWITTER_URL=https://twitter.com/your_account
REACT_APP_INSTAGRAM_URL=https://instagram.com/your_account
REACT_APP_LINE_URL=https://lin.ee/your_line_id

# 店舗情報
REACT_APP_SHOP_NAME=yoon²ゆんゆん
REACT_APP_SHOP_PHONE=080-8478-1163
REACT_APP_SHOP_ADDRESS=愛媛県松山市清水町３丁目２０１－２ ８Ｄｒｏｐｓ １０２号室
```

## 4. 開発サーバーの起動

```bash
npm start
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認できます。

## 5. Firebase設定（本格運用時）

### Firebase CLIのインストール

```bash
npm install -g firebase-tools
```

### Firebaseにログイン

```bash
firebase login
```

### Firebaseプロジェクトの初期化

```bash
firebase init
```

### デプロイ

```bash
npm run build
firebase deploy
```

## トラブルシューティング

詳細なトラブルシューティングについては、[トラブルシューティングガイド](../guides/TROUBLESHOOTING.md)を参照してください。

### よくある問題

1. **ポート3000が使用中**: `PORT=3001 npm start`
2. **依存関係のエラー**: `rm -rf node_modules package-lock.json && npm install`
3. **Firebase接続エラー**: 環境変数の確認とFirebaseプロジェクトの有効性確認

## 次のステップ

- [詳細セットアップガイド](./DETAILED_SETUP.md)
- [Docker環境での開発](./DOCKER_GUIDE.md)
- [設定ガイド](./CONFIGURATION_GUIDE.md)
