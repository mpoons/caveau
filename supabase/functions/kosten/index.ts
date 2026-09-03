// Caveau: wekelijks kostenoverzicht per mail voor de beheerder.
// Loopt via pg_cron + pg_net (supabase/sql/kosten.sql), elke maandag 07:00 UTC.
// Vereist secrets: CRON_SECRET (zelfde als in de SQL), RESEND_API_KEY, MAIL_FROM
//   (zonder eigen domein werkt "Caveau <onboarding@resend.dev>", alleen naar het adres van het Resend-account),
//   KOSTEN_MAIL_TO (ontvanger). Met de hand: curl -X POST .../functions/v1/kosten -H "x-cron-secret: …"
// Zonder RESEND_API_KEY geeft de functie het overzicht als JSON terug, zodat je hem kunt testen.

import { createClient } from 'npm:@supabase/supabase-js@2'

// Tarieven per miljoen tokens (USD), plus de webzoekfunctie per zoekopdracht.
const TARIEF: Record<string, { in: number; out: number; extra: number }> = {
  prijs: { in: 1, out: 5, extra: 0.03 },      // Haiku 4.5 + ± drie zoekopdrachten à $0,01
  default: { in: 2, out: 10, extra: 0 },      // Sonnet 5
}
const CREDIT_PRIJS_EUR = 2.99 / 300           // wat een Plus-credit opbrengt
const USD_EUR = 0.92

type Rij = { kind: string; cost_units: number | null; tokens_in: number | null; tokens_out: number | null; user_id: string; created_at: string }

function kosten(r: Rij): number {
  const t = TARIEF[r.kind] || TARIEF.default
  return ((r.tokens_in || 0) * t.in + (r.tokens_out || 0) * t.out) / 1e6 + t.extra
}
const eur = (n: number) => '€ ' + n.toFixed(2).replace('.', ',')
const usd = (n: number) => '$ ' + n.toFixed(2)

Deno.serve(async (req) => {
  const secret = Deno.env.get('CRON_SECRET')
  if (!secret || req.headers.get('x-cron-secret') !== secret) return new Response('Unauthorized', { status: 401 })
  const supa = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const nu = Date.now(), week = 7 * 864e5
  const sinds = new Date(nu - week).toISOString(), vorige = new Date(nu - 2 * week).toISOString()

  const { data: rijen } = await supa.from('ai_usage').select('kind,cost_units,tokens_in,tokens_out,user_id,created_at').gte('created_at', vorige)
  const alle = (rijen || []) as Rij[]
  const deze = alle.filter((r) => r.created_at >= sinds), vorig = alle.filter((r) => r.created_at < sinds)
  const som = (xs: Rij[]) => ({
    acties: xs.length,
    credits: xs.reduce((n, r) => n + (r.cost_units || 1), 0),
    tokensIn: xs.reduce((n, r) => n + (r.tokens_in || 0), 0),
    tokensOut: xs.reduce((n, r) => n + (r.tokens_out || 0), 0),
    kostenUsd: xs.reduce((n, r) => n + kosten(r), 0),
    gebruikers: new Set(xs.map((r) => r.user_id)).size,
  })
  const d = som(deze), v = som(vorig)
  const perSoort: Record<string, { n: number; credits: number; usd: number }> = {}
  for (const r of deze) { const p = perSoort[r.kind] || (perSoort[r.kind] = { n: 0, credits: 0, usd: 0 }); p.n++; p.credits += r.cost_units || 1; p.usd += kosten(r) }
  const perCreditUsd = d.credits ? d.kostenUsd / d.credits : 0

  const { count: prijzenNieuw } = await supa.from('wine_prices').select('*', { count: 'exact', head: true }).gte('created_at', sinds)
  const { count: prijzenTotaal } = await supa.from('wine_prices').select('*', { count: 'exact', head: true })
  const { count: zoekMissers } = await supa.from('wine_price_log').select('*', { count: 'exact', head: true }).gte('created_at', sinds).is('value', null)
  const { count: profielen } = await supa.from('profiles').select('*', { count: 'exact', head: true })
  const { count: plus } = await supa.from('profiles').select('*', { count: 'exact', head: true }).eq('plan', 'plus')

  const soorten = Object.entries(perSoort).sort((a, b) => b[1].usd - a[1].usd)
  const regels = soorten.map(([k, p]) => `<tr><td>${k}</td><td align="right">${p.n}</td><td align="right">${p.credits}</td><td align="right">${usd(p.usd)}</td></tr>`).join('')
  const verschil = (a: number, b: number) => b ? ` (vorige week ${b})` : ''
  const oordeel = perCreditUsd > 0.01 ? `Let op: een credit kost ${usd(perCreditUsd)}, boven de grens van $0,01 waarop de bundel van 300 voor ${eur(2.99)} is gerekend.` : `Een credit kost ${usd(perCreditUsd)}; dat past binnen de bundel (grens $0,01).`
  const onderwerp = `Caveau, week ${new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}: ${d.acties} acties, ${usd(d.kostenUsd)}`
  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;font-size:15px;line-height:1.5;color:#2A1F24;max-width:560px">
    <h2 style="font-weight:600">Caveau, afgelopen zeven dagen</h2>
    <p><b>${d.acties} AI-acties</b>${verschil(d.acties, v.acties)} door <b>${d.gebruikers} ${d.gebruikers === 1 ? 'gebruiker' : 'gebruikers'}</b>${verschil(d.gebruikers, v.gebruikers)}, samen <b>${d.credits} credits</b>${verschil(d.credits, v.credits)}.</p>
    <p>Geschatte kosten bij Anthropic: <b>${usd(d.kostenUsd)}</b> (${eur(d.kostenUsd * USD_EUR)})${v.kostenUsd ? `, vorige week ${usd(v.kostenUsd)}` : ''}. ${oordeel}</p>
    <table cellpadding="6" style="border-collapse:collapse;font-size:14px"><tr style="color:#8E867D;text-transform:uppercase;font-size:11px;letter-spacing:.06em"><td>Soort</td><td align="right">Acties</td><td align="right">Credits</td><td align="right">Kosten</td></tr>${regels || '<tr><td colspan="4">Geen acties deze week.</td></tr>'}</table>
    <p>Tokens: ${d.tokensIn.toLocaleString('nl-NL')} in, ${d.tokensOut.toLocaleString('nl-NL')} uit.</p>
    <p>Prijstabel: <b>${prijzenNieuw || 0}</b> nieuwe prijzen deze week, ${prijzenTotaal || 0} in totaal. Zoekagent zonder resultaat: ${zoekMissers || 0} keer.</p>
    <p>Accounts: ${profielen || 0}, waarvan ${plus || 0} Plus.</p>
    <p style="color:#8E867D;font-size:13px">Automatisch verstuurd op maandagochtend door de Edge Function <code>kosten</code>. Tarieven: Sonnet 5 $2/$10 per miljoen tokens, Haiku 4.5 $1/$5 plus zoekopdrachten.</p>
  </div>`

  const samenvatting = { week: d, vorige: v, perSoort, perCreditUsd, prijzenNieuw, prijzenTotaal, zoekMissers, profielen, plus }
  const resendKey = Deno.env.get('RESEND_API_KEY'), from = Deno.env.get('MAIL_FROM'), to = Deno.env.get('KOSTEN_MAIL_TO')
  if (!resendKey || !from || !to) {
    return new Response(JSON.stringify({ verstuurd: false, reden: 'RESEND_API_KEY, MAIL_FROM of KOSTEN_MAIL_TO ontbreekt', onderwerp, samenvatting }, null, 1), { status: 200, headers: { 'content-type': 'application/json' } })
  }
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { authorization: `Bearer ${resendKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject: onderwerp, html }),
  })
  if (!r.ok) { console.error('resend', r.status, (await r.text()).slice(0, 300)); return new Response('Mail mislukt', { status: 502 }) }
  return new Response(JSON.stringify({ verstuurd: true, onderwerp, samenvatting }), { status: 200, headers: { 'content-type': 'application/json' } })
})
