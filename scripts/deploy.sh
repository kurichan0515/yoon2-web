#!/bin/bash
set -euo pipefail

APP_DIR="/home/ubuntu/yoon2-web"
HEALTH_URL="http://localhost:3000"
HEALTH_RETRIES=12
HEALTH_INTERVAL=5
PREV_COMMIT=""
NEW_COMMIT=""

log()  { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
fail() { log "ERROR: $*" >&2; exit 1; }

# -----------------------------------------------
# ロールバック関数（事前定義）
# -----------------------------------------------
rollback() {
  log "ロールバック開始: $NEW_COMMIT → $PREV_COMMIT"
  git reset --hard "$PREV_COMMIT"

  if docker image inspect yoon2-web-web:rollback &>/dev/null; then
    docker tag yoon2-web-web:rollback yoon2-web-web:latest
    docker compose up -d --no-deps web
    log "前のイメージでコンテナを再起動しました"
  else
    docker compose build --no-cache web
    docker compose up -d --no-deps web
    log "前のコミットでリビルドしました"
  fi
  log "ロールバック完了"
}

# -----------------------------------------------
# 事前チェック
# -----------------------------------------------
log "=== デプロイ開始 ==="

[[ -d "$APP_DIR/.git" ]] || fail "Gitリポジトリが見つかりません: $APP_DIR"
[[ -f "$APP_DIR/.env" ]] || fail ".envが存在しません"
command -v docker &>/dev/null || fail "Dockerがインストールされていません"

cd "$APP_DIR"

BRANCH=$(git rev-parse --abbrev-ref HEAD)
[[ "$BRANCH" == "main" ]] || fail "mainブランチ以外ではデプロイできません（現在: $BRANCH）"

# -----------------------------------------------
# 現在の状態をバックアップ
# -----------------------------------------------
PREV_COMMIT=$(git rev-parse HEAD)
log "現在のコミット: $PREV_COMMIT"

if docker compose ps --status running | grep -q "web"; then
  docker tag yoon2-web-web:latest yoon2-web-web:rollback 2>/dev/null || true
  log "ロールバック用イメージを保存しました"
fi

# -----------------------------------------------
# コード更新
# -----------------------------------------------
log "コードを更新中..."
git fetch origin main
git reset --hard origin/main

NEW_COMMIT=$(git rev-parse HEAD)
log "新しいコミット: $NEW_COMMIT"

if [[ "$PREV_COMMIT" == "$NEW_COMMIT" ]]; then
  log "コードの変更なし。デプロイをスキップします"
  exit 0
fi

# -----------------------------------------------
# ビルド
# -----------------------------------------------
log "Dockerイメージをビルド中..."
if ! docker compose build --no-cache web; then
  rollback
  fail "ビルド失敗によりロールバックしました"
fi

# -----------------------------------------------
# コンテナ再起動
# -----------------------------------------------
log "コンテナを再起動中..."
docker compose up -d --no-deps web
sleep 5

# -----------------------------------------------
# マイグレーション
# -----------------------------------------------
log "DBマイグレーションを実行中..."
if ! docker compose exec -T web npx prisma migrate deploy; then
  rollback
  fail "マイグレーション失敗によりロールバックしました"
fi

# -----------------------------------------------
# ヘルスチェック
# -----------------------------------------------
log "ヘルスチェック中 (最大 $((HEALTH_RETRIES * HEALTH_INTERVAL))秒)..."
HEALTH_OK=false
for i in $(seq 1 $HEALTH_RETRIES); do
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$HEALTH_URL" || echo "000")
  if [[ "$HTTP_STATUS" == "200" ]]; then
    log "ヘルスチェック OK (HTTP $HTTP_STATUS)"
    HEALTH_OK=true
    break
  fi
  log "試行 $i/$HEALTH_RETRIES: HTTP $HTTP_STATUS ..."
  sleep "$HEALTH_INTERVAL"
done

if [[ "$HEALTH_OK" == "false" ]]; then
  rollback
  fail "ヘルスチェック失敗によりロールバックしました"
fi

# -----------------------------------------------
# 完了
# -----------------------------------------------
log "=== デプロイ完了 ==="
log "  $PREV_COMMIT → $NEW_COMMIT"
