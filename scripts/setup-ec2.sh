#!/bin/bash
# EC2初回セットアップスクリプト（SSHログイン後に1回だけ実行）
set -e

DOMAIN="yourdomain.com"
REPO_URL="https://github.com/YOUR_GITHUB_USERNAME/yoon2-web.git"

echo "=== EC2初回セットアップ開始 ==="

# Dockerがインストール済みか確認（user_dataで入っているはず）
docker --version

# リポジトリをクローン
cd /home/ubuntu
git clone $REPO_URL yoon2-web
cd yoon2-web

# .envを作成（実際の値を入力する）
cp env.example .env
echo ""
echo "!!! .envを編集してください: nano .env"
echo "!!! 編集完了後、以下を実行してください:"
echo ""
echo "  # Let's Encrypt で SSL証明書取得"
echo "  sudo apt-get install -y certbot python3-certbot-nginx"
echo "  sudo certbot --nginx -d $DOMAIN"
echo ""
echo "  # Nginx設定を反映"
echo "  sudo cp nginx/nginx.conf /etc/nginx/sites-available/yoon2"
echo "  sudo sed -i 's/yourdomain.com/$DOMAIN/g' /etc/nginx/sites-available/yoon2"
echo "  sudo ln -sf /etc/nginx/sites-available/yoon2 /etc/nginx/sites-enabled/"
echo "  sudo rm -f /etc/nginx/sites-enabled/default"
echo "  sudo nginx -t && sudo systemctl reload nginx"
echo ""
echo "  # アプリ起動"
echo "  docker compose up --build -d"
echo "  docker compose exec web npx prisma migrate deploy"
echo ""
echo "=== セットアップ手順の表示完了 ==="
