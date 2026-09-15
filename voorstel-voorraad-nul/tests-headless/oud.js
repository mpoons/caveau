const { chromium } = require('playwright-core');
const init = require('./init');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', headless: true });
  for (const [naam, url] of [['main (brug-build, ongewijzigd)', 'http://127.0.0.1:8766/index.html'], ['mijn wijziging', 'http://127.0.0.1:8765/index.html']]) {
    const page = await browser.newPage({ viewport: { width: 400, height: 820 } });
    await init(page, url);
    await page.evaluate(() => { S.wines = [{ id: uid(), name: 'Alpha', vintage: 2018, type: 'rood', grapes: [], qty: 1, pairing: [], photo: false, addedAt: Date.now() }]; S.history = []; UI.tab = 'kelder'; save(); render(); });
    const h0 = await page.evaluate(() => history.length);
    await page.evaluate(() => openDetail(S.wines[0].id));
    await page.click('.sheet [data-act="wineDel"]');
    await page.waitForSelector('#cfOk');
    await page.click('#cfOk');
    await page.waitForTimeout(800);
    const na = await page.evaluate(() => ({ app: typeof S === 'object', url: location.pathname, len: history.length })).catch(e => ({ app: false, url: page.url(), err: e.message }));
    console.log(naam, '→ na Verwijderen via detail: nog in de app?', na.app, na.url, 'history.length', h0, '→', na.len);
    await page.close();
  }
  await browser.close();
})().catch(e => { console.error('SCRIPT FAIL', e); process.exit(1); });
