#!/bin/bash

# git-crypt 情報表示スクリプト

echo "🔍 git-crypt 情報を確認しています..."
echo ""

# git-cryptがインストールされているか確認
if ! command -v git-crypt &> /dev/null; then
    echo "❌ git-crypt がインストールされていません。"
    exit 1
fi

echo "📊 git-crypt の状態:"
git-crypt status 2>&1 | head -5
echo ""

# リポジトリがロックされているか確認
if git-crypt status 2>&1 | grep -q "not unlocked"; then
    echo "⚠️  リポジトリはロックされています"
    echo ""
    echo "現在のキーをエクスポートするには、まずunlockする必要があります。"
    echo ""
    echo "既存のキーファイルを探しています..."
    KEY_FILE=$(find . -maxdepth 1 -name ".git-crypt-key-*.key" -type f 2>/dev/null | head -n 1)
    
    if [ -n "$KEY_FILE" ]; then
        echo "✅ キーファイルが見つかりました: $KEY_FILE"
        echo ""
        echo "このキーで復号化してから、キーをエクスポートできます:"
        echo "  git-crypt unlock $KEY_FILE"
        echo "  git-crypt export-key .git-crypt-key-exported.key"
    else
        echo "❌ キーファイルが見つかりません"
        echo ""
        echo "キーが失われている可能性があります。"
        echo "以下のいずれかを実行してください:"
        echo "  1. 既存のキーファイルのパスを指定して復号化"
        echo "  2. 再初期化（既存の暗号化は解除されます）"
    fi
else
    echo "✅ リポジトリはunlockされています"
    echo ""
    echo "現在のキーをエクスポートしますか？ (y/N)"
    read -p "> " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        KEY_FILE=".git-crypt-key-$(date +%Y%m%d-%H%M%S).key"
        git-crypt export-key "$KEY_FILE"
        chmod 600 "$KEY_FILE"
        echo ""
        echo "✅ キーをエクスポートしました: $KEY_FILE"
    fi
fi
