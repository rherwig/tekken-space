import { useState } from 'react'
import { TsFormDialog } from '@tekken-space/ui/components'
import { Character } from '@tekken-space/database'

import { UpsertCharacterForm } from './upsert-character-form'

export function UpsertCharacterDialog({
    id,
    onError,
    onSuccess,
}: {
    id: string
    onSuccess?: (character: Character) => void
    onError?: () => void
}) {
    const [isOpen, setOpen] = useState<boolean>(false)

    function handleSuccess(character: Character) {
        onSuccess?.(character)
        setOpen(false)
    }

    return (
        <TsFormDialog
            isOpen={isOpen}
            onOpenChange={setOpen}
            formId={id}
            title="Create Character"
            caption="Create Character"
            confirmCaption="Create Character"
        >
            <UpsertCharacterForm
                id={id}
                onSuccess={handleSuccess}
                onError={onError}
            />
        </TsFormDialog>
    )
}
