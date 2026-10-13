// Bouwt dashboard.html (het Artifact) en PLAN.md uit plan.js. Gebruik: node bouw.mjs
import { readFileSync, writeFileSync } from 'fs';
import { PLAN } from './plan.js';
const src = readFileSync(new URL('./dashboard.src.html', import.meta.url), 'utf8');
writeFileSync(new URL('./dashboard.html', import.meta.url), src.replace('/*PLAN*/null', JSON.stringify(PLAN)));

const L = [];
L.push(`# Lanceringsplan CellarMentor`, '', `*${PLAN.zin}* ${PLAN.belofte}`, '', `Plan van ${PLAN.bijgewerkt}. Elke sectie is los goed te keuren; status en voortgang staan in het dashboard.`, '');
L.push('## Geld', '', PLAN.geld.regel, '', PLAN.geld.aanname, '', '| Post | Sectie | Envelop |', '|---|---|---|');
for (const p of PLAN.geld.envelop) L.push(`| ${p.post} | ${p.sectie} | € ${p.bedrag} |`);
L.push(`| **Totaal** | | **€ ${PLAN.geld.envelop.reduce((n, p) => n + p.bedrag, 0)}** |`, '', '| Wat een abonnee oplevert | |', '|---|---|');
for (const [k, v] of PLAN.geld.eenheid) L.push(`| ${k} | ${v} |`);
L.push('', '## Kerncijfers', '');
for (const k of PLAN.kerncijfers) L.push(`- **${k.k}**: ${k.uitleg}`);
for (const f of PLAN.fasen) {
  L.push('', `## Fase ${f.id} · ${f.naam}`, '', f.sub);
  for (const s of PLAN.secties.filter(x => x.fase === f.id)) {
    L.push('', `### ${s.id} · ${s.titel}`, '', `**Kosten:** ${s.kostenTekst}${s.afh && s.afh.length ? ` · **na:** ${s.afh.join(', ')}` : ''}`, '', s.waarom, '');
    if (s.klaar && s.klaar.length) { L.push('**Al klaar of voorbereid**', ''); s.klaar.forEach(x => L.push(`- ${x}`)); L.push(''); }
    L.push('**Wat ik doe**', ''); s.ik.forEach(x => L.push(`- ${x}`)); L.push('', '**Wat jij doet**', ''); s.jij.forEach(x => L.push(`- ${x}`)); L.push('');
    if (s.regels) L.push(`**Regels:** ${s.regels}`, '');
    if (s.test) L.push('| Testcriterium | |', '|---|---|', `| Meten | ${s.test.meten} |`, `| Opschalen bij | ${s.test.opschalen} |`, `| Stoppen bij | ${s.test.stoppen} |`, `| Wat dit kan bewijzen | ${s.test.bewijs} |`, '');
    if (s.later) L.push(`**Later:** ${s.later}`, '');
    if (s.bestanden && s.bestanden.length) L.push('**Bestanden:** ' + s.bestanden.map(b => `[${b.t}](${b.u})`).join(' · '), '');
  }
}
L.push('', '## Bronnen', '', '| Wat | Waarde | Bron |', '|---|---|---|');
for (const b of PLAN.bronnen) L.push(`| ${b.k} | ${b.v} | [${b.b}](${b.u}) |`);
L.push('', 'Volledige rapporten: ' + PLAN.onderzoek.map(o => `[${o.t}](${o.u})`).join(' · '), '');
writeFileSync(new URL('./PLAN.md', import.meta.url), L.join('\n'));
console.log('dashboard.html en PLAN.md gebouwd');
