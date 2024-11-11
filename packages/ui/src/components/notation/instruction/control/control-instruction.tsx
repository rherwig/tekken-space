import { InstructionSubType, ParsedInstruction } from '@tekken-space/parser'
import { TsChip } from '../../../chip/chip'

export default function ControlInstruction({
    instruction,
}: {
    instruction: ParsedInstruction
}) {
    if (instruction.subType === InstructionSubType.HOLD) {
        return <TsChip color="primary">Hold</TsChip>
    }

    return <TsChip>{instruction.value}</TsChip>
}
