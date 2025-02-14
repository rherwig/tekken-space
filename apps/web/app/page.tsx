import { TsHeadline, TsSimpleMoveDisplay } from '@tekken-space/ui/components'
import Link from 'next/link'

function TheWelcomeHeroUnit() {
    return (
        <div className="bg-muted flex flex-col items-center px-4 py-16 dark:bg-black">
            <TsHeadline variant="h1">
                Welcome to <span>Tekken</span>
                <span className="text-green-500">Space</span>
            </TsHeadline>

            <p className="text-muted-foreground text-center lg:text-xl">
                A community project to share moves and combos for Tekken 8
                characters.
            </p>
        </div>
    )
}

export default function Home() {
    return (
        <>
            <TheWelcomeHeroUnit />

            <div className="container mt-8 px-4">
                <p className="mb-2">
                    With TekkenSpace, you can manage combos and move-lists for
                    your favorite Tekken 8 character. You can note your combos
                    down in Tekken Notation and have it displayed as visual
                    notation, supporting different input types, like gamepad and
                    arcade.
                </p>

                <p className="mb-2">
                    This helps beginners or those unaware with Tekken Notation
                    to have a combos like this:
                </p>

                <pre className="mb-2">d/f+2;b+1,2 T!;d+4:2:1+2</pre>

                <p className="mb-2">displayed like this:</p>

                <div className="overflow-x-auto overflow-y-hidden text-xs lg:text-base">
                    <TsSimpleMoveDisplay notation="d/f+2;b+1,2 T!;d+4:2:1+2" />
                </div>

                <p className="mt-4">
                    You can try this out yourself, by using the{' '}
                    <Link href="/share">Share</Link> page.
                </p>
            </div>
        </>
    )
}
