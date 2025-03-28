import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'

import { Input as Component } from './input'

const meta: Meta<ComponentProps<typeof Component>> = {
    component: Component,
    title: 'Base/Input',
}

export default meta

type Story = StoryObj<typeof Component>

export const Basic: Story = {}
