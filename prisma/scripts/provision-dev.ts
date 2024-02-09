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

const provisionTemplate = async () => {
    const characterId = 'cls97pldx0002oantxm9sdpev';
    const authorId = 'thefury';

    const move = await prisma.move.create({
        data: {
            isCombo: true,
            notation: 'd/f+2;4,3;d+2,3;LIB 1+2 T!;f+2,1,4',
            slug: 'df243d23lib12tf214',
            metadata: {},
            character: {
                connect: {
                    id: characterId,
                },
            },
            author: {
                connect: {
                    id: authorId,
                },
            },
        },
    });

    await prisma.moveList.create({
        data: {
            name: '',
            moves: {
                connect: {
                    id: move.id,
                },
            },
            author: {
                connect: {
                    id: authorId,
                },
            },
        },
    });
};

const provision = async () => {
    // await provisionCharacters();
    // await provisionTemplate();
};

provision().catch(console.error.bind(console));
