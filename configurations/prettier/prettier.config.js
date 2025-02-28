import * as tailwind from 'prettier-plugin-tailwindcss'

/**
 * @type {import('prettier').Config}
 */
const config = {
    plugins: [tailwind],
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    tabWidth: 4,
}

export default config
