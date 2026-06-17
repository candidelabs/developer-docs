import { waitUntil } from '@vercel/functions'
import manifest from './telemetry/doc-manifest.generated.json'
import { buildPageEvent } from './telemetry/payload'

const knownPaths = new Set<string>(manifest as string[])

export const config = {
  matcher: ['/((?!api/).*\\.md)', '/llms.txt'],
}

export default function middleware(request: Request): void {
  const event = buildPageEvent({
    url: request.url,
    userAgent: request.headers.get('user-agent'),
    referer: request.headers.get('referer'),
    knownPaths,
    ts: new Date().toISOString(),
  })
  waitUntil(
    fetch(new URL('/api/beacon', request.url), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(event),
    }).catch(() => {}),
  )
}
