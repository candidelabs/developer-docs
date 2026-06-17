import { describe, it, expect } from 'vitest'
import path from 'node:path'
import { generate } from './generate-doc-manifest.js'

describe('generate-doc-manifest', () => {
  it('lists .md paths and ignores non-md files', () => {
    const dir = path.join(__dirname, '..', 'telemetry', '__fixtures__', 'build')
    const paths = generate(dir)
    expect(paths).toContain('/wallet/guides/getting-started.md')
    expect(paths.some((p) => p.endsWith('.html'))).toBe(false)
  })
})
