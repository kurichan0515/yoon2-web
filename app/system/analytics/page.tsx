import Providers from '../../providers';
import AdminLayout from '../../../src/layouts/AdminLayout';
import PrivateRoute from '../../../src/components/common/PrivateRoute';
import AnalyticsDashboard from '../../../src/components/AnalyticsDashboard';

export const metadata = { title: 'アナリティクス | yoon²' };

export default function AnalyticsPage() {
  return (
    <Providers>
      <AdminLayout>
        <PrivateRoute>
          <AnalyticsDashboard />
        </PrivateRoute>
      </AdminLayout>
    </Providers>
  );
}
