'use client'

import { Move } from '@tekken-space/database'
import { TsAdvancedMoveDisplay } from '@tekken-space/ui/components'

export function CharacterMovesList({
    characterId,
    moves,
}: {
    moves: Move[]
    characterId: string
}) {
    return (
        <div className="mt-4 flex flex-col gap-4">
            {moves.map((move) => (
                <div key={move.id}>
                    <TsAdvancedMoveDisplay
                        damageTotal={move.damageTotal}
                        framesOnCounterHit={move.framesOnCounterHit}
                        framesOnBlock={move.framesOnBlock}
                        framesOnHit={move.framesOnHit}
                        framesOnStartup={move.framesOnStartup}
                        notation={move.notation}
                        name={move.name}
                    />
                </div>
            ))}
        </div>
    )
}
