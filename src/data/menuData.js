export const HOTPEPPER_URL = 'https://beauty.hotpepper.jp/kr/slnH000744156/';

export const MENU_DATA = [
  {
    category: '耳つぼ',
    categoryKey: 'mimitubo',
    description: '耳つぼマッサージ＋ジュエリーつけ放題で24時間不調ケア',
    menus: [
      {
        id: 'mimitubo-regular',
        name: '【個数制限なし★】耳つぼ(ジュエリー込) 30-40分',
        price: 3500,
        time: 40,
        description: '耳つぼマッサージでほぐした後、お悩みに合わせたジュエリーをつけ放題。耳掃除なしでその分マッサージをたっぷり。200以上のツボから不調箇所にアプローチし、ジュエリーで24時間体質改善をサポート。',
        badge: '女性一番人気',
        recommended: true,
      },
    ],
  },
  {
    category: 'イヤーエステ',
    categoryKey: 'ear-este',
    description: '愛媛県初！イヤースコープで見える耳かき',
    menus: [
      {
        id: 'ear-40-new',
        name: '【まずはお試し！】新規イヤーエステ40分',
        price: 4500,
        time: 40,
        originalPrice: 5000,
        description: 'モニターを見ながらのプロの耳掃除で耳の中を綺麗に！自律神経を刺激する耳掃除で不調も取れる身体に導きます！自分の耳の状態を知りたい方におすすめ！',
        badge: '初回限定',
        newCustomer: true,
      },
      {
        id: 'ear-40',
        name: '【愛媛初！】新感覚★見る耳掃除/イヤーエステ 40分',
        price: 5000,
        time: 40,
        description: 'モニターを見ながらのプロの耳掃除で耳の中を綺麗に！自律神経を刺激する耳掃除で不調も取れる身体に導きます！自分の耳の状態を知りたい方におすすめ！',
        badge: '人気',
        recommended: true,
      },
      {
        id: 'ear-40-earlybook',
        name: '【1週間前までのご予約でお得】イヤーエステ40分',
        price: 4800,
        time: 40,
        originalPrice: 5000,
        description: '1週間前までにご予約いただいた方限定クーポン！モニターを見ながらプロの耳掃除で耳の中を綺麗に！自律神経を刺激する耳掃除で不調も取れる身体に！',
        badge: '再来割引',
      },
      {
        id: 'ear-60',
        name: '【当店人気♪】愛媛初の見る耳掃除ゆったり60分',
        price: 7000,
        time: 60,
        description: 'スコープで耳の中を確認しながら丁寧に耳掃除。仕上げに耳まわりとヘッドをほぐす人気コース。爽快感と整う感覚を同時に体感。',
        badge: '人気',
        recommended: true,
      },
      {
        id: 'ear-60-weekday',
        name: '【平日10-12時限定】イヤーエステ60分',
        price: 6300,
        time: 60,
        originalPrice: 7000,
        description: '平日の午前中を有効活用！プロによる耳そうじと、耳ツボを刺激するリフレクソロジーのセット。忙しい日常を忘れ、頭の中までスッキリする贅沢な時間を！',
        badge: '平日限定',
      },
      {
        id: 'ear-80',
        name: '【耳特化！】とにかく耳集中コース80分',
        price: 10500,
        time: 80,
        description: '丁寧に耳掃除をした後に泡とオイルで耳周りをほぐし、ヘッドと耳つぼの刺激で耳から身体の疲れを取り除いていく当店おすすめのコース。※耳つぼジュエリーをご希望の方はメニューから',
        badge: 'おすすめ',
        recommended: true,
      },
      {
        id: 'ear-80-new',
        name: '【新規】初めての方におすすめ耳集中80分コース',
        price: 10000,
        time: 80,
        originalPrice: 10500,
        description: '丁寧に耳掃除をした後に泡とオイルで耳周りをほぐし、ヘッドと耳つぼの刺激で耳から身体の疲れを取り除いていく当店おすすめのコース。※耳つぼジュエリーをご希望の方はメニューから',
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
        id: 'full-120',
        name: 'じっくり流して整える、贅沢ロングコース 120分',
        price: 13000,
        time: 120,
        description: 'オイルでリンパを流した後、耳とヘッドをほぐし全身の疲労を取っていく至福の120分コース。いつも頑張っている自分へのご褒美に。※耳かきは含まれないコースです',
        badge: 'プレミアム',
        premium: true,
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
        name: '★ サクッと整う全身リンパ60分',
        price: 6800,
        time: 60,
        description: '厳選オイルを使用し、滞ったリンパをじっくり丁寧に流します。冷え性や浮腫み、身体の重だるさを解消したい方に。',
        badge: null,
      },
      {
        id: 'oil-60-weekday',
        name: '【平日10-12時限定】オイルリンパ60分',
        price: 6100,
        time: 60,
        originalPrice: 6800,
        description: '午前中の施術で、一日を軽やかにスタート！厳選オイルを使用し、滞ったリンパをじっくり丁寧に流します。冷えやむくみ、身体の重だるさを解消したい方に。',
        badge: '平日限定',
      },
      {
        id: 'oil-90',
        name: '★全身じんわりほぐして眠りへ導くリンパ時間 90分',
        price: 11000,
        time: 90,
        description: '厳選オイルを使用し、滞ったリンパをじっくり丁寧に流します。冷え性や浮腫み、身体の重だるさを解消したい方に。',
        badge: '人気',
        recommended: true,
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
