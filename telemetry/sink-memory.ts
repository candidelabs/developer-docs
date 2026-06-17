import type { EventSink, TelemetryEvent } from './types'

export class InMemorySink implements EventSink {
  events: TelemetryEvent[] = []
  async record(event: TelemetryEvent): Promise<void> {
    this.events.push(event)
  }
  async since(fromIso: string): Promise<TelemetryEvent[]> {
    return this.events.filter((e) => e.ts >= fromIso)
  }
}
