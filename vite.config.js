import { defineConfig } from 'vite'
import { seoPrerender } from './plugins/seo-prerender.js'

export default defineConfig({
  appType: 'mpa',
  plugins: [seoPrerender()]
})
