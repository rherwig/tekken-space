import { TsHeadline, TsParagraph } from '@tekken-space/ui/components'

export function TheWelcomeHeroUnit() {
    return (
        <div className="bg-muted flex flex-col items-center px-4 py-16 dark:bg-black">
            <TsHeadline variant="h1">
                Welcome to <span>Tekken</span>
                <span className="text-green-500">Space</span>
            </TsHeadline>

            <TsParagraph className="text-muted-foreground text-center lg:text-xl">
                A community project to share moves and combos for Tekken 8
                characters.
            </TsParagraph>
        </div>
    )
}
