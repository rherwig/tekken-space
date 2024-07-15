import { Link } from '@nextui-org/react'
import type { Profile } from '@tekken-space/database'

import TheProfileWidget from '@/components/profile/the-profile-widget'
import NavItem from '@/components/layout/navigation/nav-item'
import TheSignInButton from '@/components/profile/the-sign-in-button'

export default function TheHeader({ user }: { user: Profile | null }) {
    return (
        <header className="h-20 w-full bg-black">
            <div className="container flex h-full items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link className="font-bold" href="/">
                        TekkenSpace
                    </Link>
                    <nav className="flex items-center">
                        <ul className="m-0 flex items-center p-0">
                            <NavItem href="/characters">Characters</NavItem>
                        </ul>
                    </nav>
                </div>

                <div>
                    {user === null ? (
                        <TheSignInButton />
                    ) : (
                        <TheProfileWidget user={user} />
                    )}
                </div>
            </div>
        </header>
    )
}
