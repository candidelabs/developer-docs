import { sql } from '@vercel/postgres'
import type { EventSink, TelemetryEvent } from './types'

export class PostgresSink implements EventSink {
  async record(e: TelemetryEvent): Promise<void> {
    await sql`
      insert into telemetry_events (ts, kind, path, status, client_class, query, result_count)
      values (${e.ts}, ${e.kind}, ${e.path}, ${e.status}, ${e.client_class},
              ${e.query ?? null}, ${e.result_count ?? null})
    `
  }

  async since(fromIso: string): Promise<TelemetryEvent[]> {
    const { rows } = await sql`
      select ts, kind, path, status, client_class, query, result_count
      from telemetry_events where ts >= ${fromIso} order by ts asc
    `
    return rows.map((r) => ({
      ts: new Date(r.ts as string).toISOString(),
      kind: r.kind as TelemetryEvent['kind'],
      path: r.path as string,
      status: (r.status as number | null) ?? null,
      client_class: r.client_class as TelemetryEvent['client_class'],
      query: (r.query as string | null) ?? null,
      result_count: (r.result_count as number | null) ?? null,
    }))
  }

  async saveReport(markdown: string, fromIso: string, toIso: string): Promise<void> {
    await sql`
      insert into telemetry_reports (from_ts, to_ts, markdown)
      values (${fromIso}, ${toIso}, ${markdown})
    `
  }
}
