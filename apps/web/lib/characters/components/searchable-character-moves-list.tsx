'use client'

import { useMemo, useState } from 'react'
import { type Move } from '@tekken-space/database'
import { CharacterMovesList } from '@/lib/characters/components/character-moves-list'
import {
    CharacterMovesFilters,
    QuickFilters,
} from '@/lib/characters/components/character-moves-filter'
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'

export function SearchableCharacterMovesList({
    characterId,
    moves,
}: {
    moves: Move[]
    characterId: string
}) {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [quickFilter, setQuickFilter] = useState<string>('')

    const filteredMoves = useMemo(() => {
        if (quickFilter === QuickFilters.PlusOnBlock) {
            return moves.filter(
                (move) => parseInt(move.framesOnBlock ?? '', 10) >= 0,
            )
        }

        if (quickFilter === QuickFilters.MinusOnBlock) {
            return moves.filter(
                (move) => parseInt(move.framesOnBlock ?? '', 10) < 0,
            )
        }

        return moves
    }, [moves, quickFilter])

    const searchedMoves = useMemo(() => {
        return filteredMoves.filter((move) =>
            move.notation.startsWith(searchTerm),
        )
    }, [filteredMoves, searchTerm])

    const visibleMoves = useInfiniteScroll<Move>(searchedMoves)

    return (
        <div>
            <CharacterMovesFilters
                onSearch={setSearchTerm}
                onQuickFilter={setQuickFilter}
            />
            <CharacterMovesList
                characterId={characterId}
                moves={visibleMoves}
            />
        </div>
    )
}
