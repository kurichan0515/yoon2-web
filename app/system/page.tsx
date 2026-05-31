import Providers from '../providers';
import AdminLayout from '../../src/layouts/AdminLayout';
import PrivateRoute from '../../src/components/common/PrivateRoute';
import AdminDashboard from '../../src/views/AdminDashboard';

export const metadata = { title: '管理ダッシュボード | yoon²' };

export default function SystemPage() {
  return (
    <Providers>
      <AdminLayout>
        <PrivateRoute>
          <AdminDashboard />
        </PrivateRoute>
      </AdminLayout>
    </Providers>
  );
}
