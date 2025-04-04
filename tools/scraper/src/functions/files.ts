import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ScrapedMove } from '@tekken-space/types'
import {
    LINKED_FILES_PATH,
    ORIGINAL_FILES_PATH,
    OVERRIDDEN_FILES_PATH,
    OVERRIDE_FILES_PATH,
} from '../constants'

export const loadOriginalFile = (characterId: string) => {
    return readFileSync(
        join(ORIGINAL_FILES_PATH, `${characterId}.json`),
        'utf-8',
    )
}

export const loadOverridesFile = (characterId: string) => {
    return readFileSync(
        join(OVERRIDE_FILES_PATH, `${characterId}.json`),
        'utf-8',
    )
}

export const loadOverriddenFile = (characterId: string) => {
    return readFileSync(
        join(OVERRIDDEN_FILES_PATH, `${characterId}.json`),
        'utf-8',
    )
}

export const loadLinkedFile = (characterId: string) => {
    return readFileSync(join(LINKED_FILES_PATH, `${characterId}.json`), 'utf-8')
}

export const writeOutput = <T = ScrapedMove[]>(
    path: string,
    slug: string,
    output: T,
) => {
    if (!existsSync(path)) {
        mkdirSync(path)
    }

    writeFileSync(
        `${path}/${slug}.json`,
        JSON.stringify(output, null, 2),
        'utf-8',
    )
}
