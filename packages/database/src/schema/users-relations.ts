import { relations } from 'drizzle-orm'

import { moveLists } from './move-lists'
import { users } from './users'

export const usersRelations = relations(users, ({ many }) => ({
    moveLists: many(moveLists),
}))
