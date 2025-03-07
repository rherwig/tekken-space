import {
    InstructionTypes,
    MetaTypes,
    ParsedInstruction,
} from '@tekken-space/parser'

export function createAttackInstruction(notation: string): ParsedInstruction {
    return {
        $type: MetaTypes.INSTRUCTION,
        notation,
        type: InstructionTypes.ATTACK,
        value: notation,
    }
}
