<template>
    <header
        class="h-16 flex-shrink-0 bg-gradient-to-b from-black/25 to-transparent"
    >
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
                        v-if="false"
                        href="/community"
                    >
                        Community
                    </NavigationLink>
                </li>
                <li>
                    <NavigationLink href="/share"> Share </NavigationLink>
                </li>
            </ul>

            <div class="flex items-center gap-2">
                <USelectMenu
                    v-if="true"
                    :options="controlSchemes"
                    v-model="users.preferences.layout"
                    size="md"
                />
                <UButton
                    v-if="false"
                    size="md"
                >
                    Sign In
                </UButton>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import NavigationLink from '~/components/navigation/navigation-link.vue';
import { useUsers } from '~/stores/users';

const controlSchemes = ['Gamepad', 'Arcade'];
const selectedControlScheme = ref<string>('Gamepad');

const users = useUsers();
</script>
