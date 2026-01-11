# GitHub認証設定ガイド（WSL2環境）

WSL2環境でGitHubとの接続が不安定になる問題の解決方法です。

## 問題の原因

WSL2環境でGitHub接続が不安定になる主な原因：

1. **Git認証情報ヘルパーが設定されていない**
   - 認証情報が保存されず、毎回入力が必要
   - WSLとWindows間で認証情報が共有されていない

2. **HTTPS認証の問題**
   - GitHubは2021年8月以降、パスワード認証を廃止
   - Personal Access Token (PAT) が必要
   - トークンが適切に保存されていない

3. **SSH鍵が設定されていない**
   - SSH認証の方が安定しているが、設定されていない

## 解決方法

### 方法1: Git認証情報ヘルパーを設定（推奨）

#### 1-1. 認証情報ヘルパーを設定

```bash
# Git認証情報をファイルに保存する設定
git config --global credential.helper store

# または、キャッシュを使用（15分間有効）
git config --global credential.helper 'cache --timeout=3600'
```

#### 1-2. GitHub Personal Access Tokenを作成

1. **GitHubにログイン**
   - https://github.com/settings/tokens にアクセス

2. **Personal Access Tokenを作成**
   - 「Generate new token」→「Generate new token (classic)」をクリック
   - Note: `WSL2 Git Access` など適当な名前を入力
   - Expiration: 90 days または No expiration（推奨）
   - Select scopes:
     - ✅ `repo` (すべてのリポジトリへのアクセス)
     - ✅ `workflow` (GitHub Actionsの使用)
   - 「Generate token」をクリック

3. **トークンをコピー**
   - ⚠️ **重要**: このトークンは一度しか表示されません。必ずコピーして保存してください

#### 1-3. 初回プッシュ時にトークンを入力

```bash
git push
```

プロンプトが表示されたら：
- **Username**: `kurichan0515`（GitHubのユーザー名）
- **Password**: 作成したPersonal Access Token（パスワードではない）

これで認証情報が `~/.git-credentials` に保存され、次回以降は自動的に使用されます。

### 方法2: SSH認証を使用（最も安定）

#### 2-1. SSH鍵を生成

```bash
# SSH鍵を生成（既に存在する場合はスキップ）
ssh-keygen -t ed25519 -C "abingdon0515@gmail.com"

# プロンプトが表示されたら：
# - Enter file in which to save the key: Enterキー（デフォルト）
# - Enter passphrase: Enterキー（空欄でもOK、セキュリティ重視の場合はパスフレーズを設定）
```

#### 2-2. SSH鍵をGitHubに登録

```bash
# 公開鍵を表示
cat ~/.ssh/id_ed25519.pub
```

1. **GitHubにログイン**
   - https://github.com/settings/keys にアクセス

2. **新しいSSH鍵を追加**
   - 「New SSH key」をクリック
   - Title: `WSL2 Ubuntu` など適当な名前
   - Key: 上記でコピーした公開鍵を貼り付け
   - 「Add SSH key」をクリック

#### 2-3. SSH接続をテスト

```bash
# GitHubへのSSH接続をテスト
ssh -T git@github.com
```

成功すると以下のメッセージが表示されます：
```
Hi kurichan0515! You've successfully authenticated, but GitHub does not provide shell access.
```

#### 2-4. リモートURLをSSHに変更

```bash
cd /home/kurichan0515/hobby/react-firebase-project
git remote set-url origin git@github.com:kurichan0515/React-FireBase.git

# 確認
git remote -v
```

これで `git push` がSSH認証で動作します。

### 方法3: Windows Git Credential Managerを使用（WSL2とWindows間で共有）

#### 3-1. Git Credential Managerをインストール

```bash
# WSL2内で実行
sudo apt-get update
sudo apt-get install git-credential-manager-core
```

#### 3-2. 認証情報ヘルパーを設定

```bash
git config --global credential.credentialStore cache
git config --global credential.helper manager-core
```

#### 3-3. 初回プッシュ時に認証

```bash
git push
```

ブラウザが開いてGitHubにログインするよう求められます。

## 推奨設定

### SSH認証を使用する場合（最も安定）

```bash
# 1. SSH鍵を生成（まだの場合）
ssh-keygen -t ed25519 -C "abingdon0515@gmail.com"

# 2. 公開鍵をGitHubに登録
cat ~/.ssh/id_ed25519.pub
# ↑ これをコピーして https://github.com/settings/keys に登録

# 3. SSH接続をテスト
ssh -T git@github.com

# 4. リモートURLをSSHに変更
cd /home/kurichan0515/hobby/react-firebase-project
git remote set-url origin git@github.com:kurichan0515/React-FireBase.git

# 5. 動作確認
git push
```

### HTTPS認証を使用する場合

```bash
# 1. 認証情報ヘルパーを設定
git config --global credential.helper store

# 2. Personal Access Tokenを作成
# https://github.com/settings/tokens で作成

# 3. 初回プッシュ時にトークンを入力
git push
# Username: kurichan0515
# Password: <Personal Access Token>
```

## トラブルシューティング

### 認証エラーが発生する場合

```bash
# 保存されている認証情報を確認
cat ~/.git-credentials

# 認証情報を削除して再設定
rm ~/.git-credentials
git config --global --unset credential.helper
git config --global credential.helper store
```

### SSH接続が失敗する場合

```bash
# SSH接続を詳細モードでテスト
ssh -vT git@github.com

# SSH鍵の権限を確認
ls -la ~/.ssh/
# id_ed25519 は 600、id_ed25519.pub は 644 である必要がある

# 権限を修正
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
```

### WSL2を再起動したら認証情報が消えた

```bash
# 認証情報ヘルパーを再設定
git config --global credential.helper store

# または、SSH認証を使用（推奨）
git remote set-url origin git@github.com:kurichan0515/React-FireBase.git
```

## 現在の設定を確認

```bash
# Git設定を確認
git config --global --list

# リモートURLを確認
git remote -v

# 認証情報ヘルパーを確認
git config --global credential.helper

# SSH鍵の存在を確認
ls -la ~/.ssh/
```

## 参考リンク

- [GitHub Personal Access Tokens](https://docs.github.com/ja/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [GitHub SSH Keys](https://docs.github.com/ja/authentication/connecting-to-github-with-ssh)
- [Git Credential Storage](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%83%84%E3%83%BC%E3%83%AB-%E8%AA%8D%E8%A8%BC%E6%83%85%E5%A0%B1%E3%81%AE%E4%BF%9D%E5%AD%98)
