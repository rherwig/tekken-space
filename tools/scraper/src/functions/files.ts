import { fileURLToPath } from 'node:url'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { ScrapedMove } from '@tekken-space/types'

import { BASE_URL, MOVELIST_SUFFIX, OUTPUT_PATH } from '../constants'

export const loadLocalFile = (path: string, cwd: string) => {
    return readFileSync(fileURLToPath(new URL(path, cwd)), 'utf-8')
}

export const loadRemoteFile = async (url: string) => {
    const response = await fetch(url)

    return response.text()
}

export const createCharacterUrl = (slug: string) => {
    return `${BASE_URL}/${slug}${MOVELIST_SUFFIX}`
}

export const writeOutput = (slug: string, moves: ScrapedMove[]) => {
    if (!existsSync(OUTPUT_PATH)) {
        mkdirSync(OUTPUT_PATH)
    }

    writeFileSync(
        `${OUTPUT_PATH}/${slug}.json`,
        JSON.stringify(moves, null, 2),
        'utf-8',
    )
}
