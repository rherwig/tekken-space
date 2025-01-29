import { TheNavigation } from '@/components/layout/navigation/the-navigation'
import { TheColorModeSwitch } from '@/components/layout/color-mode-switch/the-color-mode-switch'
import { FeatureNames, FeatureToggle } from '@/components/utils/feature-toggle'
import { ControllerLayoutSwitch } from '@/components/layout/controller-layout-switch/controller-layout-switch'
import { SidebarProvider, SidebarTrigger } from '@tekken-space/ui/base'
import { TheSidebar } from '@/components/layout/navigation/the-sidebar'

export default async function TheHeader() {
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
                    <ControllerLayoutSwitch />

                    <FeatureToggle name={FeatureNames.ColorMode}>
                        <TheColorModeSwitch />
                    </FeatureToggle>

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
