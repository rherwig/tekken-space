import { charactersService } from '@tekken-space/database'
import CharactersGrid from '@/lib/characters/components/characters-grid'

export default async function Characters() {
    const characters = await charactersService.findAll()

    return (
        <div className="container">
            <CharactersGrid characters={characters} />
        </div>
    )
}
