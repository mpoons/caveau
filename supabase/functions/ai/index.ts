// Caveau AI-proxy (Fase 1 + Fase 2: gewogen credits, plus de zoekagent voor prijzen)
// Uitrollen: supabase functions deploy ai --project-ref dbzgrkipcoebglacsqwe
// Vereist secret: CAVEAU_ANTHROPIC_KEY = (aparte Anthropic-sleutel voor de server)
// "Verify JWT" laten aanstaan (standaard): alleen ingelogde Caveau-gebruikers kunnen deze functie aanroepen.

import { createClient } from 'npm:@supabase/supabase-js@2'

// Tegoed in CREDITS, niet in acties — een kaartscan kost nu eenmaal veel meer dan een etiketscan.
const FREE_CREDITS = 20    // gratis credits per maand
const PLUS_CREDITS = 300   // Caveau Plus (€2,99/mnd)
const DAY_CREDITS  = 60    // anti-misbruik per dag (geldt niet voor 'unlimited')

// Wat een actie kost. Foto's bepalen de kosten: één beeld ≈ 2500 tokens bij een
// kaartpagina (1568 px) tegen ≈ 1200 bij een etiket (1100 px). Een prijs opzoeken
// doet tot vier webzoekopdrachten ($10 per duizend) plus de gelezen pagina's.
// Moet gelijk blijven aan creditCost() in caveau.html.
function creditsFor(kind: string, images: number): number {
  if (kind === 'wijnkaart') return Math.max(2, images * 2)   // wijnkaart + menukaart, per pagina
  if (kind === 'prijs') return 5                             // zoekagent: gemeten ± 44k invoertokens + 3 à 4 zoekopdrachten ≈ $0,14
  return Math.max(1, images)                                  // etiketscan = 1, tekstacties = 1
}
function countImages(messages: unknown): number {
  let n = 0
  for (const m of (messages as { content?: unknown }[]) || []) {
    const c = m?.content
    if (Array.isArray(c)) for (const b of c) if ((b as { type?: string })?.type === 'image') n++
  }
  return n
}

// Alles draait op Sonnet 5. Haiku 4.5 is drie keer goedkoper, maar de acties waar
// dat mag (recept, gerechten bij een wijn) kosten nu al een fractie van een cent —
// en bij de dure acties (etiket en wijnkaart lezen, prijzen inschatten) is Haiku
// juist te zwak. Eén soort verplaatsen kan hieronder, bv. recept: 'claude-haiku-4-5'.
const MODEL_DEFAULT = 'claude-sonnet-5'
const MODEL_BY_KIND: Record<string, string> = {}

// Prijstabel: een opgezochte prijs geldt drie maanden voor iedereen. Zo zoekt de
// agent één keer per wijn en jaargang, en niet bij elke scan opnieuw.
const PRIJS_TTL_MS = 90 * 24 * 3600 * 1000
type Wijn = { name?: unknown; producer?: unknown; vintage?: unknown }
function prijsSleutel(w: Wijn): string {
  const n = (x: unknown) => String(x || '').toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()
  const jaar = Number(w.vintage) || 0
  return `${n(w.producer)}|${n(w.name)}|${jaar || 'nv'}`
}
function tekstUit(data: { content?: { type?: string; text?: string }[] }): string {
  return (data?.content || []).filter((b) => b.type === 'text').map((b) => b.text || '').join('')
}
function jsonUit(txt: string): Record<string, unknown> | null {
  const a = txt.indexOf('{'), z = txt.lastIndexOf('}')
  if (a < 0 || z <= a) return null
  try { return JSON.parse(txt.slice(a, z + 1)) } catch { return null }
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
  try {
    const supa = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const jwt = (req.headers.get('authorization') || '').replace('Bearer ', '')
    const { data: { user }, error: authErr } = await supa.auth.getUser(jwt)
    if (authErr || !user) return json({ error: 'Niet ingelogd' }, 401)

    // profiel ophalen of aanmaken
    let { data: prof } = await supa.from('profiles').select('*').eq('user_id', user.id).maybeSingle()
    if (!prof) {
      const ins = await supa.from('profiles').insert({ user_id: user.id }).select().single()
      prof = ins.data
    }

    const body = await req.json().catch(() => null)
    if (!body) return json({ error: 'Ongeldig verzoek' }, 400)
    const kind = String(body.kind || 'ai').slice(0, 30)

    // Gratis: alleen de prijstabel raadplegen, voor een lijst flessen (nieuwe scan of hele kelder).
    // Geen Anthropic-aanroep, geen credit.
    if (kind === 'prijscache') {
      const lijst: Wijn[] = Array.isArray(body.wines) ? body.wines.slice(0, 100) : []
      if (!lijst.length) return json({ prices: [] }, 200)
      try {
        const keys = [...new Set(lijst.map(prijsSleutel))]
        const { data: rows } = await supa.from('wine_prices').select('*').in('key', keys)
        const vers = (rows || []).filter((r) => r.value != null && Date.now() - new Date(r.updated_at).getTime() < PRIJS_TTL_MS)
        for (const r of vers) await supa.from('wine_prices').update({ hits: (r.hits || 0) + 1 }).eq('key', r.key)
        return json({ prices: vers.map((r) => ({ key: r.key, value: r.value, low: r.low, high: r.high, source: r.source, url: r.url,
          vintage_found: r.vintage_found, confidence: r.confidence, note: r.note, at: r.updated_at })) }, 200)
      } catch (_) { return json({ prices: [] }, 200) }
    }
    if (!Array.isArray(body.messages)) return json({ error: 'Ongeldig verzoek' }, 400)
    const units = creditsFor(kind, countImages(body.messages))

    // zoekagent: alleen voor prijzen, en eerst kijken of de prijstabel hem al kent
    const web = body.web === true && kind === 'prijs'
    const wijn: Wijn | null = web && body.wine && typeof body.wine === 'object' ? body.wine : null
    if (wijn) {
      try {
        const key = prijsSleutel(wijn)
        const { data: row } = await supa.from('wine_prices').select('*').eq('key', key).maybeSingle()
        if (row && row.value != null && Date.now() - new Date(row.updated_at).getTime() < PRIJS_TTL_MS) {
          await supa.from('wine_prices').update({ hits: (row.hits || 0) + 1 }).eq('key', key)
          const uit = { value: row.value, low: row.low, high: row.high, source: row.source, url: row.url,
            vintage_found: row.vintage_found, confidence: row.confidence, note: row.note, cached: true, at: row.updated_at }
          // gratis: geen credit, geen Anthropic-aanroep
          return json({ content: [{ type: 'text', text: JSON.stringify(uit) }], usage: { input_tokens: 0, output_tokens: 0 }, cached: true }, 200)
        }
      } catch (_) { /* tabel nog niet aangemaakt: dan gewoon zoeken */ }
    }

    // tegoed bepalen: credits, niet acties
    const monthStart = new Date(); monthStart.setUTCDate(1); monthStart.setUTCHours(0, 0, 0, 0)
    const dayStart = new Date(); dayStart.setUTCHours(0, 0, 0, 0)
    const sumCredits = async (since: Date) => {
      const { data } = await supa.from('ai_usage').select('cost_units')
        .eq('user_id', user.id).gte('created_at', since.toISOString())
      return (data || []).reduce((n: number, r: { cost_units: number | null }) => n + (r.cost_units || 1), 0)
    }
    const unlimited = prof?.plan === 'unlimited'
    const limit = prof?.plan === 'plus' ? PLUS_CREDITS : FREE_CREDITS + (prof?.bonus_credits || 0)
    if (!unlimited) {
      const [monthUsed, dayUsed] = await Promise.all([sumCredits(monthStart), sumCredits(dayStart)])
      if (dayUsed + units > DAY_CREDITS)
        return json({ error: 'Daglimiet bereikt — probeer het morgen weer', code: 'daglimiet' }, 429)
      if (monthUsed + units > limit)
        return json({
          error: 'AI-tegoed voor deze maand is op',
          code: 'quota', used: monthUsed, limit, needed: units,
        }, 402)
    }

    // verzoek doorsturen — de server bepaalt model en instellingen
    const wantStream = body.stream === true && !web
    const payload: Record<string, unknown> = {
      model: MODEL_BY_KIND[kind] || MODEL_DEFAULT,
      max_tokens: Math.min(Number(body.max_tokens) || 2000, 4000),
      thinking: { type: 'disabled' },
      messages: body.messages,
      ...(wantStream ? { stream: true } : {}),
    }
    // de webzoekfunctie van de API zelf; het model zoekt, leest en antwoordt in één beurt
    if (web) payload.tools = [{ type: 'web_search_20260209', name: 'web_search', max_uses: 3 }]
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': Deno.env.get('CAVEAU_ANTHROPIC_KEY')!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(payload),
    })

    // Streamen: de app vult het etiket in terwijl het antwoord binnenkomt. We laten
    // de gebeurtenissen ongewijzigd door en kijken alleen mee voor het verbruik —
    // dat boeken we pas als er echt tekst gelezen is, zodat een stream die meteen
    // afbreekt geen credit kost.
    if (wantStream) {
      if (!r.ok || !r.body) return json(await r.json().catch(() => ({ error: 'Fout bij de AI' })), r.status)
      const dec = new TextDecoder()
      let inTok = 0, outTok = 0, gotText = false, tail = ''
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
        async flush() {
          if (!gotText) return
          await supa.from('ai_usage').insert({
            user_id: user.id, kind, cost_units: units, tokens_in: inTok, tokens_out: outTok,
          })
        },
      })
      return new Response(r.body.pipeThrough(spy), {
        status: 200,
        headers: { ...CORS, 'content-type': 'text/event-stream', 'cache-control': 'no-cache' },
      })
    }
    const data = await r.json()
    if (r.ok) {
      await supa.from('ai_usage').insert({
        user_id: user.id,
        kind,
        cost_units: units,
        tokens_in: data?.usage?.input_tokens || 0,
        tokens_out: data?.usage?.output_tokens || 0,
      })
      // gevonden prijs in de prijstabel zetten, voor de volgende die deze fles scant
      if (wijn) {
        try {
          const p = jsonUit(tekstUit(data))
          if (p && p.value != null && Number(p.value) > 0) {
            await supa.from('wine_prices').upsert({
              key: prijsSleutel(wijn),
              name: String(wijn.name || '').slice(0, 200), producer: String(wijn.producer || '').slice(0, 200),
              vintage: Number(wijn.vintage) || null,
              value: Number(p.value), low: p.low != null ? Number(p.low) : null, high: p.high != null ? Number(p.high) : null,
              source: String(p.source || '').slice(0, 120), url: String(p.url || '').slice(0, 500),
              vintage_found: Number(p.vintage_found) || null, confidence: String(p.confidence || '').slice(0, 10),
              note: String(p.note || '').slice(0, 300), updated_at: new Date().toISOString(),
            })
          }
        } catch (_) { /* tabel nog niet aangemaakt: de gebruiker krijgt zijn prijs toch */ }
      }
    }
    return json(data, r.status)
  } catch (e) {
    return json({ error: String((e as Error)?.message || e).slice(0, 200) }, 500)
  }
})
