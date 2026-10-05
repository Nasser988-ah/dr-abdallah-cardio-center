import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { site, absoluteUrl } from './site.config.js'
import { routes, notFoundRoute, indexableRoutes } from './routes.js'
import { renderHtml } from './render-page.js'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function writeHtml(file, html) {
  const full = resolve(rootDir, file)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, html, 'utf8')
}

function sitemapXml() {
  const urls = indexableRoutes()
  const body = urls
    .map((route) => {
      const loc = absoluteUrl(route.urlPath)
      const ar = absoluteUrl(route.lang === 'ar' ? route.urlPath : route.altPath)
      const en = absoluteUrl(route.lang === 'en' ? route.urlPath : route.altPath)
      return `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="${ar}" />
    <xhtml:link rel="alternate" hreflang="en" href="${en}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${ar}" />
  </url>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`
}

function robotsTxt() {
  return `User-agent: *
Allow: /

Disallow: /api/private/

Sitemap: ${site.origin}/sitemap.xml
`
}

export function generateSite() {
  const all = [...routes, notFoundRoute]
  const input = {}
  for (const route of all) {
    writeHtml(route.file, renderHtml(route))
    input[route.id] = resolve(rootDir, route.file)
  }
  mkdirSync(resolve(rootDir, 'public'), { recursive: true })
  writeFileSync(resolve(rootDir, 'public/sitemap.xml'), sitemapXml(), 'utf8')
  writeFileSync(resolve(rootDir, 'public/robots.txt'), robotsTxt(), 'utf8')
  return input
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  generateSite()
  console.log(`Generated ${routes.length + 1} HTML files, sitemap, and robots.txt`)
}
