import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'

import { TsColorModeSwitch } from './color-mode-switch'

const meta: Meta<ComponentProps<typeof TsColorModeSwitch>> = {
    component: TsColorModeSwitch,
    title: 'Components/Color Mode Switch',
}

export default meta

type Story = StoryObj<typeof TsColorModeSwitch>

export const Basic: Story = {}
