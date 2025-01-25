import { provisionCharacters } from './characters'
import { provisionMoves } from './moves'
import { CHARACTERS_SCRAPING_META } from '@tekken-space/types'

async function provision(
    characterId: string,
    characterName: string,
    path: string,
) {
    await provisionCharacters(characterId, characterName)
    await provisionMoves(characterId, path)
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
