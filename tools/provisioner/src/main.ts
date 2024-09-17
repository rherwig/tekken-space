import { provisionCharacters } from './characters'
import { provisionMoves } from './moves'

try {
    await provisionCharacters()
    await provisionMoves()
} catch (error: unknown) {
    console.error(error)
}
