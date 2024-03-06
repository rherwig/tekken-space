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
                        <div class="flex items-center gap-2">
                            <AuthorOnly
                                v-if="props.authorId"
                                :id="props.authorId"
                            >
                                <ClientOnly>
                                    <UDropdown
                                        :items="moveListActions"
                                        :popper="{ placement: 'bottom-start' }"
                                    >
                                        <div
                                            class="flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer rounded-full h-5 w-5 mt-0.5"
                                        >
                                            <UIcon
                                                name="i-tabler-dots-vertical"
                                                class="text-lg"
                                                dynamic
                                            />
                                        </div>
                                    </UDropdown>
                                </ClientOnly>
                            </AuthorOnly>

                            <span
                                v-if="props.character?.name"
                                class="font-bold"
                            >
                                {{ props.character.name }}
                            </span>

                            <span>/</span>

                            <span>
                                {{ props.title }}
                            </span>
                        </div>

                        <div class="flex items-center gap-8">
                            <CreateMoveForm
                                :move-list-id="props.id"
                                v-model="showCreateMoveModal"
                            />

                            <div class="flex items-center gap-2">
                                <UBadge
                                    v-if="props.moves"
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
                    </div>

                    <div v-if="props.moves && props.moves.length > 0">
                        <MoveDisplayWithMeta :move="props.moves.at(0)" />
                    </div>
                    <div
                        v-else
                        class="h-[56px] flex items-center text-copy/50 italic"
                    >
                        This list does not contain any moves, yet.
                    </div>
                </div>

                <NuxtImg
                    v-if="props.character?.imageUrl"
                    :src="props.character.imageUrl"
                    class="object-top object-cover h-32 rounded-br-md"
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
                        <MoveDisplayWithMeta :move="move" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Prisma from '@prisma/client';

import CreateMoveForm from '~/components/moves/forms/create-move-form.vue';
import { useProfile } from '~/stores/profile';
import MoveDisplayWithMeta from '~/components/moves/move-display-with-meta.vue';
import AuthorOnly from '~/modules/auth/components/author-only.vue';

interface Props {
    id: string;
    title: string;
    moves: Prisma.Move[];
    character?: Prisma.Character;
    videoUrl?: string;
    authorId?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['deleted']);

const profile = useProfile();

const isExpanded = ref<boolean>(false);
const showCreateMoveModal = ref<boolean>(false);

const variants = computed(() => props.moves.slice(1));

const moveListActions = [
    [
        {
            label: 'Add Move',
            icon: 'i-tabler-square-rounded-plus',
            click() {
                showCreateMoveModal.value = true;
            },
        },
    ],
    [
        {
            label: 'Delete',
            icon: 'i-tabler-trash',
            async click() {
                await profile.deleteMoveList(props.id);

                emit('deleted', props.id);
            },
        },
    ],
];
</script>
