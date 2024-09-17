import { TsSimpleMoveDisplay } from './simple-move-display'
import { TsChip } from '../chip/chip'

interface Props {
    notation: string
    name?: string | null
    damageTotal?: string | null
    framesOnBlock?: string | null
    framesOnHit?: string | null
    framesOnCounterHit?: string | null
    framesOnStartup?: string | null
}

export function TsAdvancedMoveDisplay(props: Props) {
    const headline = [props.name, props.notation].filter(Boolean).join(' - ')

    return (
        <div className="bg-black p-4">
            <div className="mb-2 font-bold">{headline}</div>
            <TsSimpleMoveDisplay notation={props.notation} />

            <div className="mt-4">
                {props.damageTotal && (
                    <TsChip color="danger">{props.damageTotal}</TsChip>
                )}
            </div>
        </div>
    )
}
