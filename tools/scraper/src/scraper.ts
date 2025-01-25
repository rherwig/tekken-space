import { CharacterScrapingMeta, ScrapedMove } from '@tekken-space/types'

import { selectors } from './constants'
import { scrapeFrameData } from './functions/frames'
import {
    scrapeDamage,
    scrapeHitLevels,
    scrapeName,
    scrapeNotation,
    scrapeNotes,
    scrapeState,
} from './functions/text'
import { loadRemoteFile, writeOutput } from './functions/files'
import { dedupeMoves } from './functions/lists'
import { createDocument } from './functions/dom'

const scrapeMove = ($root: Element, index: number): ScrapedMove => {
    const { notes, specials } = scrapeNotes($root)

    return {
        damage: scrapeDamage($root),
        framesOnBlock: scrapeFrameData($root, selectors.FRAMES_BLOCK),
        framesOnCounter: scrapeFrameData($root, selectors.FRAMES_COUNTER),
        framesOnHit: scrapeFrameData($root, selectors.FRAMES_HIT),
        framesOnStartup: scrapeFrameData($root, selectors.FRAMES_STARTUP),
        hitLevels: scrapeHitLevels($root),
        index,
        input: scrapeNotation($root),
        name: scrapeName($root),
        notes,
        specials,
        state: scrapeState($root),
    }
}

export const scrape = async (characterMeta: CharacterScrapingMeta) => {
    const markup = await loadRemoteFile(characterMeta.movesListUrl)
    const document = createDocument(markup)

    const $moves = document.querySelectorAll(selectors.MOVE)
    const moves = Array.from($moves).map(($move, index) =>
        scrapeMove($move, index),
    )
    const uniqueMoves = dedupeMoves(moves)

    writeOutput(characterMeta.id, uniqueMoves)
}
