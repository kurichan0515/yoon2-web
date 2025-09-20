// アプリケーション設定ファイル
const appConfig = {
  // Firebase設定（環境変数から取得、フォールバック値も設定）
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "demo-api-key",
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
      url: process.env.REACT_APP_LINE_URL || "",
      note: "ご予約やお問い合わせは公式LINEにメッセージをお願いします"
    }
  },

  // 店舗情報
  shop: {
    name: process.env.REACT_APP_SHOP_NAME || "耳かき屋さん",
    phone: process.env.REACT_APP_SHOP_PHONE || "080-8478-1163",
    address: process.env.REACT_APP_SHOP_ADDRESS || "愛媛県松山市清水町３丁目２０１－２ ８Ｄｒｏｐｓ １０２号室",
    access: {
      stations: [
        "高砂町駅から徒歩1分",
        "清水町駅から徒歩6分",
        "東西線清水町三バス停まで徒歩4分"
      ],
      landmarks: "勝山中学校の隣",
      parking: "駐車場あり(兼久駐車場)"
    },
    hours: {
      open: "10:00",
      close: "20:00",
      note: "営業時間外でも対応できることがあります。お気軽にお問い合わせください。"
    },
    holidays: "不定休",
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
      "お電話に出ることができません",
      "ご予約やお問い合わせの際はお手数ですが公式LINEにメッセージをお願いします",
      "施術直前のキャンセルは施術料の50%",
      "無断キャンセルは施術料の100%",
      "ご理解の上ご予約ください"
    ],
    services: [
      {
        id: "basic",
        name: "基本耳かき",
        duration: "30分",
        price: 2000,
        description: "基本的な耳かきサービス"
      },
      {
        id: "premium",
        name: "プレミアム耳かき",
        duration: "45分",
        price: 3000,
        description: "マッサージ付きの特別サービス"
      },
      {
        id: "deluxe",
        name: "デラックス耳かき",
        duration: "60分",
        price: 4000,
        description: "フルコースの最高級サービス"
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
