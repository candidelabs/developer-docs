import type { TelemetryEvent } from './types'

export interface RollupReport {
  from: string
  to: string
  total: number
  topPagesByClient: Record<string, Array<{ path: string; count: number }>>
  missingDocs: Array<{ path: string; count: number }>
  zeroResultSearches: Array<{ query: string; count: number }>
}

function rank(counts: Map<string, number>, n: number) {
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key, count]) => ({ key, count }))
}

export function aggregate(
  events: TelemetryEvent[],
  from: string,
  to: string,
  n = 20,
): RollupReport {
  const perClient = new Map<string, Map<string, number>>()
  const missing = new Map<string, number>()
  const zeroSearch = new Map<string, number>()

  for (const ev of events) {
    if (ev.kind === 'search') {
      if (ev.query && (ev.result_count ?? 0) === 0) {
        zeroSearch.set(ev.query, (zeroSearch.get(ev.query) ?? 0) + 1)
      }
      continue
    }
    const cm = perClient.get(ev.client_class) ?? new Map<string, number>()
    cm.set(ev.path, (cm.get(ev.path) ?? 0) + 1)
    perClient.set(ev.client_class, cm)
    if (ev.status === 404) missing.set(ev.path, (missing.get(ev.path) ?? 0) + 1)
  }

  const topPagesByClient: RollupReport['topPagesByClient'] = {}
  for (const [client, cm] of perClient) {
    topPagesByClient[client] = rank(cm, n).map((x) => ({ path: x.key, count: x.count }))
  }

  return {
    from,
    to,
    total: events.length,
    topPagesByClient,
    missingDocs: rank(missing, n).map((x) => ({ path: x.key, count: x.count })),
    zeroResultSearches: rank(zeroSearch, n).map((x) => ({ query: x.key, count: x.count })),
  }
}

export function toMarkdown(r: RollupReport): string {
  const lines: string[] = []
  lines.push(`# Docs telemetry: ${r.from.slice(0, 10)} to ${r.to.slice(0, 10)}`)
  lines.push('')
  lines.push(`Total events: ${r.total}. Agent numbers are a floor, not an exact count.`)
  lines.push('')
  lines.push('## Expected-but-missing docs (agents requested, do not exist)')
  for (const m of r.missingDocs) lines.push(`- ${m.path}: ${m.count}`)
  if (r.missingDocs.length === 0) lines.push('- none')
  lines.push('')
  lines.push('## Zero-result searches')
  for (const s of r.zeroResultSearches) lines.push(`- "${s.query}": ${s.count}`)
  if (r.zeroResultSearches.length === 0) lines.push('- none')
  lines.push('')
  lines.push('## Top pages by client')
  for (const [client, pages] of Object.entries(r.topPagesByClient)) {
    lines.push(`### ${client}`)
    for (const p of pages) lines.push(`- ${p.path}: ${p.count}`)
  }
  return lines.join('\n')
}
