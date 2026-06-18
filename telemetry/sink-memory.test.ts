import { describe, it, expect } from 'vitest'
import { InMemorySink } from './sink-memory'
import type { TelemetryEvent } from './types'

const ev = (over: Partial<TelemetryEvent> = {}): TelemetryEvent => ({
  ts: '2026-06-17T10:00:00.000Z', kind: 'page', path: '/x.md',
  status: 200, client_class: 'claude-code', ...over,
})

describe('InMemorySink', () => {
  it('records events and returns them', async () => {
    const sink = new InMemorySink()
    await sink.record(ev())
    expect(sink.events).toHaveLength(1)
  })

  it('since() filters by ISO timestamp', async () => {
    const sink = new InMemorySink()
    await sink.record(ev({ ts: '2026-06-10T00:00:00.000Z' }))
    await sink.record(ev({ ts: '2026-06-17T00:00:00.000Z' }))
    const recent = await sink.since('2026-06-15T00:00:00.000Z')
    expect(recent).toHaveLength(1)
  })

  it('saveReport() pushes entry onto reports array', async () => {
    const sink = new InMemorySink()
    await sink.saveReport('# Report', '2026-06-10T00:00:00.000Z', '2026-06-17T00:00:00.000Z')
    expect(sink.reports).toHaveLength(1)
    expect(sink.reports[0]).toEqual({
      markdown: '# Report',
      fromIso: '2026-06-10T00:00:00.000Z',
      toIso: '2026-06-17T00:00:00.000Z',
    })
  })

  it('recordMany appends all events', async () => {
    const sink = new InMemorySink()
    await sink.recordMany([ev(), ev({ path: '/b.md' })])
    expect(sink.events).toHaveLength(2)
  })

  it('saveReport() accumulates multiple reports', async () => {
    const sink = new InMemorySink()
    await sink.saveReport('# Week 1', '2026-06-03T00:00:00.000Z', '2026-06-10T00:00:00.000Z')
    await sink.saveReport('# Week 2', '2026-06-10T00:00:00.000Z', '2026-06-17T00:00:00.000Z')
    expect(sink.reports).toHaveLength(2)
  })
})
