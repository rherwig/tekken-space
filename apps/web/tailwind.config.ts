import { type Config } from 'tailwindcss'
import { createPreset } from '@tekken-space/configuration-tailwind'

const config: Config = {
    presets: [createPreset()],
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}

export default config
