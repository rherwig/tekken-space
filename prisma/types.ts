import Prisma from '@prisma/client';

export type User = Prisma.User;
export type Character = Prisma.Character;
export type Move = Prisma.Move;
export type MoveList = Prisma.MoveList;

export interface UserPreferences {
    layout: 'Gamepad' | 'Arcade';
}

export interface TemporaryUserPreferences {
    selectedCharacterId?: string;
}

export interface PopulatedMoveList extends MoveList {
    moves: Prisma.Move[];
    character: Prisma.Character;
}

export interface MoveDamage {
    total?: number;
    hits?: number[];
}

export interface MoveMeta {
    difficulty?: number;
}

export interface MoveFrames {
    startup?: string;
    hit?: string;
    block?: string;
    counter?: string;
}

export interface MoveHits {
    hits?: string[];
}

export interface RawMove {
    command: string;
    hitLevels: string[];
    damage: string[];
    startupFrames?: string;
    blockFrames?: string;
    hitFrames?: string;
    counterFrames?: string;
    notes?: string;
}
