import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { validateRequest } from '@/lib/auth'
import { Profile } from '@tekken-space/database'

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

function SignInButton() {
    return (
        <a
            className="inline-flex bg-white/25 px-6 py-2"
            href="/api/auth/github"
        >
            Sign In with GitHub
        </a>
    )
}

function ProfileWidget({ user }: { user: Profile }) {
    return (
        <div>
            {user.id} {user.role}
        </div>
    )
}

function Header({ user }: { user: Profile | null }) {
    return (
        <header className="h-20 w-full bg-black">
            <div className="container flex h-full items-center justify-between">
                <div className="text-xl">Development</div>

                <div>
                    {user === null ? (
                        <SignInButton />
                    ) : (
                        <ProfileWidget user={user} />
                    )}
                </div>
            </div>
        </header>
    )
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { user } = await validateRequest()

    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <Header user={user} />
                <main>{children}</main>
            </body>
        </html>
    )
}
