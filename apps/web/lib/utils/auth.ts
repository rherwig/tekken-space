import type { Profile } from '@tekken-space/database'

export function isAdmin(user: Profile) {
    return user.role === 'admin'
}
