import { defineConfig } from 'tsup'

export default defineConfig({
    clean: true,
    entry: ['src/app.ts'],
    sourcemap: true,
    splitting: false,
})
