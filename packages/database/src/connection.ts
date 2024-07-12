import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

import config from '../drizzle.config'
import * as schema from './schema'

export const connection = postgres(config.dbCredentials)

export const db = drizzle(connection, {
    schema,
})
