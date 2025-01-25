import type { Move } from '@tekken-space/database'
import { TsAdvancedMoveDisplay } from '@tekken-space/ui/components'

export function CharacterMove({ move }: { move: Move }) {
    // FIXME: Change move display to number
    const damageTotal = move.damageHits?.reduce(
        (total, damage) => total + damage,
        0,
    )

    const framesOnBlock = move.framesOnBlockLower
    const framesOnCounterHit = move.framesOnCounterLower
    const framesOnHit = move.framesOnHitLower
    // FIXME: Remove duplicate `i`
    const framesOnStartup = move.framesOnStartupLower

    return (
        <div>
            <TsAdvancedMoveDisplay
                damageTotal={damageTotal}
                framesOnCounterHit={framesOnCounterHit}
                framesOnBlock={framesOnBlock}
                framesOnHit={framesOnHit}
                framesOnStartup={framesOnStartup}
                notation={move.notation}
                name={move.name}
            />
        </div>
    )
}
