import { relations } from 'drizzle-orm'

import { characters } from './characters'
import { moveLists } from './move-lists'
import { moves } from './moves'
import { users } from './users'

export const moveListsRelations = relations(moveLists, ({ many, one }) => ({
    author: one(users, {
        fields: [moveLists.authorId],
        references: [users.id],
    }),
    character: one(characters, {
        fields: [moveLists.characterId],
        references: [characters.id],
    }),
    moves: many(moves),
}))
