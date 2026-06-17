import type { VercelRequest, VercelResponse } from '@vercel/node'
import { parseDrainLines } from '../telemetry/log-drain'
import { getSink } from '../telemetry/sink'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }
  // Vercel sends a verification header on drain setup; echo it back.
  const verify = req.headers['x-vercel-verify']
  if (verify) res.setHeader('x-vercel-verify', String(verify))

  const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body)
  const sink = getSink()
  for (const event of parseDrainLines(body)) await sink.record(event)
  res.status(200).end()
}
