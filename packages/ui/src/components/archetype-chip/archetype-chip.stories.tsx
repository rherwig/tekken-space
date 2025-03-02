import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { CharacterArchetypes } from '@tekken-space/types'

import { TsArchetypeChip } from './archetype-chip'

const meta: Meta<ComponentProps<typeof TsArchetypeChip>> = {
    args: {
        archetype: CharacterArchetypes.Mishima,
    },
    argTypes: {
        archetype: {
            control: {
                type: 'select',
            },
            description: 'The archetype variant of the chip',
            options: Object.keys(CharacterArchetypes) as string[],
            table: {
                defaultValue: { summary: CharacterArchetypes.Mishima },
                type: { summary: 'string' },
            },
        },
    },
    component: TsArchetypeChip,
    render: ({ ...args }) => {
        return <TsArchetypeChip {...args}>Chip</TsArchetypeChip>
    },
    title: 'Components/Chips/ArchetypeChip',
}

export default meta

type Story = StoryObj<typeof TsArchetypeChip>

export const Basic: Story = {}
