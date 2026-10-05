import { site, absoluteUrl } from './site.config.js'
import { pageMeta } from './content/meta.js'
import { header, footer, mobileBar, renderMain, mainClass, crumbItems, esc } from './templates.js'
import { chrome } from './i18n.js'
import { buildGraph } from './schema.js'

export function renderHtml(route) {
  const lang = route.lang
  const meta = pageMeta(route.page, lang)
  const canonical = route.indexable === false ? '' : absoluteUrl(route.urlPath)
  const arUrl = absoluteUrl(route.defaultPath === '/404.html' ? '/' : route.lang === 'ar' ? route.urlPath : route.altPath)
  const enUrl = absoluteUrl(route.defaultPath === '/404.html' ? '/en/' : route.lang === 'en' ? route.urlPath : route.altPath)
  const title = meta.title
  const description = meta.description
  const ogType = route.type === 'article' ? 'article' : route.page === 'doctor' ? 'profile' : 'website'
  const robots = route.indexable === false ? 'noindex, follow' : 'index, follow'
  const graph = JSON.stringify(buildGraph(route, crumbItems(route)))
  const skip = chrome[lang].skip
  const ogLocaleAlt = lang === 'ar' ? 'en_US' : 'ar_EG'

  const hreflang =
    route.indexable === false
      ? ''
      : `<link rel="alternate" hreflang="ar" href="${esc(arUrl)}" />
    <link rel="alternate" hreflang="en" href="${esc(enUrl)}" />
    <link rel="alternate" hreflang="x-default" href="${esc(arUrl)}" />`

  const canonicalTag = canonical ? `<link rel="canonical" href="${esc(canonical)}" />` : ''
  const ogUrl = canonical ? `<meta property="og:url" content="${esc(canonical)}" />` : ''

  return `<!doctype html>
<html lang="${route.lang}" dir="${route.dir}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="robots" content="${robots}" />
    ${canonicalTag}
    ${hreflang}
    <meta property="og:site_name" content="${esc(site.alternateName)}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:type" content="${ogType}" />
    ${ogUrl}
    <meta property="og:image" content="${esc(absoluteUrl(site.images.og))}" />
    <meta property="og:image:width" content="${site.ogSize.width}" />
    <meta property="og:image:height" content="${site.ogSize.height}" />
    <meta property="og:image:alt" content="${esc(site.name[lang])}" />
    <meta property="og:locale" content="${route.locale}" />
    <meta property="og:locale:alternate" content="${ogLocaleAlt}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${esc(absoluteUrl(site.images.og))}" />
    <link rel="icon" href="${site.images.logo}" type="image/jpeg" />
    <link rel="apple-touch-icon" href="${site.images.logo}" />
    <link rel="stylesheet" href="/src/style.css" />
    <script type="application/ld+json">${graph}</script>
  </head>
  <body data-page="${esc(route.page)}" data-lang="${lang}">
    <a class="skip-link" href="#content">${esc(skip)}</a>
    ${header(route)}
    <main id="content" class="${mainClass(route)}">${renderMain(route)}</main>
    ${footer(route)}
    ${mobileBar(route)}
    <script type="module" src="/src/client.js"></script>
  </body>
</html>
`
}
