import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'

import { TsLink } from './link'

const meta: Meta<ComponentProps<typeof TsLink>> = {
    component: TsLink,
    render: ({ ...args }) => {
        return <TsLink {...args}>This is a link</TsLink>
    },
    title: 'Typography/Link',
}

export default meta

type Story = StoryObj<typeof TsLink>

export const Basic: Story = {}
