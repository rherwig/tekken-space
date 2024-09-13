import type { Profile } from '@tekken-space/database'
import { TsColorModeSwitch } from '@tekken-space/ui/components'

import TheSignInButton from '@/components/profile/the-sign-in-button'
import { TheNavigation } from '@/components/layout/navigation/the-navigation'

export default function TheHeader({ user }: { user: Profile | null }) {
    return (
        <header className="bg-background text-foreground">
            <div className="container flex h-20 w-full items-center justify-between">
                <div className="flex items-center gap-8">
                    <a className="font-bold" href="/">
                        TekkenSpace
                    </a>

                    <TheNavigation />
                </div>

                <div className="flex gap-2">
                    {user === null ? (
                        <TheSignInButton />
                    ) : (
                        <div>@{user.handle}</div>
                    )}

                    <TsColorModeSwitch />
                </div>
            </div>
        </header>
    )
}
