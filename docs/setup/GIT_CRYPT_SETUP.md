# git-crypt セットアップガイド

このプロジェクトでは、機密情報を含む`.env`ファイルを`git-crypt`を使用して暗号化し、gitリポジトリで安全に管理します。

## 目次

- [概要](#概要)
- [前提条件](#前提条件)
- [初回セットアップ](#初回セットアップ)
- [既存のリポジトリに参加する場合](#既存のリポジトリに参加する場合)
- [使用方法](#使用方法)
- [トラブルシューティング](#トラブルシューティング)

## 概要

`git-crypt`は、gitリポジトリ内の特定のファイルを透過的に暗号化/復号化するツールです。

- ✅ `.env`ファイルを暗号化してgit管理
- ✅ コミット/プッシュ時に自動的に暗号化
- ✅ チェックアウト時に自動的に復号化（キーがある場合）
- ✅ 暗号化されていない状態で作業可能

## 前提条件

### git-cryptのインストール

#### Ubuntu/Debian
```bash
sudo apt-get install git-crypt
```

#### macOS
```bash
brew install git-crypt
```

#### Windows
1. [git-cryptのリリースページ](https://github.com/AGWA/git-crypt/releases)から最新版をダウンロード
2. 実行ファイルをPATHに追加

#### インストール確認
```bash
git-crypt --version
```

## 初回セットアップ

### 1. セットアップスクリプトの実行

```bash
chmod +x scripts/setup-git-crypt.sh
./scripts/setup-git-crypt.sh
```

このスクリプトは以下を実行します：
- git-cryptのインストール確認
- git-cryptの初期化
- 暗号化キーのエクスポート

### 2. 暗号化キーの保存

セットアップスクリプトが生成したキーファイル（`.git-crypt-key-*.key`）を**安全な場所**に保存してください。

⚠️ **重要**: このキーがないと、`.env`ファイルを復号化できません。

**推奨される保存方法:**
- パスワードマネージャー（1Password、LastPassなど）
- チーム共有のセキュアなストレージ（AWS Secrets Manager、HashiCorp Vaultなど）
- 暗号化されたUSBメモリ

### 3. .envファイルの追加とコミット

```bash
# .envファイルが存在することを確認
ls -la .env

# ファイルをステージング
git add .env .gitattributes

# コミット（自動的に暗号化されます）
git commit -m "Add encrypted .env file"

# プッシュ
git push
```

## 既存のリポジトリに参加する場合

### 1. リポジトリをクローン

```bash
git clone <repository-url>
cd react-firebase-project
```

### 2. 暗号化キーの取得

チームメンバーまたは管理者から暗号化キー（`.git-crypt-key-*.key`）を取得してください。

### 3. 復号化スクリプトの実行

```bash
chmod +x scripts/unlock-git-crypt.sh
./scripts/unlock-git-crypt.sh
```

キーファイルのパスを入力すると、`.env`ファイルが復号化されます。

### 4. 手動で復号化する場合

```bash
git-crypt unlock <キーファイルのパス>
```

## 使用方法

### 日常的な作業フロー

#### 復号化（作業開始時）

```bash
git-crypt unlock .git-crypt-key-*.key
```

または、復号化スクリプトを使用：

```bash
./scripts/unlock-git-crypt.sh
```

#### 作業

`.env`ファイルを通常通り編集できます。変更は自動的に追跡されます。

```bash
# .envファイルを編集
nano .env

# 変更を確認
git status
git diff .env
```

#### コミットとプッシュ

```bash
git add .env
git commit -m "Update environment variables"
git push
```

コミット時に自動的に暗号化されます。

#### 再暗号化（オプション）

作業終了時に再暗号化したい場合：

```bash
git-crypt lock
```

### キーの共有

新しいチームメンバーにキーを共有する場合：

1. **安全な方法でキーを共有**
   - 暗号化されたメッセージングアプリ（Signal、Keybaseなど）
   - パスワードマネージャーの共有機能
   - 直接会ってUSBメモリで渡す

2. **キーの検証**
   ```bash
   # キーファイルのハッシュを確認
   sha256sum .git-crypt-key-*.key
   ```

3. **復号化の確認**
   ```bash
   git-crypt unlock .git-crypt-key-*.key
   cat .env  # 内容が正しく表示されることを確認
   ```

## トラブルシューティング

### 問題: "git-crypt: not found"

**解決策**: git-cryptがインストールされていません。上記の[インストール手順](#前提条件)を参照してください。

### 問題: "git-crypt unlock: error: repository not unlocked"

**解決策**: キーファイルを使用して明示的に復号化してください：

```bash
git-crypt unlock .git-crypt-key-*.key
```

### 問題: ".envファイルが暗号化されていない"

**解決策**: `.gitattributes`ファイルが正しく設定されているか確認してください：

```bash
cat .gitattributes
# 出力に ".env filter=git-crypt diff=git-crypt" が含まれている必要があります
```

### 問題: "キーファイルが見つからない"

**解決策**: 
1. チームメンバーからキーファイルを取得
2. キーファイルのパスを指定して復号化：

```bash
git-crypt unlock /path/to/.git-crypt-key-*.key
```

### 問題: "git-crypt: error: repository is already unlocked"

**解決策**: 既に復号化されています。何もする必要はありません。

### 問題: コミット時に暗号化されない

**解決策**: 
1. `.gitattributes`がコミットされているか確認：

```bash
git ls-files .gitattributes
```

2. git-cryptが正しく初期化されているか確認：

```bash
git-crypt status
```

3. ファイルを再追加：

```bash
git rm --cached .env
git add .env
git commit -m "Re-add encrypted .env"
```

## セキュリティのベストプラクティス

1. **キーの管理**
   - キーファイルをgitリポジトリにコミットしない
   - キーファイルを複数の場所にバックアップ
   - 定期的にキーをローテーション（必要に応じて）

2. **アクセス制御**
   - キーへのアクセスを必要最小限のメンバーに制限
   - キーの共有は安全なチャネルを使用

3. **監査**
   - 定期的に`.env`ファイルの内容を確認
   - 不要な機密情報が含まれていないか確認

4. **バックアップ**
   - キーファイルのバックアップを複数の場所に保存
   - キーを失った場合の復旧手順を文書化

## 参考リンク

- [git-crypt公式ドキュメント](https://www.agwa.name/projects/git-crypt/)
- [git-crypt GitHubリポジトリ](https://github.com/AGWA/git-crypt)
