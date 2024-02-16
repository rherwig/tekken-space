<template>
    <div class="bg-black/25 rounded-md overflow-hidden">
        <div class="flex">
            <div
                class="flex justify-center items-center w-5 bg-white/10"
                :class="props.moves.length > 0 ? 'cursor-pointer' : ''"
                @click="isExpanded = !isExpanded"
            >
                <UIcon name="i-tabler-chevrons-down" />
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
                                v-if="props.variants"
                                :label="`${props.variants} Variants`"
                                color="green"
                            />

                            <UBadge
                                v-if="props.videoUrl"
                                color="red"
                            >
                                <UIcon
                                    name="i-tabler-brand-youtube-filled"
                                    class="text-white text-base"
                                />
                            </UBadge>
                        </div>
                    </div>

                    <div v-if="props.moves.length > 0">
                        <TsNotationDisplay
                            :notation="props.moves.at(0).notation"
                        />
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

        <div
            class="ml-5 overflow-hidden transition-all ease-in-out"
            :class="isExpanded ? 'max-h-fit' : 'max-h-0'"
        >
            <div class="flex flex-col gap-8">
                <TsNotationDisplay notation="d/f+2" />
                <TsNotationDisplay notation="d/f+2" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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
</script>
