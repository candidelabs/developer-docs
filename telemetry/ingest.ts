import type { EventSink, TelemetryEvent, ClientClass, EventKind } from './types'

const KINDS: EventKind[] = ['page', 'llms', 'search']
const CLASSES: ClientClass[] = [
  'claude-code', 'codex', 'chatgpt', 'perplexity', 'search-bot', 'human', 'unknown-bot',
]

export async function ingest(body: unknown, sink: EventSink): Promise<void> {
  if (!body || typeof body !== 'object') throw new Error('invalid body')
  const e = body as Record<string, unknown>
  if (!KINDS.includes(e.kind as EventKind)) throw new Error('invalid kind')
  if (typeof e.path !== 'string') throw new Error('invalid path')
  if (!CLASSES.includes(e.client_class as ClientClass)) throw new Error('invalid client_class')

  const event: TelemetryEvent = {
    ts: typeof e.ts === 'string' ? e.ts : new Date().toISOString(),
    kind: e.kind as EventKind,
    path: e.path,
    status: typeof e.status === 'number' ? e.status : null,
    client_class: e.client_class as ClientClass,
    query: typeof e.query === 'string' ? e.query : null,
    result_count: typeof e.result_count === 'number' ? e.result_count : null,
  }
  await sink.record(event)
}
