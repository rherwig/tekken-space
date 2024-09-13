import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'

import { TsDialog } from './dialog'

const meta: Meta<ComponentProps<typeof TsDialog>> = {
    component: TsDialog,
    title: 'Components/Dialog',
}

export default meta

type Story = StoryObj<typeof TsDialog>

export const Basic: Story = {}
