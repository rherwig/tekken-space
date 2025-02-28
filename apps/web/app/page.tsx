import {
    TsLink,
    TsParagraph,
    TsSimpleMoveDisplay,
} from '@tekken-space/ui/components'
import { TheWelcomeHeroUnit } from '@/app/components/the-welcome-hero-unit'

export default function Home() {
    return (
        <>
            <TheWelcomeHeroUnit />

            <div className="container mt-8 px-4">
                <TsParagraph className="mb-2">
                    With TekkenSpace, you can manage combos and move-lists for
                    your favorite Tekken 8 character. You can note your combos
                    down in Tekken Notation and have it displayed as visual
                    notation, supporting different input types, like gamepad and
                    arcade.
                </TsParagraph>

                <TsParagraph className="mb-2">
                    This helps beginners or those unaware with Tekken Notation
                    to have a combos like this:
                </TsParagraph>

                <pre className="mb-2">d/f+2;b+1,2 T!;d+4:2:1+2</pre>

                <TsParagraph className="mb-2">displayed like this:</TsParagraph>

                <div className="overflow-x-auto overflow-y-hidden text-xs lg:text-base">
                    <TsSimpleMoveDisplay notation="d/f+2;b+1,2 T!;d+4:2:1+2" />
                </div>

                <TsParagraph className="mt-4">
                    You can try this out yourself, by using the{' '}
                    <TsLink href="/share">Share</TsLink> page.
                </TsParagraph>
            </div>
        </>
    )
}
