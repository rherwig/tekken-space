import { prisma } from '../client';

const SLUGS = [
    'alisa',
    'asuka',
    'azucena',
    'bryan',
    'claudio',
    'devil-jin',
    'dragunov',
    'feng',
    'hwoarang',
    'jack-8',
    'jin',
    'jun',
    'kazuya',
    'king',
    'kuma',
    'lars',
    'law',
    'lee',
    'leo',
    'leroy',
    'lili',
    'nina',
    'panda',
    'paul',
    'raven',
    'reina',
    'shaheen',
    'steve',
    'victor',
    'xiaoyu',
    'yoshimitsu',
    'zafina',
];

const CHARACTERS = SLUGS.map((slug) => {
    const characterName = slug.replace(/-/g, ' ');
    const characterNameCapitalized = characterName.replace(/\b\w/g, (letter) =>
        letter.toUpperCase(),
    );

    return {
        name: characterNameCapitalized,
        slug,
    };
});

const provisionCharacters = async () => {
    console.log('Importing characters...');

    const data = CHARACTERS.map((character) => {
        return {
            name: character.name,
            slug: character.slug,
            imageUrl: `/images/characters/8/${character.slug}.png`,
            metadata: {},
        };
    });

    await prisma.character.createMany({
        data,
        skipDuplicates: true,
    });
};
