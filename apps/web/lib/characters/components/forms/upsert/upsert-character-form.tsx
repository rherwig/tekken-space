import { z } from 'zod'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from '@tekken-space/ui/base'
import { onSubmitAction } from './actions'
import { Character } from '@tekken-space/database'
import { upsertCharacterFormSchema } from '@/lib/characters/schema'

export function UpsertCharacterForm({
    id,
    onError,
    onSuccess,
}: {
    id: string
    onSuccess?: (character: Character) => void
    onError?: () => void
}) {
    const formRef = useRef<HTMLFormElement>(null)
    const form = useForm<z.infer<typeof upsertCharacterFormSchema>>({
        defaultValues: {
            name: '',
        },
        resolver: zodResolver(upsertCharacterFormSchema),
    })

    async function onSubmit() {
        const { data } = await onSubmitAction(new FormData(formRef.current!))

        if (!data) {
            return onError?.()
        }

        onSuccess?.(data)
    }

    return (
        <Form {...form}>
            <form id={id} ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Name, e.g. Kazuya"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                </div>
            </form>
        </Form>
    )
}
