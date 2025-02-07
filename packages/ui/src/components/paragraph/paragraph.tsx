import { cva } from 'class-variance-authority'
import { cn } from '#utils'

interface Props extends React.HTMLProps<HTMLParagraphElement> {
    className?: string
    children?: React.ReactNode
}

const paragraph = cva('leading-7')

export function TsParagraph({ children, className, ...props }: Props) {
    return (
        <p className={cn(paragraph(), className)} {...props}>
            {children}
        </p>
    )
}
