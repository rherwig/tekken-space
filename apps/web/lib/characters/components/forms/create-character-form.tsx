'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Character } from '@tekken-space/database'
import { apiClient } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react'
import { TiPencil, TiPlus } from 'react-icons/ti'
import { slugify } from '@/lib/utils/slug'
import {
    upsertCharacterSchema,
    UpsertCharacterSchema,
} from '@tekken-space/types'

export default function CreateCharacterForm({
    character,
}: {
    character?: Character
}) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpsertCharacterSchema>({
        resolver: zodResolver(upsertCharacterSchema),
        defaultValues: {
            name: character?.name,
        },
    })

    const onSubmit: SubmitHandler<UpsertCharacterSchema> = async (data) => {
        try {
            const payload = {
                ...character,
                ...data,
            }

            if (!payload.id) {
                payload.id = slugify(payload.name)
            }

            if (!payload.imageUrl) {
                payload.imageUrl = `/images/characters/8/${payload.id}.png`
            }

            await apiClient.put('/api/characters', payload)

            onClose()
        } catch (error: unknown) {
            console.error(error)
        }
    }

    return (
        <>
            {character?.id ? (
                <Button onPress={onOpen} isIconOnly>
                    <TiPencil />
                </Button>
            ) : (
                <Button onPress={onOpen} startContent={<TiPlus />}>
                    Create Character
                </Button>
            )}

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ModalHeader>Create Character</ModalHeader>
                            <ModalBody>
                                <Input
                                    {...register('name')}
                                    label="Name"
                                    placeholder="e.g. Kazuya"
                                    isInvalid={!!errors.name?.message}
                                    errorMessage={errors.name?.message}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary">
                                    {character?.id ? 'Save' : 'Create'}
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
