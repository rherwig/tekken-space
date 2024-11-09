import { TheNavigation } from '@/components/layout/navigation/the-navigation'
import { useAuth } from '@/hooks/use-auth'

export default async function TheHeader() {
    const { user } = await useAuth()

    return (
        <header className="bg-background text-foreground">
            <div className="container flex h-20 w-full items-center justify-between">
                <div className="flex items-center gap-8">
                    <a className="font-logo text-lg italic" href="/">
                        <span>Tekken</span>
                        <span className="text-green-500">Space</span>
                    </a>

                    <TheNavigation />
                </div>

                <div className="flex gap-2">
                    {/*<ControllerLayoutSwitch />*/}

                    {/*<TsColorModeSwitch />*/}

                    {/*{user === null ? (*/}
                    {/*    <TheSignInButton />*/}
                    {/*) : (*/}
                    {/*    <TheProfileWidget user={user} />*/}
                    {/*)}*/}
                </div>
            </div>
        </header>
    )
}
