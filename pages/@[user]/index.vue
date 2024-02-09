<script lang="ts" setup>
import MoveList from '~/components/move-lists/move-list.vue';

const route = useRoute();

const handle = route.params.user;

useHead({
    title: `@${handle}`,
});

const { data: user } = useFetch(`/api/users/${handle}`);
</script>

<template>
    <div class="container">
        <div class="flex justify-between">
            <div class="flex gap-4">
                <UAvatar
                    size="2xl"
                    alt="The Fury"
                />

                <div>
                    <div class="text-copy/50">Overview</div>
                    <h1 class="font-bold text-2xl">{{ user.name }}</h1>
                </div>
            </div>

            <div class="flex items-center gap-4 text-2xl">
                <UIcon name="i-tabler-brand-x-filled" />
                <UIcon name="i-tabler-brand-twitch" />
                <UIcon name="i-tabler-brand-youtube-filled" />
            </div>
        </div>

        <div class="mt-8">
            <div class="mb-8">
                <h2 class="text-xl">Popular Combos</h2>
                <p class="text-copy/50">
                    Checkout the most popular combos made by {{ user.name }}.
                </p>
            </div>

            <div class="flex flex-col gap-4">
                <MoveList
                    v-for="list in user.moveLists"
                    :key="list.id"
                    :id="list.id"
                    :character="list.character.name"
                    :title="list.name"
                    :moves="list.moves"
                    video-url="#"
                />
            </div>
        </div>
    </div>
</template>
