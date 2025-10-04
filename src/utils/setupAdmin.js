// 管理者アカウント初期設定用スクリプト
// このスクリプトは開発環境でのみ使用してください

import { createAdminAccount } from '../services/authService';

// 管理者アカウントの初期設定
export const setupInitialAdmin = async () => {
  try {
    console.log('管理者アカウントの初期設定を開始します...');
    
    // 管理者アカウントを作成
    const adminUser = await createAdminAccount(
      'admin@yoon2.com', // 管理者メールアドレス
      'admin123456',      // 管理者パスワード（本番環境では強力なパスワードを使用）
      'yoon² 管理者'      // 表示名
    );
    
    console.log('管理者アカウントが正常に作成されました:', adminUser.email);
    console.log('ログイン情報:');
    console.log('メールアドレス: admin@yoon2.com');
    console.log('パスワード: admin123456');
    console.log('');
    console.log('⚠️  本番環境では必ずパスワードを変更してください！');
    
    return adminUser;
  } catch (error) {
    console.error('管理者アカウント作成エラー:', error);
    throw error;
  }
};

// 開発環境でのみ実行
if (process.env.NODE_ENV === 'development') {
  // ブラウザのコンソールで実行可能にする
  window.setupAdmin = setupInitialAdmin;
  console.log('管理者アカウント設定: window.setupAdmin() を実行してください');
}

