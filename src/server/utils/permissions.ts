import { User } from 'prisma/types';

export interface OwnableEntity {
    authorId: string;
}

/**
 * Checks, if the user is authenticated.
 * @param user
 */
export function isAuthenticated(user?: User): boolean {
    return !!user;
}

/**
 * Checks, if the user is an admin.
 * @param user
 */
export function isAdmin(user?: User): boolean {
    return user?.role === 'ADMIN';
}

/**
 * Checks, if the user is a pro user.
 * @param user
 */
export function isPro(user?: User): boolean {
    return user?.isPro;
}

/**
 * Checks, if the user is the owner of the given id.
 * @param user
 * @param entity
 */
export function isOwner(user: User, entity: OwnableEntity): boolean {
    return user.id === entity.authorId;
}

/**
 * Creates an error, if the user is not authenticated.
 * @param user
 */
export function assertAuthenticated(user?: User): void {
    if (!isAuthenticated(user)) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }
}

/**
 * Creates an error, if the user is not an admin.
 * @param user
 */
export function assertAdmin(user: User): void {
    if (!isAdmin(user)) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden',
        });
    }
}

/**
 * Creates an error, if the user is not a pro user.
 * @param user
 */
export function assertPro(user: User): void {
    if (!isPro(user)) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden',
        });
    }
}

/**
 * Creates an error, if the user is not the owner of the given entity.
 * @param user
 * @param entity
 */
export function assertOwner(user: User, entity: OwnableEntity): void {
    if (!isOwner(user, entity)) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden',
        });
    }
}
