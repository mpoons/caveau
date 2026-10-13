import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const b = await chromium.launch(); const p = await b.newPage({ viewport:{ width:1200, height:628 } });
for (const [l, m] of [['nl','nl'], ['en','uk']]) {
  await p.goto(`http://localhost:8766/studio2.html?c=merk&f=ls&l=${l}&m=${m}`); await p.waitForSelector('body[data-klaar]');
  await p.locator('#doek').screenshot({ path:`out2/og-${l}.png` });
}
await b.close();
