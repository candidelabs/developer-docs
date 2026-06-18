import type { EventSink } from './types'
import { InMemorySink } from './sink-memory'
import { PostgresSink } from './sink-postgres'

let singleton: EventSink | null = null

export function getSink(): EventSink {
  if (!singleton) {
    // InMemorySink is non-durable and not shared across serverless invocations; rollups will see near-empty data in non-Postgres deploys.
    singleton = process.env.POSTGRES_URL ? new PostgresSink() : new InMemorySink()
  }
  return singleton
}
