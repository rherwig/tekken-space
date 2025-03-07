import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'

import { createAttackInstruction } from '#fixtures/instruction'
import {
    NotationThemeProvider,
    NotationThemes,
} from '#providers/notation-theme-provider'
import TsAttackInstruction from './attack-instruction'

const meta: Meta<ComponentProps<typeof TsAttackInstruction>> = {
    component: TsAttackInstruction,
    render: ({ ...args }) => {
        return (
            <NotationThemeProvider theme={{ id: NotationThemes.ARCADE }}>
                <TsAttackInstruction {...args} />
            </NotationThemeProvider>
        )
    },
    title: 'Components/Notation/AttackInstruction',
}

export default meta

type Story = StoryObj<typeof TsAttackInstruction>

export const Basic: Story = {
    args: {
        instruction: createAttackInstruction('1+2'),
    },
}
