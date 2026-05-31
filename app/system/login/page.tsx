import Providers from '../../providers';
import AdminLogin from '../../../src/views/AdminLogin';

export const metadata = { title: '管理者ログイン | yoon²' };

export default function AdminLoginPage() {
  return (
    <Providers>
      <AdminLogin />
    </Providers>
  );
}
