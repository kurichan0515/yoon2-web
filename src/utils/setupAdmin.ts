import { createAdminAccount } from '../services/authService';

export const setupInitialAdmin = async () => {
  try {
    const adminUser = await createAdminAccount('admin@yoon2.com', 'admin123456', 'yoon² 管理者');
    console.log('管理者アカウントが正常に作成されました:', (adminUser as { email: string }).email);
    return adminUser;
  } catch (error) {
    console.error('管理者アカウント作成エラー:', error);
    throw error;
  }
};

if (process.env.NODE_ENV === 'development') {
  window.setupAdmin = setupInitialAdmin;
}
