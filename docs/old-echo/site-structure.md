# 架空喫茶「old echo」Webサイト構成ドキュメント

## 1. プロジェクト概要

| 項目 | 内容 |
|------|------|
| サイト名 | 架空喫茶 old echo |
| コンセプト | 「大人の本気のカフェごっこ」。知る人ぞ知る、静かな夜の底にある秘密の喫茶店。 |
| 公開場所 | 友人の既存サイト内（例：〇〇.com/old-echo/） |
| アクセス動線 | 親サイトからのリンクは一切設置せず、URLの直接入力（直リンク）のみで到達できる「隠れ家・秘密の集会」仕様 |

---

## 2. デザインガイドライン

「静かな夜のイメージ」をベースに、ミステリアスで洗練された空間を演出する。

| 要素 | 詳細 |
|------|------|
| ベースカラー（背景） | 漆黒（`#000000`）に近いディープブラック |
| メインカラー（文字色） | 月明かりのような淡いグレー、または白 |
| アクセントカラー（差し色） | 静かで深い青（リンク、ボタンのホバーアクション等に使用） |
| フォント | 細身の「明朝体」（文学的でミステリアスな雰囲気を強調） |
| ロゴ | 用意済みの既存ロゴデータを使用する |

---

## 3. サイト構成とコピーライティング（1ページ完結）

### ① Top (Hero Section)

- **ビジュアル:** 用意済みのロゴ ＋ AI生成のメイン画像（夜の窓辺などの風景）
- **コピー:**
  > 喧騒を離れ、静寂が響き渡る場所へ。

---

### ② Concept

- **ビジュアル:** 画像なし（テキストと余白のみで静寂を表現）
- **コピー:**
  > どこにでもあるようで、どこにもない。
  > 誰かの記憶の底で反響（echo）しているような、気まぐれな喫茶店です。
  >
  > 本当のカフェでも、ただの「ごっこ」でも、ここにある時間は本物。
  > 好きなものを持ち寄り、夜の底で静かにお茶を淹れています。

---

### ③ Menu

- **ビジュアル:** AI生成の各チャイの写真（2列2行のグリッド配置）

| メニュー名 | 説明 |
|-----------|------|
| 黙らっチャイ（定番） | 日々の言葉を少しだけ休ませる、王道にして無口なスパイスの香り。 |
| おやすみなチャイ（ノンカフェインルイボスとマサラチャイ） | 眠りにつく前の、優しい時間。カフェインを抜いたぬくもりの一杯。 |
| コーヒーチャイ（コーヒーとクローブ） | 静かに夜更かしをしたいあなたへ。深煎りの苦味とクローブの鋭い余韻。 |
| チョコレートチャイ（チョコ好きにおすすめ） | 甘い夜の夢。濃厚なカカオが溶け込む、ご褒美のためのチャイ。 |

---

### ④ Event

- **ビジュアル:** AI生成のクレープを巻く手元、または具材の抽象的な写真
- **コピー:**
  > **[ May Special ] 月夜のクレープ体験会**
  >
  > 5月からは、自分で生地を焼き、好きなものを巻き込む会を開きます。
  > 具材の持ち込みは自由。あなたの想像力と好みを、思う存分包み込んでください。

---

### ⑤ Information

- **ビジュアル:** Instagramのアイコンロゴ ＋ 深い青色のボタン
- **コピー:**
  > **Open Days & Hours**
  >
  > 扉が開くのは、気まぐれな日だけ。
  > 次の営業日時は、Instagramの響き（通知）でお知らせします。
  >
  > **[ Instagramを確認する ]**

---

### ⑥ Footer

- **コピー:** `© 2024 old echo (架空喫茶)` を非常に小さく配置

---

## 4. AI画像生成プロンプト

HP内で使用する写真を画像生成AIで作成するためのプロンプト案。
すべて「文字なし（ロゴは別途配置）」で生成し、サイトの世界観に合わせる。

### 共通スタイル指定（世界観の統一）

```
moody, dark, atmospheric, nocturnal, dim light, cinematic lighting, deep blue accents,
minimalist, sophisticated, slow life, cozy but cool, high contrast, film grain.
```

### 各使用箇所のプロンプト

| 使用箇所 | 被写体のイメージ | プロンプト |
|---------|---------------|-----------|
| Top画像 | 夜の窓辺、古い時計と湯気 | A moody, dark, cinematic photograph of a window sill in a secret, old European cafe at night. Outside, only a very deep blue night is visible. Inside, a vintage, brass grandfather clock and a single, steaming teacup are placed on a worn wooden table. |
| 黙らっチャイ | 定番チャイとスパイス | A traditional Indian chai in a rustic clay cup (kulhar), on a dark wooden surface. A cinnamon stick, star anise, and cloves are artfully placed next to it. Steam rising. The only light comes from a warm, hidden light source. Dark, atmospheric food photography, close-up, dim lighting. |
| おやすみなチャイ | ルイボスとハーブ | A glass teacup filled with warm, deep reddish-brown rooibos masala chai, on a textured, dark stone surface. A few lavender sprigs and chamomile flowers are visible. The cup catches a cool-blue ambient light. Dark, atmospheric food photography, close-up. |
| コーヒーチャイ | コーヒーとクローブ | A dark ceramic mug with a robust texture, filled with dark coffee chai. The surface has a few ground coffee beans and some crushed cloves. Placed on an antique, dark metal tray. Dark, atmospheric food photography, close-up, dim lighting. |
| チョコチャイ | チョコレートの質感 | A decadent chocolate chai in a simple, dark mug, topped with a cloud of dark chocolate shavings and a single, thick, melted chocolate swirl. Placed on a dark slate board. Velvety textures. Dark, atmospheric food photography, close-up. |
| Event画像 | 夜のクレープ体験 | A close-up photograph of a pair of hands carefully rolling a paper-thin crepe. It's night, and the scene is lit only by a few warm-toned vintage lanterns and maybe a cool-blue LED strip under the table, casting interesting shadows. Film grain, documentary style. |

---

## 5. 実装時の特記事項

### OGP設定
URLを知る人だけがアクセスする特性上、SNSやメッセージアプリでURLを共有した際に表示されるサムネイル画像（OGP画像）は、漆黒の背景にロゴのみを配置するなど、ミステリアスなものを設定する。

### Instagramとの連携
サイトの最重要コンバージョン（目的）は「Instagramへの誘導」となるため、Informationセクションのボタンは分かりやすく、かつ世界観を壊さない「深い青が光る」ような実装にする。
