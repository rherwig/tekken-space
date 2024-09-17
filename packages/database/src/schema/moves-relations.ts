import { relations } from 'drizzle-orm'

import { characters } from './characters'
import { moveLists } from './move-lists'
import { moves } from './moves'

export const movesRelations = relations(moves, ({ one }) => ({
    character: one(characters, {
        fields: [moves.characterId],
        references: [characters.id],
    }),
    moveList: one(moveLists, {
        fields: [moves.moveListId],
        references: [moveLists.id],
    }),
}))
