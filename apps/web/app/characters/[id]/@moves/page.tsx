import {
    charactersService,
    movesService,
} from '@tekken-space/database/services'
import { redirect } from 'next/navigation'
import { SearchableCharacterMovesList } from './components/searchable-character-moves-list'

export default async function CharacterPage({
    params,
}: {
    params: { id: string }
}) {
    const character = await charactersService.findOne(params.id)
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
