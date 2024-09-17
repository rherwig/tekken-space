import { charactersService } from '@tekken-space/database/services'

export async function provisionCharacters() {
    const characterName = 'Kazuya'
    const characterId = slugify(characterName)

    console.log(`Converting moves for '${characterId}'...`)

    console.log(`Cleaning moves for '${characterId}'...`)
    await clean(characterId)

    console.log(`Provisioning moves for '${characterId}'`)
    return provision(characterId, characterName)
}

function slugify(name: string) {
    return name.replace(/\s/g, '-').toLowerCase()
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
