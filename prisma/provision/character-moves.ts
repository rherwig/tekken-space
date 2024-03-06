import type { MoveDamage, MoveFrames, MoveHits, MoveMeta, RawMove } from 'prisma/types';
import { PrismaClient } from '@prisma/client';

import rawMoves from './data/kazuya.json';

const prisma = new PrismaClient();

/**
 * Sanitize damage values.
 * @param damage Array of damage values.
 * @returns Array of sanitized damage values.
 */
function sanitizeDamage(damage: string[]): number[] {
    return damage.reduce((result, value) => {
        const number = parseInt(value, 10);
        return Number.isNaN(number) ? result : result.concat(number);
    }, [] as number[]);
}

/**
 * Import character moves from a JSON file.
 * @param slug Slug of the character to import moves for.
 */
async function importCharacterMoves(slug: string) {
    // const rawMoves: RawMove[] = await import('./data/kazuya.json');

    const character = await prisma.character.findUnique({
        where: {
            slug,
        },
    });

    if (!character) {
        throw new Error(`Character not found: ${slug}`);
    }

    const characterId = character.id;

    const moves = rawMoves.map((rawMove) => {
        const notation = rawMove.command;
        const { notes } = rawMove;

        const metadata: MoveMeta = {};

        const damage: MoveDamage = {
            hits: sanitizeDamage(rawMove.damage),
        };

        const frames: MoveFrames = {
            startup: rawMove.startupFrames,
            hit: rawMove.hitFrames,
            block: rawMove.blockFrames,
            counter: rawMove.counterFrames,
        };

        const hits: MoveHits = {
            hits: rawMove.hitLevels,
        };

        return {
            notation,
            notes,
            metadata,
            damage,
            frames,
            hits,
            characterId,
        };
    });

    await prisma.move.createMany({
        data: moves as any,
    });
}

/**
 * Provision character moves.
 */
async function provision() {
    return importCharacterMoves('kazuya');
}

provision().catch(console.log.bind(console));
