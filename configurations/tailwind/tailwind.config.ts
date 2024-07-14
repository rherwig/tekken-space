import type { Config } from 'tailwindcss'
import { zinc, teal, blue, green, yellow, red } from 'tailwindcss/colors'
import scrollbar from 'tailwind-scrollbar'

export function createPreset(): Partial<Config> {
    return {
        theme: {
            extend: {
                colors: {
                    primary: {
                        DEFAULT: '#05070D',
                        ...zinc,
                    },

                    accent: {
                        DEFAULT: teal['600'],
                        ...teal,
                    },

                    copy: {
                        DEFAULT: zinc['100'],
                        light: zinc['50'],
                        dark: zinc['900'],
                    },

                    background: {
                        DEFAULT: '#05070D',
                        ...zinc,
                    },

                    info: {
                        DEFAULT: blue['500'],
                        ...blue,
                    },

                    success: {
                        DEFAULT: green['500'],
                        ...green,
                    },

                    warning: {
                        DEFAULT: yellow['500'],
                        ...yellow,
                    },

                    error: {
                        DEFAULT: red['500'],
                        ...red,
                    },
                },

                container: {
                    center: true,
                },

                fontSize: {
                    display: '8rem',
                },

                fontFamily: {
                    logo: "'Tarrget', serif",
                },
            },
        },

        plugins: [
            scrollbar({
                nocompatible: true,
            }),
        ],
    }
}
