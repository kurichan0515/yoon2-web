export const HOTPEPPER_URL = 'https://beauty.hotpepper.jp/kr/slnH000744156/';

export const MENU_DATA = [
  {
    category: 'イヤーエステ',
    categoryKey: 'ear-este',
    description: '愛媛県初！イヤースコープで見える耳かき',
    menus: [
      {
        id: 'ear-40',
        name: 'イヤーエステ40分',
        price: 5000,
        time: 60,
        description: 'イヤースコープで耳の中を確認しながら、耳かき・耳つぼマッサージで心地よいリラックス体験。初めての方にもおすすめ。',
        badge: '人気',
        recommended: true,
      },
      {
        id: 'ear-60',
        name: 'イヤーエステ60分',
        price: 7000,
        time: 80,
        description: 'じっくり時間をかけて耳ケア。耳・頭・首肩までトータルケアで深い癒しを体験できます。',
        badge: null,
      },
      {
        id: 'ear-40-new-f',
        name: 'イヤーエステ40分（新規女性）',
        price: 4000,
        time: 60,
        originalPrice: 5000,
        description: '初めての方限定！通常5,000円が4,000円でお試しいただけます。新感覚のイヤーエステを特別価格で。',
        badge: '初回限定',
        newCustomer: true,
      },
      {
        id: 'ear-40-new-m',
        name: 'イヤーエステ40分（新規男性）',
        price: 4500,
        time: 60,
        originalPrice: 5000,
        description: 'メンズにも人気！初回特別価格4,500円で耳から始める癒しの時間をお楽しみください。',
        badge: '初回限定',
        newCustomer: true,
      },
    ],
  },
  {
    category: 'おすすめコース',
    categoryKey: 'recommend',
    description: 'オーダーメイドで贅沢な時間を',
    menus: [
      {
        id: 'order-90',
        name: '組み合わせ自由90分',
        price: 12000,
        time: 120,
        description: 'イヤーエステ・ヘッドスパ・足つぼ・オイルマッサージからお好きな組み合わせで。あなただけのオーダーメイド施術。',
        badge: '人気',
        recommended: true,
      },
      {
        id: 'order-90-new',
        name: '90分（新規）',
        price: 10500,
        time: 120,
        originalPrice: 12000,
        description: '初回限定10,500円！オーダーメイド施術で深部まで整える贅沢プラン。お好きな組み合わせをお選びいただけます。',
        badge: '初回限定',
        newCustomer: true,
      },
      {
        id: 'order-120',
        name: '120分',
        price: 13000,
        time: 150,
        description: '不眠・疲労・自律神経の乱れが気になる方へ。最高峰の癒し体験で心身ともにリフレッシュ。',
        badge: 'プレミアム',
        premium: true,
      },
    ],
  },
  {
    category: 'ヘッドスパ',
    categoryKey: 'head-spa',
    description: '頭痛・不眠改善に',
    menus: [
      {
        id: 'head-40',
        name: 'ヘッドスパ（40分）',
        price: 4500,
        time: 60,
        description: '頭皮マッサージで血行促進。頭痛・眼精疲労・不眠の改善に効果的。デスクワークで疲れた頭をリフレッシュ。',
        badge: null,
      },
      {
        id: 'head-opt',
        name: 'ヘッドスパ（オプション）',
        price: 1500,
        time: 25,
        description: '他のメニューと組み合わせて、さらなる癒しを。イヤーエステとの相性抜群です。',
        badge: 'オプション',
        isOption: true,
      },
    ],
  },
  {
    category: '耳つぼ',
    categoryKey: 'mimitubo',
    description: '身体の不調にアプローチ',
    menus: [
      {
        id: 'mimitubo-regular',
        name: '耳つぼ（付け放題）',
        price: 3500,
        time: 50,
        description: 'ダイエット・美容・健康のツボを刺激。豊富なパーツから選べるジュエリーで、おしゃれにケア。',
        badge: null,
      },
      {
        id: 'mimitubo-new',
        name: '耳つぼ（新規）',
        price: 4000,
        time: 50,
        description: '初めての方へ。カウンセリング込みでじっくり体質改善をサポートします。',
        badge: '初回限定',
        newCustomer: true,
      },
    ],
  },
  {
    category: '足つぼ',
    categoryKey: 'foot',
    description: '全身の疲れをリフレッシュ',
    menus: [
      {
        id: 'foot-45',
        name: '足つぼ（45分）',
        price: 5500,
        time: 65,
        description: '足裏の反射区を刺激して全身のバランスを整える。むくみ・冷え性改善に効果的です。',
        badge: null,
      },
      {
        id: 'foot-opt',
        name: '足つぼ（オプション）',
        price: 3300,
        time: 40,
        description: '他メニューと組み合わせて下半身の疲れもスッキリ。立ち仕事の方におすすめ。',
        badge: 'オプション',
        isOption: true,
      },
    ],
  },
  {
    category: 'オイルマッサージ',
    categoryKey: 'oil',
    description: 'リンパの流れを整える',
    menus: [
      {
        id: 'oil-60',
        name: 'オイルマッサージ（60分）',
        price: 6500,
        time: 90,
        description: '上質なオイルでリンパドレナージュ。デトックス・むくみ解消・美肌効果が期待できます。',
        badge: null,
      },
      {
        id: 'oil-opt',
        name: 'オイルマッサージ（オプション）',
        price: 6000,
        time: 70,
        description: 'イヤーエステと組み合わせて全身トータルケア。極上のリラクゼーション体験を。',
        badge: 'オプション',
        isOption: true,
      },
    ],
  },
];

// SEO構造化データ
export function getMenuStructuredData() {
  const items = MENU_DATA.flatMap((cat, ci) =>
    cat.menus.map((menu, mi) => ({
      '@type': 'ListItem',
      position: ci * 10 + mi + 1,
      item: {
        '@type': 'Service',
        name: menu.name,
        description: menu.description,
        offers: {
          '@type': 'Offer',
          price: String(menu.price),
          priceCurrency: 'JPY',
        },
      },
    }))
  );
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items,
  });
}
