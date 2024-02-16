import { defineStore } from 'pinia';

interface CharactersState {
    test: boolean;
}

export const useCharacters = defineStore('characters', {
    state(): CharactersState {
        return {
            test: true,
        };
    },
});
