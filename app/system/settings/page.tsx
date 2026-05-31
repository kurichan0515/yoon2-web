import Providers from '../../providers';
import AdminLayout from '../../../src/layouts/AdminLayout';
import PrivateRoute from '../../../src/components/common/PrivateRoute';
import AdminSettings from '../../../src/views/admin/AdminSettings';

export const metadata = { title: '設定 | yoon²' };

export default function SettingsPage() {
  return (
    <Providers>
      <AdminLayout>
        <PrivateRoute>
          <AdminSettings />
        </PrivateRoute>
      </AdminLayout>
    </Providers>
  );
}
