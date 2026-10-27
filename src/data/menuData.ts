export interface MenuItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  priceFrom?: boolean;
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

// 2026年10月改定版（ホットペッパービューティー掲載内容に準拠）
export const MENU_DATA: MenuCategory[] = [
  {
    category: 'イヤーエステ',
    categoryKey: 'ear-este',
    description: '愛媛県初！イヤースコープで見える耳かき',
    menus: [
      {
        id: 'ear-40-new',
        name: '【初めての方に】見える耳かき＋耳元リフレ＆イヤーエステ 40分',
        price: 4500, originalPrice: 5000, time: 40,
        description: '耳元からじんわり心地よい癒やしを。モニターで耳の中を確認しながらプロが丁寧に耳かき。さらに耳の心地よい刺激で、日頃のPC・スマホによる目や頭のパツパツ感をスッキリ解放します。',
        badge: '初回限定', newCustomer: true,
      },
      {
        id: 'ear-40',
        name: '新感覚♪見る耳掃除/イヤーエステ 40分',
        price: 5000, time: 40,
        description: 'モニターで見えるプロによる本格耳かき。耳元のリフレッシュで、短時間でも頭がすっきり軽くなります。自律神経を刺激する耳掃除♪自分の耳の状態を知りたい方や、耳掃除が苦手な方におすすめ！',
        badge: null,
      },
      {
        id: 'ear-60',
        name: '【耳から脳へ】イヤーエステ×ドライヘッドスパ 60分',
        price: 7000, time: 60,
        description: '見える耳かきに、頭のラインを心地よく捉えるヘッドスパをプラス。首肩周りの重だるさ、どんよりした目の疲れに。心地よい手技で頭が軽くなります。',
        badge: null,
      },
      {
        id: 'ear-80',
        name: '【人気】極上イヤーエステ（泡ケア＆ヘッドスパ付）80分',
        price: 10000, time: 80,
        description: '見える耳掃除×耳の爽快泡洗浄×頭・首・肩の徹底ケア。かっさによる心地よいアプローチを一部織り交ぜて巡りを促し、日頃の溜まったお疲れをリセットするフルコース。',
        badge: '人気', recommended: true,
      },
      {
        id: 'ear-60-weekday',
        name: '【平日限定★お疲れケア】極上イヤーエステ60分＋ヘッドスパ5分延長',
        price: 7000, time: 65,
        description: 'プロの本格耳掃除のコースに、平日限定でドライヘッドスパを5分延長。いつもより念入りにお疲れをほぐします。※平日午前中限定・2回目以降の方・他クーポン併用不可',
        badge: '平日限定',
      },
    ],
  },
  {
    category: 'イヤーエステ×オイルリンパ',
    categoryKey: 'ear-oil',
    description: 'イヤーエステ40分＋3種から選べる贅沢オイルで全身まるごとケア',
    menus: [
      {
        id: 'ear-oil-100-new',
        name: '【新規】イヤーエステ40分＋3種から選べる深層贅沢オイル 100分',
        price: 11800, originalPrice: 12500, time: 100,
        description: '【当店一押し】耳元の心地よい刺激で緊張を解きほぐした後、全身オイルリンパへ。その日の体調やお悩みに合わせて最適なオイルを選びかっさも少し取り入れ、お疲れを根本からスッキリ解放。',
        badge: '初回限定', newCustomer: true,
      },
      {
        id: 'ear-oil-100',
        name: '【至福の休息】イヤーエステ40分×3種から選べる贅沢オイル 100分',
        price: 12500, time: 100,
        description: '耳元の心地よい刺激と全身オイル。当日の体調に合わせて選べるアロマオイルを使用し、日常の慢性的なお疲れ、冷え、コリを心地よく癒やします。アクセントに少し取り入れるかっさも好評◎',
        badge: null,
      },
      {
        id: 'ear-oil-130',
        name: '【深い眠りへ】イヤーエステ40分×3種から選べる贅沢オイル 130分',
        price: 16500, time: 130,
        description: '全身をじっくり解放。体調に合わせた選べる3種のオイルとかっさを取り入れた心地よい圧のケアで、心身の緊張を完全に解きほぐします。',
        badge: '人気', recommended: true,
      },
      {
        id: 'ear-oil-160',
        name: '【究極のご褒美】イヤーエステ40分×3種から選べる贅沢オイル 160分',
        price: 17500, time: 160,
        description: '頑張る自分への最高のご褒美。当日の体調やお好みに合わせて選べる3種のブレンドオイルを使用。頭から足先まで、全身のバランスを心地よく整える至高のロングコース。',
        badge: 'プレミアム', premium: true,
      },
    ],
  },
  {
    category: 'オイルリンパ',
    categoryKey: 'oil',
    description: '3種から選べるオイルでリンパの流れを整える ★メンズもOK',
    menus: [
      {
        id: 'oil-90-new',
        name: '【新規】和漢オイルリンパ90分☆メンズもOK',
        price: 9800, originalPrice: 11000, time: 90,
        description: '身体に合わせて選べる3種のオイル。頭の重さ、慢性疲労、寝不足を一気に解消したい方へ。メンズもオイルリンパ可能！',
        badge: '初回限定', newCustomer: true,
      },
      {
        id: 'oil-60',
        name: '【首肩デコルテ集中】極上全身和漢オイルリンパ 60分',
        price: 7800, time: 60,
        description: '慢性的な首肩こり、目の疲れに。首肩・デコルテ（胸元）まわりのリンパ流しをメインにアプローチするオイルケア。お好みのオイルで、短時間でコリ固まった部分を狙い撃ちします。',
        badge: null,
      },
      {
        id: 'oil-90',
        name: '【慢性的な疲労感のある方へ】不調をリセット★和漢オイルリンパ 90分',
        price: 11000, time: 90,
        description: '今日は身体の疲れを徹底的に流したい方向け。五行診断で選んだ漢方オイルを使い、全身の経絡を流してコリやむくみを解消します。',
        badge: '人気', recommended: true,
      },
      {
        id: 'oil-120',
        name: 'じっくり深層・極上和漢オイルリンパ 120分',
        price: 13000, time: 120,
        description: '仕事や運転、立ち仕事などで身体の疲れが溜まっている方や慢性的にお疲れの方へ。体調に合わせて選べるオイルで時間をかけてお身体を癒し、本来持っているイキイキとした元気を取り戻します。',
        badge: null,
      },
    ],
  },
  {
    category: 'ヘッドスパ・その他',
    categoryKey: 'other',
    description: 'ヘッドスパ・足つぼ・耳つぼなど',
    menus: [
      {
        id: 'headspa-40',
        name: '【爽快!!】耳からほぐすドライヘッドスパ 40分',
        price: 4500, time: 40,
        description: '眠れない方やデスクワークでお疲れな方へ、ヘッドスパだけのメニューです。※2回目以降の方',
        badge: null,
      },
      {
        id: 'headspa-hand-50-chiharu',
        name: '[chiharu指名限定]ドライヘッドスパ＋ハンドケア至福の50分コース',
        price: 5500, time: 50,
        description: '眠れない方やデスクワークでお疲れの方、手先を使う事が多い方へ。頭をほぐした後、オイルを利用したハンドケアで日頃の疲れを癒します。※2回目以降の方',
        badge: '指名限定',
      },
      {
        id: 'foot-ear-head-50-yuki',
        name: '【yu-ki指名限定】足つぼ×耳つぼ×ヘッドスパ 50分',
        price: 5500, time: 50,
        description: '足つぼ30分×耳つぼ・ヘッドスパ20分のコース。つぼが大好き、足が重たい、立ち仕事の方におすすめ。※2回目以降の方',
        badge: '指名限定',
      },
      {
        id: 'mimitubo-regular',
        name: '【個数制限なし★】耳つぼ(ジュエリー込) 30-40分',
        price: 3500, time: 40,
        description: '耳には自律神経が集中していて全身に繋がる200以上のツボがあります。耳を刺激することで全身の不調改善に繋がります。パーツも豊富♪',
        badge: null,
      },
      {
        id: 'oil-65-weekday',
        name: '【平日限定★】極上ドライヘッドスパ＆デコルテ付オイルリンパ 65分',
        price: 7800, time: 65,
        description: '大人気のドライヘッドスパと首肩・胸元まわりのリンパをプラス。耳まわりの血流を良くすることで、頭痛や目の疲れ、脳疲労をすっきり解放します。男性歓迎◎ ※平日午前中限定・2回目以降の方・他クーポン併用不可',
        badge: '平日限定',
      },
    ],
  },
  {
    category: 'オプション',
    categoryKey: 'option',
    description: '追加メニュー単体でのご予約は不可です。施術内容は当日ご相談可能。イヤーエステ・オイルなど時間内で組み合わせ自由です。',
    menus: [
      {
        id: 'option-head-10',
        name: '【追加】ヘッドスパ10分',
        price: 1500, time: 10,
        description: '耳だけよりも少し頭もほぐして欲しいなど、小さな希望を叶えます。',
        badge: 'オプション',
      },
      {
        id: 'option-foot-30',
        name: '【追加】足つぼ30分',
        price: 3500, time: 30,
        description: '他メニューに追加できる足つぼ30分。',
        badge: 'オプション',
      },
      {
        id: 'option-extend-10',
        name: '【延長】10分',
        price: 2000, time: 10,
        description: '施術時間を10分延長できます。',
        badge: 'オプション',
      },
      {
        id: 'option-oil-30',
        name: '【追加】オイル30分',
        price: 4000, time: 30,
        description: '60分以上のオイルメニュー、またはイヤーエステ×オイルメニューに追加可能。',
        badge: 'オプション',
      },
      {
        id: 'option-mimitubo-jewelry',
        name: '【追加】耳つぼジュエリー',
        price: 3500, time: 10,
        description: '他メニューに追加できる耳つぼジュエリーつけ放題。',
        badge: 'オプション',
      },
      {
        id: 'option-mimitubo-jewelry-single',
        name: '【追加】耳つぼジュエリー（1粒）',
        price: 150, priceFrom: true, time: 0,
        description: '他メニューに1粒から追加できます。',
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
