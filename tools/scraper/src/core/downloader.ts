import { CharacterScrapingMeta } from '@tekken-space/types'
import { WavuFields, WavuTables } from '../types'
import { writeOutput } from '../functions/files'
import { ORIGINAL_FILES_PATH } from '../constants'

const BASE_URL = 'https://wavu.wiki/w/index.php?title=Special:CargoExport'

function createQueryConfig(characterName: string): Record<WavuFields, string> {
    return {
        [WavuFields.Fields]:
            'id,parent,name,input,startup,target=hitLevels,damage,block=onBlock,hit=onHit,ch=onCounterHit,crush=states,num=index',
        [WavuFields.Format]: 'json',
        [WavuFields.GroupBy]: '',
        [WavuFields.Having]: '',
        [WavuFields.JoinOn]: '',
        [WavuFields.Limit]: '500',
        [WavuFields.Offset]: '0',
        [WavuFields.OrderBy]: '',
        [WavuFields.OrderByOptions]: 'ASC',
        [WavuFields.Tables]: WavuTables.Move,
        [WavuFields.Where]: `Move._pageName='${characterName} movelist'`,
    }
}

function buildMoveListUrl(characterName: string) {
    const url = new URL(BASE_URL)
    const queryConfig = createQueryConfig(characterName)

    Object.entries(queryConfig).forEach(([key, value]) => {
        url.searchParams.append(key, value)
    })

    return url
}

async function fetchMoveList(characterName: string) {
    const url = buildMoveListUrl(characterName)
    const response = await fetch(url)

    return response.json()
}

/**
 * Downloads the original frame data from wavu.wiki.
 */
export async function downloadMoveList(characterMeta: CharacterScrapingMeta) {
    try {
        const moveList = await fetchMoveList(characterMeta.name)

        writeOutput(ORIGINAL_FILES_PATH, characterMeta.id, moveList)
    } catch (error: unknown) {
        console.error(
            `Failed to download move list for ${characterMeta.name}:`,
            error,
        )
    }
}
