# AI画像生成プロンプトテンプレート

## はじめに

このドキュメントは、yoon²のウェブサイトに合う色調で画像を生成するための、AI画像生成ツール（Midjourney、DALL-E、Stable Diffusion、Adobe Fireflyなど）用のプロンプトテンプレートです。

各テンプレートは、サイトのデザインコンセプト「ナチュラル・エレガント」に合わせた色感で画像を生成するように設計されています。

**詳細な色感のガイド**: 色感についての詳細は、[色感統一ガイド](./COLOR_HARMONY_GUIDE.md)を参照してください。

---

## サイトの色感（重要）

画像生成時に必ず含めるべき色感のキーワード：

### 基本カラーパレット
- **プライマリ**: ベージュ/クリーム色（`#F4F1EB`）
- **アクセント**: ゴールド/ブロンズ色（`#C9A96E`）
- **背景**: 非常に薄いベージュ/白（`#FAF9F7`）

### 必須キーワード
- **色相**: 暖色系（warm tones, beige, cream, gold, amber）
- **彩度**: 低彩度（muted colors, desaturated, soft colors）
- **明度**: 明るめ（bright, light, airy）
- **コントラスト**: 低コントラスト（low contrast, soft contrast）
- **トーン**: ソフト・マット（soft, matte, elegant）
- **照明**: 柔らかい光（soft lighting, indirect lighting, warm lighting）

---

## プロンプトの基本構造

各プロンプトは以下の構造で構成されています：

```
[メインの内容] + [色感の指定] + [トーンの指定] + [照明の指定] + [スタイルの指定] + [技術的なパラメータ]
```

---

## 1. お知らせ用プロンプトテンプレート

### 用途
- 店舗移転のお知らせ
- 営業時間変更のお知らせ
- 臨時休業のお知らせ
- その他の重要な告知

### 基本テンプレート

```
[お知らせの内容を簡潔に] in an elegant, minimalist design, 
warm beige (#F4F1EB) and soft gold (#C9A96E) color palette, 
muted tones, low saturation, soft matte finish, 
gentle indirect lighting, natural elegant style, 
clean composition with plenty of white space, 
Japanese aesthetic, sophisticated and calming atmosphere, 
soft shadows, warm color temperature, 
--ar 16:9 --style raw --v 6
```

### 具体例

#### 例1: 店舗移転のお知らせ

```
Announcement card design for salon relocation notice, 
elegant minimalist typography on warm beige (#F4F1EB) background, 
soft gold (#C9A96E) accent details, muted tones, low saturation, 
soft matte finish, gentle indirect lighting, 
natural elegant style, clean composition with plenty of white space, 
Japanese aesthetic, sophisticated and calming atmosphere, 
soft shadows, warm color temperature, 
text area in center, decorative elements in corners, 
--ar 16:9 --style raw --v 6
```

#### 例2: 営業時間変更のお知らせ

```
Elegant announcement card for business hours change, 
warm beige (#F4F1EB) and cream tones, soft gold (#C9A96E) highlights, 
muted colors, desaturated palette, soft matte texture, 
gentle warm lighting, minimalist design, 
clean layout with elegant typography, 
Japanese minimalist aesthetic, sophisticated and calming, 
soft shadows, low contrast, warm color temperature, 
--ar 16:9 --style raw --v 6
```

#### 例3: 臨時休業のお知らせ

```
Polite announcement card for temporary closure notice, 
elegant design with warm beige (#F4F1EB) background, 
soft gold (#C9A96E) decorative elements, muted tones, 
low saturation, soft matte finish, 
gentle indirect lighting, natural elegant style, 
clean composition, Japanese aesthetic, 
sophisticated and respectful atmosphere, 
soft shadows, warm color temperature, 
--ar 16:9 --style raw --v 6
```

### カスタマイズのポイント

- `[お知らせの内容]`の部分を具体的な内容に置き換える
- 必要に応じて、イラスト要素や装飾的な要素を追加
- テキストが読みやすいよう、中央部分は明るく、コントラストを低く

---

## 2. メニュー用プロンプトテンプレート

### 用途
- サービスメニューの紹介画像
- コース内容の説明画像
- 施術内容のビジュアル化

### 基本テンプレート

```
[メニュー/サービスの内容] in elegant spa salon setting, 
warm beige (#F4F1EB) and soft gold (#C9A96E) color palette, 
muted tones, low saturation, soft matte finish, 
gentle indirect lighting, natural elegant style, 
relaxing atmosphere, Japanese minimalist aesthetic, 
sophisticated and calming, soft shadows, 
warm color temperature, clean composition, 
--ar 4:5 --style raw --v 6
```

### 具体例

#### 例1: イヤーエステメニュー

```
Elegant ear esthetic treatment scene in spa salon, 
warm beige (#F4F1EB) and cream tones, soft gold (#C9A96E) accents, 
muted colors, desaturated palette, soft matte texture, 
gentle warm indirect lighting, natural elegant style, 
relaxing atmosphere, Japanese minimalist aesthetic, 
sophisticated spa setting, soft shadows, 
low contrast, warm color temperature, 
treatment tools arranged beautifully, calm and peaceful, 
--ar 4:5 --style raw --v 6
```

#### 例2: 耳つぼメニュー

```
Elegant acupressure ear treatment scene, 
warm beige (#F4F1EB) background, soft gold (#C9A96E) decorative elements, 
muted tones, low saturation, soft matte finish, 
gentle indirect lighting, natural elegant style, 
relaxing spa atmosphere, Japanese minimalist aesthetic, 
sophisticated and calming, soft shadows, 
warm color temperature, clean composition, 
acupressure tools and ear jewelry arranged artistically, 
peaceful and serene, --ar 4:5 --style raw --v 6
```

#### 例3: ドライヘッドスパメニュー

```
Elegant dry head spa treatment scene in salon, 
warm beige (#F4F1EB) and cream tones, soft gold (#C9A96E) highlights, 
muted colors, desaturated palette, soft matte texture, 
gentle warm lighting, natural elegant style, 
relaxing atmosphere, Japanese minimalist aesthetic, 
sophisticated spa setting, soft shadows, 
low contrast, warm color temperature, 
treatment area with soft towels and elegant decor, 
calm and peaceful, --ar 4:5 --style raw --v 6
```

#### 例4: おすすめメニュー（総合）

```
Elegant spa salon treatment scene showcasing premium services, 
warm beige (#F4F1EB) and cream tones, soft gold (#C9A96E) accents, 
muted colors, desaturated palette, soft matte texture, 
gentle warm indirect lighting, natural elegant style, 
luxurious relaxing atmosphere, Japanese minimalist aesthetic, 
sophisticated spa setting, soft shadows, 
low contrast, warm color temperature, 
beautiful arrangement of treatment tools and elegant decor, 
calm, peaceful, and premium feeling, 
--ar 4:5 --style raw --v 6
```

### カスタマイズのポイント

- `[メニュー/サービスの内容]`の部分を具体的なサービス名に置き換える
- 施術の様子や道具を自然に配置
- 人物が写る場合は、後ろ姿やシルエットでプライバシーに配慮
- リラックスできる雰囲気を重視

---

## 3. キャンペーン用プロンプトテンプレート

### 用途
- 新規オープンキャンペーン
- 季節限定キャンペーン
- 割引・特典キャンペーン
- イベント告知

### 基本テンプレート

```
[キャンペーンの内容] campaign design, elegant and inviting, 
warm beige (#F4F1EB) and soft gold (#C9A96E) color palette, 
muted tones, low saturation, soft matte finish, 
gentle indirect lighting, natural elegant style, 
sophisticated and appealing, Japanese minimalist aesthetic, 
soft shadows, warm color temperature, 
clean composition with elegant typography, 
celebratory but refined atmosphere, 
--ar 16:9 --style raw --v 6
```

### 具体例

#### 例1: 新規オープンキャンペーン

```
Grand opening campaign design for elegant spa salon, 
warm beige (#F4F1EB) and cream tones, soft gold (#C9A96E) celebratory accents, 
muted colors, desaturated palette, soft matte texture, 
gentle warm lighting, natural elegant style, 
sophisticated and inviting, Japanese minimalist aesthetic, 
elegant typography, soft shadows, 
low contrast, warm color temperature, 
clean composition with decorative elements, 
celebratory but refined atmosphere, 
--ar 16:9 --style raw --v 6
```

#### 例2: 季節限定キャンペーン（春）

```
Spring season limited campaign design for spa salon, 
warm beige (#F4F1EB) and soft gold (#C9A96E) color palette, 
muted spring tones, low saturation, soft matte finish, 
gentle indirect lighting, natural elegant style, 
sophisticated and fresh, Japanese minimalist aesthetic, 
soft shadows, warm color temperature, 
clean composition with subtle spring elements, 
refined and inviting atmosphere, 
--ar 16:9 --style raw --v 6
```

#### 例3: 割引キャンペーン

```
Elegant discount campaign design for spa salon services, 
warm beige (#F4F1EB) background, soft gold (#C9A96E) highlight details, 
muted tones, low saturation, soft matte finish, 
gentle indirect lighting, natural elegant style, 
sophisticated and appealing, Japanese minimalist aesthetic, 
elegant typography showing special offer, 
soft shadows, warm color temperature, 
clean composition, refined and inviting, 
--ar 16:9 --style raw --v 6
```

#### 例4: 特別イベント告知

```
Elegant special event announcement design for spa salon, 
warm beige (#F4F1EB) and cream tones, soft gold (#C9A96E) decorative accents, 
muted colors, desaturated palette, soft matte texture, 
gentle warm lighting, natural elegant style, 
sophisticated and exciting, Japanese minimalist aesthetic, 
elegant typography, soft shadows, 
low contrast, warm color temperature, 
clean composition with event details, 
refined and inviting atmosphere, 
--ar 16:9 --style raw --v 6
```

### カスタマイズのポイント

- `[キャンペーンの内容]`の部分を具体的なキャンペーン内容に置き換える
- 季節感を出す場合は、暖色系の季節要素を追加（例: 春なら淡いピンク、秋ならアンバー）
- 特別感を出すが、上品さは保つ
- テキストが読みやすいよう、コントラストを適度に保つ

---

## プロンプトのカスタマイズ方法

### 色感の調整

#### より暖色系にしたい場合
プロンプトに以下を追加：
```
, warm color temperature, amber tones, golden hour lighting
```

#### より柔らかくしたい場合
プロンプトに以下を追加：
```
, extra soft, very low contrast, dreamy atmosphere
```

#### より明るくしたい場合
プロンプトに以下を追加：
```
, bright and airy, high key lighting, light and fresh
```

### スタイルの調整

#### よりミニマルにしたい場合
プロンプトに以下を追加：
```
, ultra minimalist, clean lines, simple composition
```

#### より装飾的にしたい場合
プロンプトに以下を追加：
```
, elegant decorative elements, subtle patterns, refined details
```

### アスペクト比の変更

#### 横長（16:9）の場合
```
--ar 16:9
```

#### 縦長（4:5）の場合
```
--ar 4:5
```

#### 正方形（1:1）の場合
```
--ar 1:1
```

---

## 各AIツール別のパラメータ設定

### Midjourney

#### 基本パラメータ
```
--ar 16:9 --style raw --v 6
```

#### 色感を強調する場合
```
--ar 16:9 --style raw --v 6 --stylize 250
```

#### よりリアルにしたい場合
```
--ar 16:9 --style raw --v 6 --stylize 100
```

### DALL-E 3

#### 基本設定
- スタイル: Natural
- 品質: Standard
- サイズ: 1024x1024（または希望のサイズ）

#### プロンプトの先頭に追加
```
Create an image with warm beige (#F4F1EB) and soft gold (#C9A96E) color palette, muted tones, low saturation, soft matte finish, gentle indirect lighting, natural elegant style, sophisticated and calming atmosphere.
```

### Stable Diffusion

#### 基本パラメータ
```
Steps: 30, Sampler: DPM++ 2M Karras, CFG Scale: 7
```

#### 推奨モデル
- Realistic Vision
- DreamShaper
- Deliberate

#### ネガティブプロンプト（避けるべき要素）
```
cold colors, high saturation, high contrast, harsh lighting, 
vivid colors, bright blue, bright green, sharp shadows, 
hard lighting, neon colors, fluorescent colors
```

### Adobe Firefly

#### 基本設定
- スタイル: Natural
- アスペクト比: 16:9（または希望の比率）

#### プロンプトの先頭に追加
```
Elegant design with warm beige and soft gold color palette, muted tones, soft lighting, natural elegant style.
```

---

## チェックリスト

画像生成後、以下の項目を確認してください：

### 色感
- [ ] 暖色系（ベージュ、ゴールド）を基調としているか
- [ ] 彩度が低く、落ち着いた色合いか
- [ ] 明るく清潔感のある印象か
- [ ] コントラストが低く、柔らかい印象か

### トーン
- [ ] ソフト・マットな質感か
- [ ] 硬い印象ではなく、柔らかい印象か
- [ ] 上品で洗練された印象か

### 照明
- [ ] 柔らかい光（間接照明）で照らされているか
- [ ] 硬い影ができていないか
- [ ] 温かみのある光の色か

### サイトとの調和
- [ ] サイトのベージュ（#F4F1EB）と調和しているか
- [ ] サイトのゴールド（#C9A96E）と調和しているか
- [ ] サイト全体の印象と合っているか

---

## よくある質問（FAQ）

### Q1: 生成された画像の色感が合わない場合はどうすればいいですか？

**A**: プロンプトに色感のキーワードを追加してください。例：
- `, more warm tones`
- `, lower saturation`
- `, softer lighting`

または、画像編集ソフトで後から調整することも可能です（[色感統一ガイド](./COLOR_HARMONY_GUIDE.md)の5.2を参照）。

---

### Q2: テキストを含む画像を生成したい場合はどうすればいいですか？

**A**: プロンプトに以下を追加してください：
```
, elegant typography, clean text area, readable text
```

ただし、AI生成のテキストは正確性に欠ける場合があるため、テキストは後から追加することを推奨します。

---

### Q3: 人物を含む画像を生成したい場合はどうすればいいですか？

**A**: プライバシーに配慮し、以下のキーワードを追加してください：
```
, silhouette, back view, privacy-conscious, elegant pose
```

---

### Q4: 季節感を出したい場合はどうすればいいですか？

**A**: 暖色系の季節要素を追加してください。例：
- **春**: `, soft pink cherry blossoms, gentle spring atmosphere`
- **夏**: `, warm summer light, soft green leaves`
- **秋**: `, amber autumn tones, warm autumn atmosphere`
- **冬**: `, warm winter light, cozy winter atmosphere`

ただし、冷色系の要素（青空、雪など）は避け、暖色系で表現してください。

---

### Q5: 複数の画像を統一感のあるセットで生成したい場合はどうすればいいですか？

**A**: すべてのプロンプトに同じ色感のキーワードを含めてください：
```
warm beige (#F4F1EB) and soft gold (#C9A96E) color palette, 
muted tones, low saturation, soft matte finish, 
gentle indirect lighting, natural elegant style
```

これにより、統一感のある画像セットを生成できます。

---

## まとめ

### 重要なポイント

1. **色感のキーワードを必ず含める**: 暖色系、低彩度、柔らかい光など
2. **サイトのカラーパレットを意識する**: ベージュ（#F4F1EB）とゴールド（#C9A96E）を基調に
3. **トーンを統一する**: ソフト・マットな質感、低コントラスト
4. **照明を意識する**: 柔らかい間接照明、温かみのある光
5. **チェックリストを活用する**: 生成後、必ず色感を確認する

### 最終的な目標

生成された画像が、サイト全体のデザインと調和し、統一感のあるブランドイメージを構築することです。これにより、ユーザーに違和感を与えず、上品で信頼性の高い印象を与えることができます。

---

## 参考資料

- [色感統一ガイド](./COLOR_HARMONY_GUIDE.md): 画像の色感についての詳細なガイド
- [画像仕様書](./IMAGE_SPECIFICATIONS.md): 画像のサイズ、解像度、内容についての詳細仕様

---

**作成日**: 2024年
**最終更新日**: 2024年
**バージョン**: 1.0
