import { Character } from '@tekken-space/database'
import Link from 'next/link'
import Image from 'next/image'

export default function CharactersGrid({
    characters,
}: {
    characters: Character[]
}) {
    return (
        <div className="grid grid-cols-8 gap-2">
            {characters.map((character) => (
                <Link
                    href={`/characters/${character.id}`}
                    className="relative aspect-square"
                    key={character.id}
                >
                    {character.imageUrl && (
                        <Image
                            priority={true}
                            src={character.imageUrl}
                            className="object-fit h-full w-full"
                            alt={`Image of ${character.name}`}
                            width={256}
                            height={256}
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
