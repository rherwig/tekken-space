import { parseTekkenNotation } from '@tekken-space/parser'
import Move from '@/components/notation/move/move'
import MovesDivider from '@/components/notation/divider/moves-divider'

export default function SimpleMoveDisplay({ notation }: { notation: string }) {
    const { moves } = parseTekkenNotation(notation)

    return (
        <div className="relative flex items-center gap-2 overflow-scroll">
            {moves.map((move, index) => (
                <>
                    <Move key={index} move={move} />
                    {index < moves.length - 1 && <MovesDivider />}
                </>
            ))}
        </div>
    )
}
