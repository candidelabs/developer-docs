import type { ClientClass } from './types'

const RULES: Array<[RegExp, ClientClass]> = [
  [/claude-?code/i, 'claude-code'],
  [/codex[-/]/i, 'codex'],
  [/GPTBot|OAI-SearchBot|ChatGPT-User/i, 'chatgpt'],
  [/PerplexityBot/i, 'perplexity'],
  [/Googlebot|bingbot|DuckDuckBot|Applebot|Slackbot/i, 'search-bot'],
]

export function classifyClient(
  userAgent: string | null,
  referer: string | null,
): ClientClass {
  const ua = userAgent ?? ''
  for (const [re, cls] of RULES) if (re.test(ua)) return cls
  if (/anthropic|openai/i.test(referer ?? '')) return 'unknown-bot'
  if (/curl|wget|python|node-fetch|go-http|httpx|axios/i.test(ua)) return 'unknown-bot'
  if (ua !== '' && /Mozilla|Chrome|Safari|Firefox|Edg/i.test(ua)) return 'human'
  return 'unknown-bot'
}
