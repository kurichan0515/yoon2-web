export interface MenuItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  time: number;
  description: string;
  badge?: string | null;
  recommended?: boolean;
  newCustomer?: boolean;
  premium?: boolean;
}

export interface MenuCategory {
  category: string;
  categoryKey: string;
  description: string;
  menus: MenuItem[];
}

export const HOTPEPPER_URL = 'https://beauty.hotpepper.jp/kr/slnH000744156/';

export const MENU_DATA: MenuCategory[] = [
  {
    category: '耳つぼ',
    categoryKey: 'mimitubo',
    description: '耳つぼもみほぐし＋ジュエリーつけ放題で24時間不調ケア',
    menus: [
      {
        id: 'mimitubo-regular',
        name: '【個数制限なし★】耳つぼ(ジュエリー込) 30-40分',
        price: 3500, time: 40,
        description: '耳つぼもみほぐしでほぐした後、お悩みに合わせたジュエリーをつけ放題。耳掃除なしでその分もみほぐしをたっぷり。200以上のツボから不調箇所にアプローチし、ジュエリーで24時間体質改善をサポート。',
        badge: '女性一番人気', recommended: true,
      },
      {
        id: 'mimitubo-pair-60',
        name: '【友達や家族、恋人と】耳つぼペアプラン 60分',
        price: 6500, time: 60,
        description: '《耳つぼjewelry》種類豊富、パーツ選びも楽しく体感♪おそろいにしたりお互いの不調共有したり、耳つぼ体験の仕方は無限大★ ※詳細はホットペッパービューティー内をご確認ください',
        badge: 'ペア',
      },
      {
        id: 'mimitubo-summer-30',
        name: '夏休み限定★耳つぼ(ジュエリー込)個数制限なし 30分',
        price: 3300, time: 30,
        description: '【夏休み限定】ジュエリー付け放題♪カウンセリングからしっかり行い、耳つぼで元々持っている自己免疫や自然治癒力を活性化していきましょう ※詳細はホットペッパービューティー内をご確認ください',
        badge: '季節限定',
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
        price: 4500, time: 40, originalPrice: 5000,
        description: 'モニターを見ながらのプロの耳掃除で耳の中を綺麗に！自律神経を刺激する耳掃除で不調も取れる身体に導きます！',
        badge: '初回限定', newCustomer: true,
      },
      {
        id: 'ear-40',
        name: '【愛媛初！】新感覚★見る耳掃除/イヤーエステ 40分',
        price: 5000, time: 40,
        description: 'モニターを見ながらのプロの耳掃除で耳の中を綺麗に！自律神経を刺激する耳掃除で不調も取れる身体に導きます！',
        badge: '人気', recommended: true,
      },
      {
        id: 'ear-40-earlybook',
        name: '【1週間前までのご予約でお得】イヤーエステ40分',
        price: 4800, time: 40, originalPrice: 5000,
        description: '1週間前までにご予約いただいた方限定クーポン！モニターを見ながらプロの耳掃除で耳の中を綺麗に！',
        badge: '再来割引',
      },
      {
        id: 'ear-60',
        name: '【当店人気♪】愛媛初の見る耳掃除ゆったり60分',
        price: 7000, time: 60,
        description: 'スコープで耳の中を確認しながら丁寧に耳掃除。仕上げに耳まわりとヘッドをほぐす人気コース。爽快感と整う感覚を同時に体感。',
        badge: '人気', recommended: true,
      },
      {
        id: 'ear-60-weekday',
        name: '【平日10-12時限定】イヤーエステ60分',
        price: 6300, time: 60, originalPrice: 7000,
        description: '平日の午前中を有効活用！プロによる耳そうじと、耳ツボを刺激するリフレクソロジーのセット。',
        badge: '平日限定',
      },
      {
        id: 'ear-80',
        name: '【耳特化！】とにかく耳集中コース80分',
        price: 10500, time: 80,
        description: '丁寧に耳掃除をした後に泡とオイルで耳周りをほぐし、ヘッドと耳つぼの刺激で耳から身体の疲れを取り除いていく当店おすすめのコース。',
        badge: 'おすすめ', recommended: true,
      },
      {
        id: 'ear-80-new',
        name: '【新規】初めての方におすすめ耳集中80分コース',
        price: 10000, time: 80, originalPrice: 10500,
        description: '丁寧に耳掃除をした後に泡とオイルで耳周りをほぐし、ヘッドと耳つぼの刺激で耳から身体の疲れを取り除いていく当店おすすめのコース。',
        badge: '初回限定', newCustomer: true,
      },
      {
        id: 'ear-headspa-hand-50',
        name: '[chiharu指名限定]ドライヘッドスパ＋ハンドケア至福の50分コース',
        price: 5500, time: 50,
        description: '眠れない方・デスクワークで疲れた方・手先を使う事が多い方へ。頭をほぐした後、オイルを利用したハンドケアで日頃の疲れを癒す ※詳細はホットペッパービューティー内をご確認ください',
        badge: '指名限定',
      },
      {
        id: 'ear-headspa-40',
        name: '【爽快!!】耳からほぐすドライヘッドスパ 40分',
        price: 4500, time: 40,
        description: '眠れない方・デスクワークで疲れた方へ。ヘッドスパだけのメニュー ※詳細はホットペッパービューティー内をご確認ください',
        badge: null,
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
        price: 13000, time: 120,
        description: 'オイルでリンパを流した後、耳とヘッドをほぐし全身の疲労を取っていく至福の120分コース。いつも頑張っている自分へのご褒美に。',
        badge: 'プレミアム', premium: true,
      },
      {
        id: 'recommend-pair-60',
        name: '【友達や家族、恋人と】耳つぼペアプラン 60分',
        price: 6500, time: 60,
        description: '《耳つぼjewelry》種類豊富、パーツ選びも楽しく体感♪おそろいにしたりお互いの不調共有したり、耳つぼ体験の仕方は無限大★ ※詳細はホットペッパービューティー内をご確認ください',
        badge: 'ペア',
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
        price: 6800, time: 60,
        description: '厳選オイルを使用し、滞ったリンパをじっくり丁寧に流します。冷え性や浮腫み、身体の重だるさを解消したい方に。',
        badge: null,
      },
      {
        id: 'oil-60-weekday',
        name: '【平日10-12時限定】オイルリンパ60分',
        price: 6100, time: 60, originalPrice: 6800,
        description: '午前中の施術で、一日を軽やかにスタート！厳選オイルを使用し、滞ったリンパをじっくり丁寧に流します。',
        badge: '平日限定',
      },
      {
        id: 'oil-90',
        name: '★全身じんわりほぐして眠りへ導くリンパ時間 90分',
        price: 11000, time: 90,
        description: '厳選オイルを使用し、滞ったリンパをじっくり丁寧に流します。冷え性や浮腫み、身体の重だるさを解消したい方に。',
        badge: '人気', recommended: true,
      },
    ],
  },
  {
    category: 'オプション',
    categoryKey: 'option',
    description: '単体予約不可・他メニューと自由に組み合わせ可能な追加オプションです。施術内容は当日ご相談いただけます。詳細はホットペッパービューティー内をご確認ください。',
    menus: [
      {
        id: 'option-head-15',
        name: 'ヘッドスパ15分（追加）',
        price: 1500, time: 15,
        description: '他メニューに追加できるヘッドスパ15分。',
        badge: 'オプション',
      },
      {
        id: 'option-head-30',
        name: 'ヘッドスパ30分（追加）',
        price: 3500, time: 30,
        description: '他メニューに追加できるヘッドスパ30分。',
        badge: 'オプション',
      },
      {
        id: 'option-foot-30',
        name: '足つぼ30分（追加）',
        price: 3500, time: 30,
        description: '他メニューに追加できる足つぼ30分。',
        badge: 'オプション',
      },
      {
        id: 'option-foot-45',
        name: '足つぼ45分',
        price: 5500, time: 45,
        description: '他メニューに追加できる足つぼ45分。',
        badge: 'オプション',
      },
      {
        id: 'option-oil-60',
        name: 'オイル60分（追加）',
        price: 6000, time: 60,
        description: '他メニューに追加できるオイル60分。',
        badge: 'オプション',
      },
      {
        id: 'option-oil-30',
        name: 'オイル30分（追加）',
        price: 4000, time: 30,
        description: '他メニューに追加できるオイル30分。',
        badge: 'オプション',
      },
    ],
  },
];

export function getMenuStructuredData(): string {
  const items = MENU_DATA.flatMap((cat, ci) =>
    cat.menus.map((menu, mi) => ({
      '@type': 'ListItem',
      position: ci * 10 + mi + 1,
      item: {
        '@type': 'Service',
        name: menu.name,
        description: menu.description,
        offers: { '@type': 'Offer', price: String(menu.price), priceCurrency: 'JPY' },
      },
    }))
  );
  return JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: items });
}
