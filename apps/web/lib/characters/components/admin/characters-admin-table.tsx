'use client'

import { Character } from '@tekken-space/database'
import { UpsertCharacterDialog } from '@/lib/characters/components/forms/upsert/upsert-character-dialog'
import { useToast } from '@tekken-space/ui/hooks'

export default function CharactersAdminTable({
    characters,
}: {
    characters: Character[]
}) {
    const { toast } = useToast()

    function handleUpsertSuccess() {
        toast({
            description: 'Character created.',
            title: 'Success',
        })
    }

    return (
        <div>
            <UpsertCharacterDialog
                id="upsert-character"
                onSuccess={handleUpsertSuccess}
            />

            <ul>
                {characters.map((character) => (
                    <li key={character.id}>{character.name}</li>
                ))}
            </ul>
        </div>
    )
}
