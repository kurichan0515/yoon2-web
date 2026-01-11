// アプリケーション設定ファイル
const appConfig = {
  // Firebase設定（環境変数から取得、フォールバック値も設定）
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDemo1234567890abcdefghijklmnop",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "demo-project",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789012:web:abcdef123456"
  },

  // SNS設定
  social: {
    twitter: {
      url: process.env.REACT_APP_TWITTER_URL || "",
      username: ""
    },
    instagram: {
      url: process.env.REACT_APP_INSTAGRAM_URL || "https://www.instagram.com/yoo.n.yoo.n/",
      username: "@yoo.n.yoo.n"
    },
    line: {
      url: process.env.REACT_APP_LINE_URL || "https://lin.ee/lyyKSqu",
      note: "ご予約やお問い合わせは公式LINEにメッセージをお願いします"
    }
  },

  // 店舗情報（設定ファイルで直接管理）
  shop: {
    name: "yoon²ゆんゆん",
    phone: "080-8478-1163",
    // 住所情報（設定ファイルで直接管理）
    postalCode: "790-0923",
    address: "愛媛県松山市北久米町438",
    access: {
      // アクセス情報（設定ファイルで直接管理）
      stations: [
        "北久米駅から徒歩5分/駐車場有り",
        "",
        ""
      ],
      landmarks: "",
      parking: "",
      // 駐車場写真（設定ファイルで直接管理）
      parkingPhotos: {
        parkingLot: "/images/parking/parking.jpg", // 駐車場の写真
        routeToShop: "/images/parking/parking-to-shop.jpg" // 駐車場から店舗までの写真
      }
    },
    // 営業時間（設定ファイルで直接管理）
    hours: {
      open: "10:00",
      close: "20:00",
      weekday: "10:00 - 20:00",
      weekend: "10:00 - 20:00",
      note: "営業時間外でも対応できることがあります。お気軽にお問い合わせください。"
    },
    holidays: "不定休",
    // 店舗の説明文（設定ファイルで直接管理）
    description: "イヤーエステと耳つぼで心身のバランスを整える専門サロンです。お客様一人ひとりに合わせたオーダーメイドの施術で、深いリラクゼーションを提供いたします。",
    // 連絡先情報（設定ファイルで直接管理）
    email: "",
    // SNS・連絡先URL（設定ファイルで直接管理）
    lineUrl: "https://lin.ee/lyyKSqu",
    instagramUrl: "https://www.instagram.com/yoo.n.yoo.n/",
    // Googleマップ埋め込みURL（設定ファイルで直接管理）
    // 直接URLを設定するか、nullの場合は住所から動的に生成されます
    // 注意: より正確な位置を表示するには、Googleマップで実際に検索して埋め込みURLを取得し、
    // 以下の_googleMapsUrlに直接設定することを推奨します
    // 例: _googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!...",
    // nullの場合は、住所から動的に生成されます
    _googleMapsUrl: null, // Googleマップ埋め込みURLを直接設定する場合は、ここにURLを設定してください
    get googleMapsUrl() {
      // 直接URLが設定されている場合はそれを使用
      if (this._googleMapsUrl) {
        return this._googleMapsUrl;
      }
      // 住所をURLエンコードしてGoogleマップの検索URLを生成
      const address = this.address || "愛媛県松山市北久米町438";
      const encodedAddress = encodeURIComponent(address);
      // Google Maps Embed APIを使用（APIキー不要の方法）
      return `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
    },
    payment: [
      "Visa", "Mastercard", "JCB", "American Express", 
      "現金", "PayPay", "スマート支払い", "ポイント利用"
    ],
    facilities: {
      totalSeats: 1,
      staffCount: 2,
      parkingSpaces: 1,
      features: [
        "夜20時以降も受付OK",
        "当日受付OK", 
        "2名以上の利用OK",
        "個室あり",
        "駐車場あり",
        "駅から徒歩5分以内",
        "朝10時前でも受付OK",
        "女性スタッフ在籍",
        "完全予約制",
        "指名予約OK",
        "1人で貸切OK",
        "ドリンクサービスあり",
        "お子さま同伴可",
        "リクライニングチェア（ベッド）",
        "メイクルームあり",
        "3席（ベッド）以下の小型サロン",
        "つけ放題メニューあり",
        "都度払いメニューあり",
        "体験メニューあり"
      ]
    },
    notes: [
      "ご予約やお問い合わせの際はお手数ですが公式LINEにメッセージをお願いします",
      "施術直前のキャンセルは施術料の50%",
      "無断キャンセルは施術料の100%",
      "ご理解の上ご予約ください"
    ],
    services: [
      // おすすめメニュー
      {
        id: "yoon2-extreme",
        name: "【yoon²極メニュー】イヤーエステ×ドライヘッドスパ",
        duration: "100分",
        price: 11000,
        description: "極上のリラクゼーション体験",
        category: "recommend"
      },
      {
        id: "yoon2-premium",
        name: "【yoon²最上級メニュー】耳つぼジュエリー付き💎イヤーエステ×ドライヘッドスパ",
        duration: "100分",
        price: 12500,
        description: "最高級のトータルケア",
        category: "recommend"
      },
      
      // 耳つぼメニュー（基本料金は設定ファイルで直接管理）
      {
        id: "mimitubo-new",
        name: "ご新規様",
        duration: "60分",
        price: 4000,
        description: "初回限定特別価格",
        category: "mimitubo"
      },
      {
        id: "mimitubo-pair",
        name: "ペア割新規",
        duration: "60分",
        price: 3800,
        description: "お友達と一緒でお得",
        category: "mimitubo"
      },
      {
        id: "mimitubo-repeat",
        name: "リピーター様",
        duration: "60分",
        price: 3500,
        description: "いつもありがとうございます",
        category: "mimitubo"
      },
      {
        id: "mimitubo-both",
        name: "両耳10個",
        duration: "30分",
        price: 2500,
        description: "付け放題メニューのみ",
        category: "mimitubo"
      },
      
      // イヤーエステメニュー（基本料金は設定ファイルで直接管理）
      {
        id: "ear-este-trial-male",
        name: "【新規/男性】お試し価格",
        duration: "40分",
        price: 4500,
        description: "男性初回限定価格",
        category: "ear-este"
      },
      {
        id: "ear-este-trial-female",
        name: "【新規/女性】お試し価格",
        duration: "40分",
        price: 4000,
        description: "女性初回限定価格",
        category: "ear-este"
      },
      {
        id: "ear-este-40",
        name: "イヤーエステ 40分コース",
        duration: "40分",
        price: 5000,
        description: "基本的なイヤーエステ",
        category: "ear-este"
      },
      {
        id: "ear-este-60",
        name: "イヤーエステ 60分コース",
        duration: "60分",
        price: 7000,
        description: "じっくりケアコース",
        category: "ear-este"
      },
      
      // ドライヘッドスパメニュー
      {
        id: "dry-head-40",
        name: "ドライヘッドスパ 40分コース",
        duration: "40分",
        price: 4800,
        description: "頭皮からリフレッシュ",
        category: "dry-head"
      },
      {
        id: "dry-head-60",
        name: "ドライヘッドスパ 60分コース",
        duration: "60分",
        price: 6800,
        description: "深いリラクゼーション",
        category: "dry-head"
      }
    ]
  },

  // 予約設定
  booking: {
    availableTimes: [
      "10:00", "11:00", "12:00", "13:00", "14:00",
      "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
    ],
    advanceBookingDays: 30, // 30日前まで予約可能
    minAdvanceHours: 2 // 2時間前まで予約可能
  }
};

export default appConfig;
