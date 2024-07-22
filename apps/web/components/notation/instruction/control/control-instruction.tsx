import { ParsedInstruction } from '@tekken-space/parser'

export default function ControlInstruction({
    instruction,
}: {
    instruction: ParsedInstruction
}) {
    return <div>CONTROL {instruction.notation}</div>
}
