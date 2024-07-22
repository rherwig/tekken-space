import { join } from 'node:path'
import { type Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'
import { createPreset } from '@tekken-space/configuration-tailwind'

const nextUiPath = require.resolve('@nextui-org/theme')

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx,scss}',
        './lib/**/*.{js,ts,jsx,tsx,mdx}',
        join(nextUiPath, '../../dist/**/*.{js,ts,jsx,tsx}'),
    ],
    darkMode: 'class',
    plugins: [
        nextui({
            addCommonColors: true,
        }),
    ],
    presets: [createPreset()],
    theme: {
        extend: {},
    },
}

export default config
