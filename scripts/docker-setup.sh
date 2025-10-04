#!/bin/bash

# Docker環境セットアップスクリプト

echo "🐳 yoon² ユンユン ホームページ - Docker環境セットアップ"
echo "=================================================="

# 環境変数ファイルの確認
if [ ! -f .env ]; then
    echo "⚠️  .envファイルが見つかりません。"
    echo "📝 env.exampleをコピーして.envファイルを作成してください。"
    echo "   cp env.example .env"
    echo "   # .envファイルを編集してFirebase設定を追加してください"
    exit 1
fi

echo "✅ .envファイルが見つかりました"

# Dockerの確認
if ! command -v docker &> /dev/null; then
    echo "❌ Dockerがインストールされていません"
    echo "   Dockerをインストールしてください: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker compose &> /dev/null; then
    echo "❌ Docker Composeがインストールされていません"
    echo "   Docker Composeをインストールしてください"
    exit 1
fi

echo "✅ Docker環境が確認できました"

# Firebase CLIの確認
if ! command -v firebase &> /dev/null; then
    echo "⚠️  Firebase CLIがインストールされていません"
    echo "   インストール中..."
    npm install -g firebase-tools
fi

echo "✅ Firebase CLIが確認できました"

# 開発用ディレクトリの作成
mkdir -p firebase-export
mkdir -p logs

echo "📁 必要なディレクトリを作成しました"

# Dockerイメージのビルド
echo "🔨 Dockerイメージをビルド中..."
docker compose -f docker-compose.dev.yml build

if [ $? -eq 0 ]; then
    echo "✅ Dockerイメージのビルドが完了しました"
else
    echo "❌ Dockerイメージのビルドに失敗しました"
    exit 1
fi

echo ""
echo "🎉 セットアップが完了しました！"
echo ""
echo "📋 次のステップ:"
echo "1. .envファイルを編集してFirebase設定を追加"
echo "2. 開発サーバーを起動: docker-compose -f docker-compose.dev.yml up"
echo "3. ブラウザで http://localhost:3000 を開く"
echo "4. Firebase Emulator UI: http://localhost:4000"
echo ""
echo "🛠️  便利なコマンド:"
echo "   - 開発サーバー起動: docker-compose -f docker-compose.dev.yml up"
echo "   - バックグラウンド実行: docker-compose -f docker-compose.dev.yml up -d"
echo "   - 停止: docker-compose -f docker-compose.dev.yml down"
echo "   - ログ確認: docker-compose -f docker-compose.dev.yml logs -f"
echo ""
