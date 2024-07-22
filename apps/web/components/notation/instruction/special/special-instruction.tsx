import { InstructionSubType, ParsedInstruction } from '@tekken-space/parser'
import { Chip } from '@nextui-org/react'

export default function SpecialInstruction({
    instruction,
}: {
    instruction: ParsedInstruction
}) {
    return (
        <>
            {instruction.subType === InstructionSubType.HEAT && (
                <Chip color="primary">{instruction.value}</Chip>
            )}

            {instruction.subType === InstructionSubType.RAGE && (
                <Chip color="danger">{instruction.value}</Chip>
            )}

            {instruction.subType === InstructionSubType.STANCE && (
                <Chip>{instruction.value}</Chip>
            )}
        </>
    )
}
