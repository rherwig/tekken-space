import { ParsedInstruction } from '@tekken-space/parser'
import { TsChip } from '../../../chip/chip'

export default function TextInstruction({
    instruction,
}: {
    instruction: ParsedInstruction
}) {
    const text = instruction.notation.replace(/[()]/g, '')

    return <TsChip>{text}</TsChip>
}
