import { type Config } from 'tailwindcss'
import { createPreset } from '@tekken-space/configuration-tailwind'
import { join } from 'node:path'

const workspaceRoot = join(__dirname, '../..')
const uiRoot = join(workspaceRoot, 'packages/ui/src')

const config: Config = {
    content: [
        './app/**/*.{ts,tsx,mdx}',
        './pages/**/*.{ts,tsx,mdx}',
        './components/**/*.{ts,tsx,mdx,scss}',
        './lib/**/*.{ts,tsx,mdx}',
        join(uiRoot, 'base/**/*.{ts,tsx,mdx}'),
        join(uiRoot, 'components/**/*.{ts,tsx,mdx}'),
    ],
    presets: [createPreset()],
}

export default config
