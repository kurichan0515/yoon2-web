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
      url: process.env.REACT_APP_LINE_URL || "https://lin.ee/lyyKSqu",
      note: "ご予約やお問い合わせは公式LINEにメッセージをお願いします"
    }
  },

  // 店舗情報
  shop: {
    name: process.env.REACT_APP_SHOP_NAME || "yoon²ゆんゆん",
    phone: process.env.REACT_APP_SHOP_PHONE || "080-8478-1163",
    address: process.env.REACT_APP_SHOP_ADDRESS || "愛媛県松山市清水町３丁目２０１－２ ８Ｄｒｏｐｓ １０２号室",
    access: {
      stations: [
        process.env.REACT_APP_SHOP_ACCESS_STATION1 || "高砂町駅から徒歩1分",
        process.env.REACT_APP_SHOP_ACCESS_STATION2 || "清水町駅から徒歩6分",
        process.env.REACT_APP_SHOP_ACCESS_STATION3 || "東西線清水町三バス停まで徒歩4分"
      ],
      landmarks: process.env.REACT_APP_SHOP_ACCESS_LANDMARKS || "勝山中学校の隣",
      parking: process.env.REACT_APP_SHOP_ACCESS_PARKING || "駐車場あり(兼久駐車場)"
    },
    hours: {
      open: process.env.REACT_APP_SHOP_HOURS_OPEN || "10:00",
      close: process.env.REACT_APP_SHOP_HOURS_CLOSE || "20:00",
      weekday: process.env.REACT_APP_SHOP_HOURS_WEEKDAY || "10:00 - 20:00",
      weekend: process.env.REACT_APP_SHOP_HOURS_WEEKEND || "10:00 - 20:00",
      note: process.env.REACT_APP_SHOP_HOURS_NOTE || "営業時間外でも対応できることがあります。お気軽にお問い合わせください。"
    },
    holidays: process.env.REACT_APP_SHOP_HOLIDAYS || "不定休",
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
      
      // 耳つぼメニュー
      {
        id: "mimitubo-new",
        name: "ご新規様",
        duration: "60分",
        price: parseInt(process.env.REACT_APP_PRICE_MIMITUBO_NEW) || 4000,
        description: "初回限定特別価格",
        category: "mimitubo"
      },
      {
        id: "mimitubo-pair",
        name: "ペア割新規",
        duration: "60分",
        price: parseInt(process.env.REACT_APP_PRICE_MIMITUBO_PAIR) || 3800,
        description: "お友達と一緒でお得",
        category: "mimitubo"
      },
      {
        id: "mimitubo-repeat",
        name: "リピーター様",
        duration: "60分",
        price: parseInt(process.env.REACT_APP_PRICE_MIMITUBO_REPEAT) || 3500,
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
      
      // イヤーエステメニュー
      {
        id: "ear-este-trial-male",
        name: "【新規/男性】お試し価格",
        duration: "40分",
        price: parseInt(process.env.REACT_APP_PRICE_EAR_ESTE_TRIAL_MALE) || 4500,
        description: "男性初回限定価格",
        category: "ear-este"
      },
      {
        id: "ear-este-trial-female",
        name: "【新規/女性】お試し価格",
        duration: "40分",
        price: parseInt(process.env.REACT_APP_PRICE_EAR_ESTE_TRIAL_FEMALE) || 4000,
        description: "女性初回限定価格",
        category: "ear-este"
      },
      {
        id: "ear-este-40",
        name: "イヤーエステ 40分コース",
        duration: "40分",
        price: parseInt(process.env.REACT_APP_PRICE_EAR_ESTE_40) || 5000,
        description: "基本的なイヤーエステ",
        category: "ear-este"
      },
      {
        id: "ear-este-60",
        name: "イヤーエステ 60分コース",
        duration: "60分",
        price: parseInt(process.env.REACT_APP_PRICE_EAR_ESTE_60) || 7000,
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
