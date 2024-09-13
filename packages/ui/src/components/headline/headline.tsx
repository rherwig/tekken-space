import { cva } from 'class-variance-authority'
import { cn } from '#utils'

const headlineVariants = cva('scroll-m-20 tracking-tight text-foreground', {
    defaultVariants: {
        variant: 'h1',
    },
    variants: {
        variant: {
            h1: 'text-4xl font-extrabold',
            h2: 'text-3xl font-extrabold',
            h3: 'text-2xl font-semibold',
            h4: 'text-xl font-semibold',
        },
    },
})

interface Props {
    variant: 'h1' | 'h2' | 'h3' | 'h4'
    children?: React.ReactNode
}

export function TsHeadline({ children, variant }: Props) {
    return <h1 className={cn(headlineVariants({ variant }))}>{children}</h1>
}
