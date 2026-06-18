export interface AuthBeaconArgs {
  configuredSecret: string | null
  secretHeader: string | null
  originHeader: string | null
  refererHeader: string | null
  host: string | null
}

/**
 * Returns true if the incoming beacon request is authorized.
 *
 * Rules:
 * - If configuredSecret is null or empty (unconfigured dev/preview), allow all.
 * - Else allow if the x-telemetry-secret header matches the configured secret (server-side middleware path).
 * - Else allow if the request appears same-origin: the host extracted from origin (or referer as fallback) equals the request host.
 * - Otherwise deny.
 */
export function isAuthorizedBeacon(args: AuthBeaconArgs): boolean {
  const { configuredSecret, secretHeader, originHeader, refererHeader, host } = args

  // Not configured: allow everything (local dev, unconfigured preview deploys).
  if (!configuredSecret) return true

  // Server-side middleware path: secret header matches.
  if (secretHeader === configuredSecret) return true

  // Same-origin check: browser-fired beacons include an origin or referer header.
  if (!host) return false

  const candidateUrl = originHeader ?? refererHeader
  if (!candidateUrl) return false

  try {
    const parsed = new URL(candidateUrl)
    return parsed.host === host
  } catch {
    return false
  }
}

/**
 * Returns true if the log drain request is authorized.
 *
 * Normalizes the x-telemetry-secret header which Node may deliver as a string or array,
 * then compares against the configured secret.
 *
 * Rules:
 * - If configuredSecret is null or empty (unconfigured dev/preview), allow all.
 * - Else allow if the header (as a string) matches the configured secret.
 * - Otherwise deny.
 */
export function isAuthorizedDrain(
  configuredSecret: string | null,
  secretHeader: string | string[] | undefined,
): boolean {
  if (!configuredSecret) return true
  const value = Array.isArray(secretHeader) ? secretHeader[0] : secretHeader
  return value === configuredSecret
}
