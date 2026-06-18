import type { VercelRequest, VercelResponse } from '@vercel/node'
import { ingest } from '../telemetry/ingest'
import { getSink } from '../telemetry/sink'
import { isAuthorizedBeacon } from '../telemetry/auth'

// Note: collected data is untrusted-by-design (client-supplied counts); treat
// aggregated numbers as lower-confidence signals rather than exact figures.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const authorized = isAuthorizedBeacon({
    configuredSecret: process.env.TELEMETRY_BEACON_SECRET ?? null,
    secretHeader: req.headers['x-telemetry-secret'] as string | null ?? null,
    originHeader: req.headers['origin'] as string | null ?? null,
    refererHeader: req.headers['referer'] as string | null ?? null,
    host: req.headers['host'] as string | null ?? null,
  })
  if (!authorized) {
    res.status(401).end()
    return
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    await ingest(body, getSink())
    res.status(204).end()
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
}
