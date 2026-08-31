// Caveau AI-proxy (Fase 1 + Fase 2: gewogen credits)
// Plaatsen via: Supabase dashboard → Edge Functions → Deploy new function
//   → naam: ai   → deze code plakken → Deploy
// Vereist secret: Edge Functions → Secrets → CAVEAU_ANTHROPIC_KEY = (aparte Anthropic-sleutel voor de server)
// "Verify JWT" laten aanstaan (standaard): alleen ingelogde Caveau-gebruikers kunnen deze functie aanroepen.

import { createClient } from 'npm:@supabase/supabase-js@2'

// Tegoed in CREDITS, niet in acties — een kaartscan kost nu eenmaal veel meer dan een etiketscan.
const FREE_CREDITS = 20    // gratis credits per maand
const PLUS_CREDITS = 300   // Caveau Plus (€2,99/mnd)
const DAY_CREDITS  = 60    // anti-misbruik per dag (geldt niet voor 'unlimited')

// Wat een actie kost. Foto's bepalen de kosten: één beeld ≈ 2500 tokens bij een
// kaartpagina (1568 px) tegen ≈ 1200 bij een etiket (1100 px).
function creditsFor(kind: string, images: number): number {
  if (kind === 'wijnkaart') return Math.max(2, images * 2)   // wijnkaart + menukaart, per pagina
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
    if (!body || !Array.isArray(body.messages)) return json({ error: 'Ongeldig verzoek' }, 400)
    const kind = String(body.kind || 'ai').slice(0, 30)
    const units = creditsFor(kind, countImages(body.messages))

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
    const payload = {
      model: 'claude-sonnet-5',
      max_tokens: Math.min(Number(body.max_tokens) || 2000, 4000),
      thinking: { type: 'disabled' },
      messages: body.messages,
    }
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': Deno.env.get('CAVEAU_ANTHROPIC_KEY')!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(payload),
    })
    const data = await r.json()
    if (r.ok) {
      await supa.from('ai_usage').insert({
        user_id: user.id,
        kind,
        cost_units: units,
        tokens_in: data?.usage?.input_tokens || 0,
        tokens_out: data?.usage?.output_tokens || 0,
      })
    }
    return json(data, r.status)
  } catch (e) {
    return json({ error: String((e as Error)?.message || e).slice(0, 200) }, 500)
  }
})
