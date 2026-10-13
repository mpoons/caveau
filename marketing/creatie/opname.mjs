// Neemt alle schermen en uitsneden voor de advertenties, de film en de landingspagina op uit de echte app.
// Gebruik: node opname.mjs nl|en [dark]. Vereist: de app op http://localhost:8765 (repo cellarmentor),
// en etiket/etiket.y4m als camerabeeld (zie README). De beeldreeks voor de film komt in reeks-ruw/.
import { chromium, devices } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const lang = process.argv[2] || 'nl', EN = lang === 'en', DARK = process.argv[3] === 'dark', SFX = DARK ? '-dark' : '';
import { mkdirSync } from 'fs';
const UIT = new URL('./ui2/', import.meta.url).pathname, SEQ = new URL('./reeks-ruw/', import.meta.url).pathname; mkdirSync(SEQ, { recursive: true });
const b = await chromium.launch({ args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--use-file-for-fake-video-capture=' + new URL('./etiket/etiket.y4m', import.meta.url).pathname] });
const ctx = await b.newContext({ ...devices['iPhone 13'], viewport: { width: 390, height: 844 }, locale: EN ? 'en-GB' : 'nl-NL', permissions: ['camera'], colorScheme: DARK ? 'dark' : 'light' });
const p = await ctx.newPage(); const errs = [];
p.on('pageerror', e => errs.push(String(e)));
await p.route(/supabase\.co/, r => r.abort());
await p.goto('http://localhost:8765/index.html?taal=' + lang); await p.waitForTimeout(800);
await p.addStyleTag({ content: '.toast,#toast,.toasts,#liveHint{display:none!important}' });
await p.evaluate(() => { new MutationObserver(() => document.querySelectorAll('.srcchip').forEach(c => { if (/AI/.test(c.textContent)) c.textContent = c.textContent.replace(/[-\s]?AI/, ''); })).observe(document.body, { childList: true, subtree: true, characterData: true }); });
await p.evaluate((EN) => {
  S.settings.installWeg = true; S.settings.prijsAuto = false; ACT.demoLoad();
  const NAAM = { 'Château Léoville Barton':'Saint-Julien', 'Sancerre Les Romains':'Sancerre', 'Meursault':'Meursault', 'Brut Réserve':'Champagne Brut', 'Viña Ardanza Reserva':'Rioja Reserva', 'Maury Grenat':'Maury Grenat' };
  const LOC = EN ? { 'Vintec, zone onder':'Wine fridge, lower', 'Vintec, zone boven':'Wine fridge, upper', 'Wijnrek':'Wine rack', 'Kelder':'Cellar' } : { 'Vintec, zone onder':'Klimaatkast, onder', 'Vintec, zone boven':'Klimaatkast, boven' };
  const LAND = { Frankrijk:'France', Spanje:'Spain' };
  const NOOT = { 'Klassiek en gestructureerd, geduld wordt beloond.':'Classic and structured, patience pays off.', 'Strak, mineraal, kruisbes.':'Taut, mineral, gooseberry.', 'Boterig én fris, mooie spanning.':'Buttery and fresh, lovely tension.', 'Fijne mousse, brioche, altijd goed.':'Fine mousse, brioche, always good.', 'Zijdeglad, met vanille en kers. Nu prachtig.':'Silky, vanilla and cherry. Lovely now.', 'Zoet en donker fruit, een dessert in een glas.':'Sweet dark fruit, dessert in a glass.' };
  for (const w of S.wines) { if (NAAM[w.name]) { w.name = NAAM[w.name]; w.producer = ''; }
    w.location = LOC[w.location] || w.location; if (EN) { delete w.price; delete w.value; w.country = LAND[w.country] || w.country; w.note = NOOT[w.note] || w.note; } }
  for (const h of S.history) { if (NAAM[h.name]) { h.name = NAAM[h.name]; h.producer = ''; } if (EN) h.note = 'With roast lamb. Superb.'; }
  if (EN) S.settings.cellarName = 'My cellar'; for (const l of (S.locations || [])) l.naam = LOC[l.naam] || l.naam;
  save(true);
  const c = cloud(); c.refresh = 'demo'; c.uid = 'demo'; c.email = 'demo@cellarmentor.com';
  window.syncNow = async () => {}; window.fetchQuota = async () => {};
}, EN);
const shot = async (naam, sel) => { await p.waitForTimeout(450); if (sel) await p.locator(sel).first().screenshot({ path: UIT + `${lang}-${naam}${SFX}.png` }); else await p.screenshot({ path: UIT + `${lang}-${naam}${SFX}.png` }); };
const go = async fn => { await p.evaluate(fn); await p.waitForTimeout(350); };

// 1. kelderlijst
await go(() => { UI.tab = 'kelder'; render(); scrollTo(0, 0); });
await shot('kelder');
await p.evaluate(() => { const v = document.getElementById('view'); const cards = [...v.querySelectorAll('.wcard')]; const box = document.createElement('div'); box.id = 'lijstUit'; cards[0].parentNode.insertBefore(box, cards[0]); cards.filter(c => !/Sancerre/.test(c.textContent)).slice(0, 4).forEach(c => box.appendChild(c)); box.style.background = getComputedStyle(document.body).backgroundColor; box.style.padding = '4px 16px'; });
await shot('kelderlijst', '#lijstUit');
// 2. Horizon
await go(() => { UI.tab = 'overzicht'; render(); scrollTo(0, 0); });
await p.evaluate(() => { const h = document.querySelector('.hz'); const s = h && h.closest('.sect') || h; s.id = 'hzUit'; s.style.background = getComputedStyle(document.body).backgroundColor; s.style.padding = '10px 16px'; });
await shot('horizon', '#hzUit');
// 3. pairing: eendenborst
await go(() => { UI.tab = 'pairing'; UI.pairMode = 'dish'; render(); scrollTo(0, 0); });
await p.fill('#pairDish', EN ? 'duck breast' : 'eendenborst'); await p.click('[data-act=pairGo]'); await p.waitForTimeout(700);
await p.evaluate(() => { document.querySelectorAll('.banner').forEach(b => { if (/sommelier|AI|Log in|inlog/i.test(b.textContent)) b.style.display = 'none'; }); document.querySelectorAll('.small').forEach(s => { if (/^(Kelderregel|Cellar rule)/.test(s.textContent.trim())) s.style.display = 'none'; }); document.querySelectorAll('.srcchip').forEach(c => { if (/regels|rules/i.test(c.textContent)) c.style.display = 'none'; }); const m = document.querySelector('.match'); m.id = 'matchUit'; m.scrollIntoView({ block: 'center' }); });
await shot('match', '#matchUit');
{ const r = await p.evaluate(() => { const ms = document.querySelectorAll('.match'); const inp = document.getElementById('pairDish'); const box = inp.closest('.zoek, .search, .field, form') || inp.parentElement;
    window.scrollTo(0, box.getBoundingClientRect().top + scrollY - 12); const a = box.getBoundingClientRect(), z = ms[1].getBoundingClientRect(); return { y: a.top - 12, h: z.bottom - a.top + 24 }; });
  await p.waitForTimeout(300); await p.screenshot({ path: UIT + `${lang}-erbij${SFX}.png`, clip: { x: 0, y: Math.max(0, r.y), width: 390, height: Math.min(r.h, 844 - Math.max(0, r.y)) } }); }
await p.evaluate(() => { const m = document.querySelector('.match'); window.scrollTo(0, m.getBoundingClientRect().top + scrollY - 230); });
await shot('pairing');
// 4. wijnkaart
await p.evaluate((EN) => {
  S.menuLast = { at: Date.now(), dish: null, budget: 70, glass: false, restaurant: null,
    courses: EN ? ['Scallops, brown butter', 'Sea bass, beurre blanc', 'Veal sweetbreads, morels'] : ['Coquilles, beurre noisette', 'Zeebaars, beurre blanc', 'Kalfszwezerik, morilles'],
    picks: [
      { name: 'Chablis 1er Cru', producer: null, vintage: 2021, type: 'wit', region: 'Bourgogne', price: 68, unit: EN ? 'bottle' : 'fles', flag: EN ? 'Carries the whole menu' : 'Draagt het hele menu', course: '', score: 9, reason: EN ? 'Taut and saline, with enough depth for the sweetbreads. With the sea bass it brings the freshness the beurre blanc needs.' : 'Strak en zilt, met genoeg diepte voor de zwezerik. Bij de zeebaars precies de frisheid die de beurre blanc nodig heeft.', value: '' },
      { name: 'Savennières', producer: null, vintage: 2019, type: 'wit', region: 'Loire', price: 59, unit: EN ? 'bottle' : 'fles', flag: '', course: EN ? 'Sea bass' : 'Zeebaars', score: 8, reason: EN ? 'Chenin with seven years in bottle: honey and stone, dry. Lovely with the beurre blanc.' : 'Chenin met zeven jaar fles: honing en steen, droog. Mooi bij de beurre blanc.', value: '' },
      { name: 'Bourgogne Pinot Noir', producer: null, vintage: 2022, type: 'rood', region: 'Bourgogne', price: 14, unit: EN ? 'glass' : 'glas', flag: '', course: EN ? 'Sweetbreads' : 'Zwezerik', score: 7, reason: EN ? 'If you want red with the morels: light, juicy, little tannin.' : 'Wil je bij de morilles toch rood: licht, sappig, weinig tannine.', value: '' }],
    glassAdvice: null, skip: null, note: null };
  UI.tab = 'pairing'; UI.pairMode = 'menu'; render(); scrollTo(0, 0); }, EN); await p.waitForTimeout(350);
await p.evaluate(() => { const m = document.getElementById('menuOut'); if (m) window.scrollTo(0, m.getBoundingClientRect().top + scrollY - 92); });
await shot('wijnkaart');
// 5. scan: live, bevestigen, detail (ook als beeldreeksen voor de film)
await go(() => { window.__sj = S.wines.find(w => /Saint-Julien/.test(w.name)); S.wines = S.wines.filter(w => !/Saint-Julien/.test(w.name)); save(true); UI.tab = 'scan'; scanReset(); render(); scrollTo(0, 0); });
await p.evaluate((EN) => {
  const d = { name: 'Saint-Julien', producer: '', vintage: 2016, type: 'rood', grapes: ['cabernet sauvignon', 'merlot', 'cabernet franc'], country: EN ? 'France' : 'Frankrijk', region: 'Bordeaux', appellation: 'Saint-Julien', drink_from: 2025, drink_to: 2060, value_eur: null, value_low: null, value_high: null, value_confidence: 'laag', pairing: EN ? ['rack of lamb', 'rib-eye', 'duck breast', 'aged Comté'] : ['lamsrack', 'entrecote', 'eendenborst', 'oude Comté'], note: EN ? 'Classic Saint-Julien from a strong year: firm, cedar and blackcurrant, just opening up.' : 'Klassieke Saint-Julien uit een sterk jaar: strak, cederhout en zwarte bes, nu net open.', score_seen: null, zoek_producent: null, zoek_naam: null, ean: null };
  const t = JSON.stringify(d);
  window.callClaude = async (c, m, k, onText) => { for (let i = 1; i <= 16; i++) { await new Promise(r => setTimeout(r, 120)); if (onText) onText(t.slice(0, Math.round(t.length * i / 16))); } return t; };
}, EN);
await shot('scanknop');
let n = 0; const seq = async () => DARK ? null : p.screenshot({ path: SEQ + `${lang}-${String(n++).padStart(3, '0')}.png` });
await p.evaluate(() => { window.__cap = liveCapture; window.liveCapture = () => {}; });   /* de echte sluiter vangt zelf na 1,2 s; voor de reeks houden we de zoeker langer open en drukken we zelf af */
await p.click('[data-act=scanCam]');
for (let i = 0; i < 30; i++) { await p.waitForTimeout(50); await seq(); }
await shot('live');
await p.evaluate(() => { window.liveCapture = window.__cap; liveCapture(); });
for (let i = 0; i < 26; i++) { await p.waitForTimeout(60); await seq(); }
await p.waitForTimeout(500); await shot('bevestig');
await p.click('[data-act=scanAdd]'); await p.waitForTimeout(400);
await p.evaluate(() => { UI.tab = 'kelder'; render(); const w = S.wines.find(w => /Saint-Julien/.test(w.name)); const o = window.__sj; w.qty = o.qty; if ('price' in o) { w.price = o.price; w.value = o.value; } w.location = o.location; save(true); render(); openDetail(w.id); });
for (let i = 0; i < 12; i++) { await p.waitForTimeout(40); await seq(); }
await shot('detail');
await p.evaluate(() => { const s = document.querySelector('.sheet .sheet-in') || document.querySelector('.sheet'); const tl = s.querySelector('.tl'); const kop = s.querySelector('.sheet-head'); const box = document.createElement('div'); box.id = 'vensterUit'; });
console.log(lang, 'seq', n, 'errs', errs.slice(0, 3));
await b.close();
