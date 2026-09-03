// Caveau AI-proxy: gewogen credits, de zoekagent voor prijzen en de gedeelde prijstabel.
// Uitrollen: supabase functions deploy ai --project-ref dbzgrkipcoebglacsqwe
// Vereist secret: CAVEAU_ANTHROPIC_KEY (aparte Anthropic-sleutel voor de server).
// "Verify JWT" laten aanstaan: alleen ingelogde Caveau-gebruikers kunnen deze functie aanroepen.
// Vereist de SQL uit supabase/sql/*.sql (wine_prices, wine_price_log, boek_credits).

import { createClient } from 'npm:@supabase/supabase-js@2'

// Tegoed in CREDITS, niet in acties: een kaartscan kost nu eenmaal veel meer dan een etiketscan.
const FREE_CREDITS = 20    // gratis credits per maand
const PLUS_CREDITS = 300   // Caveau Plus (€2,99/mnd)
const DAY_CREDITS  = 60    // anti-misbruik per dag (geldt niet voor 'unlimited')

// Grenzen aan wat één credit mag kosten. De client bepaalt de inhoud, dus de server
// begrenst: bodygrootte, tekstlengte, aantal beelden, geen documenten (PDF's).
const MAX_BODY = 8_000_000      // bytes; zes kaartpagina's van 1568 px passen ruim
const MAX_TEXT = 30_000         // tekens tekst per verzoek
const MAX_IMAGES = 8
const MAX_MESSAGES = 2
const B64_PER_CREDIT = 700_000  // een etiket (1400 px) blijft 1 credit, een kaartpagina wordt 2

// Wat een actie kost. Moet gelijk blijven aan creditCost() in caveau.html.
function creditsFor(kind: string, images: number): number {
  if (kind === 'wijnkaart') return Math.max(2, images * 2)
  if (kind === 'prijs') return 5          // zoekagent: gemeten ± $0,06 met Haiku en drie zoekrondes
  return Math.max(1, images)
}
type Blok = { type?: string; text?: string; source?: { data?: string } }
function meet(messages: unknown) {
  let images = 0, docs = 0, tekst = 0, b64 = 0
  for (const m of (messages as { content?: unknown }[]) || []) {
    const c = m?.content
    if (typeof c === 'string') { tekst += c.length; continue }
    if (!Array.isArray(c)) continue
    for (const b of c as Blok[]) {
      if (b?.type === 'image') { images++; b64 += String(b.source?.data || '').length }
      else if (b?.type === 'text') tekst += String(b.text || '').length
      else docs++
    }
  }
  return { images, docs, tekst, b64 }
}

// Alles draait op Sonnet 5, behalve prijzen: die plukt Haiku 4.5 uit zoekresultaten.
const MODEL_DEFAULT = 'claude-sonnet-5'
const MODEL_BY_KIND: Record<string, string> = { prijs: 'claude-haiku-4-5' }
// Wijnsites waar de zoekagent mag kijken: minder ruis, minder tokens, en een bron-URL
// die we vertrouwen (de gedeelde tabel neemt alleen adressen op deze domeinen op).
const PRIJS_SITES = ['wine-searcher.com', 'idealwine.com', 'vivino.com', 'cellartracker.com', 'gall.nl', 'grandcruwijnen.nl', 'wijnvoordeel.nl',
  'wijnbeurs.nl', 'drankdozijn.nl', 'bestofwines.com', 'topwijnen.be', 'vinatis.com', 'millesima.com', 'vino.com', 'catawiki.com', 'winedecider.com']
const STIJL = ' Schrijf in gewone zinnen met komma\'s en punten. Gebruik geen gedachtestreepjes en vermijd de constructie "niet X, maar Y".'

// Prijstabel: een opgezochte prijs blijft staan, met datum; de app toont "gegevens van <maand>".
// Wie een ouder datapunt wil verversen stuurt refresh:true mee.
type Wijn = { name?: unknown; producer?: unknown; vintage?: unknown; appellation?: unknown; region?: unknown; country?: unknown }
const tekstVeld = (x: unknown, n = 120) => String(x ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, n)
function prijsSleutel(w: Wijn): string {
  const n = (x: unknown) => String(x || '').toLowerCase().normalize('NFD')
    .replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()
  const jaar = Number(w.vintage) || 0
  return `${n(w.producer)}|${n(w.name)}|${jaar || 'nv'}`
}
// De opdracht voor de zoekagent wordt hier gebouwd, niet door de client: anders kan
// een gebruiker het model laten zeggen wat hij wil en dat in de gedeelde tabel zetten.
function prijsPrompt(w: Wijn): string {
  const naam = tekstVeld(w.name), prod = tekstVeld(w.producer), jaar = Number(w.vintage) || null
  const wie = `${naam}${prod && prod !== naam ? ', ' + prod : ''}, jaargang ${jaar || 'NV'}, ${[tekstVeld(w.appellation), tekstVeld(w.region), tekstVeld(w.country)].filter(Boolean).join(', ') || 'herkomst onbekend'}`
  const zoek = [prod, naam, jaar].filter(Boolean).join(' ')
  return `Zoek de actuele marktprijs in euro's van deze wijn: ${wie}.
Zo werk je: zoek eerst met de zoekfunctie op "${zoek} prix" (Franse en Nederlandse handels tonen euro's). Levert dat geen prijs op, zoek dan op "${[prod, naam].filter(Boolean).join(' ')} prijs" zonder jaargang, en als laatste op "${zoek} price". Een prijs die in een zoekresultaat staat telt, je hoeft de pagina niet te openen. Let op de flesmaat: Quarts de Chaume, Sauternes, Tokaji en veel zoete wijnen worden vaak per 50 cl of 37,5 cl verkocht. Zet de maat die je bij de prijs zag in size_seen en reken de prijs om naar 75 cl (50 cl × 1,5; 37,5 cl × 2; magnum ÷ 2), inclusief btw. Zie je geen maat, ga dan uit van 75 cl.
Regels voor het antwoord, in deze volgorde:
1. Vind je een prijs van precies jaargang ${jaar || 'NV'}: geef die, confidence "hoog".
2. Vind je alleen andere jaargangen van dezelfde wijn: geef VERPLICHT de prijs van de dichtstbijzijnde jaargang, zet die jaargang in vintage_found en confidence "middel". Dit is geen mislukking, dit is het gewenste antwoord. Nooit value null zolang je van deze wijn een prijs van welke jaargang dan ook hebt gezien.
3. Vind je alleen een prijs in dollars, ponden of franken: gebruik die, reken om naar euro (1 USD = 0,92 EUR, 1 GBP = 1,17 EUR, 1 CHF = 1,05 EUR), zet de oorspronkelijke prijs en munt in note en confidence "middel". Een Amerikaanse prijs is beter dan geen prijs.
4. Alleen als je van deze wijn helemaal geen enkele prijs vindt, in welke munt dan ook: {"value":null,"note":"reden"}.
Antwoord als allerlaatste met alleen dit JSON-object, zonder tekst ervoor of erna en zonder codeblok:
{"value":42,"low":38,"high":48,"source":"naam van de winkel of site","url":"adres van de pagina waar de prijs staat","vintage_found":2014,"size_seen":"75cl|50cl|37.5cl|magnum|onbekend","confidence":"hoog|middel|laag","note":"één korte zin in het Nederlands over waar de prijs vandaan komt, met de flesmaat als die geen 75 cl was"}${STIJL}`
}
function tekstUit(data: { content?: { type?: string; text?: string }[] }): string {
  return (data?.content || []).filter((b) => b.type === 'text').map((b) => b.text || '').join('')
}
function jsonUit(txt: string): Record<string, unknown> | null {
  const m = txt.match(/\{[^{}]*"value"[^{}]*\}/g)
  if (m && m.length) { try { return JSON.parse(m[m.length - 1]) } catch { /* val terug */ } }
  const a = txt.indexOf('{'), z = txt.lastIndexOf('}')
  if (a < 0 || z <= a) return null
  try { return JSON.parse(txt.slice(a, z + 1)) } catch { return null }
}
// Alleen https-adressen op de toegestane wijnsites komen in de gedeelde tabel.
function okUrl(u: unknown): string {
  try {
    const x = new URL(String(u || ''))
    if (x.protocol !== 'https:' && x.protocol !== 'http:') return ''
    return PRIJS_SITES.some((h) => x.hostname === h || x.hostname.endsWith('.' + h)) ? x.href.slice(0, 500) : ''
  } catch { return '' }
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
const json = (o: unknown, status: number) =>
  new Response(JSON.stringify(o), { status, headers: { ...CORS, 'content-type': 'application/json' } })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })
  const supa = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  let boekId: string | null = null
  const boekWeg = async () => { if (boekId) { const id = boekId; boekId = null; await supa.from('ai_usage').delete().eq('id', id) } }
  try {
    const jwt = (req.headers.get('authorization') || '').replace('Bearer ', '')
    const { data: { user }, error: authErr } = await supa.auth.getUser(jwt)
    if (authErr || !user) return json({ error: 'Niet ingelogd' }, 401)

    // profiel ophalen of aanmaken
    let { data: prof } = await supa.from('profiles').select('*').eq('user_id', user.id).maybeSingle()
    if (!prof) {
      const ins = await supa.from('profiles').insert({ user_id: user.id }).select().single()
      prof = ins.data
    }

    const raw = await req.text()
    if (raw.length > MAX_BODY) return json({ error: 'Verzoek te groot' }, 413)
    let body: Record<string, unknown> | null = null
    try { body = JSON.parse(raw) } catch { body = null }
    if (!body || typeof body !== 'object') return json({ error: 'Ongeldig verzoek' }, 400)
    const kind = String(body.kind || 'ai').slice(0, 30)

    // Gratis: alleen de prijstabel raadplegen, voor een lijst flessen (nieuwe scan of hele kelder).
    // Geen Anthropic-aanroep, geen credit.
    if (kind === 'prijscache') {
      const lijst: Wijn[] = Array.isArray(body.wines) ? (body.wines as Wijn[]).slice(0, 100) : []
      if (!lijst.length) return json({ prices: [] }, 200)
      try {
        const keys = [...new Set(lijst.map(prijsSleutel))]
        const { data: rows } = await supa.from('wine_prices').select('*').in('key', keys)
        const vers = (rows || []).filter((r) => r.value != null)
        await Promise.all(vers.map((r) => supa.from('wine_prices').update({ hits: (r.hits || 0) + 1 }).eq('key', r.key)))
        return json({ prices: vers.map((r) => ({ key: r.key, value: r.value, low: r.low, high: r.high, source: r.source, url: r.url,
          vintage_found: r.vintage_found, confidence: r.confidence, note: r.note, at: r.updated_at })) }, 200)
      } catch (_) { return json({ prices: [] }, 200) }
    }

    if (!Array.isArray(body.messages) || body.messages.length < 1 || body.messages.length > MAX_MESSAGES) return json({ error: 'Ongeldig verzoek' }, 400)
    const m = meet(body.messages)
    if (m.docs > 0 || m.images > MAX_IMAGES || m.tekst > MAX_TEXT) return json({ error: 'Verzoek te groot' }, 413)

    // zoekagent: alleen voor prijzen; de server bouwt de opdracht en kijkt eerst in de tabel
    const web = body.web === true && kind === 'prijs'
    const wijn: Wijn | null = web && body.wine && typeof body.wine === 'object' && tekstVeld((body.wine as Wijn).name) ? body.wine as Wijn : null
    if (web && !wijn) return json({ error: 'Ongeldig verzoek' }, 400)
    let messages = body.messages
    if (wijn) {
      messages = [{ role: 'user', content: [{ type: 'text', text: prijsPrompt(wijn) }] }]
      if (body.refresh !== true) {
        try {
          const key = prijsSleutel(wijn)
          const { data: row } = await supa.from('wine_prices').select('*').eq('key', key).maybeSingle()
          if (row && row.value != null) {
            await supa.from('wine_prices').update({ hits: (row.hits || 0) + 1 }).eq('key', key)
            const uit = { value: row.value, low: row.low, high: row.high, source: row.source, url: row.url,
              vintage_found: row.vintage_found, confidence: row.confidence, note: row.note, cached: true, at: row.updated_at }
            return json({ content: [{ type: 'text', text: JSON.stringify(uit) }], usage: { input_tokens: 0, output_tokens: 0 }, cached: true }, 200)
          }
        } catch (_) { /* tabel onbereikbaar: dan gewoon zoeken */ }
      }
    }

    // Credits: controle en boeking in één transactie met een slot per gebruiker.
    // De kostprijs volgt wat er werkelijk binnenkomt, niet alleen het opgegeven soort.
    const units = Math.max(creditsFor(kind, m.images), Math.ceil(m.b64 / B64_PER_CREDIT))
    const unlimited = prof?.plan === 'unlimited'
    const limit = prof?.plan === 'plus' ? PLUS_CREDITS : FREE_CREDITS + (prof?.bonus_credits || 0)
    const { data: boek, error: boekErr } = await supa.rpc('boek_credits', {
      p_user: user.id, p_kind: kind, p_units: units, p_limit: limit, p_day: DAY_CREDITS, p_unlimited: unlimited })
    if (boekErr) { console.error('boek_credits', boekErr.message); return json({ error: 'Tegoed kon niet worden geboekt' }, 500) }
    if (boek === '-2') return json({ error: 'Daglimiet bereikt, probeer het morgen weer', code: 'daglimiet' }, 429)
    if (boek === '-1') {
      const monthStart = new Date(); monthStart.setUTCDate(1); monthStart.setUTCHours(0, 0, 0, 0)
      const { data } = await supa.from('ai_usage').select('cost_units').eq('user_id', user.id).gte('created_at', monthStart.toISOString())
      const used = (data || []).reduce((n: number, r: { cost_units: number | null }) => n + (r.cost_units || 1), 0)
      return json({ error: 'AI-tegoed voor deze maand is op', code: 'quota', used, limit, needed: units }, 402)
    }
    boekId = String(boek)

    // verzoek doorsturen; de server bepaalt model en instellingen
    const wantStream = body.stream === true && !web
    const model = MODEL_BY_KIND[kind] || MODEL_DEFAULT
    const payload: Record<string, unknown> = {
      model,
      max_tokens: Math.min(Number(body.max_tokens) || 2000, 4000),
      messages,
      ...(wantStream ? { stream: true } : {}),
    }
    // Sonnet/Opus 5 denken standaard mee in het antwoordbudget; voor JSON zetten we dat uit. Haiku 4.5 kent dat veld anders: weglaten.
    if (!/haiku/.test(model)) payload.thinking = { type: 'disabled' }
    // De webzoekfunctie van de API zelf; Haiku 4.5 kent alleen de basisvariant.
    if (web) payload.tools = [{ type: /haiku/.test(model) ? 'web_search_20250305' : 'web_search_20260209', name: 'web_search', max_uses: 3, allowed_domains: PRIJS_SITES }]
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': Deno.env.get('CAVEAU_ANTHROPIC_KEY')!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(payload),
    })
    if (!r.ok || !r.body) {
      const fout = await r.json().catch(() => ({}))
      console.error('anthropic', r.status, JSON.stringify(fout).slice(0, 300))
      await boekWeg()
      return json({ error: r.status === 429 ? 'De AI is even druk, probeer het zo nog eens' : 'Fout bij de AI', status: r.status }, r.status >= 500 ? 502 : r.status)
    }

    // Streamen: de app vult het etiket in terwijl het antwoord binnenkomt. We laten de
    // gebeurtenissen ongewijzigd door en kijken alleen mee voor het verbruik. De credit is
    // al geboekt; komt er geen enkel stukje tekst (afgebroken vóór het antwoord), dan
    // halen we hem weer weg. Afbreken halverwege blijft betaald: het model heeft gewerkt.
    if (wantStream) {
      const dec = new TextDecoder()
      let inTok = 0, outTok = 0, gotText = false, tail = '', afgerond = false
      const afronden = async () => {
        if (afgerond) return; afgerond = true
        if (!gotText) { await boekWeg(); return }
        if (boekId) await supa.from('ai_usage').update({ tokens_in: inTok, tokens_out: outTok }).eq('id', boekId)
      }
      const spy = new TransformStream({
        transform(chunk, ctrl) {
          ctrl.enqueue(chunk)
          tail += dec.decode(chunk, { stream: true })
          let i: number
          while ((i = tail.indexOf('\n')) >= 0) {
            const line = tail.slice(0, i).trim(); tail = tail.slice(i + 1)
            if (!line.startsWith('data:')) continue
            try {
              const ev = JSON.parse(line.slice(5).trim())
              if (ev.type === 'content_block_delta' && ev.delta?.text) gotText = true
              if (ev.type === 'message_start') inTok = ev.message?.usage?.input_tokens || 0
              if (ev.type === 'message_delta') outTok = ev.usage?.output_tokens || outTok
            } catch (_) { /* halve regel: die maakt de volgende ronde af */ }
          }
        },
        flush: afronden,
        cancel: afronden,
      })
      return new Response(r.body.pipeThrough(spy), {
        status: 200,
        headers: { ...CORS, 'content-type': 'text/event-stream', 'cache-control': 'no-cache' },
      })
    }

    const data = await r.json()
    if (boekId) await supa.from('ai_usage').update({ tokens_in: data?.usage?.input_tokens || 0, tokens_out: data?.usage?.output_tokens || 0 }).eq('id', boekId)
    if (wijn) {
      const txt = tekstUit(data)
      const p = jsonUit(txt)
      const v = p ? Number(p.value) : NaN
      const goed = !!p && Number.isFinite(v) && v > 0 && v < 100000 && ['hoog', 'middel'].includes(String(p.confidence || ''))
      // logboek zonder gebruikers-id, en oude regels opruimen
      try {
        await supa.from('wine_price_log').insert({ key: prijsSleutel(wijn), model, status: r.status, text: txt.slice(0, 6000),
          value: goed ? v : null, error: p ? null : 'geen JSON', tokens_in: data?.usage?.input_tokens || 0, tokens_out: data?.usage?.output_tokens || 0 })
        await supa.from('wine_price_log').delete().lt('created_at', new Date(Date.now() - 30 * 864e5).toISOString())
      } catch (_) { /* logboek is bijzaak */ }
      // gevonden prijs delen, alleen na controle: echt getal, geloofwaardige zekerheid, bron op een bekende site
      if (goed && p) {
        try {
          await supa.from('wine_prices').upsert({
            key: prijsSleutel(wijn), user_id: user.id,
            name: tekstVeld(wijn.name, 200), producer: tekstVeld(wijn.producer, 200), vintage: Number(wijn.vintage) || null,
            value: v, low: Number.isFinite(Number(p.low)) ? Number(p.low) : null, high: Number.isFinite(Number(p.high)) ? Number(p.high) : null,
            source: tekstVeld(p.source, 120), url: okUrl(p.url), vintage_found: Number(p.vintage_found) || null,
            confidence: tekstVeld(p.confidence, 10), note: tekstVeld(p.note, 300), updated_at: new Date().toISOString(),
          })
        } catch (e) { console.error('wine_prices upsert', String((e as Error)?.message || e).slice(0, 200)) }
      }
    }
    return json(data, 200)
  } catch (e) {
    console.error('ai', String((e as Error)?.message || e).slice(0, 300))
    await boekWeg()
    return json({ error: 'Er ging iets mis aan onze kant. Probeer het zo nog eens' }, 500)
  }
})
