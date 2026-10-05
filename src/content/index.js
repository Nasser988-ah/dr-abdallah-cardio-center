import { pagesAr, serviceBodiesAr, articleBodiesAr } from './ar.js'
import { pagesEn, serviceBodiesEn, articleBodiesEn } from './en.js'
import { pageMeta } from './meta.js'

const pages = { ar: pagesAr, en: pagesEn }
const services = { ar: serviceBodiesAr, en: serviceBodiesEn }
const articles = { ar: articleBodiesAr, en: articleBodiesEn }

export function getPages(lang) {
  return pages[lang]
}

export function getServiceBody(page, lang) {
  return services[lang][page]
}

export function getArticleBody(page, lang) {
  return articles[lang][page]
}

export { pageMeta }
