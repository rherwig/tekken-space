import { relations } from 'drizzle-orm'

import { characters } from './characters'
import { characterMeta } from './character-meta'

export const characterMetaRelation = relations(characters, ({ one }) => ({
    meta: one(characterMeta, {
        fields: [characters.id],
        references: [characterMeta.characterId],
    }),
}))
