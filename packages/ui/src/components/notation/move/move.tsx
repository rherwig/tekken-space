import type { ParsedMove } from '@tekken-space/parser'

import Instruction from '../instruction/instruction'

export default function Move({ move }: { move: ParsedMove }) {
    return (
        <div className="flex flex-shrink-0 items-center gap-2">
            {move.instructions.map((instruction, index) => (
                <Instruction key={index} instruction={instruction} />
            ))}
        </div>
    )
}
