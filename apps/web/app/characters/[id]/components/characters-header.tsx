import Image from 'next/image'
import { CircleMinus, CirclePlus } from 'lucide-react'
import { Character, CharacterMeta } from '@tekken-space/database'
import {
    TsArchetypeChip,
    TsDifficultyChip,
    TsHeadline,
} from '@tekken-space/ui/components'

import { CharacterMetaList } from '@/app/characters/[id]/components/characters-meta-list'
import { CharacterMetaListItem } from '@/app/characters/[id]/components/characters-meta-list-item'
import { CharacterArchetypes, CharacterDifficulty } from '@tekken-space/types'

export function CharacterHeader({
    character,
    meta,
}: {
    meta: CharacterMeta | undefined
    character: Character
}) {
    return (
        <div className="flex flex-col gap-8 lg:flex-row">
            {character.imageUrl && (
                <div className="flex justify-center md:justify-start">
                    <Image
                        className="size-[256px] rounded-md object-cover object-top"
                        priority={true}
                        src={`/images/characters/8/${character.id}.webp`}
                        alt={`Picture of ${character.name}`}
                        width={256}
                        height={256}
                    />
                </div>
            )}

            <div className="flex-1">
                <div className="flex flex-col items-center md:items-start">
                    <TsHeadline variant="h1">{character.name}</TsHeadline>

                    <TsHeadline
                        variant="h4"
                        className="text-copy/75 font-light"
                    >
                        {meta?.title}
                    </TsHeadline>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="grid gap-4">
                        <div className="flex flex-col items-start gap-1 whitespace-nowrap">
                            <div>Archetype</div>
                            <ul className="flex gap-2">
                                {meta?.archetypes.map((archetype, index) => (
                                    <li key={index}>
                                        <TsArchetypeChip
                                            archetype={
                                                archetype as CharacterArchetypes
                                            }
                                        />
                                    </li>
                                ))}

                                {!meta?.archetypes.length && (
                                    <li className="text-foreground opacity-50">
                                        -
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div className="flex flex-col items-start gap-1">
                            <div>Difficulty</div>

                            {meta?.difficulty && (
                                <TsDifficultyChip
                                    difficulty={
                                        meta.difficulty as CharacterDifficulty
                                    }
                                />
                            )}

                            {!meta?.difficulty && (
                                <div className="text-foreground opacity-50">
                                    -
                                </div>
                            )}
                        </div>
                    </div>

                    <CharacterMetaList title="Pros">
                        {meta?.pros.map((pro, index) => (
                            <CharacterMetaListItem
                                icon={<CirclePlus className="text-green-500" />}
                                key={index}
                            >
                                {pro}
                            </CharacterMetaListItem>
                        ))}

                        {!meta?.pros.length && (
                            <div className="text-foreground opacity-50">-</div>
                        )}
                    </CharacterMetaList>

                    <CharacterMetaList title="Cons">
                        {meta?.cons.map((con, index) => (
                            <CharacterMetaListItem
                                icon={<CircleMinus className="text-red-500" />}
                                key={index}
                            >
                                {con}
                            </CharacterMetaListItem>
                        ))}

                        {!meta?.cons.length && (
                            <div className="text-foreground opacity-50">-</div>
                        )}
                    </CharacterMetaList>
                </div>
            </div>
        </div>
    )
}
