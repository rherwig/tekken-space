import Prisma from '@prisma/client';

export interface UserPreferences {
    layout: 'Gamepad' | 'Arcade';
}

export interface TemporaryUserPreferences {
    selectedCharacterId?: string;
}

export interface PopulatedMoveList extends Prisma.MoveList {
    moves: Prisma.Move[];
    character: Prisma.Character;
}
