<template>
    <div class="bg-black/25 rounded-md overflow-hidden">
        <div class="flex">
            <div
                class="flex justify-center items-center w-5 bg-white/10"
                :class="props.moves.length > 0 ? 'cursor-pointer' : ''"
                @click="isExpanded = !isExpanded"
            >
                <UIcon
                    name="i-tabler-chevrons-down"
                    dynamic
                />
            </div>

            <div class="flex flex-1">
                <div class="flex flex-col gap-4 flex-1 p-4">
                    <div class="flex justify-between items-center">
                        <div>
                            <span
                                v-if="name"
                                class="font-bold"
                            >
                                {{ name }} -
                            </span>
                            {{ props.title }}
                        </div>

                        <div class="flex items-center gap-2">
                            <UBadge
                                v-if="props.moves.length"
                                :label="`${props.moves.length} Variants`"
                                color="green"
                                dynamic
                            />

                            <UBadge
                                v-if="props.videoUrl"
                                color="red"
                            >
                                <UIcon
                                    name="i-tabler-brand-youtube-filled"
                                    class="text-white text-base"
                                    dynamic
                                />
                            </UBadge>
                        </div>
                    </div>

                    <div v-if="props.moves.length > 0">
                        <TsNotationDisplay :notation="props.moves.at(0).notation" />
                    </div>
                    <div
                        v-else-if="false"
                        class="h-[56px] flex items-center text-copy/50 italic"
                    >
                        This list does not contain any moves, yet.
                    </div>
                    <div
                        class="h-[56px] flex items-center"
                        v-else
                    >
                        <CreateMoveForm :move-list-id="props.id" />
                    </div>
                </div>

                <NuxtImg
                    v-if="slug"
                    :src="`/images/characters/8/${slug}.png`"
                    width="128"
                    height="128"
                />
            </div>
        </div>

        <div class="flex">
            <div class="w-5 bg-white/10"></div>

            <div
                class="flex-1 overflow-hidden transition-all ease-in-out"
                :class="isExpanded ? 'max-h-fit' : 'max-h-0'"
            >
                <div class="flex flex-col">
                    <div
                        class="flex flex-col gap-4 p-4 border-t border-white/10"
                        v-for="(move, index) in variants"
                        :key="move.id"
                    >
                        <div class="text-sm">Variant {{ index + 1 }}</div>
                        <TsNotationDisplay :notation="move.notation" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import TsNotationDisplay from '~/ui/notation/ts-notation-display.vue';
import { useSlug } from '~/composables/slug';
import CreateMoveForm from '~/components/moves/forms/create-move-form.vue';

interface Props {
    id: string;
    title: string;
    // TODO: Add prisma type
    moves: any[];
    character?: string;
    variants?: number | string;
    videoUrl?: string;
}

const props = defineProps<Props>();
const { name, slug } = useSlug(props.character ?? '');

const isExpanded = ref<boolean>(false);

const variants = computed(() => props.moves.slice(1));
</script>
