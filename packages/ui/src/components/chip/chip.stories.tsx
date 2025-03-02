import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'

import { TsChip } from './chip'

const meta: Meta<ComponentProps<typeof TsChip>> = {
    args: {
        color: 'gray',
    },
    argTypes: {
        color: {
            control: {
                type: 'select',
            },
            description: 'The color variant of the chip',
            options: ['blue', 'gray', 'green', 'purple', 'red', 'yellow'],
            table: {
                defaultValue: { summary: 'gray' },
                type: { summary: 'string' },
            },
        },
    },
    component: TsChip,
    render: ({ ...args }) => {
        return <TsChip {...args}>Chip</TsChip>
    },
    title: 'Components/Chips/Chip',
}

export default meta

type Story = StoryObj<typeof TsChip>

export const Basic: Story = {}
