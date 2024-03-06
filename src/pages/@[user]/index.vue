<script lang="ts" setup>
import { useAsyncData, useHead, useProfile, useRoute, useUsers } from '#imports';
import MoveList from '~/components/move-lists/move-list.vue';
import CreateMoveListForm from '~/components/move-lists/create-move-list-form.vue';
import AuthorOnly from '~/modules/auth/components/author-only.vue';

const route = useRoute();
const profile = useProfile();
const users = useUsers();

const handle = route.params.user as string;

useHead({
    title: `@${handle}`,
});

const { data: user } = await useAsyncData('user', () => users.fetchByHandle(handle));
const { data: moveLists } = await useAsyncData('move-lists', () => profile.fetchMoveLists(handle));
</script>

<template>
    <div class="container">
        <div
            class="flex justify-between"
            v-if="user"
        >
            <div class="flex gap-4">
                <UAvatar
                    size="2xl"
                    :alt="user.name"
                />

                <div>
                    <div class="text-copy/50">Overview</div>
                    <h1 class="font-bold text-2xl">{{ user.name }}</h1>
                </div>
            </div>

            <div class="flex items-center gap-4 text-2xl">
                <a
                    v-if="user?.metadata?.socials?.x?.url"
                    :href="user?.metadata?.socials?.x?.url"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <UIcon name="i-tabler-brand-x-filled" />
                </a>

                <a
                    v-if="user?.metadata?.socials?.twitch?.url"
                    :href="user?.metadata?.socials?.twitch?.url"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <UIcon name="i-tabler-brand-twitch" />
                </a>

                <a
                    v-if="user?.metadata?.socials?.patreon?.url"
                    :href="user?.metadata?.socials?.patreon?.url"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <UIcon name="i-tabler-brand-patreon-filled" />
                </a>

                <a
                    v-if="user?.metadata?.socials?.youtube?.url"
                    :href="user?.metadata?.socials?.youtube?.url"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <UIcon name="i-tabler-brand-youtube-filled" />
                </a>
            </div>
        </div>

        <div
            class="mt-8"
            v-if="user"
        >
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h2 class="text-xl">Recent Move Lists</h2>
                    <p class="text-copy/50">
                        Checkout the most recent move lists made by {{ user.name }}.
                    </p>
                </div>

                <AuthorOnly :id="user?.id">
                    <CreateMoveListForm />
                </AuthorOnly>
            </div>

            <div class="flex flex-col gap-4">
                <MoveList
                    v-for="list in moveLists"
                    :key="list.id"
                    :id="list.id"
                    :character="list.character"
                    :title="list.name"
                    :moves="list.moves"
                    :author-id="user?.id"
                    :video-url="list.metadata?.videoUrl"
                />
            </div>
        </div>
    </div>
</template>
