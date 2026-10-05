import { generateSite } from '../src/generate.js'

export function seoPrerender() {
  return {
    name: 'seo-prerender',
    config() {
      const input = generateSite()
      return {
        build: {
          rollupOptions: { input }
        }
      }
    },
    configureServer(server) {
      generateSite()
      server.watcher.add(['src'])
      server.watcher.on('change', (file) => {
        if (file.includes('src') && !file.endsWith('client.js') && !file.endsWith('style.css')) {
          generateSite()
        }
      })
    }
  }
}
