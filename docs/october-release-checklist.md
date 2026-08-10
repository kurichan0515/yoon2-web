# 10月リリース チェックリスト

## 概要
Firebase Hosting から AWS EC2 へ移行 + ブログ・管理画面の公開

---

## Phase A: AWS インフラ構築（コスト発生開始）

### A-1: EC2 セットアップ
- [ ] AWSコンソールで キーペアを作成（ローカルに `.pem` を保存）
- [ ] `terraform/terraform.tfvars` を作成（`terraform.tfvars.example` をコピー）
  ```
  key_pair_name    = "作成したキーペア名"
  allowed_ssh_cidr = "自宅グローバルIP/32"
  ```
- [ ] Terraformステート用S3バケットを手動作成
  ```bash
  aws s3 mb s3://yoon2-tfstate-344693946629 \
    --region ap-northeast-1 \
    --profile terraform-admin
  ```
- [ ] `terraform init && terraform plan && terraform apply`
- [ ] Elastic IP をメモ（お名前.com の A レコードに使う）
- [ ] t3.small の **リザーブドインスタンス（1年・All Upfront）を購入**

### A-2: EC2 初回セットアップ
- [ ] SSH でログイン
  ```bash
  ssh -i ~/.ssh/your-key.pem ubuntu@<Elastic IP>
  ```
- [ ] `bash scripts/setup-ec2.sh` を実行
- [ ] `.env` を編集して実際の値を設定（下記「環境変数チェックリスト」参照）

---

## Phase B: AWS サービス設定

### B-1: Cognito ユーザープール作成
- [ ] AWSコンソール → Cognito → ユーザープールを作成
  - サインインオプション: メールアドレス
  - MFA: 任意（オフでOK）
  - アプリクライアントを作成（クライアントシークレットあり）
- [ ] 以下を `.env` に設定:
  ```
  COGNITO_USER_POOL_ID=ap-northeast-1_XXXXXXXXX
  COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
  COGNITO_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxx
  ```
- [ ] Cognitoでユーザーを作成（管理者アカウント）

### B-2: NEXTAUTH_SECRET 生成
- [ ] ローカルで生成して `.env` に設定:
  ```bash
  openssl rand -base64 32
  ```
  ```
  NEXTAUTH_SECRET=生成した値
  NEXTAUTH_URL=https://yourdomain.com
  ```

### B-3: S3 バケット確認
- [ ] Terraform apply で `yoon2-images-344693946629` が作成されていることを確認
- [ ] `.env` に設定:
  ```
  AWS_S3_BUCKET=yoon2-images-344693946629
  AWS_REGION=ap-northeast-1
  ```
- [ ] EC2 に IAM ロールがアタッチされていれば `AWS_ACCESS_KEY_ID/SECRET` は不要

---

## Phase C: ドメイン切り替え

### C-1: SSL 証明書取得（EC2上で実行）
- [ ] Let's Encrypt で証明書取得:
  ```bash
  sudo certbot --nginx -d yourdomain.com
  ```

### C-2: Nginx 設定
- [ ] `nginx/nginx.conf` の `yourdomain.com` を実際のドメインに置換
  ```bash
  sudo cp nginx/nginx.conf /etc/nginx/sites-available/yoon2
  sudo sed -i 's/yourdomain.com/実際のドメイン/g' /etc/nginx/sites-available/yoon2
  sudo ln -sf /etc/nginx/sites-available/yoon2 /etc/nginx/sites-enabled/
  sudo rm -f /etc/nginx/sites-enabled/default
  sudo nginx -t && sudo systemctl reload nginx
  ```

### C-3: お名前.com DNS 切り替え
- [ ] A レコードを Elastic IP に変更
- [ ] TTL を事前に 300 秒に下げておく（切替前日推奨）
- [ ] 切替後 DNS 伝播を確認（5〜30分）
- [ ] HTTPS でアクセス確認

---

## Phase D: アプリ起動・DB 初期化

- [ ] `docker compose up --build -d`
- [ ] DBマイグレーション:
  ```bash
  docker compose exec web npx prisma migrate deploy
  ```
- [ ] ヘルスチェック: `curl -I https://yourdomain.com`
- [ ] 管理画面ログイン確認: `https://yourdomain.com/admin/login`

---

## Phase E: GitHub Actions 設定

- [ ] GitHub → Settings → Secrets and variables → Actions で以下を登録:

| Secret名 | 値 |
|---|---|
| `EC2_HOST` | Elastic IP |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | `~/.ssh/your-key.pem` の中身 |
| `REACT_APP_GA4_MEASUREMENT_ID` | GA4 測定ID |

- [ ] main ブランチへのマージで自動デプロイが動くことを確認

---

## Phase F: Firebase 停止（切替完了後）

- [ ] AWS 上で全機能が正常動作していることを確認
- [ ] Firebase Hosting を停止（プロジェクト設定から）
- [ ] `firebase.json` / `firebase-export/` を削除
- [ ] `.github/workflows/` の古い Firebase 関連 Secrets を削除

---

## 環境変数チェックリスト（`.env` 最終確認）

```env
# PostgreSQL
POSTGRES_USER=yoon2
POSTGRES_PASSWORD=（強いパスワード）
POSTGRES_DB=yoon2db

# Prisma
DATABASE_URL=postgresql://yoon2:パスワード@db:5432/yoon2db

# AWS S3
AWS_REGION=ap-northeast-1
AWS_S3_BUCKET=yoon2-images-344693946629

# Cognito + NextAuth
COGNITO_USER_POOL_ID=
COGNITO_CLIENT_ID=
COGNITO_CLIENT_SECRET=
NEXTAUTH_SECRET=（openssl rand -base64 32）
NEXTAUTH_URL=https://yourdomain.com

# フロントエンド
NEXT_PUBLIC_GA4_MEASUREMENT_ID=
NEXT_PUBLIC_GOOGLE_ADS_ENABLED=true
NEXT_PUBLIC_ADSENSE_ENABLED=true
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/yoo.n.yoo.n/
NEXT_PUBLIC_LINE_URL=https://lin.ee/lyyKSqu
```

---

## 月額コスト（リリース後）

| サービス | 費用 |
|---|---|
| EC2 t3.small RI 1年 | ~$9/月 |
| S3（画像ストレージ） | ~$1/月 |
| データ転送 | ~$1/月 |
| Cognito（MAU < 50k） | 無料 |
| ACM / Let's Encrypt | 無料 |
| **合計** | **~$11/月** |
