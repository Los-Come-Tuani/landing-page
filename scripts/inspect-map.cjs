// Local geometry check. Browser/Sharp packages come from the caller's runtime.
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(path.join(process.argv[2], 'playwright'));
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1080, height: 960 } });
  const svg = fs.readFileSync('src/assets/mapa-nicaragua.svg', 'utf8');
  await page.setContent('<style>body{margin:30px;background:#fff}svg{width:983px;height:874px}</style>' + svg);
  const boxes = await page.evaluate(() => [...document.querySelectorAll('svg > g > path')].map((p, i) => {
    const b = p.getBBox();
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', b.x + b.width / 2); t.setAttribute('y', b.y + b.height / 2);
    t.setAttribute('font-size', '20'); t.setAttribute('fill', '#111'); t.setAttribute('font-weight', 'bold');
    t.textContent = String(i + 1); document.querySelector('svg').append(t);
    return { index: i + 1, x: b.x, y: b.y, width: b.width, height: b.height };
  }));
  fs.mkdirSync('output/playwright', { recursive: true });
  fs.writeFileSync('output/playwright/map-boxes.json', JSON.stringify(boxes, null, 2));
  console.log(JSON.stringify(boxes));
  await page.screenshot({ path: 'output/playwright/map-index.png' });
  await browser.close();
})();
