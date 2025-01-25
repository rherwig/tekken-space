'use client'

import { type Move } from '@tekken-space/database'
import { CharacterMove } from './character-move'

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
                <CharacterMove key={move.id} move={move} />
            ))}
        </div>
    )
}
