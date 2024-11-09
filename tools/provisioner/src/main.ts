import { provisionCharacters } from './characters'
import { provisionMoves } from './moves'
import { CHARACTERS } from './constants'

async function provision(
    characterId: string,
    characterName: string,
    path: string,
) {
    await provisionCharacters(characterId, characterName)
    await provisionMoves(characterId, path)
}

try {
    for (const character of CHARACTERS) {
        await provision(character.id, character.name, character.path)
    }
} catch (error: unknown) {
    console.error(error)
} finally {
    process.exit(0)
}
