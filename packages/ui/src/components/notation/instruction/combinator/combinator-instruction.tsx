import { ParsedInstruction } from '@tekken-space/parser'

export default function CombinatorInstruction({
    instruction,
}: {
    instruction: ParsedInstruction
}) {
    return (
        <div className="mx-1 -mt-2 text-3xl font-bold leading-none">
            {instruction.notation}
        </div>
    )
}
