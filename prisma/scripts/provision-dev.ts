import { prisma } from '../client';

const addMovesToList = async () => {
    const movesListId = 'cls96z5l0000308l8ab577cu3';

    const movesList = await prisma.moveList.findFirst({
        where: {
            id: movesListId,
        },
    });

    if (!movesList) {
        console.error(`Moveslist with ID ${movesListId} does not exist.`);
        return undefined;
    }

    const { characterId, authorId } = movesList;
    if (!characterId || !authorId) {
        console.error('Moveslist is not configured correctly.');
        return undefined;
    }

    const notations = ['u/f+4;d/f+4,3;1;f+4,2 T!;3,1+2', 'd/f+3 T!;DASH;b+3;2;1+2'];

    const moves = notations.map((notation: string) => ({
        notation,
        slug: notation.replace(/\W+/, ''),
        isCombo: true,
        metadata: {},
        characterId,
        authorId,
        movesListId,
    }));

    return prisma.move.createMany({
        data: moves,
    });
};

const provision = async () => {
    await addMovesToList();
};

provision().catch(console.error.bind(console));
