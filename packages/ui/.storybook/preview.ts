import type { Preview, ReactRenderer } from '@storybook/react'

import '../src/styles.css'

import DocumentationTemplate from './templates/documentation.mdx'
import { withThemeByClassName } from '@storybook/addon-themes'

const preview: Preview = {
    decorators: [
        withThemeByClassName<ReactRenderer>({
            defaultTheme: 'dark',
            themes: {
                dark: 'dark',
                light: '',
            },
        }),
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            page: DocumentationTemplate,
        },
        options: {
            storySort: {
                includeNames: false,
                order: ['General', 'Base', '*'],
            },
        },
    },
    tags: ['autodocs'],
}

export default preview
