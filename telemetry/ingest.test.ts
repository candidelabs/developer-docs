import { describe, it, expect } from 'vitest'
import { ingest } from './ingest'
import { InMemorySink } from './sink-memory'

describe('ingest', () => {
  it('records a valid event', async () => {
    const sink = new InMemorySink()
    await ingest(
      { ts: '2026-06-17T10:00:00.000Z', kind: 'page', path: '/a.md', status: 200, client_class: 'codex' },
      sink,
    )
    expect(sink.events[0].path).toBe('/a.md')
  })

  it('rejects an invalid kind', async () => {
    const sink = new InMemorySink()
    await expect(ingest({ kind: 'nope', path: '/a', client_class: 'human' }, sink)).rejects.toThrow()
  })

  it('rejects a missing path', async () => {
    const sink = new InMemorySink()
    await expect(ingest({ kind: 'page', client_class: 'human' }, sink)).rejects.toThrow()
  })

  it('defaults optional fields to null', async () => {
    const sink = new InMemorySink()
    await ingest({ kind: 'search', path: '/search', client_class: 'human', query: 'gas' }, sink)
    expect(sink.events[0].result_count).toBeNull()
    expect(sink.events[0].status).toBeNull()
  })
})
