<script setup lang="ts">
import HeroUnit from '~/components/page/hero-unit.vue';
import { useFetch } from '#imports';
import CreatorsListItem from '~/components/creators/creators-list-item.vue';

const { data: creators } = useFetch('/api/creators');
</script>

<template>
    <div>
        <HeroUnit>
            <template #title>
                Checkout the Tekken<span class="text-green-500">Community</span>.
            </template>

            Find combos shared by your favorite content creators.
        </HeroUnit>

        <div class="container mt-4">
            <div class="mb-4">
                <h2 class="text-2xl">Featured Creators</h2>
                <p class="text-base text-copy/50">These creators help fuel TekkenSpace.</p>
            </div>

            <div class="grid grid-cols-4 gap-4">
                <CreatorsListItem
                    v-for="creator in creators"
                    :key="creator.id"
                    :creator="creator"
                />
            </div>
        </div>
    </div>
</template>
