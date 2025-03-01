import { readdirSync, readFileSync } from 'node:fs'
import { join, parse } from 'node:path'

const resourcesPath = join(import.meta.dirname, './moves')

export const movesList = readdirSync(resourcesPath)
    .filter((file) => file.endsWith('.json'))
    .map((file) => {
        const character = parse(file).name
        const moves = JSON.parse(
            readFileSync(join(resourcesPath, file), 'utf-8'),
        )
        return { character, moves }
    })
