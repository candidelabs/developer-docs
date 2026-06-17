import { classifyClient } from './classify'
import type { TelemetryEvent } from './types'

interface DrainLog {
  timestamp: number
  path?: string
  statusCode?: number
  userAgent?: string[] | string
  referer?: string
}

function isDocPath(p: string): boolean {
  return p.endsWith('.md') || p === '/llms.txt'
}

export function parseDrainLines(body: string): TelemetryEvent[] {
  const out: TelemetryEvent[] = []
  for (const raw of body.split('\n')) {
    const line = raw.trim()
    if (!line) continue
    let log: DrainLog
    try {
      log = JSON.parse(line)
    } catch {
      continue
    }
    const path = log.path ?? ''
    if (!isDocPath(path)) continue
    const ua = Array.isArray(log.userAgent) ? log.userAgent[0] ?? '' : log.userAgent ?? ''
    out.push({
      ts: new Date(log.timestamp).toISOString(),
      kind: path === '/llms.txt' ? 'llms' : 'page',
      path,
      status: log.statusCode ?? null,
      client_class: classifyClient(ua, log.referer ?? null),
    })
  }
  return out
}
