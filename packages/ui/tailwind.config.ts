import { type Config } from 'tailwindcss'
import { createPreset } from '@tekken-space/configuration-tailwind'

const config: Config = {
    content: [
        './src/base/**/*.{ts,tsx,mdx}',
        './src/components/**/*.{ts,tsx,mdx}',
        './src/docs/**/*.{ts,tsx,mdx}',
    ],
    darkMode: ['class'],
    presets: [createPreset()],
}

export default config
