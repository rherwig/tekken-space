<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useAsyncData, useHead, useProfile, useRoute, useUsers } from '#imports';
import ProfileBadges from '~/modules/auth/components/profile/profile-badges.vue';
import MoveListsContainer from '~/components/move-lists/move-lists-container.vue';

const route = useRoute();
const profile = useProfile();
const users = useUsers();

const handle = route.params.user as string;

useHead({
    title: `@${handle}`,
});

const { data: user } = await useAsyncData('user', () => users.fetchByHandle(handle));
const { data: moveLists } = await useAsyncData('move-lists', () => profile.fetchMoveLists(handle));

const socials = computed(() => {
    const meta = user.value?.meta;

    if (!meta) {
        return {};
    }

    return (meta as any).socials ?? {};
});
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
                    <div class="flex items-center gap-2">
                        <h1 class="font-bold text-2xl">{{ user.name }}</h1>

                        <ProfileBadges
                            class="mt-1"
                            :user="user"
                        />
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-4 text-2xl">
                <a
                    v-if="socials.x?.url"
                    :href="socials.x?.url"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <UIcon name="i-tabler-brand-x-filled" />
                </a>

                <a
                    v-if="socials.twitch?.url"
                    :href="socials.twitch?.url"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <UIcon name="i-tabler-brand-twitch" />
                </a>

                <a
                    v-if="socials.patreon?.url"
                    :href="socials.patreon?.url"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <UIcon name="i-tabler-brand-patreon-filled" />
                </a>

                <a
                    v-if="socials.youtube?.url"
                    :href="socials.youtube?.url"
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <UIcon name="i-tabler-brand-youtube-filled" />
                </a>
            </div>
        </div>

        <MoveListsContainer
            v-if="user"
            title="Recent Move Lists"
            :author="user"
            :move-lists="moveLists"
        />
    </div>
</template>
