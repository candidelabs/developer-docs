import type { EventSink, TelemetryEvent, ClientClass, EventKind } from './types'

const KINDS: EventKind[] = ['page', 'llms', 'search']
const CLASSES: ClientClass[] = [
  'claude-code', 'codex', 'chatgpt', 'perplexity', 'search-bot', 'human', 'unknown-bot',
]

export function validateEvent(body: unknown): TelemetryEvent {
  if (!body || typeof body !== 'object') throw new Error('invalid body')
  const e = body as Record<string, unknown>
  if (!KINDS.includes(e.kind as EventKind)) throw new Error('invalid kind')
  if (typeof e.path !== 'string') throw new Error('invalid path')
  if (!CLASSES.includes(e.client_class as ClientClass)) throw new Error('invalid client_class')

  const ts =
    typeof e.ts === 'string' && !Number.isNaN(Date.parse(e.ts))
      ? e.ts
      : new Date().toISOString()

  return {
    ts,
    kind: e.kind as EventKind,
    path: e.path,
    status: Number.isInteger(e.status) ? (e.status as number) : null,
    client_class: e.client_class as ClientClass,
    query: typeof e.query === 'string' ? e.query : null,
    result_count: Number.isInteger(e.result_count) ? (e.result_count as number) : null,
  }
}

export async function ingest(body: unknown, sink: EventSink): Promise<void> {
  await sink.record(validateEvent(body))
}
