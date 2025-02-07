import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'

import { TsHeadline } from './headline'

const meta: Meta<ComponentProps<typeof TsHeadline>> = {
    component: TsHeadline,
    render: ({ ...args }) => {
        return <TsHeadline {...args}>Headline</TsHeadline>
    },
    title: 'Typography/Headline',
}

export default meta

type Story = StoryObj<typeof TsHeadline>

export const Basic: Story = {}
