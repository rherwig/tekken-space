import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'

import { TsParagraph } from './paragraph'

const meta: Meta<ComponentProps<typeof TsParagraph>> = {
    component: TsParagraph,
    render: ({ ...args }) => {
        return (
            <TsParagraph {...args}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                accusantium assumenda, atque delectus ipsa, itaque modi nam
                nihil non odit officia omnis pariatur provident quis quod
                reprehenderit sequi, suscipit ut!
            </TsParagraph>
        )
    },
    title: 'Typography/Paragraph',
}

export default meta

type Story = StoryObj<typeof TsParagraph>

export const Basic: Story = {}
