import {
    CharacterScrapingMeta,
    ScrapedMove,
    WavuMove,
} from '@tekken-space/types'
import { loadLinkedFile, writeOutput } from '../functions/files'
import { HARMONIZED_FILES_PATH } from '../constants'
import { harmonizeFrameData } from '../functions/frames'
import {
    harmonizeDamage,
    harmonizeHitLevels,
    harmonizeIndex,
    harmonizeName,
    harmonizeNotation,
    harmonizeState,
} from '../functions/text'

function harmonizeMove(sourceMove: WavuMove): ScrapedMove {
    return {
        index: harmonizeIndex(sourceMove.index),
        name: harmonizeName(sourceMove.name),
        input: harmonizeNotation(sourceMove.input),
        hitLevels: harmonizeHitLevels(sourceMove.hitLevels),
        damage: harmonizeDamage(sourceMove.damage),
        framesOnBlock: harmonizeFrameData(sourceMove.onBlock),
        framesOnHit: harmonizeFrameData(sourceMove.onHit),
        framesOnCounter: harmonizeFrameData(sourceMove.onCounterHit),
        framesOnStartup: harmonizeFrameData(sourceMove.startup),
        state: harmonizeState(),
        notes: [],
        specials: [],
    }
}

/**
 * Converts raw move lists into a format compatible with the database.
 */
export async function harmonizeMoveList(characterMeta: CharacterScrapingMeta) {
    try {
        const sourceMoveList = JSON.parse(
            loadLinkedFile(characterMeta.id),
        ) as WavuMove[]

        const harmonizedMoveList = sourceMoveList.map(harmonizeMove)

        writeOutput(HARMONIZED_FILES_PATH, characterMeta.id, harmonizedMoveList)
    } catch (error: unknown) {
        console.error(
            `Failed to harmonize move list for ${characterMeta.name}:`,
            error,
        )
    }
}
