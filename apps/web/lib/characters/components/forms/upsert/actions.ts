'use server'

import { revalidatePath } from 'next/cache'
import { type Character, charactersService } from '@tekken-space/database'
import { upsertCharacterFormSchema } from '@/lib/characters/schema'
import { type FormState } from '@tekken-space/ui/components'

export async function onSubmitAction(
    formData: FormData,
): Promise<FormState<Character>> {
    const parsed = upsertCharacterFormSchema.safeParse(
        Object.fromEntries(formData),
    )

    if (!parsed.success) {
        return {
            message: 'Please provide valid character information.',
            success: false,
        }
    }

    const { name } = parsed.data
    const id = name.replace(/\s/g, '-').toLowerCase()
    const imageUrl = `/images/characters/8/${id}.png`

    try {
        const character = await charactersService.upsert({
            id,
            imageUrl,
            name,
        })

        revalidatePath('/admin')

        return {
            data: character,
            success: true,
        }
    } catch {
        return {
            success: false,
        }
    }
}
