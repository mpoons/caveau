// Caveau AI-proxy (Fase 1)
// Plaatsen via: Supabase dashboard → Edge Functions → Deploy new function
//   → naam: ai   → deze code plakken → Deploy
// Vereist secret: Edge Functions → Secrets → CAVEAU_ANTHROPIC_KEY = (aparte Anthropic-sleutel voor de server)
// "Verify JWT" laten aanstaan (standaard): alleen ingelogde Caveau-gebruikers kunnen deze functie aanroepen.

import { createClient } from 'npm:@supabase/supabase-js@2'

const FREE_LIMIT = 15    // gratis AI-acties per maand
const PLUS_LIMIT = 500   // fair-use-plafond voor Caveau Plus (Fase 2)
const DAY_LIMIT  = 60    // anti-misbruik: max acties per dag (geldt niet voor 'unlimited')

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

    // limieten
    const monthStart = new Date(); monthStart.setUTCDate(1); monthStart.setUTCHours(0, 0, 0, 0)
    const dayStart = new Date(); dayStart.setUTCHours(0, 0, 0, 0)
    const { count: monthCount } = await supa.from('ai_usage').select('*', { count: 'exact', head: true })
      .eq('user_id', user.id).gte('created_at', monthStart.toISOString())
    const { count: dayCount } = await supa.from('ai_usage').select('*', { count: 'exact', head: true })
      .eq('user_id', user.id).gte('created_at', dayStart.toISOString())

    const unlimited = prof?.plan === 'unlimited'
    const limit = prof?.plan === 'plus' ? PLUS_LIMIT : FREE_LIMIT + (prof?.bonus_credits || 0)
    if (!unlimited && (dayCount || 0) >= DAY_LIMIT)
      return json({ error: 'Daglimiet bereikt — probeer het morgen weer', code: 'daglimiet' }, 429)
    if (!unlimited && (monthCount || 0) >= limit)
      return json({ error: 'AI-tegoed voor deze maand is op', code: 'quota' }, 402)

    // verzoek valideren en doorsturen — de server bepaalt model en instellingen
    const body = await req.json().catch(() => null)
    if (!body || !Array.isArray(body.messages)) return json({ error: 'Ongeldig verzoek' }, 400)
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
        kind: String(body.kind || 'ai').slice(0, 30),
        tokens_in: data?.usage?.input_tokens || 0,
        tokens_out: data?.usage?.output_tokens || 0,
      })
    }
    return json(data, r.status)
  } catch (e) {
    return json({ error: String((e as Error)?.message || e).slice(0, 200) }, 500)
  }
})
