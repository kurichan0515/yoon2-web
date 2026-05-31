import Providers from './providers';
import PublicLayout from '../src/layouts/PublicLayout';
import Home from '../src/views/Home';

export default function HomePage() {
  return (
    <Providers>
      <PublicLayout>
        <Home />
      </PublicLayout>
    </Providers>
  );
}
