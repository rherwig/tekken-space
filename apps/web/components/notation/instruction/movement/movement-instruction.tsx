import { ParsedInstruction } from '@tekken-space/parser'
import NeutralInput from '@/components/notation/instruction/movement/neutral/neutral-input'
import DirectionalInput from '@/components/notation/instruction/movement/directional/directional-input'

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
