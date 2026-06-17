import type { EventSink } from './types'
import { InMemorySink } from './sink-memory'

let singleton: EventSink | null = null

// Replaced with PostgresSink wiring in Task 6.
export function getSink(): EventSink {
  if (!singleton) singleton = new InMemorySink()
  return singleton
}
