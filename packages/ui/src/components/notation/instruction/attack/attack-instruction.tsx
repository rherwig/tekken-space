'use client'

import { ParsedInstruction } from '@tekken-space/parser'
import { cn } from '@tekken-space/ui/utils'

import styles from './attack-instruction.module.scss'

import { NotationThemes, useNotationTheme } from '../../../../providers'
import { useMemo } from 'react'
import { ClassValue } from 'clsx'

export default function AttackInstruction({
    instruction,
}: {
    instruction: ParsedInstruction
}) {
    const [theme] = useNotationTheme()

    const buttons = [1, 2, 3, 4]

    const themeStyles = useMemo<ClassValue>(() => {
        switch (theme.id) {
            case NotationThemes.GAMEPAD:
                return styles.isGamepad
            case NotationThemes.ARCADE:
                return styles.isArcade
            default:
                return styles.isArcade
        }
    }, [theme.id])

    return (
        <div className={cn(styles.root, themeStyles)}>
            {buttons.map((buttonNumber) => (
                <div
                    key={buttonNumber}
                    className={cn(
                        styles.button,
                        instruction.notation.includes(
                            buttonNumber.toString(),
                        ) && styles.isActive,
                    )}
                    data-button={buttonNumber}
                >
                    {buttonNumber}
                </div>
            ))}
        </div>
    )
}
