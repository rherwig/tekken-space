'use client'

import {
    Table,
    TableBody,
    TableHeader,
    TableColumn,
    TableRow,
    TableCell,
    Button,
} from '@nextui-org/react'
import { Character, Profile } from '@tekken-space/database'
import { HiTrash } from 'react-icons/hi'
import { useState } from 'react'
import { apiClient } from '@/lib/api'
import CreateCharacterForm from '@/lib/characters/components/forms/create-character-form'

export default function CharactersAdminTable({
    characters,
    user,
}: {
    characters: Character[]
    user?: Profile
}) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async (characterId: string) => {
        setIsDeleting(true)

        try {
            await apiClient.delete(`/api/characters/${characterId}`)
        } catch (error: any) {
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Table aria-label="Characters table">
            <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {characters.map((character) => (
                    <TableRow key={character.id}>
                        <TableCell>{character.name}</TableCell>
                        <TableCell className="flex gap-2">
                            <CreateCharacterForm character={character} />
                            <Button
                                isIconOnly
                                color="danger"
                                aria-label="Delete Character"
                                isLoading={isDeleting}
                                onPress={handleDelete.bind(
                                    undefined,
                                    character.id,
                                )}
                            >
                                <HiTrash />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
