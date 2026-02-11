# デプロイ手順

## 現在の状態

- ✅ SocialFeedコンポーネント: Instagramリンクのみ表示（最新情報はコメントアウト）
- ✅ AdminSettingsコンポーネント: 基本設定機能
- ✅ @マークの重複問題: 修正済み

## デプロイ手順

### 1. ビルドの実行

```bash
cd /home/kurichan0515/hobby/react-firebase-project
npm run build
```

### 2. ビルドが成功したら、Firebaseにデプロイ

```bash
firebase deploy --only hosting
```

または、すべてをデプロイする場合：

```bash
firebase deploy
```

### 3. デプロイ状況の確認

```bash
firebase hosting:sites:list
```

## トラブルシューティング

### WSL接続エラーの場合

WSL接続が不安定な場合は、以下の方法を試してください：

1. **WSLを再起動**
   ```bash
   # Windows PowerShellで実行
   wsl --shutdown
   wsl
   ```

2. **直接ターミナルで実行**
   - Windows PowerShellまたはコマンドプロンプトから直接実行
   - または、WSLターミナルを直接開いて実行

3. **ビルドのみ先に実行**
   ```bash
   npm run build
   ```
   ビルドが成功したら、`build`フォルダが作成されます。

### ビルドエラーの場合

エラーメッセージを確認して、不足しているファイルや依存関係を確認してください。

## デプロイ後の確認

1. Firebase HostingのURLにアクセス
2. Instagramリンクが正しく表示されるか確認
3. @マークが重複していないか確認
