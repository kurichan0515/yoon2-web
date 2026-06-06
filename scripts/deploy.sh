#!/bin/bash
set -e

echo "=== yoon2-web デプロイ開始 ==="

# 最新コードを取得
git pull origin main

# コンテナをビルドして再起動
docker compose down
docker compose up --build -d

# DBマイグレーション実行
docker compose exec web npx prisma migrate deploy

echo "=== デプロイ完了 ==="
echo "アクセス確認: https://yourdomain.com"
