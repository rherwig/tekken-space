'use client'

import { Pencil } from 'lucide-react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Move } from '@tekken-space/database'
import { TsFormDialog } from '@tekken-space/ui/components'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from '@tekken-space/ui/base'
import { upsertMoveSchema } from '@/app/characters/[id]/@combos/components/schema'
import { onSubmitAction } from '@/app/characters/[id]/@combos/components/actions'

export function EditMoveWidget({ move }: { move: Move }) {
    const id = 'edit-move-form'
    const [isOpen, setOpen] = useState<boolean>(false)
    const formRef = useRef<HTMLFormElement>(null)
    const form = useForm<z.infer<typeof upsertMoveSchema>>({
        defaultValues: {
            id: move.id,
            name: move.name ?? '',
            notation: move.notation,
        },
        resolver: zodResolver(upsertMoveSchema),
    })

    async function onSubmit() {
        const { data } = await onSubmitAction(new FormData(formRef.current!))

        if (!data) {
            return
        }

        // onSuccess?.(data)
        console.log(data)
        setOpen(false)
    }

    return (
        <div className="group cursor-pointer px-2">
            <TsFormDialog
                isOpen={isOpen}
                onOpenChange={setOpen}
                title="Edit Move"
                caption={
                    <Pencil className="size-5 transition-colors group-hover:stroke-green-500" />
                }
                formId="edit-move-form"
            >
                <Form {...form}>
                    <form
                        id={id}
                        ref={formRef}
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="id"
                                render={({ field }) => (
                                    <input type="hidden" {...field} />
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Name, e.g. Heat Burst"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="notation"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Notation</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Notation, e.g. df+2"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            </TsFormDialog>
        </div>
    )
}
