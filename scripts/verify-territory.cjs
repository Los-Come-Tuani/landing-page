// Browser regression checks for the delivered map/photo/footer. No test framework dependency.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(path.join(process.argv[2], 'playwright'));
const sharp = require(path.join(process.argv[2], 'sharp'));
const url = process.argv[3] || 'http://127.0.0.1:4173/';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const errors = [];
  const results = [];
  const context = await browser.newContext({ viewport: { width: 1440, height: 1050 } });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator('.map-base path').count(), 17);
  assert.equal(await page.locator('.map-region-control').count(), 8);
  assert.equal(await page.locator('[data-city]').count(), 10);
  assert.equal(await page.locator('#ciudades + #territorio + #aliados').count(), 1);
  const pairs = { bluefields: 'costa-caribe-sur', esteli: 'esteli', granada: 'granada', juigalpa: 'chontales', leon: 'leon', managua: 'managua', masaya: 'masaya', matagalpa: 'matagalpa', nagarote: 'leon', 'san-juan-de-oriente': 'masaya' };
  const heights = [];
  for (const [city, region] of Object.entries(pairs)) {
    await page.locator(`[data-city="${city}"]`).click();
    assert.equal(await page.locator(`.map-depth-layers [data-region="${region}"]`).getAttribute('data-active'), 'true');
    assert.equal(await page.locator(`[data-city="${city}"]`).getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('.city-detail[data-visible="true"]').count(), 1);
    assert.equal(await page.locator('.city-detail[aria-hidden="true"][inert]').count(), 9);
    heights.push(await page.locator('#territorio').evaluate(element => element.getBoundingClientRect().height));
  }
  assert.ok(Math.max(...heights) - Math.min(...heights) < 1, 'Selecting cities must not shift the section');
  results.push('10 cities, 8 active divisions, 17 preserved shapes; shared regions and stable detail height pass.');

  // Use an interior point of the actual path, since concave regions can have their bbox center in a lake.
  async function regionPoint(id) {
    const control = page.locator(`[data-region-control="${id}"]`);
    await control.scrollIntoViewIfNeeded();
    return control.evaluate(p => {
      const b = p.getBBox();
      for (let n = 2; n <= 10; n++) for (let x = 1; x < n; x++) for (let y = 1; y < n; y++) {
        const point = new DOMPoint(b.x + b.width * x / n, b.y + b.height * y / n);
        if (p.isPointInFill(point)) { const screen = point.matrixTransform(p.getScreenCTM()); return { x: screen.x, y: screen.y }; }
      }
      throw new Error('No region interior');
    });
  }
  await page.locator('[data-city="nagarote"]').click();
  const masaya = await regionPoint('masaya');
  await page.mouse.move(masaya.x, masaya.y);
  await page.waitForTimeout(240);
  assert.equal(await page.locator('.map-depth-layers [data-region="masaya"]').getAttribute('data-active'), 'true');
  assert.equal(await page.locator('[data-city="nagarote"]').getAttribute('aria-pressed'), 'true', 'Hover must preserve pinned selection');
  const motion = await page.locator('[data-region="masaya"] .map-region-face').evaluate(e => ({ transform: getComputedStyle(e).transform, duration: getComputedStyle(e).transitionDuration }));
  assert.notEqual(motion.transform, 'none');
  assert.equal(motion.duration, '0.2s, 0.2s');
  await page.mouse.move(2, 2);
  assert.equal(await page.locator('.map-depth-layers [data-region="leon"]').getAttribute('data-active'), 'true');
  await page.mouse.move(masaya.x, masaya.y);
  await page.mouse.click(masaya.x, masaya.y);
  assert.equal(await page.locator('[data-city="masaya"]').getAttribute('aria-pressed'), 'true');
  await page.locator('[data-city="san-juan-de-oriente"]').click();
  const sameRegion = await regionPoint('masaya');
  await page.mouse.click(sameRegion.x, sameRegion.y);
  assert.equal(await page.locator('[data-city="san-juan-de-oriente"]').getAttribute('aria-pressed'), 'true');
  results.push('Real path hover previews, pointer exit restores selection, click pins, shared-region selection persists.');

  await page.keyboard.press('Tab');
  await page.locator('[data-city="bluefields"]').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('[data-city="bluefields"]').getAttribute('aria-pressed'), 'true');
  const keyboard = await page.locator('[data-region="costa-caribe-sur"] .map-region-face').evaluate(e => ({ transform: getComputedStyle(e).transform, duration: getComputedStyle(e).transitionDuration }));
  assert.equal(keyboard.transform, 'none'); assert.ok(keyboard.duration.split(',').every(d => d.trim() === '0s'));
  await page.locator('[data-region-control="esteli"]').focus();
  await page.keyboard.press('Space');
  assert.equal(await page.locator('[data-city="esteli"]').getAttribute('aria-pressed'), 'true');
  results.push('City Enter and SVG region Space work; keyboard has no elevation or animation.');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  const granada = await regionPoint('granada'); await page.mouse.move(granada.x, granada.y);
  await page.waitForTimeout(180);
  assert.equal(await page.locator('[data-region="granada"] .map-region-face').evaluate(e => getComputedStyle(e).transform), 'none');
  assert.equal(await page.locator('[data-region="granada"] .map-region-depth').evaluate(e => getComputedStyle(e).opacity), '0');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  results.push('Reduced motion removes lift, scale and extrusion.');

  fs.mkdirSync('output/playwright', { recursive: true });
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.locator('[data-city="granada"]').click();
    await page.locator('#territorio').scrollIntoViewIfNeeded();
    await page.waitForTimeout(240);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Horizontal overflow at ${width}`);
    assert.ok(await page.locator('[data-city]').evaluateAll(buttons => buttons.every(b => b.getBoundingClientRect().height >= 44)));
    // Crop a document capture taken at scroll 0. Element screenshots of a tall section
    // can otherwise include the sticky header and offscreen skip link in the middle.
    await page.mouse.move(1, 1);
    await page.evaluate(() => window.scrollTo(0, 0));
    const capture = await page.screenshot({ fullPage: true });
    const sections = width === 1440 || width === 390
      ? [['territory', '#territorio'], ['experiences', '#ciudades'], ['footer', 'footer']]
      : [['territory', '#territorio']];
    for (const [name, selector] of sections) {
      const box = await page.locator(selector).boundingBox();
      await sharp(capture).extract({ left: Math.round(box.x), top: Math.round(box.y), width: Math.floor(box.width), height: Math.floor(box.height) })
        .png().toFile(`output/playwright/${name}-${width}.png`);
    }
  }
  // Every local navigation entry currently points to a real section; no future-route placeholders.
  const invalid = await page.locator('header a, footer a').evaluateAll(links => links.flatMap(a => {
    const url = new URL(a.href);
    if (url.origin !== location.origin) return [];
    if (url.pathname !== '/') return [a.getAttribute('href')];
    return url.hash && !document.getElementById(url.hash.slice(1)) ? [url.hash] : [];
  }));
  assert.deepEqual(invalid, []);
  assert.match(await page.locator('[data-photo="masaya"]').first().getAttribute('srcset'), /480w.*960w/);
  assert.equal(await page.locator('#aliados [data-photo="masaya"]').count(), 1);
  for (const width of [480, 960]) {
    const meta = await sharp(`public/media/masaya-${width}.webp`).metadata();
    assert.equal(meta.width, width); assert.equal(meta.height, width * .75);
  }
  results.push('Responsive 1440/1024/768/390/320: no overflow; touch targets >=44px; footer links and image variants pass.');

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const touch = await mobile.newPage(); await touch.goto(url);
  await touch.locator('[data-city="san-juan-de-oriente"]').tap();
  assert.equal(await touch.locator('[data-city="san-juan-de-oriente"]').getAttribute('aria-pressed'), 'true');
  assert.equal(await touch.locator('[data-region="masaya"] .map-region-face').evaluate(e => getComputedStyle(e).transform), 'none');
  results.push('Touch emulation selects San Juan de Oriente without sticky hover or elevation.');
  assert.deepEqual(errors, []);
  fs.writeFileSync('output/playwright/territory-results.json', JSON.stringify({ results, errors }, null, 2));
  console.log(results.join('\n'));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
