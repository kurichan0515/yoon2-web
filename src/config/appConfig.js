// アプリケーション設定ファイル
const appConfig = {
  // ===== 機能フラグ =====
  // ここを変更するだけで各機能のON/OFFができます
  features: {
    firstVisitDiscount: true, // 初回割引表示 ON/OFF（trueで表示、falseで非表示）
  },

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
        parkingLot: "/images/parking/parking.png", // 駐車場の写真
        routeToShop: "/images/parking/parking-to-shop.png" // 駐車場から店舗までの写真
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
      // イヤーエステ
      {
        id: "ear-este-40",
        name: "イヤーエステ40分",
        duration: "40分",
        price: 5000,
        description: "基本的なイヤーエステ",
        category: "ear-este"
      },
      {
        id: "ear-este-60",
        name: "イヤーエステ60分",
        duration: "60分",
        price: 7000,
        description: "じっくりケアコース",
        category: "ear-este"
      },
      {
        id: "ear-este-80",
        name: "耳集中80分コース",
        duration: "80分",
        price: 10500,
        description: "耳掃除からヘッド・耳つぼまで全方位ケア",
        category: "ear-este"
      },
      {
        id: "ear-este-trial-new",
        name: "イヤーエステ40分（新規）",
        duration: "40分",
        price: 4500,
        description: "初回限定特別価格",
        category: "ear-este"
      },

      // おすすめコース
      {
        id: "full-120",
        name: "全身疲労回復120分コース",
        duration: "120分",
        price: 13000,
        description: "オイルリンパ×耳×ヘッドの至福コース",
        category: "recommend"
      },

      // ヘッドスパ
      {
        id: "dry-head-40",
        name: "ドライヘッドスパ40分",
        duration: "40分",
        price: 4500,
        description: "頭皮からリフレッシュ",
        category: "dry-head"
      },
      {
        id: "head-opt-15",
        name: "【追加】ヘッドスパ15分",
        duration: "15分",
        price: 1500,
        description: "他メニューとの組み合わせオプション",
        category: "dry-head"
      },

      // 耳つぼ
      {
        id: "mimitubo-regular",
        name: "耳つぼ（ジュエリー込み）30-40分",
        duration: "30-40分",
        price: 3500,
        description: "個数制限なし",
        category: "mimitubo"
      },
      {
        id: "mimitubo-new",
        name: "耳つぼ（新規）",
        duration: "40分",
        price: 4000,
        description: "初回限定特別価格",
        category: "mimitubo"
      },

      // 足つぼ
      {
        id: "foot-45",
        name: "足つぼ45分",
        duration: "45分",
        price: 5500,
        description: "全身バランス調整",
        category: "foot"
      },
      {
        id: "foot-opt-30",
        name: "【追加】足つぼ30分",
        duration: "30分",
        price: 3500,
        description: "他メニューとの組み合わせオプション",
        category: "foot"
      },

      // オイルリンパ
      {
        id: "oil-60",
        name: "オイルリンパ60分",
        duration: "60分",
        price: 6800,
        description: "リンパドレナージュ",
        category: "oil"
      },
      {
        id: "oil-90",
        name: "オイルリンパ90分",
        duration: "90分",
        price: 11000,
        description: "ゆったりリンパ流し",
        category: "oil"
      },
      {
        id: "oil-opt-60",
        name: "【追加】オイル60分",
        duration: "60分",
        price: 6000,
        description: "他メニューとの組み合わせオプション",
        category: "oil"
      },
      {
        id: "oil-opt-30",
        name: "【追加】オイル30分",
        duration: "30分",
        price: 4000,
        description: "他メニューとの組み合わせオプション",
        category: "oil"
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
  },

  // Google AdSense設定
  adsense: {
    // パブリッシャーID（環境変数から取得、または直接設定）
    publisherId: process.env.REACT_APP_ADSENSE_PUBLISHER_ID || "ca-pub-6862900859746528",
    // デフォルトの広告ユニットID（環境変数から取得、または直接設定）
    defaultAdSlot: process.env.REACT_APP_ADSENSE_DEFAULT_SLOT || "2647640133",
    // AdSenseを有効にするかどうか
    enabled: process.env.REACT_APP_ADSENSE_ENABLED === 'true',
    // 開発モード（ローカル環境でプレースホルダーを表示）
    devMode: process.env.REACT_APP_ADSENSE_DEV_MODE === 'true' || false
  },

  // Google Ads設定
  googleAds: {
    // コンバージョンID（環境変数から取得、または直接設定）
    // 形式: AW-1234567890
    conversionId: process.env.REACT_APP_GOOGLE_ADS_CONVERSION_ID || "",
    // コンバージョンラベル（環境変数から取得、または直接設定）
    conversionLabel: process.env.REACT_APP_GOOGLE_ADS_CONVERSION_LABEL || "",
    // Google Adsを有効にするかどうか
    enabled: process.env.REACT_APP_GOOGLE_ADS_ENABLED === 'true' || false
  }
};

export default appConfig;
