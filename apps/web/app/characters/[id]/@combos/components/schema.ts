import { z } from 'zod'

export const upsertMoveSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    notation: z.string(),
})
