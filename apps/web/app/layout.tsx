import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.css'

import { validateRequest } from '@/lib/auth'
import { Providers } from '@/components/providers'
import TheHeader from '@/components/layout/the-header'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
})

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
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
