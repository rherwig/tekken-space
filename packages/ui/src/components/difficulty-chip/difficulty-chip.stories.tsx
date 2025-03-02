import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'

import { TsDifficultyChip } from './difficulty-chip'
import { CharacterDifficulty } from '@tekken-space/types'

const meta: Meta<ComponentProps<typeof TsDifficultyChip>> = {
    args: {
        difficulty: CharacterDifficulty.Beginner,
    },
    argTypes: {
        difficulty: {
            control: {
                type: 'select',
            },
            description: 'The difficulty variant of the chip',
            options: Object.keys(CharacterDifficulty) as string[],
            table: {
                defaultValue: { summary: CharacterDifficulty.Beginner },
                type: { summary: 'string' },
            },
        },
    },
    component: TsDifficultyChip,
    render: ({ ...args }) => {
        return <TsDifficultyChip {...args}>Chip</TsDifficultyChip>
    },
    title: 'Components/Chips/DifficultyChip',
}

export default meta

type Story = StoryObj<typeof TsDifficultyChip>

export const Basic: Story = {}
