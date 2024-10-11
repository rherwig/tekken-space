import type { Metadata } from 'next'

import '@tekken-space/ui/styles'

import TheHeader from '@/components/layout/the-header'
import { ThemeProvider } from '@tekken-space/ui/providers'
import { Toaster } from '@tekken-space/ui/base'

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
    const { user } = { user: null }

    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider>
                    <main className="h-full">
                        <TheHeader user={user} />
                        {children}
                    </main>

                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}
