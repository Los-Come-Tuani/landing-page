// Preserve the supplied SVG. Extract its 17 visible paths, not the mask duplicates.
// Geometry checked against INIDE's departmental atlas; see TERRITORY.md.
import { readFile, writeFile } from 'node:fs/promises';
const source = new URL('../src/assets/mapa-nicaragua.svg', import.meta.url);
const names = [
  ['costa-caribe-norte', 'Región Autónoma de la Costa Caribe Norte'],
  ['costa-caribe-sur', 'Región Autónoma de la Costa Caribe Sur'],
  ['boaco', 'Boaco'], ['carazo', 'Carazo'], ['chinandega', 'Chinandega'],
  ['chontales', 'Chontales'], ['esteli', 'Estelí'], ['granada', 'Granada'],
  ['jinotega', 'Jinotega'], ['leon', 'León'], ['madriz', 'Madriz'],
  ['managua', 'Managua'], ['masaya', 'Masaya'], ['matagalpa', 'Matagalpa'],
  ['nueva-segovia', 'Nueva Segovia'], ['rivas', 'Rivas'], ['rio-san-juan', 'Río San Juan'],
];
const svg = await readFile(source, 'utf8');
const paths = [...svg.matchAll(/<path\b[^>]*>/g)].map(([tag]) => tag)
  .filter(tag => /fill="#DCCCB0"/.test(tag));
if (paths.length !== names.length) throw new Error('SVG geometry changed: verify all region identities before exporting.');
const regions = paths.map((tag, i) => ({
  id: names[i][0], name: names[i][1], sourcePath: i + 1,
  d: tag.match(/\bd="([^"]+)"/)?.[1],
}));
if (regions.some(region => !region.d)) throw new Error('Missing region geometry.');
await writeFile(new URL('../src/content/nicaragua-regions.json', import.meta.url), JSON.stringify(regions, null, 2) + '\n');
console.log('Exported 17 named regions from the original SVG.');
