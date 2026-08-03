# CLAUDE.md

## Docker運用は廃止済み

過去にDocker運用をやめた（Dockerfile, Dockerfile.dev, docker-compose*.yml, .dockerignore を削除し「Docker不使用」に方針転換）。`scripts/docker-setup.sh`のみ残存しているが、対応するcomposeファイルが無いため実行不可。

ホスト上に`yoon2-web-web-1`という名のコンテナ（image: yoon2-web-web）が動いていることがあるが、これは廃止前のイメージの残骸。bind mountなしでコードをイメージに焼き込んだままなので、現行コードの変更は反映されない。**動作確認には使わないこと。**

ローカルでの動作確認は `npm run dev`（port 4000）で行う。

**注意:** `npm run dev`を起動したまま`npm run build`を実行すると、両者が同じ`.next`を取り合って壊れる（`Cannot find module './xxx.js'`エラー、画面真っ白）。build確認をしたい場合は先にdevプロセスを終了させること。壊れた場合は`rm -rf .next`してdevを再起動すれば直る。

## デプロイ

本番デプロイは main ブランチへのマージ→GitHub Actionsで自動実行される。手動デプロイは行わない。
