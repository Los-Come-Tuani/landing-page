// Run against a built preview: node scripts/verify-footer-pages.cjs <runtime-node-modules> [url]
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(path.join(process.argv[2], 'playwright'));
const origin = process.argv[3] || 'http://127.0.0.1:4173';
const routes = [
  ['/empresa/sobre-nosotros', 'Sobre nosotros'],
  ['/empresa/mision', 'Nuestra misión'],
  ['/contacto', 'Contáctanos'],
];

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    const results = [];
    fs.mkdirSync('output/playwright', { recursive: true });

    // Keyboard activation from the landing, SPA navigation, focus and history scroll.
    await page.goto(origin);
    await page.evaluate(() => document.fonts.ready);
    const aboutLink = page.locator('footer a[href="/empresa/sobre-nosotros"]');
    await aboutLink.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    assert.equal(await aboutLink.evaluate(el => el === document.activeElement), true);
    assert.notEqual(await aboutLink.evaluate(el => getComputedStyle(el).outlineStyle), 'none');
    await page.evaluate(() => { window.__navigationMarker = true; });
    const footerScroll = await page.evaluate(() => scrollY);
    await page.keyboard.press('Enter');
    await page.waitForURL('**/empresa/sobre-nosotros');
    await page.waitForFunction(() => document.activeElement?.id === 'contenido');
    assert.equal(await page.evaluate(() => window.__navigationMarker), true);
    assert.equal(await page.evaluate(() => scrollY), 0);
    await page.goBack();
    await page.waitForFunction(y => Math.abs(scrollY - y) < 3, footerScroll);
    await page.goForward();
    await page.waitForURL('**/empresa/sobre-nosotros');
    await page.getByRole('link', { name: 'Explorar la demo', exact: true }).click();
    await page.waitForURL('**/#producto');
    await page.waitForFunction(() => document.activeElement?.id === 'producto');
    const anchorTop = await page.locator('#producto').evaluate(el => el.getBoundingClientRect().top);
    assert.ok(anchorTop >= 70 && anchorTop <= 110, `Anchor hidden by header: ${anchorTop}`);
    assert.match(await page.title(), /La Nicaragua creativa/);
    results.push('Footer keyboard activation, visible focus, SPA navigation, history scroll and demo anchor pass.');

    const descriptions = new Set();
    for (const [route, title] of routes) {
      await page.goto(origin + route);
      await page.reload();
      await page.waitForFunction(expected => document.title === `${expected} · K’plan`, title);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('h1').innerText(), title);
      assert.equal(await page.locator('.site-header').count(), 1);
      assert.equal(await page.locator('main').count(), 1);
      assert.equal(await page.locator('.site-footer').count(), 1);
      assert.equal(await page.locator(`footer a[href="${route}"]`).getAttribute('aria-current'), 'page');
      descriptions.add(await page.locator('meta[name="description"]').getAttribute('content'));
      assert.equal(await page.locator('.footer-planned-page').count(), 8);
      assert.equal(await page.locator('.footer-planned-page a, .footer-planned-page[tabindex]').count(), 0);
      for (const width of [1440, 1024, 768, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.evaluate(() => document.fonts.ready);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route}: overflow at ${width}`);
        assert.ok(await page.locator('.content-back, .footer-page-group a, .content-contact a').evaluateAll(els => els.every(el => el.getBoundingClientRect().height >= 44)), `${route}: small targets`);
        if (width === 1440 || width === 320) {
          // Capture from the top so the sticky header is not composited halfway down the page.
          await page.locator('main').evaluate(el => el.focus({ preventScroll: true }));
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.screenshot({ path: `output/playwright/${route.split('/').pop()}-${width}.png`, fullPage: true });
        }
      }
      await page.locator('.content-back').click();
      await page.waitForURL(origin + '/');
    }
    assert.equal(descriptions.size, 3);
    results.push('All three direct URLs, reloads, metadata, shared layout, return links and 320/768/1024/1440 layouts pass.');

    await page.goto(origin + '/empresa/sobre-nosotros');
    await page.getByRole('link', { name: 'Conocé nuestra misión' }).click();
    await page.getByRole('link', { name: 'Contactanos', exact: true }).click();
    await page.waitForURL('**/contacto');
    assert.equal(await page.locator('main form').count(), 0);
    assert.equal(await page.getByRole('link', { name: 'kplan.nic@gmail.com', exact: true }).getAttribute('href'), 'mailto:kplan.nic@gmail.com');
    await page.locator('.content-back').focus();
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('href')), 'mailto:kplan.nic@gmail.com');
    // Inspect the mailto destination without launching or sending a message.
    results.push('About → Mission → Contact, visible email, keyboard access and mailto destination pass.');

    await page.setViewportSize({ width: 320, height: 800 });
    await page.getByRole('button', { name: 'Abrir menú' }).click();
    await page.locator('#mobile-navigation').getByRole('link', { name: 'Cómo funciona' }).click();
    await page.waitForURL('**/#producto');
    assert.equal(await page.locator('#mobile-navigation').getAttribute('data-open'), 'false');
    await page.goto(origin + '/contacto');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement?.textContent), 'Saltar al contenido');
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement?.id), 'contenido');
    for (const route of ['/no-existe', '/blog', '/legal/privacidad']) {
      await page.goto(origin + route);
      await page.reload();
      assert.equal(await page.locator('h1').innerText(), 'Página no encontrada');
    }
    results.push('Mobile menu, skip link and unknown/unpublished route 404 views pass.');
    assert.deepEqual(errors, []);
    fs.writeFileSync('output/playwright/footer-pages-results.json', JSON.stringify({ results, errors }, null, 2));
    console.log(results.join('\n'));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
