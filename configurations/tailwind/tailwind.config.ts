import type { Config } from 'tailwindcss'
import { zinc, blue, green, yellow, red } from 'tailwindcss/colors'
import scrollbar from 'tailwind-scrollbar'
import animate from 'tailwindcss-animate'

export function createPreset(): Partial<Config> {
    return {
        darkMode: 'selector',
        plugins: [
            animate,
            scrollbar({
                nocompatible: true,
            }),
        ],
        theme: {
            extend: {
                borderRadius: {
                    lg: 'var(--radius)',
                    md: 'calc(var(--radius) - 2px)',
                    sm: 'calc(var(--radius) - 4px)',
                },
                colors: {
                    accent: {
                        DEFAULT: 'var(--accent)',
                        foreground: 'var(--accent-foreground)',
                    },
                    background: 'var(--background)',
                    border: 'var(--border)',
                    card: {
                        DEFAULT: 'var(--card)',
                        foreground: 'var(--card-foreground)',
                    },
                    copy: {
                        dark: zinc['900'],
                        DEFAULT: zinc['100'],
                        light: zinc['50'],
                    },
                    danger: {
                        DEFAULT: red['500'],
                        ...red,
                    },
                    destructive: {
                        DEFAULT: 'var(--destructive)',
                        foreground: 'var(--destructive-foreground)',
                    },
                    foreground: 'var(--foreground)',
                    info: {
                        DEFAULT: blue['500'],
                        ...blue,
                    },
                    input: 'var(--input)',
                    muted: {
                        DEFAULT: 'var(--muted)',
                        foreground: 'var(--muted-foreground)',
                    },
                    popover: {
                        DEFAULT: 'var(--popover)',
                        foreground: 'var(--popover-foreground)',
                    },
                    primary: {
                        DEFAULT: 'var(--primary)',
                        foreground: 'var(--primary-foreground)',
                    },
                    ring: 'var(--ring)',
                    secondary: {
                        DEFAULT: 'var(--secondary)',
                        foreground: 'var(--secondary-foreground)',
                    },
                    success: {
                        DEFAULT: green['500'],
                        ...green,
                    },
                    warning: {
                        DEFAULT: yellow['500'],
                        ...yellow,
                    },
                },
                container: {
                    center: true,
                },
                fontFamily: {
                    logo: 'var(--font-logo)',
                },
                fontSize: {
                    display: '8rem',
                },
            },
        },
    }
}
