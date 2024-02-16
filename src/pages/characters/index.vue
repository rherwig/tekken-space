<script lang="ts" setup>
import { useFetch } from '#imports';

const { data: characters } = useFetch('/api/characters');
</script>

<template>
    <div class="container">
        <h1 class="text-4xl font-light mb-8">Select a Character</h1>

        <div class="grid grid-cols-8 gap-4">
            <div
                v-for="character in characters"
                :key="character.slug"
                class="relative aspect-w-1 aspect-h-1"
            >
                <NuxtLink :href="`/characters/${character.slug}`">
                    <NuxtImg
                        width="128"
                        height="128"
                        class="w-full h-full object-contain"
                        :src="character.imageUrl"
                    />

                    <div
                        class="absolute font-bold text-lg flex justify-center bg-black/75 bottom-0 w-full"
                    >
                        {{ character.name }}
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
