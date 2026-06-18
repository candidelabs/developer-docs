import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isAuthorizedDrain } from '../telemetry/auth'
import { parseDrainLines } from '../telemetry/log-drain'
import { getSink } from '../telemetry/sink'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  // Vercel sends a verification header on drain setup; echo it back and return
  // 200 even if the secret check would otherwise fail, because the challenge
  // handshake may arrive before the secret is configured.
  const verify = req.headers['x-vercel-verify']
  if (verify) {
    res.setHeader('x-vercel-verify', String(verify))
    res.status(200).end()
    return
  }

  // This endpoint is server-to-server only: require the secret when configured.
  const configuredSecret = process.env.TELEMETRY_BEACON_SECRET ?? null
  if (!isAuthorizedDrain(configuredSecret, req.headers['x-telemetry-secret'])) {
    res.status(401).end()
    return
  }

  const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body)
  const sink = getSink()
  for (const event of parseDrainLines(body)) await sink.record(event)
  res.status(200).end()
}
