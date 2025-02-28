import type { Config } from 'drizzle-kit'

const {
    POSTGRES_DB,
    POSTGRES_HOST,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    POSTGRES_USER,
} = process.env

export const CONNECTION_STRING = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`

export default {
    dbCredentials: {
        database: POSTGRES_DB ?? 'tmp',
        host: POSTGRES_HOST ?? '0.0.0.0',
        password: POSTGRES_PASSWORD,
        port: Number.parseInt(POSTGRES_PORT ?? '5432', 10),
        user: POSTGRES_USER,
    },
    dialect: 'postgresql',
    out: './migrations',
    schema: './src/schema/index.ts',
} satisfies Config
