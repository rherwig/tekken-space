import {
    boolean,
    integer,
    pgTable,
    primaryKey,
    text,
} from 'drizzle-orm/pg-core'

import { users } from './users'

export const authenticators = pgTable(
    'authenticator',
    {
        counter: integer('counter').notNull(),
        credentialBackedUp: boolean('credentialBackedUp').notNull(),
        credentialDeviceType: text('credentialDeviceType').notNull(),
        credentialID: text('credentialID').notNull().unique(),
        credentialPublicKey: text('credentialPublicKey').notNull(),
        providerAccountId: text('providerAccountId').notNull(),
        transports: text('transports'),
        userId: text('userId')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
    },
    (authenticator) => ({
        compositePK: primaryKey({
            columns: [authenticator.userId, authenticator.credentialID],
        }),
    }),
)
