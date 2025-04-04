import { CharacterScrapingMeta, WavuMove } from '@tekken-space/types'
import {
    loadOriginalFile,
    loadOverridesFile,
    writeOutput,
} from '../functions/files'
import { OVERRIDDEN_FILES_PATH } from '../constants'

function applyOverrides(original: WavuMove[], overrides: Partial<WavuMove>[]) {
    return original.map((move) => {
        const override = overrides.find((override) => override.id === move.id)
        if (!override) {
            return move
        }

        return {
            ...move,
            ...override,
        }
    })
}

/**
 * Applies overrides for a move list to replace certain move information without
 * losing the original data.
 */
export async function overrideMoveList(characterMeta: CharacterScrapingMeta) {
    let original: WavuMove[] | null = null
    let overrides: Partial<WavuMove>[] | null = null

    try {
        original = JSON.parse(loadOriginalFile(characterMeta.id)) as WavuMove[]
    } catch {
        console.log(
            `No original movelist found for ${characterMeta.name}. Skipping.`,
        )
        return
    }

    try {
        overrides = JSON.parse(
            loadOverridesFile(characterMeta.id),
        ) as Partial<WavuMove>[]
    } catch {
        console.log(
            `No overrides found for ${characterMeta.name}. Copying original.`,
        )

        writeOutput<WavuMove[]>(
            OVERRIDDEN_FILES_PATH,
            characterMeta.id,
            original,
        )

        return
    }

    try {
        const harmonizedMoveList = applyOverrides(original, overrides)

        writeOutput<WavuMove[]>(
            OVERRIDDEN_FILES_PATH,
            characterMeta.id,
            harmonizedMoveList,
        )
    } catch (error: unknown) {
        console.log(
            `Failed to harmonize move list for ${characterMeta.name}:`,
            error,
        )
    }
}
