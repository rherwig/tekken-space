import { InstructionTypes, ParsedInstruction } from '@tekken-space/parser'
import MovementInstruction from '@/components/notation/instruction/movement/movement-instruction'
import AttackInstruction from '@/components/notation/instruction/attack/attack-instruction'
import ControlInstruction from '@/components/notation/instruction/control/control-instruction'
import SpecialInstruction from '@/components/notation/instruction/special/special-instruction'
import TextInstruction from '@/components/notation/instruction/text/text-instruction'
import AlternativeInstruction from '@/components/notation/instruction/alternative/alternative-instruction'
import CombinatorInstruction from '@/components/notation/instruction/combinator/combinator-instruction'

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
                <AlternativeInstruction instruction={instruction} />
            )}

            {instruction.type === InstructionTypes.COMBINATOR && (
                <CombinatorInstruction instruction={instruction} />
            )}
        </>
    )
}
