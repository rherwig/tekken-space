'use client'

import { Button } from '#base/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '#base/dialog'

interface Props {
    title: string
    caption: React.ReactNode
    children: React.ReactNode
    formId: string
    isOpen?: boolean
    onOpenChange?: (isOpen: boolean) => void
    cancelCaption?: string
    confirmCaption?: string
    description?: string
    onCancel?: () => void
}

export type FormState<T = unknown> = {
    success: boolean
    message?: string
    data?: T
    fields?: Record<string, string>
}

export function TsFormDialog({
    cancelCaption = 'Cancel',
    caption,
    children,
    confirmCaption = 'Save',
    description,
    formId,
    isOpen,
    onCancel,
    onOpenChange,
    title,
}: Props) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <div>{caption}</div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                {children}

                <DialogFooter>
                    {onCancel && (
                        <Button
                            form={formId}
                            type="reset"
                            variant="outline"
                            onClick={onCancel}
                        >
                            {cancelCaption}
                        </Button>
                    )}
                    <Button type="submit" form={formId}>
                        {confirmCaption}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
