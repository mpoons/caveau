const { chromium } = require('playwright-core');
const init = require('./init');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', headless: true });
  const ok = (c, msg) => console.log((c ? 'OK   ' : 'FAIL ') + msg);
  const errors = [];
  // 1. vergiftigd document: caches en tafel met verkeerde types, score/persons met HTML
  let page = await browser.newPage({ viewport: { width: 400, height: 820 } });
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  await init(page, 'http://127.0.0.1:8765/index.html');
  await page.evaluate(() => {
    const id = uid();
    adoptDoc({ rev: 3, wines: [{ id, name: 'Gif', vintage: 2020, type: 'rood', qty: 2 }, null, 'x'],
      tonight: 'x', pairCache: [null, { key: 'biefstuk', dish: 'Biefstuk', at: 1, matches: [{ id, score: '<img src=x onerror=window.__xss=1>', reason: 'r' }] }],
      recipeCache: [{ key: 'x|4', dish: 'Stoof', persons: '<img src=x onerror=window.__xss=2>', recipe: {}, at: 1, wineId: id }],
      history: [{ name: 'h', weg: 'constructor' }, { name: 'h2' }] });
    UI.tab = 'kelder'; render();
  });
  await page.waitForTimeout(300);
  let st = await page.evaluate(() => ({ kelder: document.querySelector('#view').textContent.includes('Gif'), tonight: Array.isArray(S.tonight), xss: window.__xss || 0 }));
  ok(st.kelder && st.tonight && !st.xss, 'kelder rendert na vergiftigd document, tafel is een lijst');
  await page.evaluate(() => { UI.tab = 'meer'; UI.meerPage = 'history'; render(); });
  await page.waitForTimeout(200);
  st = await page.evaluate(() => ({ hist: document.querySelector('#view').textContent.includes('h2'), rating: S.history[1].rating, xss: window.__xss || 0 }));
  ok(st.hist && st.rating === null && !st.xss, 'historie met weg:"constructor" rendert; geen beoordeling blijft null');
  await page.evaluate(() => { UI.tab = 'meer'; UI.meerPage = 'recipes'; render(); UI.tab = 'pairing'; render(); });
  await page.waitForTimeout(200);
  st = await page.evaluate(() => ({ xss: window.__xss || 0, img: document.querySelectorAll('#view img[src="x"]').length }));
  ok(!st.xss && st.img === 0, 'geen script of injectie via score/persons uit de caches');
  // 2. noodscherm als een view gooit
  await page.evaluate(() => { S.wines.push(null); UI.tab = 'kelder'; render(); });
  await page.waitForTimeout(200);
  st = await page.evaluate(() => document.querySelector('#view').textContent.includes('Er ging iets mis op dit scherm'));
  ok(st, 'noodscherm in plaats van een leeg scherm bij een kapot record');
  await page.close();

  // 3. sessie uit een link zonder dat de aanmelding hier startte: geen sessie, wel "log in met je wachtwoord"
  page = await browser.newPage({ viewport: { width: 400, height: 820 } });
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  await page.route('**/auth/v1/user', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ id: 'aanvaller-uid', email: 'attacker@example.com' }) }));
  await page.route('**/rest/v1/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
  await page.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => typeof S === 'object');
  await page.evaluate(() => { S.settings.taal = 'nl'; S.wines = [{ id: uid(), name: 'Mijn fles', type: 'rood', qty: 1, addedAt: Date.now() }]; save(true); });
  await page.goto('about:blank'); await page.goto('http://127.0.0.1:8765/index.html#access_token=eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjk5OTk5OTk5OTl9.x&refresh_token=R&type=signup', { waitUntil: 'load' });
  await page.waitForTimeout(1200);
  st = await page.evaluate(() => ({ uid: S.settings.cloud && S.settings.cloud.uid, refresh: S.settings.cloud && S.settings.cloud.refresh, toast: (document.querySelector('.toast') || {}).textContent || '', email: (document.getElementById('ac_email') || {}).value, wines: S.wines.length, tab: UI.tab + '/' + UI.meerPage }));
  console.log('   stand na link:', JSON.stringify(st), 'fouten:', errors.join(' | ').slice(0, 300));
  ok(!st.uid && !st.refresh, 'geen sessie aangenomen uit een vreemde bevestigingslink');
  ok(/Log hier in/.test(st.toast) && st.email === 'attacker@example.com', 'gebruiker wordt naar het inlogscherm gestuurd: ' + st.toast.slice(0, 60));
  ok(st.wines === 1, 'lokale kelder onaangeroerd');
  // 4. dezelfde link, maar de aanmelding startte hier: sessie wel, en de koppelvraag verschijnt vóór de sync
  await page.evaluate(() => { localStorage.setItem('caveau_auth_pending', 'attacker@example.com'); });
  await page.goto('about:blank'); await page.goto('http://127.0.0.1:8765/index.html#access_token=eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjk5OTk5OTk5OTl9.x&refresh_token=R&type=signup', { waitUntil: 'load' });
  await page.waitForTimeout(1200);
  st = await page.evaluate(() => ({ uid: S.settings.cloud && S.settings.cloud.uid, sheet: (document.querySelector('.sheet-title') || {}).textContent || '', pending: localStorage.getItem('caveau_auth_pending') }));
  ok(st.uid === 'aanvaller-uid' && st.sheet === 'Kelder koppelen?' && !st.pending, 'eigen aanmelding: sessie gezet, koppelvraag open, vlag gewist');
  await page.click('[data-act="koppelNee"]'); await page.waitForTimeout(300);
  st = await page.evaluate(() => ({ refresh: S.settings.cloud && S.settings.cloud.refresh, wines: S.wines.length }));
  ok(!st.refresh && st.wines === 1, '"Nee, uitloggen" logt uit en laat de kelder staan');
  await page.close();
  console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'geen paginafouten');
  await browser.close();
})().catch(e => { console.error('SCRIPT FAIL', e); process.exit(1); });
