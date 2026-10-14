// Run with Playwright installed in your test environment and the Vite preview running.
// PORTFOLIO_URL defaults to http://127.0.0.1:3000; BROWSER_CHANNEL defaults to msedge.
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:3000');
    await page.locator('#hero-3d-canvas-container canvas').waitFor();
    await page.locator('#hero-explore-btn').click();
    await page.waitForFunction(() => Math.abs(document.querySelector('#projects').getBoundingClientRect().top - 110) < 8);
    const filter = page.getByRole('button', { name: 'Full Stack', exact: true });
    await filter.click();
    assert.equal(await filter.getAttribute('aria-pressed'), 'true');
    assert.ok(await page.locator('#projects h3').count() > 0);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('#mobile-menu-toggle-btn').click();
    assert.equal(await page.locator('#mobile-menu-drawer').isVisible(), true);
    await page.locator('#mobile-menu-drawer').getByRole('link', { name: 'Home', exact: true }).click();
    assert.equal(await page.locator('#mobile-menu-drawer').count(), 0);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
    await page.locator('#hero-resume-btn').click();
    await page.keyboard.press('Escape');
    assert.deepEqual(errors, []);
    // WebGL is optional: content and navigation must still work without it.
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function(type, ...args) {
        return type.startsWith('webgl') ? null : original.call(this, type, ...args);
      };
    });
    await page.reload();
    await page.locator('#hero-name-heading').waitFor();
    await page.locator('#hero-explore-btn').click();
    await page.waitForFunction(() => Math.abs(document.querySelector('#projects').getBoundingClientRect().top - 110) < 8);
    assert.deepEqual(errors, []);
    console.log('PASS: desktop, mobile, filters, anchor offsets, reduced motion, resume interaction, and WebGL fallback');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
