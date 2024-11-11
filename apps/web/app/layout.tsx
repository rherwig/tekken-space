import type { Metadata } from 'next'

import '@tekken-space/ui/styles'

import TheHeader from '@/components/layout/the-header'
import {
    type NotationTheme,
    NotationThemeProvider,
    ThemeProvider,
} from '@tekken-space/ui/providers'
import { Toaster } from '@tekken-space/ui/base'
import {
    type Preferences,
    PreferencesProvider,
} from '@/components/providers/preferences-provider'
import { bodyClassNames } from '@/assets'

export const metadata: Metadata = {
    description:
        'Find combos, frame data, and more for your favorite Tekken 8 characters. Easy to use, free, without ads.',
    title: 'Tekken Space',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const preferences: Preferences = {
        theme: 'dark',
    }

    const notationTheme: NotationTheme = {}

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={bodyClassNames}>
                <PreferencesProvider preferences={preferences}>
                    <ThemeProvider theme={preferences.theme}>
                        <NotationThemeProvider theme={notationTheme}>
                            <main className="h-full">
                                <TheHeader />
                                {children}
                            </main>

                            <Toaster />
                        </NotationThemeProvider>
                    </ThemeProvider>
                </PreferencesProvider>
            </body>
        </html>
    )
}
