import { cn } from '#utils'

import styles from './chip.module.scss'

interface Props {
    color?: 'primary' | 'danger'
    children: React.ReactNode
}

export function TsChip({ children, color }: Props) {
    return (
        <div
            className={cn(styles.root, {
                [styles.danger]: color === 'danger',
                [styles.primary]: color === 'primary',
            })}
        >
            {children}
        </div>
    )
}
