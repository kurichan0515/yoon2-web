import Providers from '../providers';
import HomeSns from '../../src/views/HomeSns';

export const metadata = {
  title: 'yoon² | SNS導線ページ',
  alternates: { canonical: 'https://yoon2.com/sns' },
};

export default function SnsPage() {
  return (
    <Providers>
      <HomeSns />
    </Providers>
  );
}
