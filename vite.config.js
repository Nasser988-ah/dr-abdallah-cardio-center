import { defineConfig } from 'vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(import.meta.url))

const pages = {
  index: 'index.html',
  doctor: 'doctor/index.html',
  services: 'services/index.html',
  contact: 'contact/index.html',
  'services/cardiovascular-examination': 'services/cardiovascular-examination/index.html',
  'services/heart-tests': 'services/heart-tests/index.html',
  'services/pediatric-echocardiography': 'services/pediatric-echocardiography/index.html',
  'services/stress-test-holter': 'services/stress-test-holter/index.html',
  'services/athlete-evaluation': 'services/athlete-evaluation/index.html',
  'services/preoperative-evaluation': 'services/preoperative-evaluation/index.html'
}

export default defineConfig({
  build: { rollupOptions: { input: Object.fromEntries(Object.entries(pages).map(([name, file]) => [name, resolve(rootDir, file)])) } }
})
