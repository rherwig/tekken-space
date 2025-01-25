import { prop, uniqBy } from 'rambda'
import type { ScrapedMove } from '@tekken-space/types'

export const dedupeMoves = (moves: ScrapedMove[]) => {
    return uniqBy(prop('input'), moves)
}
