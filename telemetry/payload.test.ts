import { describe, it, expect } from 'vitest'
import { buildPageEvent } from './payload'

const known = new Set<string>(['/wallet/guides/getting-started.md'])

describe('buildPageEvent', () => {
  it('marks a known doc path as status 200', () => {
    const e = buildPageEvent({
      url: 'https://docs.candide.dev/wallet/guides/getting-started.md',
      userAgent: 'Claude-Code/1.0', referer: null, knownPaths: known,
      ts: '2026-06-17T10:00:00.000Z',
    })
    expect(e).toMatchObject({ kind: 'page', status: 200, client_class: 'claude-code' })
  })

  it('marks an unknown .md path as status 404 (expected-but-missing)', () => {
    const e = buildPageEvent({
      url: 'https://docs.candide.dev/wallet/guides/does-not-exist.md',
      userAgent: 'GPTBot/1.0', referer: null, knownPaths: known,
      ts: '2026-06-17T10:00:00.000Z',
    })
    expect(e.status).toBe(404)
    expect(e.client_class).toBe('chatgpt')
  })

  it('classifies /llms.txt as kind llms', () => {
    const e = buildPageEvent({
      url: 'https://docs.candide.dev/llms.txt', userAgent: 'curl/8', referer: null,
      knownPaths: known, ts: '2026-06-17T10:00:00.000Z',
    })
    expect(e.kind).toBe('llms')
  })
})
