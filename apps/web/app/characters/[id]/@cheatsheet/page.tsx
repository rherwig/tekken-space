import { Move } from '@tekken-space/database'
import { TsHeadline, TsSimpleMoveDisplay } from '@tekken-space/ui/components'

function CharacterOverviewTile({
    moves,
    title,
}: {
    moves: Move[]
    title: string
}) {
    return (
        <div className="gap-4 rounded-md bg-black py-4">
            <TsHeadline variant="h3" className="mb-4 px-4">
                {title}
            </TsHeadline>
            <div className="flex flex-col">
                {moves.map((move) => (
                    <div
                        key={move.id}
                        className="flex items-center justify-between gap-8 px-4 py-2 text-sm odd:bg-white/5"
                    >
                        <div className="text-xl">
                            i{move.framesOnStartupLower}
                        </div>
                        <TsSimpleMoveDisplay notation={move.notation} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default async function CharacterPage() {
    const punishers: Move[] = []

    return (
        <div className="container py-4">
            <div className="grid grid-cols-4 gap-4">
                <CharacterOverviewTile title="Punishment" moves={punishers} />
            </div>
        </div>
    )
}
