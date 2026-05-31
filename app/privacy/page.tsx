import PublicLayout from '../../src/layouts/PublicLayout';
import PrivacyPolicy from '../../src/views/PrivacyPolicy';

export const metadata = {
  title: 'プライバシーポリシー | yoon²',
  alternates: { canonical: 'https://yoon2.com/privacy' },
};

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <PrivacyPolicy />
    </PublicLayout>
  );
}
