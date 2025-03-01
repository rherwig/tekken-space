import { defineConfig } from 'tsup'

export default defineConfig({
    clean: true,
    entry: ['src/app.ts'],
    format: ['esm'],
    sourcemap: true,
    splitting: false,
})
