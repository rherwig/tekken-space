import React from 'react'
import { cn } from '#utils'

import { cva, VariantProps } from 'class-variance-authority'

export interface TsChipProps
    extends React.HTMLProps<HTMLDivElement>,
        VariantProps<typeof chipVariants> {
    children: React.ReactNode
}

export const chipVariants = cva('inline-block rounded-xl px-4 py-1', {
    defaultVariants: {
        variant: 'gray',
    },
    variants: {
        variant: {
            blue: 'bg-blue-500 text-blue-100',
            gray: 'bg-gray-900 text-gray-100',
            green: 'bg-green-400 text-green-900',
            purple: 'bg-purple-400 text-purple-900',
            red: 'bg-red-400 text-red-900',
            yellow: 'bg-yellow-500 text-yellow-900',
        },
    },
})

export const TsChip = React.forwardRef<HTMLDivElement, TsChipProps>(
    ({ children, className, variant }, ref) => {
        return (
            <div ref={ref} className={cn(chipVariants({ className, variant }))}>
                {children}
            </div>
        )
    },
)
