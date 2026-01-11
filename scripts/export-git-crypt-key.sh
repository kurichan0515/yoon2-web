#!/bin/bash

# git-crypt キーエクスポートスクリプト
# 既に初期化されているgit-cryptリポジトリからキーをエクスポートします

set -e

echo "🔑 git-crypt キーのエクスポートを開始します..."

# git-cryptがインストールされているか確認
if ! command -v git-crypt &> /dev/null; then
    echo "❌ git-crypt がインストールされていません。"
    exit 1
fi

# git-cryptが初期化されているか確認
if ! git-crypt status &> /dev/null; then
    echo "❌ git-crypt が初期化されていません。"
    echo "   まず ./scripts/setup-git-crypt.sh を実行してください。"
    exit 1
fi

# リポジトリがロックされているか確認
if git-crypt status 2>&1 | grep -q "not unlocked"; then
    echo "⚠️  リポジトリがロックされています"
    echo ""
    echo "既存のキーファイルで復号化してからキーをエクスポートします。"
    echo ""
    
    # 既存のキーファイルを探す
    KEY_FILE=$(find . -maxdepth 1 -name ".git-crypt-key-*.key" -type f | head -n 1)
    
    if [ -z "$KEY_FILE" ]; then
        echo "既存のキーファイルが見つかりません。"
        echo "キーファイルのパスを入力してください（Enterでキャンセル）:"
        read -p "キーファイルのパス: " KEY_FILE
        
        if [ -z "$KEY_FILE" ]; then
            echo "キャンセルしました"
            exit 0
        fi
    fi
    
    if [ ! -f "$KEY_FILE" ]; then
        echo "❌ キーファイルが見つかりません: $KEY_FILE"
        exit 1
    fi
    
    echo "🔓 既存のキーで復号化しています: $KEY_FILE"
    git-crypt unlock "$KEY_FILE"
    echo "✅ 復号化が完了しました"
fi

# キーをエクスポート
KEY_FILE=".git-crypt-key-$(date +%Y%m%d-%H%M%S).key"
echo ""
echo "📤 キーをエクスポートしています..."
git-crypt export-key "$KEY_FILE"
chmod 600 "$KEY_FILE"

echo ""
echo "✅ キーのエクスポートが完了しました"
echo ""
echo "⚠️  重要: このキーファイルを安全な場所に保存してください"
echo "   キーファイル: $KEY_FILE"
echo ""
echo "   このキーがないと、.envファイルを復号化できません。"
echo "   チームメンバーには、このキーを安全に共有してください。"
