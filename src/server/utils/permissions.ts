import { User } from 'prisma/types';

/**
 * Checks, if the user is an admin.
 * @param user
 */
export function isAdmin(user?: User): boolean {
    return user?.role === 'ADMIN';
}
