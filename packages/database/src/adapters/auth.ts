import { DrizzleAdapter } from '@auth/drizzle-adapter'

import { db } from '../connection'

export const dbAdapter = DrizzleAdapter(db)
