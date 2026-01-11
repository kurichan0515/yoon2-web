#!/bin/bash

# git-crypt セットアップスクリプト
# このスクリプトは、.envファイルを暗号化してgit管理できるようにします

set -e

echo "🔐 git-crypt セットアップを開始します..."

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

echo "✅ git-crypt が見つかりました"

# gitリポジトリか確認
if [ ! -d .git ]; then
    echo "❌ このディレクトリはgitリポジトリではありません"
    exit 1
fi

# 既に初期化されているか確認
if git-crypt status &> /dev/null; then
    echo "⚠️  git-crypt は既に初期化されています"
    
    # リポジトリがロックされているか確認
    if git-crypt status 2>&1 | grep -q "not unlocked"; then
        echo "📌 リポジトリはロックされています"
        echo ""
        echo "既存のキーで復号化するか、再初期化するかを選択してください:"
        echo "  1. 既存のキーで復号化してキーをエクスポート"
        echo "  2. 再初期化（既存のキーは失われます）"
        read -p "選択 (1/2): " -n 1 -r
        echo
        
        if [[ $REPLY == "1" ]]; then
            # 既存のキーで復号化
            KEY_FILE=$(find . -maxdepth 1 -name ".git-crypt-key-*.key" -type f | head -n 1)
            if [ -z "$KEY_FILE" ]; then
                echo "既存のキーファイルが見つかりません。キーファイルのパスを入力してください:"
                read -p "キーファイルのパス: " KEY_FILE
            fi
            
            if [ -f "$KEY_FILE" ]; then
                echo "🔓 既存のキーで復号化しています..."
                git-crypt unlock "$KEY_FILE"
                echo "✅ 復号化が完了しました"
            else
                echo "❌ キーファイルが見つかりません: $KEY_FILE"
                exit 1
            fi
        elif [[ $REPLY == "2" ]]; then
            echo "⚠️  再初期化を実行します（既存のキーは失われます）"
            read -p "本当に再初期化しますか？ (y/N): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                echo "セットアップをキャンセルしました"
                exit 0
            fi
            # 再初期化のため、ここで処理を続行
        else
            echo "セットアップをキャンセルしました"
            exit 0
        fi
    else
        # 既にunlockされている場合、キーをエクスポート
        echo "既存のキーをバックアップします..."
        BACKUP_KEY="/tmp/git-crypt-key-backup-$(date +%Y%m%d-%H%M%S).key"
        if git-crypt export-key "$BACKUP_KEY" 2>/dev/null; then
            echo "✅ キーをバックアップしました: $BACKUP_KEY"
            read -p "再初期化しますか？ (y/N): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                echo "セットアップをキャンセルしました"
                exit 0
            fi
        else
            echo "⚠️  キーのエクスポートに失敗しました（既にunlockされていない可能性があります）"
            read -p "再初期化しますか？ (y/N): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                echo "セットアップをキャンセルしました"
                exit 0
            fi
        fi
    fi
    
    # 再初期化する場合
    if [[ $REPLY == "2" ]] || [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🔄 既存の設定をクリアしています..."
        # git-cryptの設定を削除（注意: これは既存のキーを無効化します）
        rm -f .git/git-crypt/keys/default
        echo "✅ 既存の設定をクリアしました"
    else
        # 既存のキーを使用する場合、新しいキーをエクスポートして終了
        KEY_FILE=".git-crypt-key-$(date +%Y%m%d-%H%M%S).key"
        git-crypt export-key "$KEY_FILE"
        chmod 600 "$KEY_FILE"
        echo ""
        echo "✅ 既存のキーをエクスポートしました"
        echo "   キーファイル: $KEY_FILE"
        exit 0
    fi
fi

# git-cryptを初期化
echo "🔑 git-crypt を初期化しています..."
git-crypt init

# キーをエクスポート（安全な場所に保存）
KEY_FILE=".git-crypt-key-$(date +%Y%m%d-%H%M%S).key"
git-crypt export-key "$KEY_FILE"
chmod 600 "$KEY_FILE"

echo ""
echo "✅ git-crypt の初期化が完了しました"
echo ""
echo "⚠️  重要: 暗号化キーを安全な場所に保存してください"
echo "   キーファイル: $KEY_FILE"
echo ""
echo "   このキーがないと、.envファイルを復号化できません。"
echo "   チームメンバーには、このキーを安全に共有してください。"
echo ""

# .envファイルが存在するか確認
if [ -f .env ]; then
    echo "📝 .envファイルが見つかりました"
    echo "   次回のコミット時に自動的に暗号化されます"
    echo ""
    echo "次のステップ:"
    echo "  1. git add .env .gitattributes"
    echo "  2. git commit -m 'Add encrypted .env file'"
    echo "  3. git push"
else
    echo "⚠️  .envファイルが見つかりません"
    echo "   env.exampleをコピーして.envファイルを作成してください:"
    echo "   cp env.example .env"
fi

echo ""
echo "🔓 復号化するには:"
echo "   git-crypt unlock"
echo ""
echo "🔒 再暗号化するには:"
echo "   git-crypt lock"
