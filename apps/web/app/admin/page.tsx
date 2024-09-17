import { charactersService } from '@tekken-space/database'
import CharactersAdminTable from '@/lib/characters/components/admin/characters-admin-table'

export default async function AdminPage() {
    const characters = await charactersService.findAll()

    return (
        <div className="container">
            <div>Admin</div>

            <CharactersAdminTable characters={characters} />
        </div>
    )
}
