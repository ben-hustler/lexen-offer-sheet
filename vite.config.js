import { defineConfig } from 'vite'
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
})
