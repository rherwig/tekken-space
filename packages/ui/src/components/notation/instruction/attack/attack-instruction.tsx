import { ParsedInstruction } from '@tekken-space/parser'

import styles from './attack-instruction.module.scss'
import { cn } from '@tekken-space/ui/utils'

export default function AttackInstruction({
    instruction,
}: {
    instruction: ParsedInstruction
}) {
    const buttons = [1, 2, 3, 4]

    return (
        <div className={cn(styles.root, styles.isGamepad)}>
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
