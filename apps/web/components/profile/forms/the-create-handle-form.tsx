'use client'

import { z } from 'zod'
import {
    Button,
    Divider,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { apiClient } from '@/lib/api'

const validateIsHandleAvailable = async (handle: string) => {
    try {
        if (!handle.trim()) {
            return false
        }

        const { data: isHandleAvailable } = await apiClient.post<boolean>(
            '/api/profile/handle-available',
            {
                handle,
            },
        )

        return isHandleAvailable
    } catch (error: unknown) {
        console.error(error)
    }

    return false
}

const handleSchema = z.object({
    handle: z
        .string()
        .min(3, 'Please enter at least 3 characters.')
        .regex(/[a-z\d]/i, 'Handle can contain only letters and numbers.')
        .refine(validateIsHandleAvailable, 'Handle is already taken.'),
})

type HandleFormData = z.infer<typeof handleSchema>

export default function TheCreateHandleForm() {
    const router = useRouter()
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const {
        formState: { errors, isSubmitting, isValid },
        handleSubmit,
        register,
    } = useForm<HandleFormData>({
        mode: 'all',
        resolver: zodResolver(handleSchema),
    })

    const onSubmit: SubmitHandler<HandleFormData> = async (data) => {
        try {
            const { data: isSuccess } = await apiClient.post(
                '/api/profile/handle',
                data,
            )

            if (isSuccess) {
                return router.push(`/@${data.handle}`)
            }
        } catch (error: unknown) {
            console.error(error)
        }
    }

    return (
        <>
            <Button onPress={onOpen} color="secondary">
                Choose Handle
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <form
                            name="handle-form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <ModalHeader>Choose Handle</ModalHeader>
                            <ModalBody>
                                <p>
                                    In order to share what you created, you need
                                    a handle for others to find you.
                                </p>
                                <p>
                                    After choosing a handle, your public profile
                                    will be accessible under
                                </p>

                                <pre>https://tekken.space/@handle</pre>

                                <Divider />

                                <Input
                                    {...register('handle')}
                                    label="Handle"
                                    placeholder="e.g. deviljim"
                                    isInvalid={!!errors.handle?.message}
                                    errorMessage={errors.handle?.message}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary"
                                    isDisabled={!isValid}
                                    isLoading={isSubmitting}
                                >
                                    Save
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
