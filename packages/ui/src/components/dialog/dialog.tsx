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
    caption: string
    children: React.ReactNode
    cancelCaption?: string
    confirmCaption?: string
    description?: string
    onConfirm?: () => void
    onCancel?: () => void
}

export function TsDialog({
    cancelCaption = 'Cancel',
    caption,
    children,
    confirmCaption = 'Save',
    description,
    onCancel,
    onConfirm,
    title,
}: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>{caption}</Button>
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
                            type="reset"
                            variant="outline"
                            onClick={onCancel}
                        >
                            {cancelCaption}
                        </Button>
                    )}
                    <Button type="submit" onClick={onConfirm}>
                        {confirmCaption}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
