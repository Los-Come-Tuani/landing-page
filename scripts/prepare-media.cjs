// Reproducible local exports. Pass the directory containing the sharp package.
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require(path.join(process.argv[2], 'sharp'));
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'public/media');

async function main() {
  await fs.mkdir(out, { recursive: true });
  const screens = { home: 'HomeScreen1', circuit: 'AgendyRoute', planning: 'AgendyRouteCampsTime' };
  for (const [name, original] of Object.entries(screens)) {
    for (const width of [375, 750]) {
      await sharp(path.join(root, '../wireframesApp', original + '.svg'), { density: 144 })
        .resize({ width }).flatten({ background: '#fff' }).webp({ quality: 88 })
        .toFile(path.join(out, `app-${name}-${width}.webp`));
    }
  }
  // The existing brand linework is an illustration, not a photo of a real place.
  const login = await sharp(path.join(root, '../wireframesApp/LoginResized.svg'), { density: 144 }).png().toBuffer();
  await sharp(login).extract({ left: 0, top: 170, width: 750, height: 480 })
    .resize({ width: 900 }).webp({ quality: 85 }).toFile(path.join(out, 'cultural-art.webp'));
  const photoSources = { granada: 'granada', leon: 'leon', masaya: 'volcan-masaya'};
  for (const [name, source] of Object.entries(photoSources)) {
    const file = path.join(root, 'output/sources', source + '.jpg');
    try { await fs.access(file); } catch { continue; }
    for (const width of name === 'granada' ? [640, 1280, 1920] : [480, 960]) {
      await sharp(file).rotate().resize({ width, withoutEnlargement: true })
        .webp({ quality: 84 }).toFile(path.join(out, `${name}-${width}.webp`));
    }
  }
  const files = await fs.readdir(out);
  for (const file of files) {
    const m = await sharp(path.join(out, file)).metadata();
    const stat = await fs.stat(path.join(out, file));
    console.log(`${file}: ${m.width} × ${m.height}, ${Math.round(stat.size / 1024)} KB`);
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
