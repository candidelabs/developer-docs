import type { EventSink, TelemetryEvent } from './types'

export interface StoredReport {
  markdown: string
  fromIso: string
  toIso: string
}

export class InMemorySink implements EventSink {
  events: TelemetryEvent[] = []
  reports: StoredReport[] = []

  async record(event: TelemetryEvent): Promise<void> {
    this.events.push(event)
  }

  async since(fromIso: string): Promise<TelemetryEvent[]> {
    return this.events.filter((e) => e.ts >= fromIso)
  }

  async saveReport(markdown: string, fromIso: string, toIso: string): Promise<void> {
    this.reports.push({ markdown, fromIso, toIso })
  }
}
