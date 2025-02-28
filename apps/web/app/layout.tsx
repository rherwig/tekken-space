import type { Metadata } from 'next'

import '@tekken-space/ui/styles'

import TheHeader from '@/components/layout/the-header'
import {
    type NotationTheme,
    NotationThemeProvider,
    NotationThemes,
    ThemeProvider,
} from '@tekken-space/ui/providers'
import { Toaster } from '@tekken-space/ui/base'
import {
    type Preferences,
    PreferencesProvider,
} from '@/components/providers/preferences-provider'
import { bodyClassNames } from '@/assets'
import { TheMobileNavigation } from '@/components/layout/navigation/the-mobile-navigation'

export const metadata: Metadata = {
    description:
        'Find combos, frame data, and more for your favorite Tekken 8 characters. Easy to use, free, without ads.',
    icons: [
        {
            rel: 'apple-touch-icon',
            sizes: '57x57',
            url: '/icons/apple-icon-57x57.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '60x60',
            url: '/icons/apple-icon-60x60.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '72x72',
            url: '/icons/apple-icon-72x72.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '76x76',
            url: '/icons/apple-icon-76x76.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '114x114',
            url: '/icons/apple-icon-114x114.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '120x120',
            url: '/icons/apple-icon-120x120.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '144x144',
            url: '/icons/apple-icon-144x144.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '152x152',
            url: '/icons/apple-icon-152x152.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            url: '/icons/apple-icon-180x180.png',
        },
        {
            rel: 'icon',
            sizes: '192x192',
            type: 'image/png',
            url: '/icons/android-icon-192x192.png',
        },
        {
            rel: 'icon',
            sizes: '16x16',
            type: 'image/png',
            url: '/icons/favicon-16x16.png',
        },
        {
            rel: 'icon',
            sizes: '32x32',
            type: 'image/png',
            url: '/icons/favicon-32x32.png',
        },
        {
            rel: 'icon',
            sizes: '96x96',
            type: 'image/png',
            url: '/icons/favicon-96x96.png',
        },
    ],
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

    const notationTheme: NotationTheme = {
        id: NotationThemes.ARCADE,
    }

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={bodyClassNames}>
                <PreferencesProvider preferences={preferences}>
                    <ThemeProvider theme={preferences.theme}>
                        <NotationThemeProvider theme={notationTheme}>
                            <div className="grid min-h-screen grid-rows-[1fr,auto] gap-y-4">
                                <div className="overflow-y-auto">
                                    <TheHeader />

                                    {children}
                                </div>

                                <TheMobileNavigation />
                            </div>

                            <Toaster />
                        </NotationThemeProvider>
                    </ThemeProvider>
                </PreferencesProvider>
            </body>
        </html>
    )
}
