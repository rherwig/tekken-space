<template>
    <header class="h-16 flex-shrink-0 bg-gradient-to-b from-black/25 to-transparent mb-4">
        <div class="container flex justify-between h-full">
            <ul class="flex h-full">
                <li class="h-full -ml-8">
                    <NavigationLink
                        class="font-logo font-normal text-xl"
                        href="/"
                    >
                        <span>Tekken</span>
                        <span class="text-green-500">Space</span>
                    </NavigationLink>
                </li>
                <li>
                    <NavigationLink href="/characters"> Characters </NavigationLink>
                </li>
                <li>
                    <NavigationLink href="/community"> Community </NavigationLink>
                </li>
                <li>
                    <NavigationLink href="/share"> Share </NavigationLink>
                </li>
                <li>
                    <NavigationLink
                        v-if="false"
                        href="/help"
                    >
                        Help
                    </NavigationLink>
                </li>
            </ul>

            <div class="flex items-center gap-4">
                <USelectMenu
                    :options="controlSchemes"
                    value-attribute="value"
                    v-model="profile.preferences.layout"
                    size="md"
                />

                <ProflieWidget />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ControllerLayout } from 'prisma/types';

import NavigationLink from '~/components/navigation/navigation-link.vue';
import ProflieWidget from '~/modules/auth/components/profile/proflie-widget.vue';
import { useProfile } from '~/stores/profile';

const controlSchemes = [
    { label: 'Gamepad', value: ControllerLayout.GAMEPAD },
    { label: 'Arcade', value: ControllerLayout.ARCADE },
    // { label: 'Tekken', value: ControllerLayout.TEKKEN },
];

const profile = useProfile();
</script>
