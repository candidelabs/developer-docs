import { classifyClient } from './classify'
import type { TelemetryEvent } from './types'

export function buildPageEvent(args: {
  url: string
  userAgent: string | null
  referer: string | null
  knownPaths: Set<string>
  ts: string
}): TelemetryEvent {
  const pathname = new URL(args.url).pathname
  const kind = pathname === '/llms.txt' ? 'llms' : 'page'
  return {
    ts: args.ts,
    kind,
    path: pathname,
    status: kind === 'llms' || args.knownPaths.has(pathname) ? 200 : 404,
    client_class: classifyClient(args.userAgent, args.referer),
  }
}
