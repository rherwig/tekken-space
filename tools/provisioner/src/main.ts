import { provisionCharacters } from './characters'
import { provisionMoves } from './moves'
import { CHARACTERS_SCRAPING_META } from '@tekken-space/types'
import { provisionCharactersMeta } from './characters-meta'

const shouldProvision = {
    characters: false,
    meta: true,
    moves: false,
}

async function provision(
    characterId: string,
    characterName: string,
    path: string,
) {
    if (shouldProvision.characters) {
        await provisionCharacters(characterId, characterName)
    }

    if (shouldProvision.meta) {
        await provisionCharactersMeta(characterId)
    }

    if (shouldProvision.moves) {
        await provisionMoves(characterId, path)
    }
}

try {
    for (const character of CHARACTERS_SCRAPING_META) {
        await provision(character.id, character.name, character.scrapingPath)
    }
} catch (error: unknown) {
    console.error(error)
} finally {
    process.exit(0)
}
