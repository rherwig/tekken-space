import type { CreateMove } from '@tekken-space/database/schema'
import { movesService } from '@tekken-space/database/services'
import type { RawMove } from '#types'
import kazuya from '#moves/kazuya'

export async function provisionMoves() {
    const characterId = 'kazuya'

    console.log(`Converting moves for '${characterId}'...`)
    const moves = convertRawMoves(characterId, kazuya)

    console.log(`Cleaning moves for '${characterId}'...`)
    await clean(characterId)

    console.log(`Provisioning moves for '${characterId}'`)
    return provision(moves)
}

function convertRawMoves(
    characterId: string,
    rawMoves: RawMove[],
): CreateMove[] {
    return rawMoves.map((rawMove) => convertRawMove(characterId, rawMove))
}

function convertRawMove(characterId: string, rawMove: RawMove): CreateMove {
    const notation = rawMove.input
    if (!notation) {
        throw new Error(`[Convert] Notation is missing.`)
    }

    const damage = rawMove.damage
        .split(',')
        .reduce((sum, value) => sum + parseInt(value, 10), 0)

    return {
        characterId,
        damageHits: rawMove.damage,
        damageTotal: damage.toString(),
        framesOnBlock: rawMove.onBlock,
        framesOnCounterHit: rawMove.onCH,
        framesOnHit: rawMove.onHit,
        framesOnStartup: rawMove.startup,
        name: rawMove.name,
        notation,
        properties: rawMove.properties,
    }
}

async function clean(characterId: string) {
    return movesService.removeByCharacterId(characterId)
}

async function provision(moves: CreateMove[]) {
    return movesService.createMany(moves)
}
