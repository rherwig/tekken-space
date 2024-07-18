import { charactersService } from '@tekken-space/database'

try {
    const characters = await charactersService.findAll()
    console.log(characters)
} catch (error: unknown) {
    console.error(error)
}
