import { WavuFields, WavuTables } from './types'

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

export function buildMoveListUrl() {
    const url = new URL(BASE_URL)
    const queryConfig = createQueryConfig('Alisa')

    Object.entries(queryConfig).forEach(([key, value]) => {
        url.searchParams.append(key, value)
    })

    return url
}

console.log(buildMoveListUrl().toString())
