import { InstructionTypes, ParsedInstruction } from '@tekken-space/parser'
import MovementInstruction from './movement/movement-instruction'
import AttackInstruction from './attack/attack-instruction'
import ControlInstruction from './control/control-instruction'
import SpecialInstruction from './special/special-instruction'
import TextInstruction from './text/text-instruction'
import AlternativeInstruction from './alternative/alternative-instruction'
import CombinatorInstruction from './combinator/combinator-instruction'

export default function Instruction({
    instruction,
}: {
    instruction: ParsedInstruction
}) {
    return (
        <>
            {instruction.type === InstructionTypes.ATTACK && (
                <AttackInstruction instruction={instruction} />
            )}

            {instruction.type === InstructionTypes.CONTROL && (
                <ControlInstruction instruction={instruction} />
            )}

            {instruction.type === InstructionTypes.MOVEMENT && (
                <MovementInstruction instruction={instruction} />
            )}

            {instruction.type === InstructionTypes.SPECIAL && (
                <SpecialInstruction instruction={instruction} />
            )}

            {instruction.type === InstructionTypes.TEXT && (
                <TextInstruction instruction={instruction} />
            )}

            {instruction.type === InstructionTypes.ALTERNATIVE && (
                <AlternativeInstruction />
            )}

            {instruction.type === InstructionTypes.COMBINATOR && (
                <CombinatorInstruction instruction={instruction} />
            )}
        </>
    )
}
