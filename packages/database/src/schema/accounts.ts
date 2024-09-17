import { integer, pgTable, primaryKey, text } from 'drizzle-orm/pg-core'
import { AdapterAccountType } from 'next-auth/adapters'

import { users } from './users'

export const accounts = pgTable(
    'account',
    {
        access_token: text('access_token'),
        expires_at: integer('expires_at'),
        id_token: text('id_token'),
        provider: text('provider').notNull(),
        providerAccountId: text('providerAccountId').notNull(),
        refresh_token: text('refresh_token'),
        scope: text('scope'),
        session_state: text('session_state'),
        token_type: text('token_type'),
        type: text('type').$type<AdapterAccountType>().notNull(),
        userId: text('userId')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    }),
)
