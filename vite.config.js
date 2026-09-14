import { defineConfig } from 'vite'
import { copyFileSync } from 'fs'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/lexen-offer-sheet.js',
      name: 'LexenOfferSheet',
      fileName: () => 'lexen-offer-sheet.js',
      formats: ['es'],
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [{
    name: 'copy-public',
    closeBundle() {
      copyFileSync('public/_headers', 'dist/_headers');
    },
  }],
})
