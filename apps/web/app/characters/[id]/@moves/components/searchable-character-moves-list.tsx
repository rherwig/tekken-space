'use client'

import { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { type Move } from '@tekken-space/database'

import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'
import { CharacterMovesList } from './character-moves-list'
import { CharacterMovesFilters, QuickFilters } from './character-moves-filter'

export function SearchableCharacterMovesList({
    characterId,
    moves,
}: {
    moves: Move[]
    characterId: string
}) {
    const SEARCH_MIN_LENGTH = 1

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [quickFilter, setQuickFilter] = useState<string>('')

    const fuse = new Fuse(moves, {
        distance: 5,
        keys: [
            { name: 'name', weight: 0.2 },
            { name: 'notation', weight: 0.8 },
        ],
        location: 0,
        minMatchCharLength: 0,
        threshold: 0.2,
    })

    const searchedMoves = useMemo(() => {
        if (searchTerm.length < SEARCH_MIN_LENGTH) {
            return moves
        }

        return fuse.search(searchTerm).map((result) => result.item)
    }, [moves, searchTerm])

    const filteredMoves = useMemo(() => {
        if (quickFilter === QuickFilters.PlusOnBlock) {
            return searchedMoves.filter(
                (move) => parseInt(move.framesOnBlockLower ?? '', 10) >= 0,
            )
        }

        if (quickFilter === QuickFilters.MinusOnBlock) {
            return searchedMoves.filter(
                (move) => parseInt(move.framesOnBlockLower ?? '', 10) < 0,
            )
        }

        return searchedMoves
    }, [searchedMoves, quickFilter])

    const visibleMoves = useInfiniteScroll<Move>(filteredMoves)

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
