import { Fragment } from 'react'
import { parseTekkenNotation } from '@tekken-space/parser'
import Move from './move/move'
import MovesDivider from './divider/moves-divider'

export default function TsSimpleMoveDisplay({
    notation,
}: {
    notation: string
}) {
    const { moves } = parseTekkenNotation(notation)

    return (
        <div className="relative flex items-center gap-2">
            {moves.map((move, index) => (
                <Fragment key={index}>
                    <Move move={move} />
                    {index < moves.length - 1 && <MovesDivider />}
                </Fragment>
            ))}
        </div>
    )
}
