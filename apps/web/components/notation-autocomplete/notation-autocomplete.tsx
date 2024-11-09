'use client'

import { Move } from '@tekken-space/database'
import { Popover, PopoverContent, PopoverTrigger } from '@tekken-space/ui/base'
import { TsNotationInput } from '@tekken-space/ui/components'
import { FormEvent, useMemo, useState } from 'react'
import { CornerDownLeft, MoveDown, MoveUp } from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'
import { cn } from '@tekken-space/ui/utils'

const MAX_AUTOCOMPLETE_ITEMS = 10

export function NotationAutocomplete({ moves }: { moves: Move[] }) {
    const [notation, setNotation] = useState('')
    const [cursorIndex, setCursorIndex] = useState(0)
    const [segmentNotation, setSegmentNotation] = useState('')
    const [segmentIndex, setSegmentIndex] = useState(0)

    const matchingMoves = useMemo(() => {
        return moves.filter(
            (move, index) => move.notation.startsWith(notation) && index < 10,
        )
    }, [notation])

    useHotkeys('down', () => {
        const maybeNextValue = cursorIndex + 1
        const nextValue =
            maybeNextValue < MAX_AUTOCOMPLETE_ITEMS ? maybeNextValue : 0

        setCursorIndex(nextValue)
    })

    useHotkeys('up', () => {
        const maybeNextValue = cursorIndex - 1
        const nextValue =
            maybeNextValue < 0 ? MAX_AUTOCOMPLETE_ITEMS - 1 : maybeNextValue

        setCursorIndex(nextValue)
    })

    useHotkeys('enter', () => {
        const focussedMove = matchingMoves[cursorIndex]

        if (focussedMove) {
            insertMoveAtCursor(focussedMove)
        }
    })

    function handleKeyDown(event: FormEvent<HTMLInputElement>) {
        const input = event.currentTarget
        if (!input) {
            return
        }

        const cursorPosition = input.selectionStart ?? 0
        const segments = input.value.split(';')

        let segmentStartIndex = 0
        let currentSegment = ''

        for (const segment of segments) {
            const segmentEndIndex = segmentStartIndex + segment.length

            if (
                cursorPosition >= segmentStartIndex &&
                cursorPosition <= segmentEndIndex
            ) {
                currentSegment = segment
                break
            }

            segmentStartIndex = segmentEndIndex + 1 // +1 to account for the semicolon
        }

        setSegmentIndex(segmentStartIndex)
        setSegmentNotation(currentSegment)

        console.log(currentSegment, segmentStartIndex)
    }

    function insertMoveAtCursor(move: Move) {
        setNotation(`${notation}${move.notation};`)
    }

    function handleInput(event: FormEvent<HTMLInputElement>) {
        setNotation(event.currentTarget.value)
    }

    return (
        <div className="w-full">
            <TsNotationInput
                value={notation}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
            />

            <Popover open={true}>
                <PopoverTrigger></PopoverTrigger>
                <PopoverContent
                    align="start"
                    sideOffset={-12}
                    className="border-muted-foreground p-0"
                >
                    <div>
                        <ul className="divide-muted-foreground grid grid-cols-1 items-center divide-y font-mono">
                            {matchingMoves.map((move, index) => (
                                <li
                                    key={index}
                                    className={cn(
                                        'flex cursor-pointer justify-between p-2 transition-colors hover:bg-green-400/50',
                                        {
                                            'bg-green-400/50':
                                                index === cursorIndex,
                                        },
                                    )}
                                >
                                    {move.notation}
                                </li>
                            ))}

                            {matchingMoves.length === 0 && (
                                <li className="mt-2 p-2 text-center text-sm text-white/50">
                                    No suggestions.
                                </li>
                            )}
                        </ul>

                        <div className="text-muted-foreground p-2 text-sm">
                            <div className="flex items-center">
                                Use
                                <span className="mx-1 inline-flex items-center">
                                    <MoveUp size="14" />
                                    <MoveDown size="14" />
                                </span>
                                to move between suggestions.
                            </div>

                            <div className="flex items-center">
                                Press
                                <CornerDownLeft size="14" className="mx-1" /> to
                                complete.
                            </div>
                        </div>

                        <div className="p-2 font-mono text-sm">
                            <div>Current Segment: {segmentIndex}</div>
                            <div>Current Content: {segmentNotation}</div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
