import { site, absoluteUrl, clinicId, doctorId, websiteId } from './site.config.js'
import { chrome, serviceCopy } from './i18n.js'
import { pageMeta } from './content/meta.js'
import { getArticleBody, getPages } from './content/index.js'

function postalAddress(lang) {
  const a = site.address[lang]
  return {
    '@type': 'PostalAddress',
    streetAddress: a.street,
    addressLocality: a.locality,
    addressRegion: a.region,
    addressCountry: a.countryCode
  }
}

export function clinicNode(lang) {
  return {
    '@type': ['MedicalClinic', 'LocalBusiness'],
    '@id': clinicId,
    name: site.name[lang],
    alternateName: [site.alternateName, lang === 'ar' ? site.name.en : site.name.ar],
    url: `${site.origin}/`,
    image: absoluteUrl(site.images.logo),
    logo: absoluteUrl(site.images.logo),
    telephone: site.phones.map((p) => p.tel),
    medicalSpecialty: 'Cardiology',
    address: postalAddress(lang),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: site.hours.days,
      opens: site.hours.opens,
      closes: site.hours.closes
    },
    sameAs: site.sameAs,
    employee: { '@id': doctorId }
  }
}

export function doctorNode(lang) {
  return {
    '@type': 'Physician',
    '@id': doctorId,
    name: site.doctor.name[lang],
    medicalSpecialty: 'Cardiology',
    image: absoluteUrl(site.images.doctorPoster),
    url: lang === 'en' ? absoluteUrl('/en/doctor/') : absoluteUrl('/doctor/'),
    telephone: site.phones.map((p) => p.tel),
    worksFor: { '@id': clinicId },
    sameAs: site.sameAs
  }
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    name: site.alternateName,
    alternateName: [site.name.ar, site.name.en],
    url: `${site.origin}/`,
    inLanguage: ['ar', 'en'],
    publisher: { '@id': clinicId }
  }
}

function webPageNode(route, extra = {}) {
  const m = pageMeta(route.page, route.lang)
  const node = {
    '@type': extra.type || 'WebPage',
    '@id': `${absoluteUrl(route.urlPath)}#webpage`,
    url: absoluteUrl(route.urlPath),
    name: m.title,
    description: m.description,
    inLanguage: route.lang === 'ar' ? 'ar-EG' : 'en',
    isPartOf: { '@id': websiteId }
  }
  if (extra.about) node.about = extra.about
  if (extra.breadcrumb) node.breadcrumb = extra.breadcrumb
  if (extra.mainEntity) node.mainEntity = extra.mainEntity
  return node
}

export function breadcrumbList(route, items) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(route.urlPath)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  }
}

function faqEntities(items) {
  return items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a }
  }))
}

export function buildGraph(route, crumbs = []) {
  const lang = route.lang
  const m = pageMeta(route.page, lang)
  const graph = []
  const breadcrumb = crumbs.length ? breadcrumbList(route, crumbs) : null
  const crumbRef = breadcrumb ? { '@id': breadcrumb['@id'] } : undefined

  if (route.page === 'home') {
    graph.push(
      websiteNode(),
      clinicNode(lang),
      doctorNode(lang),
      webPageNode(route, { about: [{ '@id': clinicId }, { '@id': doctorId }] })
    )
  } else if (route.page === 'doctor') {
    graph.push(
      doctorNode(lang),
      clinicNode(lang),
      webPageNode(route, { type: 'ProfilePage', about: { '@id': doctorId }, breadcrumb: crumbRef })
    )
  } else if (route.page === 'location' || route.page === 'contact') {
    graph.push(clinicNode(lang), webPageNode(route, { about: { '@id': clinicId }, breadcrumb: crumbRef }))
  } else if (route.page === 'faq') {
    graph.push(
      webPageNode(route, {
        type: 'FAQPage',
        breadcrumb: crumbRef,
        mainEntity: faqEntities(getPages(lang).faq.items)
      })
    )
  } else if (route.type === 'service') {
    graph.push(
      webPageNode(route, { breadcrumb: crumbRef }),
      {
        '@type': 'Service',
        '@id': `${absoluteUrl(route.urlPath)}#service`,
        name: serviceCopy[lang][route.page].title,
        description: m.description,
        provider: { '@id': clinicId },
        areaServed: { '@type': 'City', name: site.address[lang].locality },
        url: absoluteUrl(route.urlPath)
      },
      clinicNode(lang)
    )
  } else if (route.type === 'article') {
    const article = getArticleBody(route.page, lang)
    graph.push(
      {
        '@type': 'Article',
        '@id': `${absoluteUrl(route.urlPath)}#article`,
        headline: m.title,
        description: m.description,
        datePublished: article.datePublished,
        dateModified: article.datePublished,
        inLanguage: route.lang === 'ar' ? 'ar-EG' : 'en',
        author: { '@type': 'Organization', name: chrome[lang].author, url: `${site.origin}/` },
        publisher: { '@id': clinicId },
        image: absoluteUrl(site.images.og),
        mainEntityOfPage: absoluteUrl(route.urlPath)
      },
      clinicNode(lang),
      webPageNode(route, { breadcrumb: crumbRef })
    )
  } else {
    graph.push(webPageNode(route, { breadcrumb: crumbRef }))
  }

  if (breadcrumb) graph.push(breadcrumb)
  return { '@context': 'https://schema.org', '@graph': graph }
}
