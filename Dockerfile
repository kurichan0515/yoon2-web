# React アプリケーション用のDockerfile
FROM node:20-alpine
RUN apk add openjdk17-jre
# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm ci --only=production

# アプリケーションのソースコードをコピー
COPY . .

# ポート3000を公開
EXPOSE 3000

# 開発用コマンド
CMD ["npm", "start"]
