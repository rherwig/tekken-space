import { z } from 'zod'

export const upsertMoveSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    notation: z.string(),
})

export type UpsertMoveSchema = z.infer<typeof upsertMoveSchema>
