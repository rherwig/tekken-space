<script lang="ts" setup>
import { computed } from 'vue';

import { useAuth, useRouter } from '#imports';

const { session, signOut, signIn } = useAuth();
const router = useRouter();

const user = computed(() => session.value?.user);

const displayName = computed(() => user.value?.handle ?? user.value?.name ?? '');

const items = [
    [
        {
            label: 'Profile',
            icon: 'i-tabler-user',
            click() {
                router.push(`/@${user.value?.handle}`);
            },
        },
    ],
    [
        {
            label: 'Log Out',
            icon: 'i-tabler-logout',
            click() {
                signOut();
            },
        },
    ],
];
</script>

<template>
    <div class="flex items-center">
        <ClientOnly>
            <UDropdown
                v-if="user"
                :items="items"
                :popper="{ placement: 'bottom-start' }"
            >
                <div class="flex items-center gap-2">
                    <UAvatar
                        :src="user.image"
                        :text="displayName.charAt(0)"
                        class="rounded-full"
                        size="sm"
                    />

                    {{ displayName }}

                    <UIcon name="i-tabler-chevron-down" />
                </div>
            </UDropdown>
        </ClientOnly>

        <UButton
            v-if="!user"
            size="md"
            @click="signIn()"
        >
            Sign In
        </UButton>
    </div>
</template>
