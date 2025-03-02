import React from 'react'
import { cn } from '#utils'
import { CharacterArchetypes } from '@tekken-space/types'

import { TsChip, TsChipProps } from '../chip/chip'
import { capitalize } from '../../utils/text'

interface TsArchetypeChipProps extends React.HTMLProps<HTMLDivElement> {
    archetype: CharacterArchetypes
    className?: string
}

const colorVariants: Record<CharacterArchetypes, TsChipProps['variant']> = {
    [CharacterArchetypes.FiftyFifty]: 'green',
    [CharacterArchetypes.Mishima]: 'purple',
}

export const TsArchetypeChip = React.forwardRef<
    HTMLDivElement,
    TsArchetypeChipProps
>(({ archetype, className }, ref) => {
    const label = capitalize(archetype)
    const variant = colorVariants[archetype]

    return (
        <TsChip ref={ref} variant={variant} className={cn(className)}>
            {label}
        </TsChip>
    )
})
