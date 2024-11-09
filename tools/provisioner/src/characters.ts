import { charactersService } from '@tekken-space/database/services'

export async function provisionCharacters(
    characterId: string,
    characterName: string,
) {
    console.log(`Provisioning Character '${characterId}'...`)

    console.log(`Cleaning Character '${characterId}'...`)
    await clean(characterId)

    console.log(`Creating Character '${characterId}'`)
    return provision(characterId, characterName)
}

async function clean(characterId: string) {
    return charactersService.remove(characterId)
}

async function provision(id: string, name: string) {
    return charactersService.create({
        id,
        imageUrl: `/images/characters/8/${id}.png`,
        name,
    })
}
