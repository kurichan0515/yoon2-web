# Google Search Console 自動サイトマップ送信設定

デプロイ時に自動的にGoogle Search Consoleにサイトマップを送信する設定手順です。

## 概要

GitHub Actionsのデプロイワークフローに、Google Search Console APIを使用した自動サイトマップ送信機能を追加します。

## 前提条件

- ✅ Google Cloudプロジェクトが作成されている
- ✅ Google Search Consoleでサイトの所有権が確認済み
- ✅ GitHub Actionsのデプロイワークフローが設定済み

## セットアップ手順

### ステップ1: Google Search Console APIを有効化

1. **Google Cloud Consoleにアクセス**
   - https://console.cloud.google.com/ にアクセス
   - プロジェクトを選択（Firebaseプロジェクトと同じプロジェクトを使用）

2. **Search Console APIを有効化**
   - 左メニューから「APIとサービス」→「ライブラリ」を選択
   - 検索ボックスに「Google Search Console API」と入力
   - 「Google Search Console API」をクリック
   - 「有効にする」をクリック

### ステップ2: サービスアカウントの作成

1. **サービスアカウントを作成**
   - 左メニューから「IAMと管理」→「サービスアカウント」を選択
   - 「サービスアカウントを作成」をクリック
   - サービスアカウント名を入力（例：`search-console-sitemap-submitter`）
   - 「作成して続行」をクリック
   - ロールは設定不要（このまま「続行」をクリック）
   - 「完了」をクリック

2. **JSONキーをダウンロード**
   - 作成したサービスアカウントをクリック
   - 「キー」タブを選択
   - 「キーを追加」→「新しいキーを作成」を選択
   - キーのタイプで「JSON」を選択
   - 「作成」をクリックしてJSONファイルをダウンロード

### ステップ3: Google Search Consoleでサービスアカウントに権限を付与

1. **Search Consoleにアクセス**
   - https://search.google.com/search-console にアクセス
   - プロパティ `https://yoon2.com` を選択

2. **設定を開く**
   - 左メニューから「設定」を選択
   - 「ユーザーと権限」セクションを開く

3. **サービスアカウントを追加**
   - 「ユーザーを追加」をクリック
   - サービスアカウントのメールアドレスを入力
     - 形式: `search-console-sitemap-submitter@[PROJECT-ID].iam.gserviceaccount.com`
     - メールアドレスは、ダウンロードしたJSONファイルの`client_email`フィールドに記載されています
   - 権限は「所有者」または「フル」を選択
   - 「追加」をクリック

**重要**: サービスアカウントのメールアドレスは、ダウンロードしたJSONファイルの`client_email`フィールドで確認できます。

### ステップ4: GitHub Secretsの設定

1. **GitHubリポジトリの設定を開く**
   - GitHubリポジトリのページに移動
   - 「Settings」→「Secrets and variables」→「Actions」を選択

2. **サービスアカウントJSONを追加**
   - 「New repository secret」をクリック
   - **Name**: `GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT`
   - **Value**: ダウンロードしたJSONファイルの内容全体をコピー＆ペースト
     - JSONファイルを開いて、すべての内容をコピー
     - 改行やスペースも含めて完全にコピー

3. **サイトURLを追加（オプション）**
   - 「New repository secret」をクリック
   - **Name**: `SEARCH_CONSOLE_SITE_URL`
   - **Value**: `https://yoon2.com`
     - これはスクリプトで使用されます

### ステップ5: サイトマップ送信スクリプトの確認

`scripts/submit-sitemap.js`ファイルが作成されていることを確認してください。

このスクリプトは：
- Google Search Console APIを使用してサイトマップを送信
- エラーハンドリングを含む
- ログ出力でデバッグ可能

### ステップ6: デプロイワークフローの確認

`.github/workflows/deploy.yml`に以下のステップが追加されていることを確認：

```yaml
- name: Submit sitemap to Google Search Console
  run: node scripts/submit-sitemap.js
  env:
    GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT: ${{ secrets.GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT }}
    SEARCH_CONSOLE_SITE_URL: ${{ secrets.SEARCH_CONSOLE_SITE_URL }}
```

## 動作確認

### デプロイ後の確認

1. **GitHub Actionsのログを確認**
   - GitHubリポジトリの「Actions」タブを開く
   - 最新のデプロイワークフローをクリック
   - 「Submit sitemap to Google Search Console」ステップのログを確認
   - 「Sitemap submitted successfully」と表示されれば成功

2. **Google Search Consoleで確認**
   - https://search.google.com/search-console にアクセス
   - 左メニューから「Sitemap」を選択
   - `sitemap.xml`が表示され、ステータスが「成功」になっていることを確認

## トラブルシューティング

### エラー: "Permission denied"

**原因**: サービスアカウントにSearch Consoleの権限が付与されていない

**解決方法**:
1. Google Search Consoleの「設定」→「ユーザーと権限」でサービスアカウントのメールアドレスが追加されているか確認
2. 権限が「所有者」または「フル」になっているか確認

### エラー: "API not enabled"

**原因**: Google Search Console APIが有効化されていない

**解決方法**:
1. Google Cloud Consoleで「APIとサービス」→「ライブラリ」を開く
2. 「Google Search Console API」を検索して有効化

### エラー: "Invalid JSON"

**原因**: GitHub SecretsのJSONが正しくコピーされていない

**解決方法**:
1. JSONファイルを再度開いて、すべての内容をコピー
2. GitHub Secretsを削除して再作成
3. 改行やスペースも含めて完全にコピーすることを確認

### エラー: "Site URL not found"

**原因**: サイトURLが正しく設定されていない

**解決方法**:
1. GitHub Secretsの`SEARCH_CONSOLE_SITE_URL`が`https://yoon2.com`になっているか確認
2. Google Search Consoleでサイトの所有権が確認済みか確認

## セキュリティの注意事項

1. **JSONキーの管理**
   - サービスアカウントのJSONキーは絶対にリポジトリにコミットしない
   - GitHub Secretsのみに保存する
   - 定期的にキーをローテーションすることを推奨

2. **権限の最小化**
   - サービスアカウントには必要最小限の権限のみを付与
   - Search Consoleの「フル」権限で十分（「所有者」権限は不要な場合がある）

3. **ログの確認**
   - デプロイ後は必ずGitHub Actionsのログを確認
   - エラーが発生した場合はすぐに対応

## 参考リンク

- [Google Search Console API ドキュメント](https://developers.google.com/webmaster-tools/search-console-api-original)
- [Google Cloud Service Accounts](https://cloud.google.com/iam/docs/service-accounts)
- [GitHub Actions Secrets](https://docs.github.com/ja/actions/security-guides/encrypted-secrets)
