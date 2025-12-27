# トラブルシューティングガイド

yoon² イヤーエステサロン ホームページの開発・運用で発生する可能性のある問題と解決方法をまとめています。

## 目次

- [開発環境の問題](#開発環境の問題)
- [Firebase関連の問題](#firebase関連の問題)
- [ビルド・デプロイの問題](#ビルドデプロイの問題)
- [パフォーマンスの問題](#パフォーマンスの問題)
- [よくある質問](#よくある質問)

## 開発環境の問題

### 1. 依存関係のエラー

**症状**: `Module not found` エラー、パッケージのインストールエラー

**解決方法**:
```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install

# キャッシュをクリア
npm cache clean --force

# 特定のパッケージを再インストール
npm install package-name --save
```

### 2. ポート競合エラー

**症状**: `EADDRINUSE: address already in use :::3000`

**解決方法**:
```bash
# 別のポートで起動
PORT=3001 npm start

# または、使用中のプロセスを終了
lsof -ti:3000 | xargs kill -9

# Windowsの場合
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### 3. 開発サーバーが起動しない

**症状**: `npm start` でエラーが発生

**解決方法**:
```bash
# Node.jsのバージョン確認
node --version
npm --version

# 推奨バージョン: Node.js v14以上
# 古いバージョンの場合は更新
nvm install 18
nvm use 18

# 依存関係の再インストール
rm -rf node_modules package-lock.json
npm install
```

## Firebase関連の問題

### 1. Firebase接続エラー

**症状**: `Firebase: Error (auth/invalid-api-key)`

**解決方法**:
1. 環境変数が正しく設定されているか確認
2. `.env`ファイルがプロジェクトルートにあるか確認
3. 開発サーバーを再起動

```bash
# 環境変数の確認
cat .env

# 開発サーバーを再起動
npm start
```

### 2. Firebase Emulatorのエラー

**症状**: Emulatorが起動しない

**解決方法**:
```bash
# Firebase CLIを更新
npm install -g firebase-tools@latest

# Emulatorを再起動
firebase emulators:start --only firestore,auth

# デバッグモードで起動
firebase emulators:start --debug
```

### 3. Firestore接続エラー

**症状**: データベースにアクセスできない

**解決方法**:
```bash
# Firebaseプロジェクトの確認
firebase use

# プロジェクトの切り替え
firebase use your-project-id

# エミュレータのリセット
firebase emulators:start --import=./firebase-export
```

## ビルド・デプロイの問題

### 1. ビルドエラー

**症状**: `npm run build` でエラーが発生

**解決方法**:
```bash
# キャッシュのクリア
npm cache clean --force

# node_modulesの再インストール
rm -rf node_modules package-lock.json
npm install

# ビルドの再実行
npm run build
```

### 2. デプロイエラー

**症状**: `firebase deploy` でエラーが発生

**解決方法**:
```bash
# Firebase CLIの更新
npm install -g firebase-tools@latest

# 再ログイン
firebase logout
firebase login

# プロジェクトの確認
firebase use

# 再デプロイ
firebase deploy
```

### 3. 環境変数が反映されない

**症状**: 本番環境で環境変数が正しく読み込まれない

**解決方法**:
```bash
# 環境変数の確認
echo $REACT_APP_FIREBASE_API_KEY

# ビルド時の環境変数確認
npm run build 2>&1 | grep REACT_APP

# 再ビルド・再デプロイ
npm run build
firebase deploy
```

### 4. メモリ不足エラー（終了コード137）

**症状**: ビルドやDockerコンテナが終了コード137で終了する

**原因**: メモリ不足（OOM - Out of Memory）でプロセスが強制終了された

**解決方法**:

#### WSL2環境の場合

1. **WSL2のメモリ設定を調整**（Windows側で実行）:
   - `C:\Users\<ユーザー名>\.wslconfig` ファイルを作成または編集
   ```ini
   [wsl2]
   memory=8GB
   processors=4
   swap=4GB
   ```
   - WSL2を再起動: PowerShellで `wsl --shutdown` を実行

2. **Node.jsのメモリ制限を設定**:
   ```bash
   # ビルド時にメモリ制限を設定
   NODE_OPTIONS=--max-old-space-size=4096 npm run build
   
   # または低メモリ環境用のビルドコマンドを使用
   npm run build:low-memory
   ```

3. **Dockerコンテナのメモリ制限を確認**:
   ```bash
   # docker-compose.dev.ymlにメモリ制限が設定されているか確認
   # 設定済みの場合は、必要に応じて調整
   ```

#### 一般的な対処法

1. **他のプロセスを終了**: メモリを消費している他のアプリケーションを終了
2. **ビルドキャッシュをクリア**:
   ```bash
   npm cache clean --force
   rm -rf node_modules build
   npm install
   ```
3. **段階的なビルド**: 大きなプロジェクトの場合は、コード分割を検討

## パフォーマンスの問題

### 1. ページの読み込みが遅い

**症状**: サイトの表示が遅い

**解決方法**:
- 画像の最適化
- 不要なライブラリの削除
- コード分割の実装
- CDNの活用

### 2. メモリリーク

**症状**: 長時間使用するとメモリ使用量が増加

**解決方法**:
```javascript
// useEffectのクリーンアップ
useEffect(() => {
  const subscription = someService.subscribe();
  return () => subscription.unsubscribe();
}, []);

// イベントリスナーの削除
useEffect(() => {
  const handleResize = () => {};
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

## よくある質問

### Q. 開発環境と本番環境で動作が異なる

**A.** 環境変数の設定を確認してください：
```bash
# 開発環境
cat .env

# 本番環境
firebase hosting:logs
```

### Q. 管理者ログインできない

**A.** Firebase Authenticationの設定を確認：
1. Firebase ConsoleでAuthenticationが有効か確認
2. 管理者アカウントが作成されているか確認
3. セキュリティルールが正しく設定されているか確認

### Q. 予約データが表示されない

**A.** Firestoreの設定を確認：
1. データベースが作成されているか確認
2. セキュリティルールが適切か確認
3. インデックスが作成されているか確認

### Q. モバイル表示が崩れる

**A.** レスポンシブデザインの確認：
1. ビューポートの設定確認
2. CSS メディアクエリの確認
3. ブラウザの開発者ツールでモバイル表示をテスト

## デバッグのヒント

### 1. ログの確認

```bash
# 開発サーバーのログ
npm start

# Firebase Emulatorのログ
firebase emulators:start --debug

# Docker環境のログ
npm run docker:logs
```

### 2. ブラウザの開発者ツール

- **Console**: JavaScriptエラーの確認
- **Network**: APIリクエストの確認
- **Application**: Local Storage、Session Storageの確認

### 3. Firebase Consoleでの確認

- **Authentication**: ユーザー認証の状態
- **Firestore**: データベースの内容
- **Hosting**: デプロイ状況

## 緊急時の対応

### 1. サイトが表示されない

```bash
# デプロイ状況の確認
firebase hosting:sites:list

# 再デプロイ
firebase deploy --only hosting
```

### 2. データベースエラー

```bash
# Firestoreの状態確認
firebase firestore:indexes

# セキュリティルールの確認
firebase firestore:rules:get
```

### 3. 完全なリセット

```bash
# ローカル環境のリセット
rm -rf node_modules package-lock.json
npm install

# Firebase プロジェクトのリセット
firebase use --clear
firebase login
firebase use your-project-id
```

## サポート

### 技術的な問題

- **開発者**: プロジェクトの開発者にお問い合わせ
- **GitHub Issues**: バグ報告・機能要望

### 運営に関する問題

- **公式LINE**: https://lin.ee/lyyKSqu
- **電話**: 080-8478-1163（お電話に出ることができません）

---

このガイドは、問題の解決に役立つ情報を継続的に更新しています。
