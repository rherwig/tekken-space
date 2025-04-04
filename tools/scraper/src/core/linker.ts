import { CharacterScrapingMeta } from '@tekken-space/types'
import { loadOverriddenFile, writeOutput } from '../functions/files'
import { WavuMove } from '../types'
import { LINKED_FILES_PATH } from '../constants'

function linkParentProperty<T = string>(
    sourceMove: WavuMove,
    moveList: WavuMove[],
    property: keyof WavuMove,
): T {
    const parentMove = moveList.find((move) => move.id === sourceMove.parent)
    if (!parentMove) {
        return sourceMove[property] as T
    }

    return `${linkParentProperty(parentMove, moveList, property)}${sourceMove[property]}` as T
}

function pickParentProperty<T = string>(
    sourceMove: WavuMove,
    moveList: WavuMove[],
    property: keyof WavuMove,
): T {
    const parentMove = moveList.find((move) => move.id === sourceMove.parent)
    if (!parentMove) {
        return sourceMove[property] as T
    }

    return pickParentProperty(parentMove, moveList, property) as T
}

function linkMove(sourceMove: WavuMove, moveList: WavuMove[]) {
    const parentMove = moveList.find((move) => move.id === sourceMove.parent)
    if (!parentMove) {
        return sourceMove
    }

    return {
        ...sourceMove,
        damage: linkParentProperty<string>(sourceMove, moveList, 'damage'),
        input: linkParentProperty<string>(sourceMove, moveList, 'input'),
        hitLevels: linkParentProperty<string>(
            sourceMove,
            moveList,
            'hitLevels',
        ),
        startup: pickParentProperty<string>(sourceMove, moveList, 'startup'),
    }
}

export async function linkMoveList(characterMeta: CharacterScrapingMeta) {
    try {
        const sourceMoveList = JSON.parse(
            loadOverriddenFile(characterMeta.id),
        ) as WavuMove[]

        const linkedMoveList = sourceMoveList.map((move) =>
            linkMove(move, sourceMoveList),
        )

        writeOutput(LINKED_FILES_PATH, characterMeta.id, linkedMoveList)
    } catch (error: unknown) {
        console.error(
            `Failed to link move list for ${characterMeta.name}:`,
            error,
        )
    }
}
