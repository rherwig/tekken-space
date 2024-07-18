import type { Metadata } from 'next'

import './globals.css'

import { validateRequest } from '@/lib/auth'
import { Providers } from '@/components/providers'
import TheHeader from '@/components/layout/the-header'

export const metadata: Metadata = {
    title: 'Tekken Space',
    description:
        'Find combos, frame data, and more for your favorite Tekken 8 characters. Easy to use, free, without ads.',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { user } = await validateRequest()

    return (
        <html lang="en" className="dark">
            <body>
                <Providers>
                    <main className="text-foreground bg-background h-full">
                        <TheHeader user={user} />
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    )
}
