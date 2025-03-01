import { charactersMetaService } from '@tekken-space/database/services'

interface RawMeta {
    archetypes: string[]
    cons: string[]
    difficulty: 'beginner' | 'easy' | 'intermediate' | 'hard' | 'challenge'
    pros: string[]
    title: string
}

export async function provisionCharactersMeta(characterId: string) {
    console.log(`Provisioning Character Meta for '${characterId}'...`)

    try {
        const meta = await loadMeta(characterId)

        console.log(`Cleaning Character Meta for '${characterId}'...`)
        await clean(characterId)

        console.log(`Creating Character Meta for '${characterId}'`)
        return provision(characterId, meta)
    } catch {
        console.log(`No meta found for '${characterId}'. Skipping.`)
        return
    }
}

async function loadMeta(characterId: string) {
    const { default: meta } = await import(
        `../resources/meta/${characterId}.json`
    )

    return meta as RawMeta
}

async function clean(characterId: string) {
    return charactersMetaService.removeByCharacterId(characterId)
}

async function provision(characterId: string, meta: RawMeta) {
    return charactersMetaService.create({
        archetypes: meta.archetypes,
        characterId,
        cons: meta.cons,
        difficulty: meta.difficulty,
        id: characterId,
        pros: meta.pros,
        title: meta.title,
    })
}
