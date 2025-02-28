import { charactersService } from '@tekken-space/database/services'
import { TsChip, TsHeadline } from '@tekken-space/ui/components'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Character, CharacterMeta } from '@tekken-space/database'
import { CircleMinus, CirclePlus } from 'lucide-react'

function CharacterMetaListItem({
    children,
    icon,
}: {
    children: React.ReactNode
    icon: React.ReactNode
}) {
    return (
        <li className="flex items-center gap-2">
            {icon}
            {children}
        </li>
    )
}

function CharacterMetaList({
    children,
    title,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <div className="whitespace-nowrap">
            <div>{title}</div>
            <ul className="m-0 flex list-none flex-col p-0">{children}</ul>
        </div>
    )
}

function CharacterHeader({
    character,
    meta,
}: {
    meta: Partial<CharacterMeta>
    character: Character
}) {
    return (
        <div className="flex flex-col gap-8 lg:flex-row">
            {character.imageUrl && (
                <Image
                    className="size-[256px] rounded-md object-cover object-top"
                    priority={true}
                    src={`/images/characters/8/${character.id}.webp`}
                    alt={`Picture of ${character.name}`}
                    width={256}
                    height={256}
                />
            )}

            <div className="flex-1">
                <TsHeadline variant="h1">{character.name}</TsHeadline>

                <TsHeadline
                    variant="h2"
                    className="text-copy/75 text-xl font-light"
                >
                    {meta.title}
                </TsHeadline>

                <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col items-start gap-1 whitespace-nowrap">
                            <div>Archetype</div>
                            <ul className="flex gap-2">
                                {meta.archetypes?.map((archetype, index) => (
                                    <li key={index}>{archetype}</li>
                                ))}

                                {!meta.archetypes?.length && (
                                    <li className="text-foreground opacity-50">
                                        -
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div className="flex flex-col items-start gap-1">
                            <div>Difficulty</div>

                            {meta.difficulty && (
                                <TsChip>{meta.difficulty}</TsChip>
                            )}

                            {!meta.difficulty && (
                                <div className="text-foreground opacity-50">
                                    -
                                </div>
                            )}
                        </div>
                    </div>

                    <CharacterMetaList title="Pros">
                        {meta.pros?.map((pro, index) => (
                            <CharacterMetaListItem
                                icon={<CirclePlus />}
                                key={index}
                            >
                                {pro}
                            </CharacterMetaListItem>
                        ))}

                        {!meta.pros?.length && (
                            <div className="text-foreground opacity-50">-</div>
                        )}
                    </CharacterMetaList>

                    <CharacterMetaList title="Cons">
                        {meta.cons?.map((con, index) => (
                            <CharacterMetaListItem
                                icon={<CircleMinus />}
                                key={index}
                            >
                                {con}
                            </CharacterMetaListItem>
                        ))}

                        {!meta.cons?.length && (
                            <div className="text-foreground opacity-50">-</div>
                        )}
                    </CharacterMetaList>
                </div>
            </div>
        </div>
    )
}

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

    const meta: Partial<CharacterMeta> = {
        archetypes: [],
        characterId: character.id,
        cons: [],
        pros: [],
        title: '',
    }

    return (
        <div className="container py-4">
            <CharacterHeader meta={meta} character={character} />
        </div>
    )
}
