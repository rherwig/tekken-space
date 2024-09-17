import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'

import { TsDialog } from './dialog'

const meta: Meta<ComponentProps<typeof TsDialog>> = {
    component: TsDialog,
    render(args) {
        return <TsDialog {...args}>Children</TsDialog>
    },
    title: 'Components/Dialog',
}

export default meta

type Story = StoryObj<typeof TsDialog>

export const Basic: Story = {
    args: {
        cancelCaption: 'Discard',
        caption: 'Open Dialog',
        confirmCaption: 'Save Changes',
        description: 'Make changes and save.',
        onCancel: () => {},
        onConfirm: () => {},
        title: 'Edit Profile',
    },
}
