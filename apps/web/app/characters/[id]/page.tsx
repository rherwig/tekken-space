import { redirect } from 'next/navigation'
import {
    charactersService,
    charactersMetaService,
} from '@tekken-space/database/services'
import { CharacterHeader } from '@/app/characters/[id]/components/characters-header'

export const dynamic = 'force-dynamic'

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

    const meta = await charactersMetaService.findByCharacterId(character.id)

    return (
        <div className="py-4">
            <CharacterHeader meta={meta} character={character} />
        </div>
    )
}
