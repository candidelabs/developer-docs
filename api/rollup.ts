import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'
import { getSink } from '../telemetry/sink'
import { aggregate, toMarkdown } from '../telemetry/aggregate'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    res.status(401).end()
    return
  }
  const to = new Date()
  const from = new Date(to.getTime() - 7 * 24 * 60 * 60 * 1000)
  const events = await getSink().since(from.toISOString())
  const report = aggregate(events, from.toISOString(), to.toISOString())
  const markdown = toMarkdown(report)
  await sql`
    insert into telemetry_reports (from_ts, to_ts, markdown)
    values (${from.toISOString()}, ${to.toISOString()}, ${markdown})
  `
  res.setHeader('Content-Type', 'text/markdown')
  res.status(200).send(markdown)
}
