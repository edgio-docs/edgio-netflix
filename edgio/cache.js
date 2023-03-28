export const CACHE_HTML = {
  caching: {
    max_age: '1d',
    stale_while_revalidate: '1y',
    ignore_origin_no_cache: [200],
    bypass_client_cache: true,
  },
}

export const CACHE_DATA = {
  caching: {
    max_age: '1d',
    stale_while_revalidate: '1y',
    ignore_origin_no_cache: [200],
    bypass_client_cache: true,
    service_worker_max_age: '1d',
  },
}
