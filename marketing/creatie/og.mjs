import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const b = await chromium.launch(); const p = await b.newPage({ viewport:{ width:1200, height:630 } });
for (const l of ['nl','en']) {
  await p.goto(`http://localhost:8766/studio.html?c=merk&f=og&l=${l}&m=geen`); await p.waitForSelector('body[data-klaar]');
  await p.locator('#doek').screenshot({ path:`out/og-${l}.png` });
}
await b.close();
