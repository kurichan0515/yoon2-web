# GitHub Actions による自動デプロイ設定

このドキュメントでは、GitHub Actionsを使用してFirebase Hostingへの自動デプロイを設定する方法を説明します。

## 概要

`main`ブランチ（または`master`ブランチ）にプッシュすると、自動的にビルドが実行され、Firebase Hostingにデプロイされます。

## セットアップ手順

### 1. Firebase Service Account の作成

GitHub ActionsからFirebaseにデプロイするには、Firebase Service Accountの認証情報が必要です。

#### 方法A: Firebase CLI を使用する方法（推奨）

1. ローカルでFirebase CLIにログインしていることを確認：
   ```bash
   firebase login
   ```

2. CI用のトークンを取得：
   ```bash
   firebase login:ci
   ```
   
   このコマンドを実行すると、長いトークンが表示されます。このトークンをコピーしてください。

#### 方法B: Google Cloud Console から作成する方法

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. プロジェクト `react-firebase-app-2025` を選択
3. 「IAMと管理」→「サービスアカウント」に移動
4. 「サービスアカウントを作成」をクリック
5. サービスアカウント名を入力（例：`github-actions-deploy`）
6. 「作成して続行」をクリック
7. ロールに「Firebase Admin」を追加
8. 「完了」をクリック
9. 作成したサービスアカウントをクリック
10. 「キー」タブを選択
11. 「キーを追加」→「新しいキーを作成」を選択
12. JSON形式を選択してダウンロード

### 2. GitHub Secrets の設定

GitHubリポジトリの設定で、以下のシークレットを追加します：

1. GitHubリポジトリのページに移動
2. 「Settings」→「Secrets and variables」→「Actions」を選択
3. 「New repository secret」をクリック

#### 方法A: Firebase Tokenを使用する場合（推奨・簡単）

1. ローカルで以下のコマンドを実行：
   ```bash
   firebase login:ci
   ```
   
   このコマンドを実行すると、長いトークンが表示されます。

2. GitHub Secretsに追加：
   - **Name**: `FIREBASE_TOKEN`
   - **Value**: `firebase login:ci`で取得したトークンをコピー＆ペースト

**注意**: この方法を使用する場合、`.github/workflows/deploy.yml`の`firebaseToken`の行が有効になっていることを確認してください（デフォルトで有効になっています）。

#### 方法B: Service Account JSONを使用する場合

1. [Google Cloud Console](https://console.cloud.google.com/)でService Accountを作成（上記の手順参照）
2. JSONキーをダウンロード
3. GitHub Secretsに追加：
   - **Name**: `FIREBASE_SERVICE_ACCOUNT`
   - **Value**: ダウンロードしたJSONファイルの内容全体をコピー＆ペースト

**注意**: この方法を使用する場合、`.github/workflows/deploy.yml`で`firebaseToken`の行をコメントアウトし、`firebaseServiceAccount`の行のコメントを解除してください。

### 3. ワークフローの確認

`.github/workflows/deploy.yml`ファイルが正しく作成されていることを確認してください。

## 使用方法

### 自動デプロイ

`main`ブランチ（または`master`ブランチ）にプッシュすると、自動的にデプロイが開始されます：

```bash
git add .
git commit -m "Update: 変更内容"
git push origin main
```

### 手動デプロイ

GitHubリポジトリの「Actions」タブから手動でワークフローを実行することもできます：

1. GitHubリポジトリの「Actions」タブを開く
2. 左側のメニューから「Deploy to Firebase Hosting」を選択
3. 「Run workflow」ボタンをクリック
4. ブランチを選択して「Run workflow」をクリック

## デプロイの確認

### GitHub Actions での確認

1. GitHubリポジトリの「Actions」タブを開く
2. 実行中のワークフローまたは完了したワークフローをクリック
3. 「build_and_deploy」ジョブをクリックして詳細を確認

### Firebase Console での確認

1. [Firebase Console](https://console.firebase.google.com/)にアクセス
2. プロジェクト `react-firebase-app-2025` を選択
3. 「Hosting」を選択
4. デプロイ履歴を確認

## トラブルシューティング

### デプロイが失敗する場合

1. **認証エラー**
   - `FIREBASE_SERVICE_ACCOUNT`シークレットが正しく設定されているか確認
   - JSONファイルの内容が完全にコピーされているか確認（改行やスペースも含む）

2. **ビルドエラー**
   - ローカルで`npm run build`が成功するか確認
   - GitHub Actionsのログでエラーメッセージを確認

3. **プロジェクトIDの不一致**
   - `.firebaserc`ファイルのプロジェクトIDと`deploy.yml`の`projectId`が一致しているか確認

### ログの確認方法

1. GitHubリポジトリの「Actions」タブを開く
2. 失敗したワークフローをクリック
3. 各ステップのログを確認

## カスタマイズ

### デプロイするブランチを変更する

`.github/workflows/deploy.yml`の`on.push.branches`セクションを編集：

```yaml
on:
  push:
    branches:
      - main
      - develop  # 追加のブランチ
```

### Firestore のルールとインデックスもデプロイする

現在のワークフローはHostingのみをデプロイしています。Firestoreのルールとインデックスもデプロイする場合は、`target`を変更：

```yaml
target: hosting,firestore:rules,firestore:indexes
```

または、すべてをデプロイする場合：

```yaml
target: hosting,firestore
```

### 環境変数の設定

ビルド時に環境変数が必要な場合は、`Build project`ステップに追加：

```yaml
- name: Build project
  run: npm run build
  env:
    NODE_OPTIONS: '--max-old-space-size=4096'
    DISABLE_ESLINT_PLUGIN: 'true'
    REACT_APP_API_URL: '${{ secrets.REACT_APP_API_URL }}'
```

## セキュリティのベストプラクティス

1. **シークレットの管理**
   - `FIREBASE_SERVICE_ACCOUNT`は絶対にリポジトリにコミットしない
   - 定期的にシークレットをローテーションする

2. **ブランチ保護**
   - `main`ブランチにプルリクエスト必須の設定を推奨
   - コードレビューを必須にする

3. **デプロイの承認**
   - 本番環境へのデプロイに承認を必須にしたい場合は、GitHub Environments機能を使用

## 参考リンク

- [Firebase Hosting GitHub Action](https://github.com/FirebaseExtended/action-hosting-deploy)
- [GitHub Actions ドキュメント](https://docs.github.com/ja/actions)
- [Firebase CLI リファレンス](https://firebase.google.com/docs/cli)
