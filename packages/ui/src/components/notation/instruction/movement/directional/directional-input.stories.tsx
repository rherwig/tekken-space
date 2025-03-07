import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'

import TsDirectionalInput from './directional-input'

const meta: Meta<ComponentProps<typeof TsDirectionalInput>> = {
    component: TsDirectionalInput,
    render: ({ ...args }) => {
        return <TsDirectionalInput {...args} />
    },
    title: 'Components/Notation/Movement/DirectionalInput',
}

export default meta

type Story = StoryObj<typeof TsDirectionalInput>

export const Basic: Story = {
    args: {
        direction: 'f',
    },
}
