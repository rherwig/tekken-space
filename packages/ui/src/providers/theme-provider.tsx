'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'

export function ThemeProvider({
    children,
    theme,
}: {
    children?: React.ReactNode
    theme?: string
}) {
    const defaultTheme = theme ?? 'system'

    return (
        <NextThemeProvider
            attribute="class"
            defaultTheme={defaultTheme}
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </NextThemeProvider>
    )
}
