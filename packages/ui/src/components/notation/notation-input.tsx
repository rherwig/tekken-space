'use client'

import { Input } from '#base/input'
import TsSimpleMoveDisplay from './simple-move-display'
import { FormEvent, useState } from 'react'

export function TsNotationInput() {
    const [notation, setNotation] = useState('')

    function handleInput(event: FormEvent<HTMLInputElement>) {
        setNotation(event.currentTarget.value)
    }

    return (
        <div>
            <div className="bg-background flex h-20 items-center rounded-t-md px-2">
                <TsSimpleMoveDisplay notation={notation} />
            </div>

            <Input
                placeholder="Notation, e.g. d/f+2; 4"
                value={notation}
                onInput={handleInput}
                className="rounded-t-none"
                autoFocus
            />
        </div>
    )
}
