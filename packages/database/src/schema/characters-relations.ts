import { relations } from 'drizzle-orm'

import { characters } from './characters'
import { moveLists } from './move-lists'
import { moves } from './moves'

export const charactersRelations = relations(characters, ({ many }) => ({
    moveLists: many(moveLists),
    moves: many(moves),
}))
