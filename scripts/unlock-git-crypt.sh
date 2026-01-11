#!/bin/bash

# git-crypt 復号化スクリプト
# このスクリプトは、暗号化された.envファイルを復号化します

set -e

echo "🔓 git-crypt の復号化を開始します..."

# git-cryptがインストールされているか確認
if ! command -v git-crypt &> /dev/null; then
    echo "❌ git-crypt がインストールされていません。"
    echo ""
    echo "インストール方法:"
    echo "  Ubuntu/Debian: sudo apt-get install git-crypt"
    echo "  macOS: brew install git-crypt"
    echo "  Windows: https://www.agwa.name/projects/git-crypt/"
    exit 1
fi

# キーファイルを探す
KEY_FILE=$(find . -maxdepth 1 -name ".git-crypt-key-*.key" -type f | head -n 1)

if [ -z "$KEY_FILE" ]; then
    echo "⚠️  キーファイルが見つかりません"
    echo ""
    echo "キーファイルのパスを入力してください:"
    read -p "キーファイルのパス: " KEY_FILE
fi

if [ ! -f "$KEY_FILE" ]; then
    echo "❌ キーファイルが見つかりません: $KEY_FILE"
    exit 1
fi

echo "🔑 キーファイルを使用して復号化します: $KEY_FILE"
git-crypt unlock "$KEY_FILE"

echo ""
echo "✅ 復号化が完了しました"
echo "   .envファイルが使用可能になりました"
