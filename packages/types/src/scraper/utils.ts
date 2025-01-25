import { WIKI_BASE_URL, WIKI_MOVELIST_SUFFIX } from './constants'

export const createMovesListUrl = (name: string) => {
    return `${WIKI_BASE_URL}/${name}${WIKI_MOVELIST_SUFFIX}`
}
