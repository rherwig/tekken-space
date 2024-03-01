import { prisma } from '../client';

import kazuya from './data/kazuya.json';

interface RawMove {
    command: string;
    hitLevels: string[];
    damage: string[];
    startupFrames?: string;
    blockFrames?: string;
    hitFrames?: string;
    counterFrames?: string;
    notes?: string;
}

interface Config {
    authorId: string;
    characterId: string;
    moves: RawMove[];
}

const config: Config = {
    authorId: 'tekken',
    characterId: '',
    moves: kazuya,
};

async function provisionMoves() {
    const { authorId, characterId, moves } = config;
    if (!characterId) {
        throw new Error('Character ID is required');
    }
}
