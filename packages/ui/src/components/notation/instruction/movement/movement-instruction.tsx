import { ParsedInstruction } from '@tekken-space/parser'

import NeutralInput from './neutral/neutral-input'
import DirectionalInput from './directional/directional-input'

export default function MovementInstruction({
    instruction,
}: {
    instruction: ParsedInstruction
}) {
    const isNeutral = instruction.notation.toLowerCase() === 'n'

    return (
        <>
            {isNeutral && <NeutralInput />}
            {!isNeutral && (
                <DirectionalInput direction={instruction.notation} />
            )}
        </>
    )
}
