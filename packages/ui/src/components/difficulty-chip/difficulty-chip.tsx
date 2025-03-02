import React from 'react'
import { cn } from '#utils'
import { CharacterDifficulty } from '@tekken-space/types'

import { TsChip, TsChipProps } from '../chip/chip'
import { capitalize } from '../../utils/text'

interface TsDifficultyChipProps extends React.HTMLProps<HTMLDivElement> {
    difficulty: CharacterDifficulty
    className?: string
}

const colorVariants: Record<CharacterDifficulty, TsChipProps['variant']> = {
    [CharacterDifficulty.Beginner]: 'blue',
    [CharacterDifficulty.Challenge]: 'purple',
    [CharacterDifficulty.Easy]: 'green',
    [CharacterDifficulty.Hard]: 'red',
    [CharacterDifficulty.Intermediate]: 'yellow',
}

export const TsDifficultyChip = React.forwardRef<
    HTMLDivElement,
    TsDifficultyChipProps
>(({ className, difficulty }, ref) => {
    const label = capitalize(difficulty)
    const variant = colorVariants[difficulty]

    return (
        <TsChip ref={ref} variant={variant} className={cn(className)}>
            {label}
        </TsChip>
    )
})
