import { site, whatsappUrl } from './site.config.js'
import { icon } from './icons.js'
import { chrome, serviceCopy, guideCopy } from './i18n.js'
import { prefix, servicePages, guidePages, routes } from './routes.js'
import { getPages, getServiceBody, getArticleBody } from './content/index.js'

export function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
}

function pfx(lang) {
  return prefix(lang)
}

function t(lang) {
  return chrome[lang]
}

function button(label, href, type = 'dark') {
  return `<a class="button button-${type}" href="${esc(href)}">${esc(label)} ${icon('arrow')}</a>`
}

function poster(lang, eager = false) {
  const alt =
    lang === 'ar'
      ? 'ملصق تعريفي لمركز القلب التخصصي يظهر د. عبدالله أحمد عبدالله'
      : 'Promotional poster for the Specialized Heart Center featuring Dr. Abdallah Ahmed Abdallah'
  const loading = eager ? 'eager' : 'lazy'
  const fetchpriority = eager ? ' fetchpriority="high"' : ''
  return `<div class="doctor-photo"><img src="${site.images.doctorPoster}" alt="${esc(alt)}" width="${site.posterSize.width}" height="${site.posterSize.height}" loading="${loading}" decoding="async"${fetchpriority} /></div>`
}

function serviceCard(item, lang) {
  const copy = serviceCopy[lang][item.page]
  const href = `${pfx(lang)}/services/${item.slug}/`
  return `<article class="service-card"><div class="service-top"><span>${item.number}</span><div class="service-icon">${icon(item.icon)}</div></div><h3>${esc(copy.title)}</h3><p>${esc(copy.short)}</p><a href="${href}" aria-label="${lang === 'ar' ? 'تفاصيل' : 'Details'}: ${esc(copy.title)}">${icon('arrow')}</a></article>`
}

export function header(route) {
  const lang = route.lang
  const ui = t(lang)
  const base = pfx(lang)
  const servicesMenu = servicePages
    .map((item) => {
      const copy = serviceCopy[lang][item.page]
      return `<a href="${base}/services/${item.slug}/"><span>${item.number}</span>${esc(copy.title)}</a>`
    })
    .join('')
  const homeHref = lang === 'en' ? '/en/' : '/'
  return `<header class="site-header" id="top"><div class="container nav-wrap">
    <a class="brand" href="${homeHref}" aria-label="${esc(site.name[lang])}"><img src="${site.images.logo}" alt="${esc(site.name[lang])}" width="${site.logoSize.width}" height="${site.logoSize.height}" decoding="async" /><span><b>${site.brandShort}</b><small>${esc(site.name[lang])}</small></span></a>
    <nav class="main-nav" id="main-nav" aria-label="${esc(ui.navLabel)}">
      <a href="${homeHref}">${esc(ui.home)}</a>
      <a href="${base}/doctor/">${esc(ui.doctor)}</a>
      <div class="nav-dropdown"><a href="${base}/services/" aria-haspopup="true">${esc(ui.services)} <span class="chevron">⌄</span></a><div class="dropdown-menu">${servicesMenu}</div></div>
      <a href="${base}/location/">${esc(ui.location)}</a>
      <a href="${base}/medical-guides/">${esc(ui.guides)}</a>
      <a href="${base}/contact/">${esc(ui.contact)}</a>
    </nav>
    <a class="lang-switch" href="${esc(route.altPath)}" hreflang="${lang === 'ar' ? 'en' : 'ar'}" lang="${lang === 'ar' ? 'en' : 'ar'}" aria-label="${esc(ui.languageSwitchLabel)}">${esc(ui.languageSwitch)}</a>
    <a class="header-cta" href="tel:${site.phones[0].tel}">${icon('phone')}<span>${esc(ui.book)}</span></a>
    <button class="menu-toggle" type="button" aria-label="${esc(ui.openMenu)}" aria-expanded="false">${icon('menu')}</button>
  </div></header>`
}

export function breadcrumbs(route, items) {
  const ui = t(route.lang)
  const sep = route.lang === 'ar' ? '←' : '→'
  const homeHref = route.lang === 'en' ? '/en/' : '/'
  const rest = items
    .map((item) => `<span aria-hidden="true">${sep}</span>${item.href ? `<a href="${item.href}">${esc(item.label)}</a>` : `<span aria-current="page">${esc(item.label)}</span>`}`)
    .join('')
  return `<nav class="breadcrumbs container" aria-label="${esc(ui.breadcrumb)}"><a href="${homeHref}">${esc(ui.home)}</a>${rest}</nav>`
}

export function footer(route) {
  const lang = route.lang
  const ui = t(lang)
  const base = pfx(lang)
  const homeHref = lang === 'en' ? '/en/' : '/'
  const phones = site.phones
    .map((phone) => `<a href="tel:${phone.tel}">${esc(phone.display)}</a>`)
    .join('')
  return `<footer class="footer"><div class="container footer-grid">
    <div class="footer-brand"><img src="${site.images.logo}" alt="${esc(site.name[lang])}" width="76" height="76" /><h3>${site.alternateName}</h3><p>${esc(site.name[lang])}</p></div>
    <div><span class="footer-label">${esc(ui.quickLinks)}</span><div class="footer-links">
      <a href="${base}/doctor/">${esc(ui.doctor)}</a>
      <a href="${base}/services/">${esc(ui.services)}</a>
      <a href="${base}/location/">${esc(ui.location)}</a>
      <a href="${base}/medical-guides/">${esc(ui.guides)}</a>
      <a href="${base}/contact/">${esc(ui.contact)}</a>
      <a href="${base}/faq/">${esc(ui.faq)}</a>
      <a href="${site.facebookUrl}" target="_blank" rel="noopener noreferrer">${esc(ui.facebook)} ↗</a>
    </div></div>
    <div><span class="footer-label">${esc(ui.contactLabel)}</span><div class="footer-links">${phones}
      <a href="${site.mapsUrl}" target="_blank" rel="noopener noreferrer">${esc(ui.maps)} ↗</a>
    </div></div>
    <div class="footer-doctor"><span>${esc(site.doctor.name[lang])}</span><p>${esc(site.doctor.role[lang])}</p>
      <a href="${base}/location/">${esc(site.address[lang].locality)}</a>
    </div></div>
    <div class="container footer-bottom">
      <span>© ${site.year} ${site.alternateName}</span>
      <span class="footer-legal"><a href="${base}/privacy/">${esc(ui.privacy)}</a><a href="${base}/medical-disclaimer/">${esc(ui.disclaimer)}</a><a href="${base}/html-sitemap/">${esc(ui.sitemap)}</a></span>
      <span>${esc(ui.footerTag)}</span>
    </div></footer>`
}

export function mobileBar(route) {
  const lang = route.lang
  const ui = t(lang)
  return `<div class="mobile-bar">
    <a href="tel:${site.phones[0].tel}">${icon('phone')}<span>${esc(ui.callShort)}</span></a>
    <a href="${whatsappUrl(lang)}" target="_blank" rel="noopener noreferrer">WA<span>${esc(ui.whatsapp)}</span></a>
    <a href="${pfx(lang)}/contact/">${icon('heart')}<span>${esc(ui.bookShort)}</span></a>
  </div>`
}

function paragraphs(list) {
  return list.map((item) => `<p>${item}</p>`).join('')
}

function homePage(route) {
  const lang = route.lang
  const c = getPages(lang).home
  const ui = t(lang)
  const hours = site.hours.display[lang]
  const trust = c.trustItems
    .map((item, i) => `<div class="trust-item"><div class="icon-box">${icon(['heart', 'pulse', 'child'][i])}</div><div><b>${esc(item.title)}</b><span>${esc(item.text)}</span></div></div>`)
    .join('')
  return `<section class="hero section-pad"><div class="hero-grid container"><div class="hero-copy reveal">
    <div class="eyebrow"><span class="pulse-dot"></span> ${esc(c.eyebrow)}</div>
    <h1>${esc(c.h1)}<br /><em>${esc(c.h1Em)}</em></h1>
    <p class="hero-lead">${esc(c.lead)}</p>
    <div class="hero-actions">${button(ui.book, `tel:${site.phones[0].tel}`)}${button(c.ctaServices, `${pfx(lang)}/services/`, 'light')}</div>
    <div class="hero-note"><span>${esc(site.doctor.name[lang])}</span><i></i><span>${esc(site.doctor.role[lang])}</span></div>
  </div>
  <div class="hero-visual reveal reveal-delay"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>
    <div class="visual-caption"><span>PRECISION</span><b>01</b></div>
    <div class="ecg-large"><svg viewBox="0 0 700 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 104h116c20 0 22-1 36-2 15-1 13-55 27-55s16 114 31 114 14-80 29-80 11 23 27 23h146c28 0 33 0 49-1 15-1 13-55 27-55s15 115 30 115 15-81 30-81 12 24 27 24h124" /></svg></div>
    <div class="visual-center"><div class="heart-mark">${icon('heart')}</div><span>CALM · CARE · CLARITY</span></div>
    <div class="visual-meta"><span>${lang === 'ar' ? 'قلبك<br /><b>أمانة</b>' : 'Your heart<br /><b>matters</b>'}</span><span class="meta-line"></span><span>CARDIO<br />CARE</span></div>
  </div></div>
  <div class="hero-bottom container"><span>${esc(site.address[lang].locality)} · ${esc(site.address[lang].region)}</span><span class="scroll-hint">${lang === 'ar' ? 'مرر للاستكشاف' : 'Scroll'} <b>↓</b></span><span>EST. FOR CARE</span></div></section>
  <section class="trust-strip section-pad-sm"><div class="container trust-grid"><div class="trust-intro"><span class="section-kicker">${esc(c.trustKicker)}</span><h2>${c.trustTitle}<br /><em>${c.trustEm}</em></h2></div>${trust}</div></section>
  <section class="home-preview section-pad"><div class="container preview-grid"><div class="preview-copy reveal"><span class="section-kicker">${esc(c.doctorKicker)}</span><h2>${c.doctorTitle}<br /><em>${c.doctorEm}</em></h2><p>${esc(c.doctorText)}</p>${button(c.doctorCta, `${pfx(lang)}/doctor/`, 'light')}</div>
    <div class="doctor-card reveal reveal-delay">${poster(lang)}<div class="doctor-info"><span class="section-kicker">${esc(c.doctorCardKicker)}</span><h3>${esc(site.doctor.name[lang])}</h3><p>${esc(site.doctor.role[lang])}</p></div></div>
  </div></section>
  <section class="services services-preview section-pad"><div class="container"><div class="section-heading"><div><span class="section-kicker">${esc(c.servicesKicker)}</span><h2>${c.servicesTitle}<br /><em>${c.servicesEm}</em></h2></div><p>${esc(c.servicesLead)}</p></div>
    <div class="services-grid">${servicePages.slice(0, 3).map((item) => serviceCard(item, lang)).join('')}</div>
    <div class="center-action">${button(c.allServices, `${pfx(lang)}/services/`, 'light')}</div>
  </div></section>
  <section class="location-preview section-pad"><div class="container location-preview-inner"><div><span class="section-kicker">${esc(c.locationKicker)}</span><h2>${c.locationTitle}<br /><em>${c.locationEm}</em></h2><p>${esc(c.locationText)}</p></div>
    <div class="preview-contact"><span>${icon('clock')} ${hours.start} ${hours.period} – ${hours.end} ${hours.period}</span><span>${icon('location')} ${esc(hours.note)}</span>${button(c.locationCta, `${pfx(lang)}/location/`)}</div>
  </div></section>
  <section class="final-cta section-pad"><div class="container final-inner"><span class="section-kicker">${esc(c.ctaKicker)}</span><h2>${c.ctaTitle}<br /><em>${c.ctaEm}</em></h2><p>${esc(c.ctaText)}</p>
    <div class="hero-actions">${button(ui.book, `tel:${site.phones[0].tel}`, 'white')}${button(ui.whatsapp, whatsappUrl(lang), 'outline')}</div>
  </div></section>`
}

function doctorPage(route) {
  const lang = route.lang
  const c = getPages(lang).doctor
  const ui = t(lang)
  const facts = c.clinicRole.map((row) => `<div class="fact-row"><span>${esc(row.label)}</span><b>${esc(row.value)}</b></div>`).join('')
  return `${breadcrumbs(route, [{ label: ui.doctor }])}
  <section class="page-hero doctor-hero section-pad"><div class="container page-hero-grid"><div class="page-hero-copy reveal">
    <span class="section-kicker">${esc(c.kicker)}</span>
    <h1>${esc(c.h1)}</h1>
    <p>${esc(c.lead)}</p>
    <div class="hero-actions">${button(ui.contact, `${pfx(lang)}/contact/`)}<a class="button button-light" href="${site.facebookUrl}" target="_blank" rel="noopener noreferrer">${esc(c.facebookCta)} ${icon('arrow')}</a></div>
  </div>
  <div class="editorial-portrait reveal reveal-delay">${poster(lang, true)}</div></div></section>
  <section class="doctor-profile section-pad"><div class="container two-column"><div><span class="section-kicker">${esc(c.introKicker)}</span><h2>${c.introTitle}<br /><em>${c.introEm}</em></h2><div class="fact-list">${facts}</div></div>
    <div class="rich-copy">${paragraphs(c.paragraphs)}${button(ui.services, `${pfx(lang)}/services/`, 'light')}</div>
  </div></section>
  <section class="doctor-services section-pad-sm"><div class="container"><div class="section-heading"><div><span class="section-kicker">${esc(c.interestKicker)}</span><h2>${c.interestTitle}<br /><em>${c.interestEm}</em></h2></div></div>
    <div class="services-grid">${servicePages.map((item) => serviceCard(item, lang)).join('')}</div>
    <p class="closing-note container-note">${esc(c.closing)}</p>
  </div></section>`
}

function servicesPage(route) {
  const lang = route.lang
  const c = getPages(lang).services
  const ui = t(lang)
  return `${breadcrumbs(route, [{ label: ui.services }])}
  <section class="page-hero services-hero section-pad"><div class="container page-hero-copy wide reveal">
    <span class="section-kicker">${esc(c.kicker)}</span>
    <h1>${esc(c.h1)}<br /><em>${esc(c.h1Em)}</em></h1>
    <p>${esc(c.lead)}</p>
  </div></section>
  <section class="service-directory section-pad-sm"><div class="container"><div class="directory-intro"><span class="section-kicker">${esc(c.directoryKicker)}</span><p>${esc(c.directoryLead)}</p></div>
    <div class="services-grid">${servicePages.map((item) => serviceCard(item, lang)).join('')}</div>
  </div></section>
  <section class="service-directory-cta section-pad-sm"><div class="container split-cta"><div><span class="section-kicker">${esc(c.helpKicker)}</span><h2>${c.helpTitle}<br /><em>${c.helpEm}</em></h2></div>
    <div><p>${esc(c.helpText)}</p>${button(ui.contact, `${pfx(lang)}/contact/`)}</div>
  </div></section>`
}

function servicePage(route) {
  const lang = route.lang
  const ui = t(lang)
  const item = servicePages.find((entry) => entry.page === route.page)
  const copy = serviceCopy[lang][route.page]
  const body = getServiceBody(route.page, lang)
  const related = servicePages.filter((entry) => entry.page !== route.page).slice(0, 3)
  const sections = body.sections
    .map((section) => `<h3>${esc(section.h2)}</h3>${paragraphs(section.p)}`)
    .join('')
  const covers = body.covers.map((entry) => `<li>${icon('check')}<span>${esc(entry)}</span></li>`).join('')
  return `${breadcrumbs(route, [{ label: ui.services, href: `${pfx(lang)}/services/` }, { label: copy.title }])}
  <section class="service-detail-hero ${item.slug} section-pad"><div class="container service-detail-grid"><div class="service-detail-copy reveal">
    <span class="section-kicker">${item.number} / ${esc(copy.kicker)}</span>
    <h1>${esc(copy.title)}</h1>
    <p>${esc(body.intro)}</p>
    ${button(ui.book, `${pfx(lang)}/contact/`)}
  </div>
  <div class="service-art reveal reveal-delay"><div class="service-art-icon">${icon(item.icon)}</div><span>${esc(copy.kicker)}</span><b>${item.number}</b><div class="service-art-line"></div></div>
  </div></section>
  <section class="service-detail-body section-pad"><div class="container detail-columns"><div><span class="section-kicker">02</span><h2>${lang === 'ar' ? 'عن هذه الخدمة' : 'About this service'}</h2></div>
    <div class="rich-copy">${sections}<h3>${lang === 'ar' ? 'تشمل هذه الخدمة' : 'This service includes'}</h3><ul>${covers}</ul><p class="note">${esc(body.note)}</p>
      <p><a href="${pfx(lang)}/doctor/">${esc(site.doctor.name[lang])}</a> · <a href="${pfx(lang)}/location/">${esc(site.address[lang].locality)}</a></p>
    </div>
  </div></section>
  <section class="related section-pad-sm"><div class="container"><div class="section-heading"><div><span class="section-kicker">03</span><h2>${esc(ui.related)}</h2></div></div>
    <div class="services-grid">${related.map((entry) => serviceCard(entry, lang)).join('')}</div>
  </div></section>
  <section class="detail-cta section-pad-sm"><div class="container detail-cta-inner"><div><span class="section-kicker">04 / ${esc(ui.nextStep)}</span><h2>${esc(ui.contact)}</h2></div>
    <div><p>${esc(copy.short)}</p>${button(ui.book, `${pfx(lang)}/contact/`)}</div>
  </div></section>`
}

function locationPage(route) {
  const lang = route.lang
  const c = getPages(lang).location
  const ui = t(lang)
  const hours = site.hours.display[lang]
  const lines = site.address[lang].lines.map((line) => `${esc(line)}`).join('<br />')
  return `${breadcrumbs(route, [{ label: ui.location }])}
  <section class="page-hero section-pad"><div class="container page-hero-copy wide reveal">
    <span class="section-kicker">${esc(c.kicker)}</span>
    <h1>${esc(c.h1)}<br /><em>${esc(c.h1Em)}</em></h1>
    <p>${esc(c.lead)}</p>
    ${button(c.mapCta, site.mapsUrl)}
  </div></section>
  <section class="contact-details section-pad-sm"><div class="container location-split">
    <div class="contact-block address-block"><span class="section-kicker">${esc(c.findKicker)}</span>
      <h2>${c.findTitle}<br /><em>${c.findEm}</em></h2>
      <p>${lines}</p>
      ${paragraphs(c.findText)}
      <p class="note">${esc(c.napNote)}</p>
    </div>
    <div class="contact-block hours-block"><span class="section-kicker">${esc(c.hoursKicker)}</span>
      <h2>${c.hoursTitle}<br /><em>${c.hoursEm}</em></h2>
      <div class="contact-hours"><b>${hours.start}</b><span>${hours.period}</span><i>—</i><b>${hours.end}</b><span>${hours.period}</span></div>
      <p>${esc(c.hoursText)}</p>
      ${button(c.bookCta, `${pfx(lang)}/contact/`, 'white')}
    </div>
  </div></section>`
}

function contactPage(route) {
  const lang = route.lang
  const c = getPages(lang).contact
  const ui = t(lang)
  const hours = site.hours.display[lang]
  const phones = site.phones
    .map((phone) => `<a href="tel:${phone.tel}"><small>${esc(phone.label[lang])}</small>${esc(phone.display)}</a>`)
    .join('')
  const lines = site.address[lang].lines.map((line) => esc(line)).join('<br />')
  return `${breadcrumbs(route, [{ label: ui.contact }])}
  <section class="contact-hero section-pad"><div class="container contact-hero-grid"><div class="page-hero-copy reveal">
    <span class="section-kicker">${esc(c.kicker)}</span>
    <h1>${esc(c.h1)}<br /><em>${esc(c.h1Em)}</em></h1>
    <p>${esc(c.lead)}</p>
    <div class="hero-actions">${button(ui.call, `tel:${site.phones[0].tel}`)}${button(ui.whatsapp, whatsappUrl(lang), 'light')}</div>
  </div>
  <div class="contact-signal reveal reveal-delay"><div class="contact-signal-ring"></div>${icon('phone')}<span>WE ARE HERE<br />TO LISTEN</span></div>
  </div></section>
  <section class="contact-details section-pad-sm"><div class="container contact-grid">
    <div class="contact-block"><span class="section-kicker">${esc(c.phonesKicker)}</span><h2>${c.phonesTitle}<br /><em>${c.phonesEm}</em></h2>
      <div class="phone-list">${phones}</div>
      <a class="facebook-link" href="${site.facebookUrl}" target="_blank" rel="noopener noreferrer">${esc(ui.facebook)} ↗</a>
    </div>
    <div class="contact-block address-block"><span class="section-kicker">${esc(c.addressKicker)}</span>
      <h3>${icon('location')} ${esc(site.name[lang])}</h3>
      <p>${lines}</p>
      <p><a href="${pfx(lang)}/location/">${esc(c.mapHint)}</a></p>
    </div>
    <div class="contact-block hours-block"><span class="section-kicker">${esc(c.hoursKicker)}</span>
      <div class="contact-hours"><b>${hours.start}</b><span>${hours.period}</span><i>—</i><b>${hours.end}</b><span>${hours.period}</span></div>
      <p>${esc(hours.note)}</p>
      <div class="hours-note">${esc(c.hoursNote)}</div>
    </div>
  </div></section>
  <section class="contact-final section-pad-sm"><div class="container"><span class="section-kicker">${esc(c.readyKicker)}</span><h2>${esc(c.readyTitle)}</h2>${button(ui.book, `tel:${site.phones[0].tel}`)}</div></section>`
}

function faqPage(route) {
  const lang = route.lang
  const c = getPages(lang).faq
  const ui = t(lang)
  const items = c.items
    .map((item) => `<article class="faq-item"><h2>${esc(item.q)}</h2><p>${esc(item.a)}</p></article>`)
    .join('')
  return `${breadcrumbs(route, [{ label: ui.faq }])}
  <section class="page-hero section-pad"><div class="container page-hero-copy wide reveal">
    <span class="section-kicker">${esc(c.kicker)}</span>
    <h1>${esc(c.h1)}<br /><em>${esc(c.h1Em)}</em></h1>
    <p>${esc(c.lead)}</p>
  </div></section>
  <section class="faq-list section-pad-sm"><div class="container">${items}</div></section>`
}

function guidesPage(route) {
  const lang = route.lang
  const c = getPages(lang).guides
  const ui = t(lang)
  const cards = guidePages
    .map((item) => {
      const copy = guideCopy[lang][item.page]
      return `<article class="guide-card"><h2><a href="${pfx(lang)}/medical-guides/${item.slug}/">${esc(copy.title)}</a></h2><p>${esc(copy.short)}</p></article>`
    })
    .join('')
  return `${breadcrumbs(route, [{ label: ui.guides }])}
  <section class="page-hero section-pad"><div class="container page-hero-copy wide reveal">
    <span class="section-kicker">${esc(c.kicker)}</span>
    <h1>${esc(c.h1)}<br /><em>${esc(c.h1Em)}</em></h1>
    <p>${esc(c.lead)}</p>
    <p class="note">${esc(c.note)}</p>
  </div></section>
  <section class="guides-grid-wrap section-pad-sm"><div class="container guides-grid">${cards}</div></section>`
}

function articlePage(route) {
  const lang = route.lang
  const ui = t(lang)
  const copy = guideCopy[lang][route.page]
  const body = getArticleBody(route.page, lang)
  const sections = body.sections
    .map((section) => `<h2>${esc(section.h2)}</h2>${paragraphs(section.p)}`)
    .join('')
  const refs = body.references
    .map((ref) => `<li><a href="${esc(ref.url)}" target="_blank" rel="noopener noreferrer">${esc(ref.title)}</a></li>`)
    .join('')
  const related = body.related
    .map((page) => {
      const item = servicePages.find((entry) => entry.page === page)
      return `<li><a href="${pfx(lang)}/services/${item.slug}/">${esc(serviceCopy[lang][page].title)}</a></li>`
    })
    .join('')
  return `${breadcrumbs(route, [{ label: ui.guides, href: `${pfx(lang)}/medical-guides/` }, { label: copy.title }])}
  <article class="article-page section-pad"><div class="container article-layout">
    <header class="article-header">
      <span class="section-kicker">${esc(ui.guides)}</span>
      <h1>${esc(copy.title)}</h1>
      <p class="article-meta"><span>${esc(ui.author)}</span><span>${esc(ui.updated)}: ${esc(body.datePublished)}</span></p>
      <p class="hero-lead">${esc(body.intro)}</p>
    </header>
    <div class="rich-copy article-body">${sections}</div>
    <aside class="article-aside">
      <p class="disclaimer-box">${esc(ui.emergency)}</p>
      <p><a href="${pfx(lang)}/medical-disclaimer/">${esc(ui.disclaimer)}</a></p>
      <h2>${esc(ui.related)}</h2>
      <ul class="plain-links">${related}<li><a href="${pfx(lang)}/doctor/">${esc(site.doctor.name[lang])}</a></li><li><a href="${pfx(lang)}/contact/">${esc(ui.contact)}</a></li></ul>
      <h2>${esc(ui.references)}</h2>
      <ul class="refs">${refs}</ul>
    </aside>
  </div></article>`
}

function legalPage(route, key) {
  const lang = route.lang
  const c = getPages(lang)[key]
  const ui = t(lang)
  const label = key === 'privacy' ? ui.privacy : ui.disclaimer
  const sections = c.sections
    .map((section) => `<h2>${esc(section.h2)}</h2>${paragraphs(section.p)}`)
    .join('')
  return `${breadcrumbs(route, [{ label }])}
  <section class="page-hero section-pad"><div class="container page-hero-copy wide reveal">
    <span class="section-kicker">${esc(c.kicker)}</span>
    <h1>${esc(c.h1)}</h1>
    <p>${esc(c.lead)}</p>
  </div></section>
  <section class="legal-body section-pad-sm"><div class="container rich-copy">${sections}</div></section>`
}

function sitemapPage(route) {
  const lang = route.lang
  const c = getPages(lang).sitemapPage
  const ui = t(lang)
  const groupsFor = (pageLang) => [
    { title: chrome[pageLang].doctor, pages: ['doctor'] },
    { title: chrome[pageLang].services, pages: ['services', ...servicePages.map((item) => item.page)] },
    { title: chrome[pageLang].location, pages: ['location', 'contact', 'faq'] },
    { title: chrome[pageLang].guides, pages: ['medical-guides', ...guidePages.map((item) => item.page)] },
    { title: pageLang === 'ar' ? 'صفحات قانونية' : 'Legal', pages: ['privacy', 'medical-disclaimer', 'sitemap'] }
  ]
  const listFor = (pageLang) =>
    groupsFor(pageLang)
      .map((group) => {
        const links = group.pages
          .map((page) => {
            const match = routes.find((entry) => entry.page === page && entry.lang === pageLang)
            const label =
              page === 'home'
                ? chrome[pageLang].home
                : serviceCopy[pageLang][page]?.title || guideCopy[pageLang][page]?.title || chrome[pageLang][page === 'medical-guides' ? 'guides' : page === 'medical-disclaimer' ? 'disclaimer' : page] || page
            return `<li><a href="${match.urlPath}">${esc(label)}</a></li>`
          })
          .join('')
        return `<div class="sitemap-group"><h2>${esc(group.title)}</h2><ul>${links}</ul></div>`
      })
      .join('')
  const homeAr = `<li><a href="/">${esc(site.name.ar)}</a></li>`
  const homeEn = `<li><a href="/en/">${esc(site.name.en)}</a></li>`
  return `${breadcrumbs(route, [{ label: ui.sitemap }])}
  <section class="page-hero section-pad"><div class="container page-hero-copy wide reveal">
    <span class="section-kicker">${esc(c.kicker)}</span>
    <h1>${esc(c.h1)}</h1>
    <p>${esc(c.lead)}</p>
  </div></section>
  <section class="sitemap-page section-pad-sm"><div class="container">
    <div class="sitemap-lang"><h2>${esc(chrome.ar.languageName)}</h2><ul>${homeAr}</ul></div>
    <div class="sitemap-columns">${listFor('ar')}</div>
    <div class="sitemap-lang"><h2>${esc(chrome.en.languageName)}</h2><ul>${homeEn}</ul></div>
    <div class="sitemap-columns">${listFor('en')}</div>
  </div></section>`
}

function notFoundPage(route) {
  const c = getPages(route.lang).notFound
  return `<section class="page-hero section-pad"><div class="container page-hero-copy wide">
    <span class="section-kicker">${esc(c.kicker)}</span>
    <h1>${esc(c.h1)}</h1>
    <p>${esc(c.lead)}</p>
    <div class="hero-actions">${button(c.homeCta, '/')}${button(c.servicesCta, '/services/', 'light')}</div>
  </div></section>`
}

export function crumbItems(route) {
  const lang = route.lang
  const ui = t(lang)
  const home = { name: ui.home, path: lang === 'en' ? '/en/' : '/' }
  if (route.page === 'home' || route.page === 'not-found') return []
  if (route.type === 'service') {
    return [home, { name: ui.services, path: `${pfx(lang)}/services/` }, { name: serviceCopy[lang][route.page].title, path: route.urlPath }]
  }
  if (route.type === 'article') {
    return [home, { name: ui.guides, path: `${pfx(lang)}/medical-guides/` }, { name: guideCopy[lang][route.page].title, path: route.urlPath }]
  }
  const labels = {
    doctor: ui.doctor,
    services: ui.services,
    location: ui.location,
    contact: ui.contact,
    faq: ui.faq,
    'medical-guides': ui.guides,
    privacy: ui.privacy,
    'medical-disclaimer': ui.disclaimer,
    sitemap: ui.sitemap
  }
  return [home, { name: labels[route.page] || route.page, path: route.urlPath }]
}

export function renderMain(route) {
  switch (route.type) {
    case 'home':
      return homePage(route)
    case 'doctor':
      return doctorPage(route)
    case 'services':
      return servicesPage(route)
    case 'service':
      return servicePage(route)
    case 'location':
      return locationPage(route)
    case 'contact':
      return contactPage(route)
    case 'faq':
      return faqPage(route)
    case 'guides':
      return guidesPage(route)
    case 'article':
      return articlePage(route)
    case 'legal':
      return legalPage(route, route.page === 'privacy' ? 'privacy' : 'disclaimer')
    case 'sitemap':
      return sitemapPage(route)
    case 'not-found':
      return notFoundPage(route)
    default:
      return homePage(route)
  }
}

export function mainClass(route) {
  if (route.page === 'home') return 'home-page'
  if (route.page === 'contact') return 'contact-page'
  if (route.type === 'service') return `service-page ${route.page}`
  if (route.type === 'article') return 'article-main'
  return `${route.page}-page`
}
