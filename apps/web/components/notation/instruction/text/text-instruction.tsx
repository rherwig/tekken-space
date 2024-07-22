import { ParsedInstruction } from '@tekken-space/parser'

export default function TextInstruction({
    instruction,
}: {
    instruction: ParsedInstruction
}) {
    return <div>TEXT {instruction.notation}</div>
}
