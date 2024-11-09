'use client'

import { Input } from '@tekken-space/ui/base'
import { FormEvent, useState } from 'react'
import { TsCombobox } from '@tekken-space/ui/components'

interface Props {
    onSearch: (term: string) => void
    onQuickFilter: (filter: string) => void
}

export enum QuickFilters {
    None = 'none',
    PlusOnBlock = 'plusOnBlock',
    MinusOnBlock = 'minusOnBlock',
}

const quickFilterOptions: { label: string; value: string }[] = [
    {
        label: 'Plus on Block',
        value: QuickFilters.PlusOnBlock,
    },
    {
        label: 'Minus on Block',
        value: QuickFilters.MinusOnBlock,
    },
]

export function CharacterMovesFilters({ onQuickFilter, onSearch }: Props) {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [quickFilter, setQuickFilter] = useState<string>('')

    function handleInput(event: FormEvent<HTMLInputElement>) {
        const term = event.currentTarget.value

        setSearchTerm(term)
        onSearch(term)
    }

    function handleQuickFilterChange(value: string) {
        setQuickFilter(value)
        onQuickFilter(value)
    }

    return (
        <div className="flex gap-2">
            <Input
                placeholder="Search notation, e.g. df2"
                value={searchTerm}
                onInput={handleInput}
            />

            <TsCombobox
                value={quickFilter}
                onChange={handleQuickFilterChange}
                options={quickFilterOptions}
                placeholder="Quick Filter"
            />
        </div>
    )
}
