const pageDefs = [
  { page: 'home', path: '/', type: 'home', indexable: true },
  { page: 'doctor', path: '/doctor/', type: 'doctor', indexable: true },
  { page: 'services', path: '/services/', type: 'services', indexable: true },
  { page: 'cardiovascular-examination', path: '/services/cardiovascular-examination/', type: 'service', indexable: true },
  { page: 'heart-tests', path: '/services/heart-tests/', type: 'service', indexable: true },
  { page: 'pediatric-echocardiography', path: '/services/pediatric-echocardiography/', type: 'service', indexable: true },
  { page: 'stress-test-holter', path: '/services/stress-test-holter/', type: 'service', indexable: true },
  { page: 'athlete-evaluation', path: '/services/athlete-evaluation/', type: 'service', indexable: true },
  { page: 'preoperative-evaluation', path: '/services/preoperative-evaluation/', type: 'service', indexable: true },
  { page: 'location', path: '/location/', type: 'location', indexable: true },
  { page: 'contact', path: '/contact/', type: 'contact', indexable: true },
  { page: 'faq', path: '/faq/', type: 'faq', indexable: true },
  { page: 'medical-guides', path: '/medical-guides/', type: 'guides', indexable: true },
  { page: 'guide-heart-tests', path: '/medical-guides/heart-tests/', type: 'article', indexable: true },
  { page: 'guide-palpitations', path: '/medical-guides/palpitations-and-fast-heartbeat/', type: 'article', indexable: true },
  { page: 'guide-hypertension', path: '/medical-guides/high-blood-pressure-and-heart/', type: 'article', indexable: true },
  { page: 'guide-enlarged-heart', path: '/medical-guides/enlarged-heart/', type: 'article', indexable: true },
  { page: 'guide-cad', path: '/medical-guides/coronary-artery-disease/', type: 'article', indexable: true },
  { page: 'privacy', path: '/privacy/', type: 'legal', indexable: true },
  { page: 'medical-disclaimer', path: '/medical-disclaimer/', type: 'legal', indexable: true },
  { page: 'sitemap', path: '/html-sitemap/', type: 'sitemap', indexable: true }
]

export const servicePages = [
  { page: 'cardiovascular-examination', slug: 'cardiovascular-examination', number: '01', icon: 'heart' },
  { page: 'heart-tests', slug: 'heart-tests', number: '02', icon: 'pulse' },
  { page: 'pediatric-echocardiography', slug: 'pediatric-echocardiography', number: '03', icon: 'child' },
  { page: 'stress-test-holter', slug: 'stress-test-holter', number: '04', icon: 'pulse' },
  { page: 'athlete-evaluation', slug: 'athlete-evaluation', number: '05', icon: 'check' },
  { page: 'preoperative-evaluation', slug: 'preoperative-evaluation', number: '06', icon: 'heart' }
]

export const guidePages = [
  { page: 'guide-heart-tests', slug: 'heart-tests' },
  { page: 'guide-palpitations', slug: 'palpitations-and-fast-heartbeat' },
  { page: 'guide-hypertension', slug: 'high-blood-pressure-and-heart' },
  { page: 'guide-enlarged-heart', slug: 'enlarged-heart' },
  { page: 'guide-cad', slug: 'coronary-artery-disease' }
]

function fileFromPath(urlPath) {
  if (urlPath === '/') return 'index.html'
  return `${urlPath.replace(/^\//, '')}index.html`
}

function localizePath(path, lang) {
  if (lang === 'ar') return path
  return path === '/' ? '/en/' : `/en${path}`
}

function makeRoute(def, lang) {
  const urlPath = localizePath(def.path, lang)
  const altPath = localizePath(def.path, lang === 'ar' ? 'en' : 'ar')
  return {
    id: lang === 'ar' ? def.page : `en-${def.page}`,
    page: def.page,
    type: def.type,
    lang,
    dir: lang === 'ar' ? 'rtl' : 'ltr',
    locale: lang === 'ar' ? 'ar_EG' : 'en_US',
    urlPath,
    altPath,
    defaultPath: def.path,
    file: fileFromPath(urlPath),
    indexable: def.indexable
  }
}

export const routes = pageDefs.flatMap((def) => [makeRoute(def, 'ar'), makeRoute(def, 'en')])

export const notFoundRoute = {
  id: 'not-found',
  page: 'not-found',
  type: 'not-found',
  lang: 'ar',
  dir: 'rtl',
  locale: 'ar_EG',
  urlPath: '/404.html',
  altPath: '/en/',
  defaultPath: '/404.html',
  file: '404.html',
  indexable: false
}

export function getRoute(page, lang = 'ar') {
  return routes.find((route) => route.page === page && route.lang === lang)
}

export function getRouteById(id) {
  return routes.find((route) => route.id === id)
}

export function indexableRoutes() {
  return routes.filter((route) => route.indexable)
}

export function prefix(lang) {
  return lang === 'en' ? '/en' : ''
}
