#!/bin/bash

# GitHub認証設定スクリプト（WSL2環境用）
# 使用方法: ./scripts/setup-github-auth.sh [ssh|https]

set -e

# 色の定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 関数: メッセージ表示
info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 引数の確認
AUTH_METHOD=${1:-ssh}

if [ "$AUTH_METHOD" != "ssh" ] && [ "$AUTH_METHOD" != "https" ]; then
    error "使用方法: $0 [ssh|https]"
    exit 1
fi

info "GitHub認証設定を開始します（方法: $AUTH_METHOD）"

# Git設定の確認
info "現在のGit設定を確認中..."
git config --global user.name || warn "user.nameが設定されていません"
git config --global user.email || warn "user.emailが設定されていません"

# SSH認証の設定
if [ "$AUTH_METHOD" = "ssh" ]; then
    info "SSH認証を設定します..."
    
    # SSH鍵の存在確認
    if [ -f ~/.ssh/id_ed25519 ] || [ -f ~/.ssh/id_rsa ]; then
        info "既存のSSH鍵が見つかりました"
        ls -la ~/.ssh/id_* 2>/dev/null || true
    else
        info "SSH鍵を生成します..."
        read -p "メールアドレスを入力してください (デフォルト: abingdon0515@gmail.com): " email
        email=${email:-abingdon0515@gmail.com}
        
        ssh-keygen -t ed25519 -C "$email" -f ~/.ssh/id_ed25519 -N ""
        info "SSH鍵を生成しました: ~/.ssh/id_ed25519"
    fi
    
    # 公開鍵の表示
    info "公開鍵を表示します（これをGitHubに登録してください）:"
    echo ""
    if [ -f ~/.ssh/id_ed25519.pub ]; then
        cat ~/.ssh/id_ed25519.pub
    elif [ -f ~/.ssh/id_rsa.pub ]; then
        cat ~/.ssh/id_rsa.pub
    fi
    echo ""
    
    # SSH鍵の権限を設定
    chmod 700 ~/.ssh
    if [ -f ~/.ssh/id_ed25519 ]; then
        chmod 600 ~/.ssh/id_ed25519
        chmod 644 ~/.ssh/id_ed25519.pub
    fi
    if [ -f ~/.ssh/id_rsa ]; then
        chmod 600 ~/.ssh/id_rsa
        chmod 644 ~/.ssh/id_rsa.pub
    fi
    
    # SSH接続のテスト
    info "GitHubへのSSH接続をテストします..."
    if ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
        info "SSH接続が成功しました！"
    else
        warn "SSH接続が失敗しました。公開鍵をGitHubに登録してください:"
        warn "https://github.com/settings/keys"
    fi
    
    # リモートURLをSSHに変更
    if [ -d .git ]; then
        current_url=$(git remote get-url origin 2>/dev/null || echo "")
        if [[ "$current_url" == https://* ]]; then
            info "リモートURLをSSHに変更します..."
            git remote set-url origin git@github.com:kurichan0515/React-FireBase.git
            info "リモートURLを変更しました"
        else
            info "リモートURLは既にSSH形式です"
        fi
        git remote -v
    fi

# HTTPS認証の設定
else
    info "HTTPS認証を設定します..."
    
    # 認証情報ヘルパーを設定
    git config --global credential.helper store
    info "認証情報ヘルパーを設定しました（store）"
    
    warn "Personal Access Tokenが必要です:"
    warn "1. https://github.com/settings/tokens にアクセス"
    warn "2. 'Generate new token (classic)' をクリック"
    warn "3. 'repo' スコープを選択"
    warn "4. トークンを生成してコピー"
    warn ""
    warn "次回の git push 時に以下を入力してください:"
    warn "  Username: kurichan0515"
    warn "  Password: <Personal Access Token>"
fi

# Git設定の確認
info "現在のGit設定:"
echo ""
git config --global --list | grep -E "(user|credential|remote)" || true
echo ""

info "設定が完了しました！"
info "動作確認: git push"
