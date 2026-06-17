import { describe, it, expect } from 'vitest'
import { parseDrainLines } from './log-drain'

describe('parseDrainLines', () => {
  it('maps a .md request line to a page event with real status', () => {
    const line = JSON.stringify({
      timestamp: 1750000000000,
      path: '/wallet/guides/getting-started.md',
      statusCode: 404,
      userAgent: ['GPTBot/1.0'],
      referer: '',
    })
    const events = parseDrainLines(line)
    expect(events[0]).toMatchObject({ kind: 'page', status: 404, client_class: 'chatgpt' })
  })

  it('ignores non-doc paths', () => {
    const line = JSON.stringify({ timestamp: 1, path: '/img/logo.png', statusCode: 200, userAgent: [''] })
    expect(parseDrainLines(line)).toHaveLength(0)
  })
})
