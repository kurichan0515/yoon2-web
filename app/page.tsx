import Script from 'next/script';
import PublicLayout from '../src/layouts/PublicLayout';
import Home from '../src/views/Home';

export default function HomePage() {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6862900859746528"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <PublicLayout>
        <Home />
      </PublicLayout>
    </>
  );
}
