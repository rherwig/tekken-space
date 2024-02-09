<script lang="ts" setup>
import type { OverviewMoveItem } from '~/components/moves/moves.types';
import MoveOverview from '~/components/moves/overview/move-overview.vue';
import MoveOverviewCard from '~/components/moves/overview/move-overview-card.vue';

const route = useRoute();

const { data } = await useAsyncData('character-details', async () => {
    const character = await $fetch(`/api/characters/${route.params.slug}`);
    const moveLists = await $fetch(`/api/move-lists/${character.id}`);

    return {
        character,
        moveLists,
    };
});

const archetypes = {
    COUNTER: 'Counter-Hit',
    RUSH: 'Rushdown',
    POKE: 'Poking',
    MIX: 'Mix-Ups',
    DEFENSE: 'Defense',
    ALL: 'All-Round',
    MISHIMA: 'Mishima',
};

const punishment: OverviewMoveItem[] = [
    {
        label: '10F',
        notation: '1,2,2_b+1',
    },
    {
        label: '13F',
        notation: 'b+1+2',
    },
    {
        label: '15F',
        notation: 'u/f+4',
    },
];

const punishmentCrouching: OverviewMoveItem[] = [
    {
        label: '10F',
        notation: 'FC d+1',
    },
    {
        label: '11F',
        notation: 'WS 4',
    },
];

const punishmentWhiff: OverviewMoveItem[] = [
    {
        label: 'close',
        notation: 'u/f+4',
    },
    {
        label: 'far',
        notation: 'f+3,4',
    },
];

const launchers: OverviewMoveItem[] = [
    {
        label: '15F',
        notation: 'u/f+4',
    },
];

const heat: OverviewMoveItem[] = [
    {
        label: '12F',
        notation: 'f+1+2',
    },
    {
        label: '13F',
        notation: 'b+1+2',
    },
    {
        label: '15F',
        notation: 'f,f+2',
    },
];

const wall: OverviewMoveItem[] = [
    {
        label: 'general',
        notation: '1,3;b+1+2',
    },
];

const stapleCombos: OverviewMoveItem[] = [
    {
        label: '15F',
        notation: 'u/f+4;d/f+4,3;1;d/f+3,2,1+2 T!;f,f;3,1+2',
    },
    {
        label: '16F',
        notation: 'd/f+3 T!;f,f;b+3;2;b+1+2',
    },
];

const meta = {
    tagLine: 'Taijiquan God Fist',
    archetypes: [
        {
            label: archetypes.POKE,
            color: 'red',
        },
    ],
    pros: [
        'Great distance control',
        'Good panic- and evasion-moves',
        'Good low moves',
    ],
    cons: ['Below average punishment', 'Mediocre combo damage'],
    difficulty: {
        label: 'Easy',
        color: 'green',
    },
};
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
                <h2 class="text-lg text-copy/50">{{ meta.tagLine }}</h2>

                <div class="grid grid-cols-[min-content_1fr] gap-4 mt-4">
                    <div
                        class="flex flex-col gap-1 items-start whitespace-nowrap"
                    >
                        <div>Archetype</div>
                        <div class="flex gap-2">
                            <UBadge
                                v-for="archetype in meta.archetypes"
                                :key="archetype.label"
                                size="md"
                                :label="archetype.label"
                                :color="archetype.color"
                            />
                        </div>
                    </div>

                    <div class="flex flex-col gap-1 items-start">
                        <div>Difficulty</div>
                        <UBadge
                            size="md"
                            :label="meta.difficulty.label"
                            :color="meta.difficulty.color"
                        />
                    </div>

                    <div class="whitespace-nowrap mr-12">
                        <div>Pros</div>
                        <ul class="flex flex-col m-0 p-0 list-none">
                            <li
                                v-for="item in meta.pros"
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
                    </div>

                    <div class="whitespace-nowrap">
                        <div>Cons</div>
                        <ul class="flex flex-col m-0 p-0 list-none">
                            <li
                                v-for="item in meta.cons"
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
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="data?.moveLists"
            class="flex flex-col gap-4"
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

                    <MoveOverviewCard
                        class="bg-black/50 space-y-4 px-4 py-3 rounded-md"
                    >
                        <div>
                            <h2 class="text-2xl mb-4">Wall Combos</h2>
                            <MoveOverview :move-items="wall" />
                        </div>
                    </MoveOverviewCard>
                </div>

                <MoveOverviewCard
                    class="col-span-2 bg-black/50 space-y-4 px-4 py-3 rounded-md"
                >
                    <div>
                        <h2 class="text-2xl mb-4">Staple Combos</h2>
                        <MoveOverview :move-items="stapleCombos" />
                    </div>
                </MoveOverviewCard>
            </div>
        </div>
    </div>
</template>
