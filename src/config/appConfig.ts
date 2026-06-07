interface Service {
  id: string; name: string; duration: string; price: number; description: string; category: string;
}

interface AppConfig {
  features: { firstVisitDiscount: boolean };
  social: {
    twitter: { url: string; username: string };
    instagram: { url: string; username: string };
    line: { url: string; note: string };
  };
  shop: {
    name: string; phone: string; postalCode: string; address: string;
    access: {
      stations: string[]; landmarks: string; parking: string;
      parkingPhotos: { parkingLot: string; routeToShop: string; accessGuide?: string };
    };
    hours: { open: string; close: string; weekday: string; weekend: string; note: string };
    holidays: string; description: string; email: string;
    lineUrl: string; instagramUrl: string;
    _googleMapsUrl: string | null;
    readonly googleMapsUrl: string;
    payment: string[];
    facilities: { totalSeats: number; staffCount: number; parkingSpaces: number; features: string[] };
    notes: string[];
    services: Service[];
  };
  adsense: { publisherId: string; defaultAdSlot: string; enabled: boolean; devMode: boolean };
  googleAds: { conversionId: string; conversionLabel: string; enabled: boolean };
}

const appConfig: AppConfig = {
  features: { firstVisitDiscount: true },

  social: {
    twitter: { url: process.env.NEXT_PUBLIC_TWITTER_URL ?? '', username: '' },
    instagram: { url: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://www.instagram.com/yoo.n.yoo.n/', username: '@yoo.n.yoo.n' },
    line: { url: process.env.NEXT_PUBLIC_LINE_URL ?? 'https://lin.ee/lyyKSqu', note: 'ご予約やお問い合わせは公式LINEにメッセージをお願いします' },
  },

  shop: {
    name: 'yoon²ゆんゆん',
    phone: '080-8406-6125',
    postalCode: '790-0923',
    address: '愛媛県松山市北久米町438',
    access: {
      stations: ['北久米駅から徒歩5分/駐車場有り', '', ''],
      landmarks: '',
      parking: '',
      parkingPhotos: {
        parkingLot: '/images/parking/parking.png',
        routeToShop: '/images/parking/parking-to-shop.png',
        accessGuide: '/images/parking/S__24436743.jpg',
      },
    },
    hours: {
      open: '10:00', close: '20:00',
      weekday: '10:00 - 20:00', weekend: '10:00 - 20:00',
      note: '営業時間外でも対応できることがあります。お気軽にお問い合わせください。',
    },
    holidays: '不定休',
    description: 'イヤーエステと耳つぼで心身のバランスを整える専門サロンです。お客様一人ひとりに合わせたオーダーメイドの施術で、深いリラクゼーションを提供いたします。',
    email: '',
    lineUrl: 'https://lin.ee/lyyKSqu',
    instagramUrl: 'https://www.instagram.com/yoo.n.yoo.n/',
    _googleMapsUrl: null,
    get googleMapsUrl(): string {
      if (this._googleMapsUrl) return this._googleMapsUrl;
      const address = this.address || '愛媛県松山市北久米町438';
      return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
    },
    payment: ['Visa', 'Mastercard', 'JCB', 'American Express', '現金', 'PayPay', 'スマート支払い', 'ポイント利用'],
    facilities: {
      totalSeats: 1, staffCount: 2, parkingSpaces: 1,
      features: [
        '夜20時以降も受付OK', '当日受付OK', '2名以上の利用OK', '個室あり', '駐車場あり',
        '駅から徒歩5分以内', '朝10時前でも受付OK', '女性スタッフ在籍', '完全予約制',
        '指名予約OK', '1人で貸切OK', 'ドリンクサービスあり', 'お子さま同伴可',
        'リクライニングチェア（ベッド）', 'メイクルームあり', '3席（ベッド）以下の小型サロン',
        'つけ放題メニューあり', '都度払いメニューあり', '体験メニューあり',
      ],
    },
    notes: [
      'ご予約やお問い合わせの際はお手数ですが公式LINEにメッセージをお願いします',
      '施術直前のキャンセルは施術料の50%',
      '無断キャンセルは施術料の100%',
      'ご理解の上ご予約ください',
    ],
    services: [
      { id: 'ear-este-40', name: 'イヤーエステ40分', duration: '40分', price: 5000, description: '基本的なイヤーエステ', category: 'ear-este' },
      { id: 'ear-este-60', name: 'イヤーエステ60分', duration: '60分', price: 7000, description: 'じっくりケアコース', category: 'ear-este' },
      { id: 'ear-este-80', name: '耳集中80分コース', duration: '80分', price: 10500, description: '耳掃除からヘッド・耳つぼまで全方位ケア', category: 'ear-este' },
      { id: 'ear-este-trial-new', name: 'イヤーエステ40分（新規）', duration: '40分', price: 4500, description: '初回限定特別価格', category: 'ear-este' },
      { id: 'full-120', name: '全身疲労回復120分コース', duration: '120分', price: 13000, description: 'オイルリンパ×耳×ヘッドの至福コース', category: 'recommend' },
      { id: 'dry-head-40', name: 'ドライヘッドスパ40分', duration: '40分', price: 4500, description: '頭皮からリフレッシュ', category: 'dry-head' },
      { id: 'head-opt-15', name: '【追加】ヘッドスパ15分', duration: '15分', price: 1500, description: '他メニューとの組み合わせオプション', category: 'dry-head' },
      { id: 'mimitubo-regular', name: '耳つぼ（ジュエリー込み）30-40分', duration: '30-40分', price: 3500, description: '個数制限なし', category: 'mimitubo' },
      { id: 'mimitubo-new', name: '耳つぼ（新規）', duration: '40分', price: 4000, description: '初回限定特別価格', category: 'mimitubo' },
      { id: 'foot-45', name: '足つぼ45分', duration: '45分', price: 5500, description: '全身バランス調整', category: 'foot' },
      { id: 'foot-opt-30', name: '【追加】足つぼ30分', duration: '30分', price: 3500, description: '他メニューとの組み合わせオプション', category: 'foot' },
      { id: 'oil-60', name: 'オイルリンパ60分', duration: '60分', price: 6800, description: 'リンパドレナージュ', category: 'oil' },
      { id: 'oil-90', name: 'オイルリンパ90分', duration: '90分', price: 11000, description: 'ゆったりリンパ流し', category: 'oil' },
      { id: 'oil-opt-60', name: '【追加】オイル60分', duration: '60分', price: 6000, description: '他メニューとの組み合わせオプション', category: 'oil' },
      { id: 'oil-opt-30', name: '【追加】オイル30分', duration: '30分', price: 4000, description: '他メニューとの組み合わせオプション', category: 'oil' },
    ],
  },

  adsense: {
    publisherId: process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? 'ca-pub-6862900859746528',
    defaultAdSlot: process.env.NEXT_PUBLIC_ADSENSE_DEFAULT_SLOT ?? '2647640133',
    enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true',
    devMode: process.env.NEXT_PUBLIC_ADSENSE_DEV_MODE === 'true',
  },

  googleAds: {
    conversionId: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID ?? '',
    conversionLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ?? '',
    enabled: process.env.NEXT_PUBLIC_GOOGLE_ADS_ENABLED === 'true',
  },
};

export default appConfig;
