import { Character } from '@tekken-space/database'
import { apiClient } from '@/lib/api'
import CreateCharacterForm from '@/lib/characters/components/forms/create-character-form'
import CharactersAdminTable from '@/lib/characters/components/admin/characters-admin-table'

async function fetchCharacters() {
    try {
        const { data: characters } =
            await apiClient.get<Character[]>('/api/characters')

        return characters
    } catch (error: any) {
        console.error(error)
    }

    return []
}

export default async function Page() {
    const characters = await fetchCharacters()

    return (
        <div className="container">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-xl">Characters</h1>
                <CreateCharacterForm />
            </div>

            <CharactersAdminTable characters={characters} />
        </div>
    )
}
