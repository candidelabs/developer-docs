import type { VercelRequest, VercelResponse } from '@vercel/node'
import { ingest } from '../telemetry/ingest'
import { getSink } from '../telemetry/sink'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).end()
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
