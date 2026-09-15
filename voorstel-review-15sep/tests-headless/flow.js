const { chromium } = require('playwright-core');
const init = require('./init');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', headless: true });
  const page = await browser.newPage({ viewport: { width: 400, height: 820 } });
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await init(page, 'http://127.0.0.1:8765/index.html');
  const ok = (c, msg) => console.log((c ? 'OK   ' : 'FAIL ') + msg);

  await page.evaluate(() => {
    const mk = (name, qty, vintage) => ({ id: uid(), name, producer: 'Dom. Test', vintage, type: 'rood', grapes: [], qty, pairing: [], photo: false, addedAt: Date.now() });
    S.wines = [mk('Alpha', 0, 2018), mk('Bravo', 0, 2019), mk('Charlie', 2, 2020)];
    S.history = []; UI.tab = 'kelder'; save(); render();
  });
  const t = async sel => (await page.locator(sel).first().textContent()).trim();
  ok((await t('#app, body')).includes('2 wijnen zonder voorraad'), 'kelder toont "2 wijnen zonder voorraad"');
  ok(await page.locator('.wcard .dbtn.leeg').count() === 2, 'twee gedimde drinkknoppen op kaarten met ×0');
  ok(await page.locator('.wcard .dbtn:not(.leeg)').count() === 1, 'gewone drinkknop op de kaart met voorraad');

  // 1. Opruimen → Gedronken → vastleggen
  await page.click('[data-act="opruimOpen"]');
  ok((await t('.sheet-title')) === 'Zonder voorraad', 'opruimsheet open');
  ok(await page.locator('[data-act="opruimDrink"]').count() === 2, 'twee rijen in de opruimsheet');
  await page.locator('[data-act="opruimDrink"]').first().click();
  await page.waitForSelector('#drBtn');
  const titels = await page.locator('.sheet-title').allTextContents();
  ok(titels[titels.length - 1].trim() === 'Achteraf vastleggen', 'afboeksheet in achteraf-stand');
  ok((await page.locator('.sheet').last().textContent()).includes('gaat daarna uit je kelder'), 'sheet zegt dat de wijn de kelder verlaat');
  await page.click('#drBtn');
  await page.waitForTimeout(400);
  let st = await page.evaluate(() => ({ n: S.wines.length, names: S.wines.map(w => w.name), h: S.history.map(h => ({ name: h.name, weg: h.weg || null })), sheets: sheets.length, titel: (document.querySelector('.sheet-title') || {}).textContent }));
  ok(st.n === 2 && !st.names.includes('Alpha'), 'Alpha uit de kelder');
  ok(st.h.length === 1 && st.h[0].name === 'Alpha' && st.h[0].weg === null, 'historie: Alpha gedronken');
  ok(st.sheets === 1 && st.titel === 'Zonder voorraad', 'opruimsheet is heropend (nog 1 wijn)');
  ok(await page.locator('#toastAct').count() === 1 && (await t('#toastAct')) === 'Ongedaan', 'toast met Ongedaan');

  // 2. Ongedaan
  await page.click('#toastAct');
  await page.waitForTimeout(300);
  st = await page.evaluate(() => ({ names: S.wines.map(w => w.name), h: S.history.length, sheets: sheets.length, rijen: document.querySelectorAll('[data-act="opruimDrink"]').length }));
  ok(st.names.includes('Alpha') && st.h === 0, 'ongedaan: Alpha terug, historie leeg');
  ok(st.sheets === 1 && st.rijen === 2, 'opruimsheet (nog steeds één sheet) toont weer 2 rijen');

  // 3. Prullenbak → bevestigen
  await page.locator('[data-act="opruimDel"]').last().click();
  await page.waitForSelector('#cfOk');
  await page.click('#cfOk');
  await page.waitForTimeout(400);
  st = await page.evaluate(() => ({ names: S.wines.map(w => w.name), sheets: sheets.length, titel: (document.querySelector('.sheet-title') || {}).textContent, rijen: document.querySelectorAll('[data-act="opruimDrink"]').length }));
  ok(!st.names.includes('Bravo') && st.names.includes('Alpha'), 'Bravo verwijderd, Alpha blijft');
  ok(st.sheets === 1 && st.titel === 'Zonder voorraad' && st.rijen === 1, 'opruimsheet heropend met 1 rij');
  await page.evaluate(() => closeSheet(true));
  await page.waitForTimeout(400);

  // 4. Min-knop in detail → toast "Gedronken?" → achteraf zonder voorraadwijziging
  const idC = await page.evaluate(() => S.wines.find(w => w.name === 'Charlie').id);
  await page.evaluate(id => openDetail(id), idC);
  await page.click('[data-act="qtyMinus"]');
  await page.waitForTimeout(200);
  ok((await t('.toast')).includes('Fles eraf, voorraad ×1') && (await t('#toastAct')) === 'Gedronken?', 'toast na min-knop');
  await page.click('#toastAct');
  await page.waitForSelector('#drBtn');
  ok((await page.locator('.sheet').last().textContent()).includes('Voorraad blijft ×1'), 'achteraf-sheet: voorraad blijft ×1');
  await page.click('#drBtn');
  await page.waitForTimeout(400);
  st = await page.evaluate(() => ({ qty: S.wines.find(w => w.name === 'Charlie').qty, h: S.history.map(h => h.name), sheets: sheets.length }));
  ok(st.qty === 1 && st.h[0] === 'Charlie', 'Charlie: voorraad blijft 1, historie erbij');
  ok(st.sheets === 0, 'alle sheets dicht');

  // 5. Detail bij ×0: knop heet "Achteraf vastleggen", cadeau vastleggen, wijn blijft
  const idA = await page.evaluate(() => S.wines.find(w => w.name === 'Alpha').id);
  await page.evaluate(id => openDetail(id), idA);
  ok((await t('.sheet [data-act="drinkOpen"]')) === 'Achteraf vastleggen', 'detailknop bij ×0');
  await page.click('.sheet [data-act="drinkOpen"]');
  await page.waitForSelector('#drWeg');
  await page.click('#drWeg button[data-val="cadeau"]');
  ok((await t('#drBtn')) === 'Leg vast', 'knoptekst bij weg-reden in achteraf-stand');
  await page.click('#drBtn');
  await page.waitForTimeout(400);
  st = await page.evaluate(() => ({ names: S.wines.map(w => w.name), h: S.history.map(h => [h.name, h.weg || null]), sheets: sheets.length, leeg: legeWijnen().length }));
  ok(st.names.includes('Alpha') && st.h[0][0] === 'Alpha' && st.h[0][1] === 'cadeau', 'Alpha blijft in kelder, historie: cadeau');
  ok(st.sheets === 0 && st.leeg === 1, 'geen sheets open, 1 wijn zonder voorraad');

  // 6. Normale afboeking blijft werken
  await page.evaluate(id => openDrink(id), idC);
  ok((await t('.sheet-title')) === 'Fles afboeken', 'normale afboeksheet bij voorraad');
  await page.click('#drBtn');
  await page.waitForTimeout(400);
  st = await page.evaluate(() => ({ qty: S.wines.find(w => w.name === 'Charlie').qty, h: S.history.length, tekst: document.body.textContent.includes('2 wijnen zonder voorraad') }));
  ok(st.qty === 0 && st.h === 3, 'normale afboeking: Charlie ×0, 3 regels historie');
  ok(st.tekst, 'lijst meldt nu 2 wijnen zonder voorraad');

  // 7. Statistieken: gedronken dit jaar telt de achteraf-regels zonder weg-reden
  const gedronken = await page.evaluate(() => S.history.filter(h => !h.weg && (h.date||'').slice(0,4) == YR()).length);
  ok(gedronken === 2, 'gedronken dit jaar = 2 (cadeau telt niet)');

  // 8. Geschiedenisstappen kloppen: geen hangende terugstappen, en de terugknop verlaat de app niet onbedoeld
  const hs = await page.evaluate(() => ({ skip: sheetSkipPops, onderweg: sheetPopsOnderweg.length, state: (history.state && history.state.sheet) || 0, sheets: sheets.length }));
  ok(hs.skip === 0 && hs.onderweg === 0 && hs.state === 0 && hs.sheets === 0, 'sheet-geschiedenis schoon: ' + JSON.stringify(hs));
  await page.evaluate(id => openDetail(id), idA);
  await page.waitForTimeout(300);
  await page.goBack(); await page.waitForTimeout(500);
  const nb = await page.evaluate(() => ({ app: typeof S === 'object', sheets: sheets.length })).catch(() => ({ app: false }));
  ok(nb.app && nb.sheets === 0, 'terugknop sluit het detail en blijft in de app');
  console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'geen console- of paginafouten');
  await browser.close();
})().catch(e => { console.error('SCRIPT FAIL', e); process.exit(1); });
