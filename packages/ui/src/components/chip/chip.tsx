import React from 'react'
import { cn } from '#utils'

import styles from './chip.module.scss'

interface TsChipProps extends React.HTMLProps<HTMLDivElement> {
    color?: 'primary' | 'danger'
    children: React.ReactNode
}

export const TsChip = React.forwardRef<HTMLDivElement, TsChipProps>(
    ({ children, className, color }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    styles.root,
                    {
                        'bg-danger': color === 'danger',
                        'bg-primary text-primary-foreground':
                            color === 'primary',
                    },
                    className,
                )}
            >
                {children}
            </div>
        )
    },
)
