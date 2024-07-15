import CharactersGrid from '@/app/characters/components/characters-grid'
import { apiClient } from '@/lib/api'
import { Character } from '@tekken-space/database'
import CreateCharacterForm from '@/app/characters/forms/create-character-form'

async function fetchCharacters() {
    const response = await apiClient.get<Character[]>('/api/characters')

    if (response.status !== 200) {
        throw new Error('Failed to fetch characters.')
    }

    return response.data
}

export default async function Characters() {
    const characters = await fetchCharacters()

    return (
        <div className="container space-y-4 py-4">
            <h1 className="text-2xl">Characters</h1>

            <CharactersGrid characters={characters} />

            <CreateCharacterForm />
        </div>
    )
}
