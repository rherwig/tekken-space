import { type Config } from 'tailwindcss'
import { createPreset } from '@tekken-space/configuration-tailwind'

const config: Config = {
    presets: [createPreset()],
    content: [
        './apps/web/app/**/*.{js,ts,jsx,tsx,mdx}',
        './apps/web/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './apps/web/components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}

export default config
