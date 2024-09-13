import { ParsedInstruction } from '@tekken-space/parser'

export default function CombinatorInstruction({
    instruction,
}: {
    instruction: ParsedInstruction
}) {
    return <div>COMBINATOR {instruction.notation}</div>
}
