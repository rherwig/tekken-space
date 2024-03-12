import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import type { MoveDamage, MoveFrames, MoveHits, MoveMeta, RawMove } from 'prisma/types';
import { PrismaClient } from '@prisma/client';

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
    const inputPath = fileURLToPath(
        new URL(`../../packages/importer/resources/json/${slug}.json`, import.meta.url),
    );

    const rawMoves = JSON.parse(readFileSync(inputPath, 'utf-8'));

    const character = await prisma.character.findUnique({
        where: {
            slug,
        },
        include: {
            moves: true,
        },
    });

    if (!character) {
        throw new Error(`Character not found: ${slug}`);
    }

    if (character.moves.length > 0) {
        throw new Error(`Character moves already exist: ${slug}`);
    }

    const characterId = character.id;

    const moves = rawMoves.map((rawMove: RawMove) => {
        const notation = rawMove.command;
        const notes = rawMove.notes?.trim() ?? null;

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
