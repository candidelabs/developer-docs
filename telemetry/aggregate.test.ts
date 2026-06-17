import { describe, it, expect } from 'vitest'
import { aggregate, toMarkdown } from './aggregate'
import type { TelemetryEvent } from './types'

const e = (over: Partial<TelemetryEvent>): TelemetryEvent => ({
  ts: '2026-06-16T10:00:00.000Z', kind: 'page', path: '/a.md',
  status: 200, client_class: 'claude-code', ...over,
})

describe('aggregate', () => {
  const events = [
    e({ path: '/a.md', client_class: 'claude-code' }),
    e({ path: '/a.md', client_class: 'claude-code' }),
    e({ path: '/missing.md', status: 404, client_class: 'codex' }),
    e({ kind: 'search', path: '/search', query: 'erc20 gas', result_count: 0, client_class: 'human' }),
  ]
  const r = aggregate(events, '2026-06-15T00:00:00.000Z', '2026-06-22T00:00:00.000Z')

  it('counts total events', () => expect(r.total).toBe(4))
  it('ranks top pages per client', () =>
    expect(r.topPagesByClient['claude-code'][0]).toEqual({ path: '/a.md', count: 2 }))
  it('lists missing docs from 404s', () =>
    expect(r.missingDocs).toContainEqual({ path: '/missing.md', count: 1 }))
  it('lists zero-result searches', () =>
    expect(r.zeroResultSearches).toContainEqual({ query: 'erc20 gas', count: 1 }))
  it('renders markdown without em dashes', () => {
    const md = toMarkdown(r)
    expect(md).toContain('# Docs telemetry')
    expect(md).not.toContain('—')
  })
})
