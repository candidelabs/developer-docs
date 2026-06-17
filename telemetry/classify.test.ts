import { describe, it, expect } from 'vitest'
import { classifyClient } from './classify'

describe('classifyClient', () => {
  const cases: Array<[string, string | null, ReturnType<typeof classifyClient>]> = [
    ['Claude-Code/1.0', null, 'claude-code'],
    ['codex-cli/0.3', null, 'codex'],
    ['Mozilla/5.0 (compatible; GPTBot/1.2)', null, 'chatgpt'],
    ['ChatGPT-User/1.0', null, 'chatgpt'],
    ['PerplexityBot/1.0', null, 'perplexity'],
    ['Googlebot/2.1', null, 'search-bot'],
    ['Mozilla/5.0 (Macintosh) Chrome/120 Safari/537', null, 'human'],
    ['python-requests/2.31', null, 'unknown-bot'],
    ['', null, 'unknown-bot'],
  ]
  it.each(cases)('classifies UA %s', (ua, ref, expected) => {
    expect(classifyClient(ua, ref)).toBe(expected)
  })

  it('falls back to unknown-bot when referer points at an LLM host', () => {
    expect(classifyClient('curl/8.0', 'https://chat.openai.com/')).toBe('unknown-bot')
  })
})
