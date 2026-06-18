import { describe, it, expect } from 'vitest'
import { isAuthorizedBeacon } from './auth'

describe('isAuthorizedBeacon', () => {
  it('returns true when configuredSecret is null (unconfigured local dev)', () => {
    expect(
      isAuthorizedBeacon({
        configuredSecret: null,
        secretHeader: null,
        originHeader: null,
        refererHeader: null,
        host: 'localhost:3000',
      }),
    ).toBe(true)
  })

  it('returns true when configuredSecret is empty string (unconfigured)', () => {
    expect(
      isAuthorizedBeacon({
        configuredSecret: '',
        secretHeader: null,
        originHeader: null,
        refererHeader: null,
        host: 'localhost:3000',
      }),
    ).toBe(true)
  })

  it('returns true when secret header matches configured secret (server-side middleware)', () => {
    expect(
      isAuthorizedBeacon({
        configuredSecret: 'super-secret',
        secretHeader: 'super-secret',
        originHeader: null,
        refererHeader: null,
        host: 'docs.candide.dev',
      }),
    ).toBe(true)
  })

  it('returns false when secret header does not match configured secret', () => {
    expect(
      isAuthorizedBeacon({
        configuredSecret: 'super-secret',
        secretHeader: 'wrong-secret',
        originHeader: null,
        refererHeader: null,
        host: 'docs.candide.dev',
      }),
    ).toBe(false)
  })

  it('returns true when origin host matches request host (same-origin browser beacon)', () => {
    expect(
      isAuthorizedBeacon({
        configuredSecret: 'super-secret',
        secretHeader: null,
        originHeader: 'https://docs.candide.dev',
        refererHeader: null,
        host: 'docs.candide.dev',
      }),
    ).toBe(true)
  })

  it('returns false when origin host does not match request host (cross-origin)', () => {
    expect(
      isAuthorizedBeacon({
        configuredSecret: 'super-secret',
        secretHeader: null,
        originHeader: 'https://evil.example.com',
        refererHeader: null,
        host: 'docs.candide.dev',
      }),
    ).toBe(false)
  })

  it('falls back to referer host when origin is absent and referer host matches', () => {
    expect(
      isAuthorizedBeacon({
        configuredSecret: 'super-secret',
        secretHeader: null,
        originHeader: null,
        refererHeader: 'https://docs.candide.dev/wallet/guides/',
        host: 'docs.candide.dev',
      }),
    ).toBe(true)
  })

  it('returns false when referer host does not match and no secret provided', () => {
    expect(
      isAuthorizedBeacon({
        configuredSecret: 'super-secret',
        secretHeader: null,
        originHeader: null,
        refererHeader: 'https://evil.example.com/page',
        host: 'docs.candide.dev',
      }),
    ).toBe(false)
  })

  it('returns false when no secret, no origin, and no referer are provided', () => {
    expect(
      isAuthorizedBeacon({
        configuredSecret: 'super-secret',
        secretHeader: null,
        originHeader: null,
        refererHeader: null,
        host: 'docs.candide.dev',
      }),
    ).toBe(false)
  })

  it('returns false when origin is present but host is null', () => {
    expect(
      isAuthorizedBeacon({
        configuredSecret: 'super-secret',
        secretHeader: null,
        originHeader: 'https://docs.candide.dev',
        refererHeader: null,
        host: null,
      }),
    ).toBe(false)
  })
})
