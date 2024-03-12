<script lang="ts" setup>
import { Archetype, type PopulatedMove } from 'prisma/types';
import { computed } from 'vue';

import type { OverviewMoveItem } from '~/components/moves/moves.types';
import MoveOverview from '~/components/moves/overview/move-overview.vue';
import MoveOverviewCard from '~/components/moves/overview/move-overview-card.vue';
import { useAsyncData, useHead, useRoute } from '#imports';
import FilterableMoveList from '~/components/move-lists/filterable-move-list.vue';

const route = useRoute();

const { data } = await useAsyncData('character-details', async () => {
    const character = await $fetch(`/api/characters/${route.params.slug}`);
    const moveLists = await $fetch(`/api/move-lists/${character.id}`);
    const moves = await $fetch(`/api/characters/${route.params.slug}/moves`);

    return {
        character,
        moveLists,
        moves,
    };
});

const tabName = computed(() => {
    if (!data.character?.name) {
        return '';
    }

    return `${data.character.name} - Overview`;
});

useHead({
    title: tabName,
});

const hasCheatSheet = false;

const archetypes: Record<Archetype, { label: string; color: string }> = {
    [Archetype.BALANCED]: {
        label: 'Balanced',
        color: 'blue',
    },
    [Archetype.DEFENSE]: {
        label: 'Defense',
        color: 'blue',
    },
    [Archetype.GRAPPLER]: {
        label: 'Grappler',
        color: 'yellow',
    },
    [Archetype.MISHIMA]: {
        label: 'Mishima',
        color: 'red',
    },
    [Archetype.MIXUP]: {
        label: 'Mixup',
        color: 'purple',
    },
    [Archetype.OFFENSE]: {
        label: 'Offense',
        color: 'red',
    },
    [Archetype.POKING]: {
        label: 'Poking',
        color: 'green',
    },
    [Archetype.RUSHDOWN]: {
        label: 'Rushdown',
        color: 'red',
    },
    [Archetype.ZONING]: {
        label: 'Zoning',
        color: 'blue',
    },
    [Archetype.UNKNOWN]: {
        label: 'Unknown',
        color: 'gray',
    },
};

const tabs = [
    {
        slot: 'overview',
        label: 'Overview',
    },
    {
        slot: 'moves',
        label: 'Moves',
    },
    {
        slot: 'combos',
        label: 'Combos',
    },
];

const punishment: OverviewMoveItem[] = [];
const punishmentCrouching: OverviewMoveItem[] = [];
const punishmentWhiff: OverviewMoveItem[] = [];
const launchers: OverviewMoveItem[] = [];
const heat: OverviewMoveItem[] = [];
const wall: OverviewMoveItem[] = [];
const stapleCombos: OverviewMoveItem[] = [];
</script>

<template>
    <div class="container">
        <div
            class="flex gap-8 mb-8"
            v-if="data?.character"
        >
            <NuxtImg
                :src="data.character.imageUrl"
                width="256"
                height="256"
                class="w-[256px] h-[256px] rounded-md"
            />

            <div class="flex-1">
                <h1 class="text-3xl">{{ data.character.name }}</h1>
                <h2
                    v-if="data.character.metadata?.tagLine"
                    class="text-lg text-copy/50"
                >
                    {{ data.character.metadata.tagLine }}
                </h2>

                <div class="grid grid-cols-[min-content_1fr] gap-4 mt-4">
                    <div class="flex flex-col gap-1 items-start whitespace-nowrap">
                        <div>Archetype</div>
                        <div class="flex gap-2">
                            <UBadge
                                v-for="archetype in data.character.metadata?.archetypes"
                                :key="archetype"
                                size="md"
                                :label="archetypes[archetype]?.label"
                                :color="archetypes[archetype]?.color"
                            />

                            <div v-if="!data.character.metadata?.archetypes?.length">
                                <div class="text-copy/50">No archetype listed</div>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-1 items-start">
                        <div>Difficulty</div>
                        <UBadge
                            v-if="data.character.metadata?.difficulty?.label"
                            size="md"
                            :label="data.character.metadata?.difficulty.label"
                            :color="data.character.metadata?.difficulty.color"
                        />
                        <div v-else>
                            <div class="text-copy/50">No difficulty listed</div>
                        </div>
                    </div>

                    <div class="whitespace-nowrap mr-12">
                        <div>Pros</div>
                        <ul
                            v-if="data.character.metadata?.pros?.length"
                            class="flex flex-col m-0 p-0 list-none"
                        >
                            <li
                                v-for="item in data.character.metadata?.pros"
                                :key="item"
                                class="flex items-center gap-2"
                            >
                                <UIcon
                                    name="i-tabler-square-rounded-plus-filled"
                                    class="text-green-400"
                                />
                                <span>{{ item }}</span>
                            </li>
                        </ul>
                        <div v-else>
                            <div class="text-copy/50">No pros listed</div>
                        </div>
                    </div>

                    <div class="whitespace-nowrap">
                        <div>Cons</div>
                        <ul
                            class="flex flex-col m-0 p-0 list-none"
                            v-if="data.character.metadata?.cons?.length"
                        >
                            <li
                                v-for="item in data.character.metadata?.cons"
                                :key="item"
                                class="flex items-center gap-2"
                            >
                                <UIcon
                                    name="i-tabler-square-rounded-minus-filled"
                                    class="text-red-400"
                                />
                                <span>{{ item }}</span>
                            </li>
                        </ul>
                        <div v-else>
                            <div class="text-copy/50">No cons listed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mb-8">
            <h2 class="text-2xl mb-2">Overview</h2>
            <div
                class="flex flex-col gap-4"
                v-if="hasCheatSheet"
            >
                <div class="grid grid-cols-2 gap-8 mb-4 overflow-hidden">
                    <MoveOverviewCard>
                        <div>
                            <h2 class="text-2xl mb-4">Punishment</h2>

                            <h3 class="font-bold">Standing</h3>
                            <MoveOverview :move-items="punishment" />

                            <h3 class="font-bold mt-4">Crouching</h3>
                            <MoveOverview :move-items="punishmentCrouching" />

                            <h3 class="font-bold mt-4">Whiff</h3>
                            <MoveOverview :move-items="punishmentWhiff" />
                        </div>
                    </MoveOverviewCard>

                    <div class="flex flex-col gap-4">
                        <MoveOverviewCard>
                            <div>
                                <h2 class="text-2xl mb-4">Common Launchers</h2>

                                <MoveOverview :move-items="launchers" />
                            </div>
                        </MoveOverviewCard>

                        <MoveOverviewCard>
                            <div>
                                <h2 class="text-2xl mb-4">Heat Engages</h2>

                                <MoveOverview :move-items="heat" />
                            </div>
                        </MoveOverviewCard>

                        <MoveOverviewCard class="bg-black/50 space-y-4 px-4 py-3 rounded-md">
                            <div>
                                <h2 class="text-2xl mb-4">Wall Combos</h2>
                                <MoveOverview :move-items="wall" />
                            </div>
                        </MoveOverviewCard>
                    </div>

                    <MoveOverviewCard class="col-span-2 bg-black/50 space-y-4 px-4 py-3 rounded-md">
                        <div>
                            <h2 class="text-2xl mb-4">Staple Combos</h2>
                            <MoveOverview :move-items="stapleCombos" />
                        </div>
                    </MoveOverviewCard>
                </div>
            </div>
            <div v-else>
                <div class="text-copy/50">No cheat sheet available, yet.</div>
            </div>
        </div>

        <div>
            <h2 class="text-2xl mb-2">Moves</h2>
            <p
                class="text-copy/50 mb-4"
                v-if="data.moves.length"
            >
                This is an experimental moves list and may not be accurate in some places.
            </p>

            <FilterableMoveList
                class="bg-black/25 rounded-md"
                v-if="data.moves.length"
                :moves="data.moves"
                :show-filter="false"
            />
            <div v-else>
                <div class="text-copy/50">Move data not available, yet.</div>
            </div>
        </div>
    </div>
</template>
