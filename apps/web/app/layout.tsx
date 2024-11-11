import type { Metadata } from 'next'

import '@tekken-space/ui/styles'

import TheHeader from '@/components/layout/the-header'
import { ThemeProvider } from '@tekken-space/ui/providers'
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

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={bodyClassNames}>
                <PreferencesProvider preferences={preferences}>
                    <ThemeProvider theme={preferences.theme}>
                        <main className="h-full">
                            <TheHeader />
                            {children}
                        </main>

                        <Toaster />
                    </ThemeProvider>
                </PreferencesProvider>
            </body>
        </html>
    )
}
