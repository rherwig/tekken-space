'use client'

import { Input } from '#base/input'
import { TsSimpleMoveDisplay } from './simple-move-display'
import { FormEventHandler, Ref } from 'react'

export function TsNotationInput({
    notationRef,
    onInput,
    onKeyDown,
    value,
}: {
    notationRef?: Ref<HTMLDivElement>
    value: string
    onInput: FormEventHandler<HTMLInputElement>
    onKeyDown?: FormEventHandler<HTMLInputElement>
}) {
    return (
        <div className="w-full">
            <div className="bg-background flex h-20 items-center rounded-t-md px-2">
                <div ref={notationRef}>
                    <TsSimpleMoveDisplay notation={value} />
                </div>
            </div>

            <Input
                placeholder="Notation, e.g. d/f+2; 4"
                value={value}
                onInput={onInput}
                onKeyDown={onKeyDown}
                className="rounded-t-none"
                autoFocus
            />
        </div>
    )
}
