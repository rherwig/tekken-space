'use server'

import { revalidatePath } from 'next/cache'
import { type FormState } from '@tekken-space/ui/components'
import { movesService } from '@tekken-space/database/services'
import { Move } from '@tekken-space/database'
import { upsertMoveSchema } from '@tekken-space/types'

export async function onSubmitAction(
    formData: FormData,
): Promise<FormState<Move>> {
    const parsed = upsertMoveSchema.safeParse(Object.fromEntries(formData))

    if (!parsed.success) {
        return {
            message: 'Please provide valid move information.',
            success: false,
        }
    }

    try {
        const move = await movesService.upsert(parsed.data)

        revalidatePath('/characters')

        return {
            data: move,
            success: true,
        }
    } catch {
        return {
            success: false,
        }
    }
}
