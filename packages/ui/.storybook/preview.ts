import type { Preview } from '@storybook/react'

import '../src/styles.css'

export const globals = {
    themes: ['light', 'dark'],
}

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
}

export default {
    globals,
    preview,
}
