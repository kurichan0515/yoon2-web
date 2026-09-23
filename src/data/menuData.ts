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

const EAR_DESC =
  'モニターを見ながらのプロの耳掃除で耳の中を綺麗に！自律神経を刺激する耳掃除で不調も取れる身体に導きます！';
const EAR_OIL_DESC =
  'オイルでリンパを流した後、耳とヘッドをほぐし全身の疲労を取っていく至福のコース。いつも頑張っている自分へのご褒美に。';
const OIL_DESC =
  '厳選オイルを使用し、滞ったリンパをじっくり丁寧に流します。冷え性や浮腫み、身体の重だるさを解消したい方に。';

export const MENU_DATA: MenuCategory[] = [
  {
    category: 'イヤーエステ',
    categoryKey: 'ear-este',
    description: '愛媛県初！イヤースコープで見える耳かき',
    menus: [
      {
        id: 'ear-40-new',
        name: '【まずはお試し！】新規イヤーエステ40分',
        price: 4500, originalPrice: 5000, time: 40,
        description: EAR_DESC,
        badge: '初回限定', newCustomer: true,
      },
      {
        id: 'ear-40',
        name: '【愛媛初！】新感覚★見る耳掃除/イヤーエステ 40分',
        price: 5000, time: 40,
        description: EAR_DESC,
        badge: null,
      },
      {
        id: 'ear-60',
        name: '【当店人気♪】愛媛初の見る耳掃除ゆったり60分',
        price: 7000, time: 60,
        description: 'スコープで耳の中を確認しながら丁寧に耳掃除。仕上げに耳まわりとヘッドをほぐす人気コース。爽快感と整う感覚を同時に体感。',
        badge: '人気', recommended: true,
      },
      {
        id: 'ear-80',
        name: '【見て楽しい×眠れる】耳集中80分',
        price: 10000, time: 80,
        description: '見て楽しいイヤースコープと、思わず眠ってしまう心地よさを両方体感できる耳集中コース。',
        badge: null,
      },
    ],
  },
  {
    category: 'イヤーエステ×オイルリンパ',
    categoryKey: 'ear-oil',
    description: 'イヤーエステ40分＋オイルリンパで全身まるごとケア',
    menus: [
      {
        id: 'ear-oil-100-new',
        name: '【新規】イヤーエステ40分＋オイルリンパ 100分',
        price: 11800, originalPrice: 12500, time: 100,
        description: EAR_OIL_DESC,
        badge: '初回限定', newCustomer: true,
      },
      {
        id: 'ear-oil-100',
        name: 'イヤーエステ40分＋オイルリンパ 100分',
        price: 12500, time: 100,
        description: EAR_OIL_DESC,
        badge: '人気', recommended: true,
      },
      {
        id: 'ear-oil-130',
        name: 'イヤーエステ40分＋オイルリンパ 130分',
        price: 15500, time: 130,
        description: EAR_OIL_DESC,
        badge: null,
      },
      {
        id: 'ear-oil-160',
        name: 'イヤーエステ40分＋オイルリンパ 160分',
        price: 17500, time: 160,
        description: `${EAR_OIL_DESC}※1日2名様限定`,
        badge: '1日2名限定', premium: true,
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
        name: '【首肩デコルテ集中】極上全身オイルリンパ60分',
        price: 7800, time: 60,
        description: '厳選オイルで全身をじっくり流したのち、首・肩・デコルテを集中ケア。冷えやむくみ、肩まわりの重だるさをまるごとリセットしたい方に。',
        badge: null,
      },
      {
        id: 'oil-90-new',
        name: '【新規】全身じんわりほぐして眠りへ導くリンパ時間 90分',
        price: 9800, originalPrice: 11000, time: 90,
        description: OIL_DESC,
        badge: '初回限定', newCustomer: true,
      },
      {
        id: 'oil-90',
        name: '★全身じんわりほぐして眠りへ導くリンパ時間 90分',
        price: 11000, time: 90,
        description: OIL_DESC,
        badge: '人気', recommended: true,
      },
      {
        id: 'oil-120',
        name: 'じっくり流して整える、贅沢オイルリンパ 120分',
        price: 13000, time: 120,
        description: OIL_DESC,
        badge: null,
      },
    ],
  },
  // TODO: オプション（ヘッドスパ10分延長 / 足つぼ / 部分オイルリンパ / 耳つぼジュエリー）
  // 価格・時間 確定後に追加。description は下記を想定。
  // {
  //   category: 'オプション',
  //   categoryKey: 'option',
  //   description: '単体予約不可・他メニューと自由に組み合わせ可能な追加オプションです。施術内容は当日ご相談いただけます。',
  //   menus: [ ... ],
  // },
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
