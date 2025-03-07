'use client'

import { cva } from 'class-variance-authority'
import { ParsedInstruction } from '@tekken-space/parser'
import { cn } from '@tekken-space/ui/utils'

import {
    NotationThemes,
    useNotationTheme,
} from '#providers/notation-theme-provider'

const rootVariants = cva('size-[3.5em] relative')

const buttonVariants = cva(
    'absolute size-[39%] border border-transparent rounded-full flex items-center justify-center font-medium leading-none bg-blue-200 bg-gray-200 bg-button-background text-secondary/75',
    {
        compoundVariants: [
            {
                className: 'left-0 bottom-0 -translate-y-full ml-1.5 mb-0.5',
                index: 1,
                layout: NotationThemes.ARCADE,
            },
            {
                className: 'right-0 top-0 translate-x-0 mr-1.5',
                index: 2,
                layout: NotationThemes.ARCADE,
            },
            {
                className: 'left-0 bottom-0 translate-x-0 ml-1.5',
                index: 3,
                layout: NotationThemes.ARCADE,
            },
            {
                className: 'right-0 top-0 translate-y-full mr-1.5 mt-0.5',
                index: 4,
                layout: NotationThemes.ARCADE,
            },
            {
                className: 'left-0 top-1/2 -translate-y-1/2',
                index: 1,
                layout: NotationThemes.GAMEPAD,
            },
            {
                className: 'top-0 left-1/2 -translate-x-1/2',
                index: 2,
                layout: NotationThemes.GAMEPAD,
            },
            {
                className: 'bottom-0 left-1/2 -translate-x-1/2',
                index: 3,
                layout: NotationThemes.GAMEPAD,
            },
            {
                className: 'top-1/2 right-0 -translate-y-1/2',
                index: 4,
                layout: NotationThemes.GAMEPAD,
            },
            {
                active: true,
                className: 'bg-button-1-active',
                index: 1,
            },
            {
                active: true,
                className: 'bg-button-2-active',
                index: 2,
            },
            {
                active: true,
                className: 'bg-button-3-active',
                index: 3,
            },
            {
                active: true,
                className: 'bg-button-4-active',
                index: 4,
            },
        ],
        defaultVariants: {
            layout: NotationThemes.ARCADE,
        },
        variants: {
            active: {
                false: [],
                true: [],
            },
            index: {
                1: [],
                2: [],
                3: [],
                4: [],
            },
            layout: {
                [NotationThemes.ARCADE]: [],
            },
        },
    },
)

export default function AttackInstruction({
    instruction,
}: {
    instruction: ParsedInstruction
}) {
    const [theme] = useNotationTheme()

    const buttons = [1, 2, 3, 4]

    return (
        <div className={cn(rootVariants())}>
            {buttons.map((buttonNumber) => (
                <div
                    key={buttonNumber}
                    className={cn(
                        buttonVariants({
                            active: instruction.notation.includes(
                                buttonNumber.toString(),
                            ),
                            index: buttonNumber,
                            layout: theme.id,
                        }),
                    )}
                    data-button={buttonNumber}
                >
                    {buttonNumber}
                </div>
            ))}
        </div>
    )
}
