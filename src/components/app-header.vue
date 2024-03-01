<template>
    <header class="h-16 flex-shrink-0 bg-gradient-to-b from-black/25 to-transparent">
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
                    <NavigationLink
                        v-if="false"
                        href="/characters"
                    >
                        Characters
                    </NavigationLink>
                </li>
                <li>
                    <NavigationLink
                        href="/community"
                        v-if="false"
                    >
                        Community
                    </NavigationLink>
                </li>
                <li>
                    <NavigationLink href="/share"> Share </NavigationLink>
                </li>
            </ul>

            <div class="flex items-center gap-4">
                <ClientOnly>
                    <USelectMenu
                        :options="controlSchemes"
                        v-model="profile.preferences.layout"
                        size="md"
                    />
                </ClientOnly>

                <ProflieWidget />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import NavigationLink from '~/components/navigation/navigation-link.vue';
import ProflieWidget from '~/components/profile/proflie-widget.vue';
import { useProfile } from '~/stores/profile';

const controlSchemes = ['Gamepad', 'Arcade'];

const profile = useProfile();
</script>
