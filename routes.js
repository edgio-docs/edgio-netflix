import { nextRoutes } from '@edgio/next'
import { Router } from '@edgio/core/router'

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
    ...CACHE_HTML.caching,
    service_worker_max_age: '1h',
  },
}

export const CACHE_IMAGES = {
  caching: {
    max_age: '1h',
    stale_while_revalidate: '1y',
    ignore_origin_no_cache: [200],
  },
  headers: {
    set_response_headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  },
}

export default new Router()
  .match('/:path*', {
    headers: {
      debug_header: true,
    },
  })
  .use(nextRoutes)
  // Regex to catch multiple hostnames
  // Any deployment will have a L0 permalink
  // Don't allow Google bot to crawl it, read more on:
  // https://docs.layer0.co/guides/cookbook#blocking-search-engine-crawlers
  // .noIndexPermalink()
  // Pre-render the static home page
  // By pre-rendering, once the project is deployed
  // the set of links are visited to warm the cache
  // for future visits (expected to be the first view for real users)
  // More on static prerendering: https://docs.layer0.co/guides/static_prerendering
  // .prerender(getPathsToPrerender)
  .get('/_next/image/:path*', CACHE_IMAGES)
  .get('/_next/data/:path*', CACHE_DATA)
  .get('/', CACHE_HTML)
  .get('/show/:id', CACHE_HTML)
