// Rendert alle statische advertenties uit studio2.html naar out/. Gebruik: node render.mjs [concept] [formaat] [taal]
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { mkdirSync } from 'fs';
const MAAT = { sq:[1080,1080], p45:[1080,1350], st:[1080,1920], ls:[1200,628] };
const [cA, fA, lA] = process.argv.slice(2);
const C = cA ? [cA] : ['wanneer','specifiek','kelder','erbij','uiteten','nu'];
const F = fA ? [fA] : Object.keys(MAAT);
/* taal-markt: nl-nl (NIX18), nl-be (Belgische band), en-uk */
const L = lA ? [lA] : ['nl-nl','nl-be','en-uk'];
mkdirSync('out2', { recursive:true });
const b = await chromium.launch();
const p = await b.newPage();
for (const c of C) for (const f of F) for (const l of L) {
  await p.setViewportSize({ width:MAAT[f][0], height:MAAT[f][1] });
  const [taal, markt] = l.split('-');
  await p.goto(`http://localhost:8766/studio2.html?c=${c}&f=${f}&l=${taal}&m=${markt}`);
  await p.waitForSelector('body[data-klaar]');
  await p.locator('#doek').screenshot({ path:`out2/${l}-${c}-${f}.png` });
}
await b.close();
console.log('klaar', C.length * F.length * L.length);
