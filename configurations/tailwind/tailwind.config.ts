import type { Config } from 'tailwindcss'
import { zinc, blue, green, yellow, red } from 'tailwindcss/colors'
import scrollbar from 'tailwind-scrollbar'
import animate from 'tailwindcss-animate'

export function createPreset(): Partial<Config> {
    return {
        darkMode: 'class',
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
                        DEFAULT: 'hsl(var(--accent))',
                        foreground: 'hsl(var(--accent-foreground))',
                    },
                    background: 'hsl(var(--background))',
                    border: 'hsl(var(--border))',
                    card: {
                        DEFAULT: 'hsl(var(--card))',
                        foreground: 'hsl(var(--card-foreground))',
                    },
                    chart: {
                        '1': 'hsl(var(--chart-1))',
                        '2': 'hsl(var(--chart-2))',
                        '3': 'hsl(var(--chart-3))',
                        '4': 'hsl(var(--chart-4))',
                        '5': 'hsl(var(--chart-5))',
                    },
                    copy: {
                        DEFAULT: zinc['100'],
                        dark: zinc['900'],
                        light: zinc['50'],
                    },
                    danger: {
                        DEFAULT: red['500'],
                        ...red,
                    },
                    destructive: {
                        DEFAULT: 'hsl(var(--destructive))',
                        foreground: 'hsl(var(--destructive-foreground))',
                    },
                    foreground: 'hsl(var(--foreground))',
                    info: {
                        DEFAULT: blue['500'],
                        ...blue,
                    },
                    input: 'hsl(var(--input))',
                    muted: {
                        DEFAULT: 'hsl(var(--muted))',
                        foreground: 'hsl(var(--muted-foreground))',
                    },
                    popover: {
                        DEFAULT: 'hsl(var(--popover))',
                        foreground: 'hsl(var(--popover-foreground))',
                    },
                    primary: {
                        DEFAULT: 'hsl(var(--primary))',
                        foreground: 'hsl(var(--primary-foreground))',
                    },
                    ring: 'hsl(var(--ring))',
                    secondary: {
                        DEFAULT: 'hsl(var(--secondary))',
                        foreground: 'hsl(var(--secondary-foreground))',
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
                    logo: "'Tarrget', serif",
                },
                fontSize: {
                    display: '8rem',
                },
            },
        },
    }
}
