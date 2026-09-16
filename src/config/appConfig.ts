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
    // メニュー価格・時間は src/data/menuData.ts (MENU_DATA) が単一の情報源。ここには置かない。
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
