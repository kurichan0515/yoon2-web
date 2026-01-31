#!/usr/bin/env node

/**
 * Google Search Consoleにサイトマップを自動送信するスクリプト
 * 
 * 使用方法:
 *   node scripts/submit-sitemap.js
 * 
 * 環境変数:
 *   GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT: サービスアカウントのJSON（必須）
 *   SEARCH_CONSOLE_SITE_URL: サイトURL（デフォルト: https://yoon2.com）
 */

const { google } = require('googleapis');
const path = require('path');

// 環境変数から設定を取得
const serviceAccountJson = process.env.GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT;
const siteUrl = process.env.SEARCH_CONSOLE_SITE_URL || 'https://yoon2.com';
// feedpathには完全なURLが必要
const sitemapPath = `${siteUrl}/sitemap.xml`;

// エラーハンドリング
if (!serviceAccountJson) {
  console.error('❌ エラー: GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT環境変数が設定されていません');
  console.error('GitHub Secretsに GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT を設定してください');
  process.exit(1);
}

// サービスアカウントのJSONをパース
let serviceAccount;
try {
  // base64エンコードされている場合はデコード
  let jsonString = serviceAccountJson;
  if (!jsonString.startsWith('{')) {
    try {
      jsonString = Buffer.from(jsonString, 'base64').toString('utf-8');
      console.log('📝 Base64デコードを実行しました');
    } catch (e) {
      // base64でない場合はそのまま使用
    }
  }
  
  // JSONをパース
  serviceAccount = JSON.parse(jsonString);
} catch (error) {
  console.error('❌ エラー: サービスアカウントのJSONが無効です');
  console.error('エラー詳細:', error.message);
  console.error('\n💡 解決方法:');
  console.error('1. GitHub Secretsの設定を確認してください');
  console.error('   - Settings → Secrets and variables → Actions');
  console.error('   - GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT を確認');
  console.error('\n2. JSONの設定方法:');
  console.error('   - JSONファイルの内容全体をコピー');
  console.error('   - 改行も含めて完全にコピー');
  console.error('   - または、base64エンコードして設定');
  console.error('\n3. JSONの形式確認:');
  console.error('   - 最初が { で始まっているか');
  console.error('   - 最後が } で終わっているか');
  console.error('   - 特殊文字が正しくエスケープされているか');
  console.error('\n4. 設定値の最初の50文字（デバッグ用）:');
  console.error(`   ${serviceAccountJson.substring(0, 50)}...`);
  process.exit(1);
}

// Google Search Console APIクライアントを初期化
async function submitSitemap() {
  try {
    console.log('📋 Google Search Console APIを初期化中...');
    
    // 秘密鍵の改行文字を正しく処理
    const privateKey = serviceAccount.private_key.replace(/\\n/g, '\n');
    
    // JWT認証を使用してGoogle APIクライアントを初期化
    const auth = new google.auth.JWT({
      email: serviceAccount.client_email,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/webmasters']
    });

    // 認証トークンを取得
    console.log('🔐 認証トークンを取得中...');
    await auth.authorize();
    console.log('✅ 認証トークンの取得に成功しました');

    // Search Console APIクライアントを作成
    const searchConsole = google.searchconsole({
      version: 'v1',
      auth: auth
    });

    console.log(`🌐 サイトURL: ${siteUrl}`);
    console.log(`📄 サイトマップ: ${sitemapPath}`);
    console.log(`👤 サービスアカウント: ${serviceAccount.client_email}`);

    // サイトマップを送信
    console.log('📤 サイトマップを送信中...');
    
    const response = await searchConsole.sitemaps.submit({
      siteUrl: siteUrl,
      feedpath: sitemapPath
    });

    console.log('✅ サイトマップが正常に送信されました');
    console.log(`   ステータス: ${response.data.type || 'SUBMITTED'}`);
    
    return true;
  } catch (error) {
    // エラーハンドリング
    if (error.response) {
      // APIエラー
      const status = error.response.status;
      const message = error.response.data?.error?.message || error.message;
      
      console.error(`❌ エラー: Google Search Console APIエラー (ステータス: ${status})`);
      console.error(`   メッセージ: ${message}`);
      
      // よくあるエラーの説明
      if (status === 403) {
        console.error('\n💡 解決方法:');
        console.error('   1. Google Search Consoleの「設定」→「ユーザーと権限」で');
        console.error('      サービスアカウントのメールアドレスが追加されているか確認');
        console.error(`   2. サービスアカウントのメール: ${serviceAccount.client_email}`);
        console.error('   3. 権限が「所有者」または「フル」になっているか確認');
      } else if (status === 404) {
        console.error('\n💡 解決方法:');
        console.error('   1. Google Search Consoleでサイトの所有権が確認済みか確認');
        console.error(`   2. サイトURLが正しいか確認: ${siteUrl}`);
      }
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      // ネットワークエラー
      console.error('❌ エラー: ネットワーク接続エラー');
      console.error('   インターネット接続を確認してください');
    } else {
      // その他のエラー
      console.error('❌ エラー:', error.message);
      if (error.stack) {
        console.error('\nスタックトレース:');
        console.error(error.stack);
      }
    }
    
    // エラーが発生してもデプロイは続行（警告として扱う）
    console.warn('\n⚠️  警告: サイトマップの送信に失敗しましたが、デプロイは続行します');
    console.warn('   手動でGoogle Search Consoleからサイトマップを送信してください');
    
    return false;
  }
}

// メイン処理
(async () => {
  const success = await submitSitemap();
  process.exit(success ? 0 : 0); // エラーでもデプロイは続行（exit code 0）
})();
