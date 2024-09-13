import { InstructionSubType, ParsedInstruction } from '@tekken-space/parser'
import { TsChip } from '../../../chip/chip'

export default function SpecialInstruction({
    instruction,
}: {
    instruction: ParsedInstruction
}) {
    return (
        <>
            {instruction.subType === InstructionSubType.HEAT && (
                <TsChip color="primary">{instruction.value}</TsChip>
            )}

            {instruction.subType === InstructionSubType.RAGE && (
                <TsChip color="danger">{instruction.value}</TsChip>
            )}

            {instruction.subType === InstructionSubType.STANCE && (
                <TsChip>{instruction.value}</TsChip>
            )}
        </>
    )
}
