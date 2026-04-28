export const HOTPEPPER_URL = 'https://beauty.hotpepper.jp/kr/slnH000744156/';

export const MENU_DATA = [
  {
    category: 'イヤーエステ',
    categoryKey: 'ear-este',
    description: '愛媛県初！イヤースコープで見える耳かき',
    menus: [
      {
        id: 'ear-40-new',
        name: 'イヤーエステ40分（新規）',
        price: 4500,
        time: 60,
        originalPrice: 5000,
        description: '初めての方限定！通常5,000円が4,500円でお試しいただけます。新感覚のイヤーエステを特別価格で。',
        badge: '初回限定',
        newCustomer: true,
      },
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
        id: 'ear-80',
        name: '耳集中80分コース',
        price: 10500,
        time: 100,
        description: '丁寧に耳掃除をした後に泡とオイルで耳周りをほぐし、ヘッドと耳つぼの刺激で耳から身体の疲れを取り除いていく当店おすすめのコース。※耳つぼジュエリーをご希望の方はメニューから',
        badge: '人気',
        recommended: true,
      },
    ],
  },
  {
    category: 'おすすめコース',
    categoryKey: 'recommend',
    description: 'オーダーメイドで贅沢な時間を',
    menus: [
      {
        id: 'full-120',
        name: '全身疲労回復120分コース',
        price: 13000,
        time: 140,
        description: 'オイルでリンパを流した後、耳とヘッドをほぐし全身の疲労を取っていく至福の120分コース。いつも頑張っている自分へのご褒美に。※耳かきは含まれないコースです',
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
        name: 'ドライヘッドスパ40分',
        price: 4500,
        time: 60,
        description: '頭皮マッサージで血行促進。頭痛・眼精疲労・不眠の改善に効果的。デスクワークで疲れた頭をリフレッシュ。',
        badge: null,
      },
      {
        id: 'head-opt',
        name: '【追加】ヘッドスパ15分',
        price: 1500,
        time: 15,
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
        name: '耳つぼ（ジュエリー込み）30-40分',
        price: 3500,
        time: 50,
        description: '耳には200以上のツボがあり全身に繋がります。ダイエット・美容・健康のツボを刺激して全身の不調改善に。個数制限なし。',
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
        name: '足つぼ45分',
        price: 5500,
        time: 65,
        description: '足裏の反射区を刺激して全身のバランスを整える。むくみ・冷え性改善に効果的です。',
        badge: null,
      },
      {
        id: 'foot-opt',
        name: '【追加】足つぼ30分',
        price: 3500,
        time: 30,
        description: '他メニューと組み合わせて下半身の疲れもスッキリ。立ち仕事の方におすすめ。',
        badge: 'オプション',
        isOption: true,
      },
    ],
  },
  {
    category: 'オイルリンパ',
    categoryKey: 'oil',
    description: 'リンパの流れを整える',
    menus: [
      {
        id: 'oil-60',
        name: 'オイルリンパ60分',
        price: 6800,
        time: 90,
        description: '厳選オイルを使用し、滞ったリンパをじっくり丁寧に流します。冷え性や浮腫み、身体の重だるさを解消したい方に。',
        badge: null,
      },
      {
        id: 'oil-90',
        name: 'オイルリンパ90分',
        price: 11000,
        time: 120,
        description: '冷え性・浮腫み・身体の重だるさを徹底ケア。ゆったり時間をかけてリンパを流す上質なリラクゼーション体験。',
        badge: '人気',
        recommended: true,
      },
      {
        id: 'oil-opt-60',
        name: '【追加】オイル60分',
        price: 6000,
        time: 70,
        description: 'イヤーエステと組み合わせて全身トータルケア。極上のリラクゼーション体験を。',
        badge: 'オプション',
        isOption: true,
      },
      {
        id: 'oil-opt-30',
        name: '【追加】オイル30分',
        price: 4000,
        time: 40,
        description: '他メニューに組み合わせてプラスの癒しを。短時間でしっかりリンパを流します。',
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
