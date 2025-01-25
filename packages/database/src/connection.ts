import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

import config from '../drizzle.config'
import * as schema from './schema'

declare global {
    // eslint-disable-next-line no-var
    var _db: ReturnType<typeof drizzle> | undefined
}

let connection: ReturnType<typeof postgres> | undefined

if (!global._db) {
    // Only create a new connection if no instance exists
    connection = postgres(config.dbCredentials)
    global._db = drizzle(connection, { schema })
}

export const db = global._db
