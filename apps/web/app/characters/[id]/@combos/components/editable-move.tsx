import { Move } from '@tekken-space/database'
import { TsAdvancedMoveDisplay } from '@tekken-space/ui/components'
import { EditMoveWidget } from '@/app/characters/[id]/@combos/components/edit-move-widget'

export function EditableMove({ move }: { move: Move }) {
    return (
        <TsAdvancedMoveDisplay
            notation={move.notation}
            framesOnStartup={move.framesOnStartupLower}
        >
            <EditMoveWidget move={move} />
        </TsAdvancedMoveDisplay>
    )
}
