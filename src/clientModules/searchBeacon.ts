export function onRouteDidUpdate({ location }: { location: Location }): void {
  if (!/\/search(?:\/|$)/.test(location.pathname)) return
  const query = new URLSearchParams(location.search).get('q')
  if (!query) return
  // Let the plugin render results before counting.
  setTimeout(() => {
    const nodes = document.querySelectorAll(
      'main article a[href^="/"], .search-result-match',
    )
    const payload = JSON.stringify({
      kind: 'search',
      path: location.pathname,
      client_class: 'human',
      query,
      result_count: nodes.length,
      ts: new Date().toISOString(),
    })
    navigator.sendBeacon('/api/beacon', new Blob([payload], { type: 'application/json' }))
  }, 800)
}
