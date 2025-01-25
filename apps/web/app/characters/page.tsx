import { charactersService } from '@tekken-space/database'

import CharactersGrid from './components/characters-grid'

export const dynamic = 'force-dynamic'

export default async function Characters() {
    const characters = await charactersService.findAll()

    return (
        <div className="container">
            <CharactersGrid characters={characters} />
        </div>
    )
}
