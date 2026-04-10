/**
 * 画像圧縮スクリプト
 *
 * 方針:
 *  - old-echo の PNG（AI生成写真）→ JPG 変換（大幅な容量削減）
 *  - 本体サイトの JPG/PNG → 同フォーマットのまま品質80・最大幅1920で再圧縮
 *  - 100KB 未満のファイル（QRコード・ロゴ等）はスキップ
 *
 * 使い方:
 *  node scripts/compress-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');

// 100KB 未満はスキップ
const SKIP_BELOW_BYTES = 100 * 1024;

// リサイズ上限（これ以上大きい場合に縮小）
const MAX_WIDTH = 1920;

// JPG 品質
const JPEG_QUALITY = 82;

// PNG 圧縮レベル（0〜9）
const PNG_COMPRESSION = 9;

// ----------------------------------------
// old-echo の PNG → JPG 変換対象
// ----------------------------------------
const PNG_TO_JPG_TARGETS = [
  'old-echo/images/hero.png',
  'old-echo/images/chai-classic.png',
  'old-echo/images/chai-sleep.png',
  'old-echo/images/chai-coffee.png',
  'old-echo/images/chai-chocolate.png',
  'old-echo/images/event-crepe.png',
].map(p => path.join(PUBLIC_DIR, p));

// ----------------------------------------
// 本体サイトの圧縮対象（同フォーマット再圧縮）
// ----------------------------------------
const COMPRESS_IN_PLACE_TARGETS = [
  'images/hero/hero-sp.jpg',
  'images/hero/wait-room.jpg',
  'images/hero/wait-room.png',
  'images/hero/head-spa.png',
  'images/shop/play-room.jpg',
  'images/shop/play-room.png',
  'images/about/concept-interior.jpg',
  'images/parking/parking.png',
  'images/parking/parking-to-shop.png',
  'images/announcements/notification01.png',
].map(p => path.join(PUBLIC_DIR, p));

// ----------------------------------------
// ユーティリティ
// ----------------------------------------
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch {
    return 0;
  }
}

async function compressJpeg(inputPath, outputPath) {
  const meta = await sharp(inputPath).metadata();
  const needsResize = (meta.width || 0) > MAX_WIDTH;

  let pipeline = sharp(inputPath);
  if (needsResize) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }
  await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(outputPath + '.tmp');
  fs.renameSync(outputPath + '.tmp', outputPath);
}

async function compressPng(inputPath, outputPath) {
  const meta = await sharp(inputPath).metadata();
  const needsResize = (meta.width || 0) > MAX_WIDTH;

  let pipeline = sharp(inputPath);
  if (needsResize) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }
  await pipeline.png({ compressionLevel: PNG_COMPRESSION, effort: 10 }).toFile(outputPath + '.tmp');
  fs.renameSync(outputPath + '.tmp', outputPath);
}

async function convertPngToJpeg(inputPath) {
  const outputPath = inputPath.replace(/\.png$/i, '.jpg');
  const meta = await sharp(inputPath).metadata();
  const needsResize = (meta.width || 0) > MAX_WIDTH;

  let pipeline = sharp(inputPath);
  if (needsResize) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }
  await pipeline
    .flatten({ background: { r: 0, g: 0, b: 0 } }) // 透過があれば黒背景に
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(outputPath + '.tmp');
  fs.renameSync(outputPath + '.tmp', outputPath);
  fs.unlinkSync(inputPath); // 元の PNG を削除

  return outputPath;
}

// ----------------------------------------
// メイン処理
// ----------------------------------------
async function main() {
  let totalBefore = 0;
  let totalAfter = 0;
  const convertedPaths = []; // PNG→JPG した新しいパスの記録

  console.log('=== PNG → JPG 変換 (old-echo) ===\n');
  for (const filePath of PNG_TO_JPG_TARGETS) {
    if (!fs.existsSync(filePath)) {
      console.log(`  SKIP (not found): ${path.relative(PUBLIC_DIR, filePath)}`);
      continue;
    }
    const before = getFileSize(filePath);
    if (before < SKIP_BELOW_BYTES) {
      console.log(`  SKIP (small): ${path.relative(PUBLIC_DIR, filePath)} ${formatBytes(before)}`);
      continue;
    }
    try {
      const newPath = await convertPngToJpeg(filePath);
      const after = getFileSize(newPath);
      totalBefore += before;
      totalAfter += after;
      convertedPaths.push({ from: filePath, to: newPath });
      console.log(`  ✓ ${path.relative(PUBLIC_DIR, filePath)}`);
      console.log(`    ${formatBytes(before)} → ${formatBytes(after)} (${Math.round((1 - after / before) * 100)}% 削減)\n`);
    } catch (e) {
      console.error(`  ✗ ERROR: ${path.relative(PUBLIC_DIR, filePath)}: ${e.message}`);
    }
  }

  console.log('\n=== 同フォーマット再圧縮 (本体サイト) ===\n');
  for (const filePath of COMPRESS_IN_PLACE_TARGETS) {
    if (!fs.existsSync(filePath)) {
      console.log(`  SKIP (not found): ${path.relative(PUBLIC_DIR, filePath)}`);
      continue;
    }
    const before = getFileSize(filePath);
    if (before < SKIP_BELOW_BYTES) {
      console.log(`  SKIP (small): ${path.relative(PUBLIC_DIR, filePath)} ${formatBytes(before)}`);
      continue;
    }
    const ext = path.extname(filePath).toLowerCase();
    try {
      if (ext === '.jpg' || ext === '.jpeg') {
        await compressJpeg(filePath, filePath);
      } else if (ext === '.png') {
        await compressPng(filePath, filePath);
      }
      const after = getFileSize(filePath);
      totalBefore += before;
      totalAfter += after;
      console.log(`  ✓ ${path.relative(PUBLIC_DIR, filePath)}`);
      console.log(`    ${formatBytes(before)} → ${formatBytes(after)} (${Math.round((1 - after / before) * 100)}% 削減)\n`);
    } catch (e) {
      console.error(`  ✗ ERROR: ${path.relative(PUBLIC_DIR, filePath)}: ${e.message}`);
    }
  }

  // old-echo の index.html 参照を .png → .jpg に更新
  if (convertedPaths.length > 0) {
    console.log('\n=== index.html の参照を更新 ===\n');
    const htmlPath = path.join(PUBLIC_DIR, 'old-echo/index.html');
    let html = fs.readFileSync(htmlPath, 'utf8');
    let updated = false;
    for (const { from } of convertedPaths) {
      const oldName = path.basename(from);        // e.g. hero.png
      const newName = oldName.replace(/\.png$/i, '.jpg');
      if (html.includes(oldName)) {
        html = html.replaceAll(oldName, newName);
        updated = true;
        console.log(`  ${oldName} → ${newName}`);
      }
    }
    if (updated) {
      fs.writeFileSync(htmlPath, html, 'utf8');
      console.log('\n  index.html を更新しました');
    }
  }

  console.log('\n=== 合計 ===');
  console.log(`  圧縮前: ${formatBytes(totalBefore)}`);
  console.log(`  圧縮後: ${formatBytes(totalAfter)}`);
  console.log(`  削減量: ${formatBytes(totalBefore - totalAfter)} (${Math.round((1 - totalAfter / totalBefore) * 100)}% 削減)`);
}

main().catch(err => {
  console.error('エラーが発生しました:', err);
  process.exit(1);
});
