#!/bin/bash

# Google Search Consoleにサイトマップを送信するテストスクリプト
# 
# 使用方法:
#   ./scripts/test-submit-sitemap.sh [JSONファイルのパス]
#
# 例:
#   ./scripts/test-submit-sitemap.sh ~/Downloads/service-account.json
#   ./scripts/test-submit-sitemap.sh ./service-account.json

set -e

# 色の定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# プロジェクトのルートディレクトリに移動
cd "$(dirname "$0")/.."

echo "🧪 サイトマップ送信のテストを開始します..."
echo ""

# JSONファイルのパスを取得
if [ -z "$1" ]; then
    echo -e "${YELLOW}⚠️  サービスアカウントのJSONファイルのパスを指定してください${NC}"
    echo ""
    echo "使用方法:"
    echo "  ./scripts/test-submit-sitemap.sh [JSONファイルのパス]"
    echo ""
    echo "例:"
    echo "  ./scripts/test-submit-sitemap.sh ~/Downloads/service-account.json"
    exit 1
fi

JSON_FILE="$1"

# JSONファイルの存在確認
if [ ! -f "$JSON_FILE" ]; then
    echo -e "${RED}❌ エラー: JSONファイルが見つかりません: $JSON_FILE${NC}"
    exit 1
fi

echo "📄 JSONファイル: $JSON_FILE"
echo ""

# JSONファイルの内容を読み込んで環境変数に設定
# Node.jsを使ってJSONを正しく処理（改行文字を保持）
JSON_CONTENT=$(node -e "const fs = require('fs'); const json = JSON.parse(fs.readFileSync('$JSON_FILE', 'utf8')); console.log(JSON.stringify(json))")

# 環境変数を設定してスクリプトを実行
export GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT="$JSON_CONTENT"
export SEARCH_CONSOLE_SITE_URL="https://yoon2.com"

echo "🌐 サイトURL: $SEARCH_CONSOLE_SITE_URL"
echo "📄 サイトマップ: sitemap.xml"
echo ""

# スクリプトを実行
node scripts/submit-sitemap.js

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ テストが正常に完了しました！${NC}"
else
    echo ""
    echo -e "${RED}❌ テストが失敗しました（終了コード: $EXIT_CODE）${NC}"
fi

exit $EXIT_CODE
