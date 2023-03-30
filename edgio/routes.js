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
    service_worker_max_age: '1d',
  },
}

export default new Router()
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
  // Serve the compiled service worker with Layer0 prefetcher working
  .match('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js')
  })
  .match('/_next/data/:path*', CACHE_DATA)
  .match('/tvmaze/:path*', {
    ...CACHE_DATA,
    origin: {
      set_origin: 'api',
    },
    url: {
      url_rewrite: [
        {
          source: '/tvmaze/:path*:slash(\\/?)?:qs(\\?.*)?',
          syntax: 'path-to-regexp',
          destination: '/:path*:slash:qs',
        },
      ],
    },
  })
  .match('/', CACHE_HTML)
  .match('/show/:id', CACHE_HTML)
  .match('/:path*', {
    headers: {
      debug_header: true,
    },
    // caching: {
    //   cache_key_rewrite: {
    //     source: '(.*)',
    //     destination: '%{usrvar_edgio_cache_version}/$1',
    //   },
    // },
  })
