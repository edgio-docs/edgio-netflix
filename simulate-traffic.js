/*
This simple puppeteer script simulates real mobile traffic to populate RUM and traffic graphs in Layer0 console.
*/
let [_node, _file, base] = process.argv

if (!base) {
  console.log('Usage: node ./simulate-traffic <url>')
  console.log(
    'Example: node ./simulate-traffic https://layer0-docs-layer0-netflix-default.layer0-limelight.link'
  )
  process.exit(0)
}

base = base.replace(/\/$/, '') // trim trailing slash if present

const puppeteer = require('puppeteer')
const device = puppeteer.devices['Galaxy S9+']

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
  })
  const page = await browser.newPage()
  page.emulate(device)

  const ssr = await browser.newPage()
  ssr.emulate(device)

  console.log('Loading homepage...')
  await page.goto(base, { waitUntil: 'networkidle0' })
  console.log('Finding links...')

  const links = (
    await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a')).map((el) => el.getAttribute('href'))
    })
  ).filter((url) => url != null && url !== '/')

  console.log(`Found ${links.length} URLs to crawl`)

  if (links.length === 0) {
    const html = await page.evaluate(() => document.documentElement.outerHTML)
    console.log(html)
    browser.close()
    process.exit(1)
  }

  while (true) {
    for (let link of links) {
      console.log(link)

      try {
        await page.evaluate(async (link) => {
          const el = document.querySelector(`a[href="${link}"]`)
          if (el) el.click()
          document.querySelector('h1').click()
        }, link)

        await page.waitForNavigation({ waitUntil: 'networkidle0' })

        // Also hit the SSR URL
        await ssr.goto(`${base}${link}`, { waitUntil: 'networkidle0' })

        // ensure FID is collected
        await ssr.evaluate(() => document.querySelector('h1').click())
        await page.goto(base, { waitUntil: 'networkidle0' })
      } catch (e) {
        console.error(`Error loading ${link}`, e)
      }
    }
  }
}

main()
