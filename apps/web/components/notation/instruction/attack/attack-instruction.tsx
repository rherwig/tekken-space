import { ParsedInstruction } from '@tekken-space/parser'
import clsx from 'clsx'

import styles from './attack-instruction.module.scss'

export default function AttackInstruction({
    instruction,
}: {
    instruction: ParsedInstruction
}) {
    const buttons = [1, 2, 3, 4]

    return (
        <div className={clsx(styles.root, styles.isGamepad)}>
            {buttons.map((buttonNumber) => (
                <div
                    key={buttonNumber}
                    className={clsx(
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
