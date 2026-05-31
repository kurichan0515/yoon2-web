import Script from 'next/script';
import HomeSns from '../../src/views/HomeSns';

export const metadata = {
  title: 'yoon² | SNS導線ページ',
  alternates: { canonical: 'https://yoon2.com/sns' },
};

export default function SnsPage() {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6862900859746528"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <HomeSns />
    </>
  );
}
