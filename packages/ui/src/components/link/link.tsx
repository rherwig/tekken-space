import { cva } from 'class-variance-authority'
import { cn } from '#utils'

interface Props extends React.HTMLProps<HTMLAnchorElement> {
    className?: string
    children?: React.ReactNode
}

const link = cva('underline hover:text-green-500 transition-colors font-medium')

export function TsLink({ children, className, ...props }: Props) {
    return (
        <a className={cn(link(), className)} {...props}>
            {children}
        </a>
    )
}
