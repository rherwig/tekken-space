interface UsersState {
    id: string;
    preferences: UserPreferences;
}

export interface UserPreferences {
    // TODO: Replace with prisma interface
    layout: 'Gamepad' | 'Arcade';
}

export const useUsers = defineStore('users', {
    state(): UsersState {
        return {
            id: '',
            preferences: {
                layout: 'Gamepad',
            },
        };
    },
});
