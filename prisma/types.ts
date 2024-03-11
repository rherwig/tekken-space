import Prisma from '@prisma/client';

export type User = Prisma.User;
export type Character = Prisma.Character;
export type Move = Prisma.Move;
export type MoveList = Prisma.MoveList;

export enum ControllerLayout {
    UNKNOWN = 'UNKNOWN',
    GAMEPAD = 'GAMEPAD',
    XBOX = 'XBOX',
    PLAYSTATION = 'PLAYSTATION',
    ARCADE = 'ARCADE',
    HITBOX = 'HITBOX',
    TEKKEN = 'TEKKEN',
}

export enum Difficulty {
    UNKNOWN,
    BEGINNER,
    EASY,
    MEDIUM,
    HARD,
    CHALLENGE,
}

export enum Archetype {
    UNKNOWN,
    GRAPPLER,
    MIXUP,
    RUSHDOWN,
    ZONING,
    DEFENSE,
    OFFENSE,
    BALANCED,
    POKING,
    MISHIMA,
}

export interface UserPreferences {
    layout: ControllerLayout;
}

export interface TemporaryUserPreferences {
    selectedCharacterId?: string;
}

export interface PopulatedMoveList extends MoveList {
    moves: Prisma.Move[];
    character: Prisma.Character;
}

export interface PopulatedMove extends Omit<Move, 'metadata' | 'damage' | 'frames' | 'hits'> {
    id: string;
    metadata: MoveMeta;
    damage: MoveDamage;
    frames: MoveFrames;
    hits: MoveHits;
}

export interface PopulatedCharacter extends Omit<Character, 'metadata'> {
    metadata: CharacterMeta;
}

export interface CharacterMeta {
    title?: string;
    archetype?: Archetype[];
    difficulty?: Difficulty;
    pros?: string[];
    cons?: string[];
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
