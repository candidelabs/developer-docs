export type ClientClass =
  | 'claude-code' | 'codex' | 'chatgpt' | 'perplexity'
  | 'search-bot' | 'human' | 'unknown-bot'

export type EventKind = 'page' | 'llms' | 'search'

export interface TelemetryEvent {
  ts: string
  kind: EventKind
  path: string
  status: number | null
  client_class: ClientClass
  query?: string | null
  result_count?: number | null
}

export interface EventSink {
  record(event: TelemetryEvent): Promise<void>
  since(fromIso: string): Promise<TelemetryEvent[]>
}
