'use client'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Character, CreateCharacter } from '@tekken-space/database'
import { apiClient } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'

const createCharacterSchema = z.object({
    id: z.string().min(1, 'Provide a Character Id'),
    name: z.string().min(1),
})

const onSubmit: SubmitHandler<CreateCharacter> = async (data) => {
    try {
        const { data: character } = await apiClient.post<Character>(
            '/api/characters',
            data,
        )
    } catch (error: unknown) {
        console.error(error)
    }
}

export default function CreateCharacterForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CreateCharacter>({
        resolver: zodResolver(createCharacterSchema),
    })

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 rounded-sm bg-white/5 p-4"
        >
            <div className="flex flex-col">
                <input
                    type="text"
                    placeholder="Id"
                    className="rounded-sm bg-black/50 px-2 py-1"
                    {...register('id')}
                />
                {errors.id && errors.id.message}
            </div>

            <div className="flex flex-col">
                <input
                    type="text"
                    placeholder="Name"
                    className="rounded-sm bg-black/50 px-2 py-1"
                    {...register('name', { required: true })}
                />
            </div>

            <button type="submit" className="rounded-sm bg-black px-4 py-2">
                Create
            </button>

            <pre>{JSON.stringify({}, null, 2)}</pre>
        </form>
    )
}
