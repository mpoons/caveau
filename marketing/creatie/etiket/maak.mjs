import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const b = await chromium.launch(); const p = await b.newPage({ viewport:{ width:1280, height:720 } });
await p.goto('http://localhost:8766/etiket/etiket.html'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
await p.screenshot({ path:'etiket.png' }); await b.close();
