import {
    charactersService,
    movesService,
} from '@tekken-space/database/services'
import { TsHeadline } from '@tekken-space/ui/components'
import { redirect } from 'next/navigation'
import { SearchableCharacterMovesList } from '@/lib/characters/components/searchable-character-moves-list'

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
        <div className="container py-4">
            <TsHeadline variant="h1" className="mb-8">
                {character.name}
            </TsHeadline>

            <SearchableCharacterMovesList
                characterId={character.id}
                moves={moves}
            />
        </div>
    )
}
