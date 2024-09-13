import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'

import { TsChip } from './chip'

const meta: Meta<ComponentProps<typeof TsChip>> = {
    component: TsChip,
    render: ({ ...args }) => {
        return <TsChip {...args}>Chip</TsChip>
    },
    title: 'Components/Chip',
}

export default meta

type Story = StoryObj<typeof TsChip>

export const Basic: Story = {}
