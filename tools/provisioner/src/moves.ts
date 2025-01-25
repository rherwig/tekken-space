import type { CreateMove } from '@tekken-space/database/schema'
import { movesService } from '@tekken-space/database/services'
import { ScrapedMove } from '@tekken-space/types'

export async function provisionMoves(characterId: string, path: string) {
    const scrapedMoves = await loadMoves(path)

    console.log(`Converting moves for '${characterId}'...`)
    const moves = convertScrapedMoves(characterId, scrapedMoves)

    console.log(`Cleaning moves for '${characterId}'...`)
    await clean(characterId)

    console.log(`Provisioning moves for '${characterId}'`)
    return provision(moves)
}

async function loadMoves(path: string) {
    const { default: moves } = await import(`../${path}`)

    return moves as ScrapedMove[]
}

function convertScrapedMoves(
    characterId: string,
    rawMoves: ScrapedMove[],
): CreateMove[] {
    return rawMoves.map((rawMove) => convertRawMove(characterId, rawMove))
}

function convertRawMove(
    characterId: string,
    scrapedMove: ScrapedMove,
): CreateMove {
    if (!scrapedMove.input) {
        throw new Error(`[Convert] Notation is missing.`)
    }

    return {
        characterId,
        damageHits: scrapedMove.damage.filter((damage) => damage !== null),
        framesOnBlockLower: scrapedMove.framesOnBlock.lower,
        framesOnBlockProperties: scrapedMove.framesOnBlock.properties,
        framesOnBlockRaw: scrapedMove.framesOnBlock._raw,
        framesOnBlockTech: scrapedMove.framesOnBlock.tech,
        framesOnBlockUpper: scrapedMove.framesOnBlock.upper,
        framesOnCounterLower: scrapedMove.framesOnCounter.lower,
        framesOnCounterProperties: scrapedMove.framesOnCounter.properties,
        framesOnCounterRaw: scrapedMove.framesOnCounter._raw,
        framesOnCounterTech: scrapedMove.framesOnCounter.tech,
        framesOnCounterUpper: scrapedMove.framesOnCounter.upper,
        framesOnHitLower: scrapedMove.framesOnHit.lower,
        framesOnHitProperties: scrapedMove.framesOnHit.properties,
        framesOnHitRaw: scrapedMove.framesOnHit._raw,
        framesOnHitTech: scrapedMove.framesOnHit.tech,
        framesOnHitUpper: scrapedMove.framesOnHit.upper,
        framesOnStartupLower: scrapedMove.framesOnStartup.lower,
        framesOnStartupProperties: scrapedMove.framesOnStartup.properties,
        framesOnStartupRaw: scrapedMove.framesOnStartup._raw,
        framesOnStartupTech: scrapedMove.framesOnStartup.tech,
        framesOnStartupUpper: scrapedMove.framesOnStartup.upper,
        isCombo: false,
        name: scrapedMove.name,
        notation: scrapedMove.input,
        notes: scrapedMove.notes,
        specials: scrapedMove.specials,
        stateKey: scrapedMove.state.key,
        stateRaw: scrapedMove.state._raw,
    }
}

async function clean(characterId: string) {
    return movesService.removeByCharacterId(characterId)
}

async function provision(moves: CreateMove[]) {
    return movesService.createMany(moves)
}
