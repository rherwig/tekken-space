import { TsSimpleMoveDisplay } from './simple-move-display'
import { TsChip } from '../chip/chip'
import { Crosshair, Shield, Sword, Syringe, Timer } from 'lucide-react'
import { cn } from '../../utils'

interface Props {
    notation: string
    name?: string | null
    damageTotal?: number | null
    framesOnBlock?: string | null
    framesOnHit?: string | null
    framesOnCounterHit?: string | null
    framesOnStartup?: string | null
    children?: React.ReactNode
}

function FramesItem({
    children,
    className,
    ...props
}: React.LiHTMLAttributes<HTMLLIElement>) {
    return (
        <li className={cn('flex items-center gap-1', className)} {...props}>
            {children}
        </li>
    )
}

function getBlockFrameStyles(framesString?: string | null) {
    if (!framesString) {
        return ''
    }

    const frames = parseInt(framesString, 10)
    if (Number.isNaN(frames)) {
        return 'text-foreground'
    }

    // Plus moves
    if (frames > 0) {
        return 'text-blue-400'
    }

    // Safe moves
    if (frames < 0 && frames > -10) {
        return 'text-foreground'
    }

    // Unsafe moves
    if (frames <= -10 && frames >= -14) {
        return 'text-warning'
    }

    // Highly unsafe moves
    if (frames <= -15) {
        return 'text-danger'
    }

    return 'text-foreground'
}

function getHitFrameStyles(framesString?: string | null) {
    if (!framesString) {
        return ''
    }

    const frames = parseInt(framesString, 10)
    if (Number.isNaN(frames)) {
        return 'text-foreground'
    }

    if (frames < 0) {
        return 'text-red-500'
    }

    if (frames >= 10) {
        return 'text-blue-400'
    }

    if (frames >= 15) {
        return 'text-green-400'
    }

    return 'text-foreground'
}

function FramesDisplay(props: {
    damageTotal?: number | null
    framesOnBlock?: string | null
    framesOnHit?: string | null
    framesOnCounterHit?: string | null
    framesOnStartup?: string | null
}) {
    const baseStyles = 'px-2'
    const blockFrameStyles = cn(
        getBlockFrameStyles(props.framesOnBlock),
        baseStyles,
    )
    const hitFrameStyles = cn(getHitFrameStyles(props.framesOnHit), baseStyles)
    const counterHitFrameStyles = cn(
        getHitFrameStyles(props.framesOnCounterHit),
        baseStyles,
    )

    return (
        <div className="flex items-center gap-2">
            <TsChip className="!pl-1 !pr-2">
                <ul className="flex">
                    <FramesItem>
                        <Timer />
                        {!!props.framesOnStartup ? props.framesOnStartup : '-'}
                    </FramesItem>
                </ul>
            </TsChip>

            <TsChip className="!px-0">
                <ul className="divide-muted flex divide-x">
                    <FramesItem className={blockFrameStyles}>
                        <Shield />
                        {!!props.framesOnBlock ? props.framesOnBlock : '-'}
                    </FramesItem>

                    <FramesItem className={hitFrameStyles}>
                        <Crosshair />
                        {!!props.framesOnHit ? props.framesOnHit : '-'}
                    </FramesItem>

                    <FramesItem className={counterHitFrameStyles}>
                        <Sword />
                        {!!props.framesOnCounterHit
                            ? props.framesOnCounterHit
                            : '-'}
                    </FramesItem>
                </ul>
            </TsChip>

            <TsChip className="!pl-1 !pr-2">
                <ul className="flex">
                    <FramesItem>
                        <Syringe />
                        {!!props.damageTotal && !Number.isNaN(props.damageTotal)
                            ? `${props.damageTotal}`
                            : '-'}
                    </FramesItem>
                </ul>
            </TsChip>
        </div>
    )
}

export function TsAdvancedMoveDisplay(props: Props) {
    const headline = [props.name, props.notation].filter(Boolean).join(' - ')

    return (
        <div className="bg-black p-4">
            <div className="mb-2 flex justify-between">
                <div className="font-bold">{headline}</div>
                {props.children}
            </div>
            <TsSimpleMoveDisplay notation={props.notation} />

            <div className="mt-4">
                <FramesDisplay {...props} />
            </div>
        </div>
    )
}
