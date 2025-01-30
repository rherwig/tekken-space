import {
    charactersService,
    movesService,
} from '@tekken-space/database/services'
import { redirect } from 'next/navigation'
import { SearchableCharacterMovesList } from './components/searchable-character-moves-list'

export default async function CharacterPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const character = await charactersService.findOne(id)
    if (!character) {
        return redirect('/characters')
    }

    const moves = await movesService.findByCharacterId(character.id)

    return (
        <SearchableCharacterMovesList
            characterId={character.id}
            moves={moves}
        />
    )
}
