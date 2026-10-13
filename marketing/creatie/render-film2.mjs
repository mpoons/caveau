// Rendert film2.html beeld voor beeld naar MP4 (H.264, 30 fps, zonder geluid: ondertitels dragen het verhaal).
// Gebruik: node render-film.mjs st nl nl   → out2/film-nl-nl-st.mp4 (formaat, taal, markt: nl | be | uk)
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { spawn } from 'child_process';
import { mkdirSync } from 'fs';
const [f = 'st', l = 'nl', m = (l === 'en' ? 'uk' : 'nl')] = process.argv.slice(2);
const MAAT = { st:[1080,1920], p45:[1080,1350], sq:[1080,1080] }[f];
const FPS = 30;
mkdirSync('out', { recursive:true });
const b = await chromium.launch();
const p = await b.newPage({ viewport:{ width:MAAT[0], height:MAAT[1] } });
await p.goto(`http://localhost:8766/film2.html?f=${f}&l=${l}&m=${m}`);
await p.waitForSelector('body[data-klaar]');
const duur = await p.evaluate(() => window.DUUR);
const ff = spawn('ffmpeg', ['-y','-loglevel','error','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-',
  '-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','medium','-movflags','+faststart', `out2/film-${l}-${m}-${f}.mp4`]);
for (let i = 0; i < duur * FPS; i++) {
  await p.evaluate(t => zet(t), i / FPS);
  const buf = await p.screenshot({ type:'jpeg', quality:94 });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
}
ff.stdin.end();
await new Promise(r => ff.on('close', r));
await b.close();
console.log('klaar', `out2/film-${l}-${m}-${f}.mp4`);
