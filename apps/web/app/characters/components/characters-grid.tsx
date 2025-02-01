import { Character } from '@tekken-space/database'
import Link from 'next/link'
import Image from 'next/image'

export default function CharactersGrid({
    characters,
}: {
    characters: Character[]
}) {
    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-8">
            {characters.map((character) => (
                <Link
                    href={`/characters/${character.id}`}
                    className="relative aspect-square"
                    key={character.id}
                >
                    {character.imageUrl && (
                        <Image
                            priority={true}
                            src={`/images/characters/8/${character.id}.webp`}
                            className="size-full object-cover object-top p-2"
                            alt={`Image of ${character.name}`}
                            width={192}
                            height={192}
                        />
                    )}

                    <div className="absolute bottom-0 left-0 z-10 flex w-full justify-center bg-black/70 py-2">
                        {character.name}
                    </div>
                </Link>
            ))}
        </div>
    )
}
