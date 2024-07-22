import type { ParsedMove } from '@tekken-space/parser'
import Instruction from '@/components/notation/instruction/instruction'

export default function Move({ move }: { move: ParsedMove }) {
    return (
        <div className="flex items-center gap-2">
            {move.instructions.map((instruction, index) => (
                <Instruction key={index} instruction={instruction} />
            ))}
        </div>
    )
}
