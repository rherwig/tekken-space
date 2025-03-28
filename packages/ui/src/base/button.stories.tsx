import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'

import { Button } from './button'

const meta: Meta<ComponentProps<typeof Button>> = {
    args: {
        children: 'Button',
    },
    argTypes: {
        size: {
            options: ['default', 'sm', 'lg', 'icon'],
            table: {
                defaultValue: {
                    summary: 'default',
                },
            },
        },
        variant: {
            options: [
                'default',
                'secondary',
                'destructive',
                'ghost',
                'outline',
                'link',
            ],
            table: {
                defaultValue: {
                    summary: 'default',
                },
            },
        },
    },
    component: Button,
    title: 'Base/Button',
}

export default meta

type Story = StoryObj<typeof Button>

export const Basic: Story = {}
