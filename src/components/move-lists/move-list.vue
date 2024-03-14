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
                            <PermissionsOnly
                                admin
                                :author="props.authorId"
                            >
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
                            </PermissionsOnly>

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
                    <MoveVariant
                        v-for="(move, index) in variants"
                        :move="move"
                        :index="index"
                        :author-id="props.authorId"
                        @edit="handleEditMoveClick"
                        @delete="handleDeleteMoveClick"
                    />
                </div>
            </div>
        </div>

        <TsModal v-model="isCreateModalOpen">
            <UpsertMoveForm
                :move-list-id="props.id"
                :move="selectedMove"
                @created="handleMoveCreated"
                @updated="handleMoveUpdated"
                @cancel="reset"
            />
        </TsModal>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Prisma from '@prisma/client';

import { useProfile } from '~/stores/profile';
import MoveDisplayWithMeta from '~/components/moves/move-display-with-meta.vue';
import TsModal from '~/components/ui/modals/ts-modal.vue';
import UpsertMoveForm from '~/components/forms/upsert-move-form.vue';
import MoveVariant from '~/components/move-lists/move-variant.vue';
import { useConfirm } from '~/composables/confirm/confirm';
import { useToast } from '#imports';

interface Props {
    id: string;
    title: string;
    moves: Prisma.Move[];
    character?: Prisma.Character;
    videoUrl?: string;
    authorId?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['create', 'update', 'deleted']);

const profile = useProfile();
const confirm = useConfirm();
const toast = useToast();

const isExpanded = ref<boolean>(false);
const isCreateModalOpen = ref<boolean>(false);
const selectedMoveId = ref<string | null>(null);

const selectedMove = computed(() => {
    return props.moves.find((move) => move.id === selectedMoveId.value);
});

const variants = computed(() => props.moves.slice(1));

const moveListActions = [
    [
        {
            label: 'Add Move',
            icon: 'i-tabler-square-rounded-plus',
            click() {
                isCreateModalOpen.value = true;
            },
        },
        {
            label: 'Edit Move',
            icon: 'i-tabler-pencil',
            disabled: !props.moves.length,
            click() {
                selectedMoveId.value = props.moves.at(0).id;
                isCreateModalOpen.value = true;
            },
        },
        {
            label: 'Delete Move',
            icon: 'i-tabler-trash',
            disabled: !props.moves.length,
            click() {
                const { id } = props.moves.at(0);
                if (!id) {
                    return;
                }

                handleDeleteMoveClick(id);
            },
        },
    ],
    [
        {
            label: 'Edit List',
            icon: 'i-tabler-pencil',
            click() {
                emit('edit', props.id);
            },
        },
        {
            label: 'Delete List',
            icon: 'i-tabler-trash',
            async click() {
                try {
                    await confirm({
                        title: 'Delete Move List',
                        message:
                            'Are you sure you want to delete this move list? This action cannot be undone.',
                        confirmButtonText: 'Delete',
                    });
                } catch (error: any) {
                    return;
                }

                try {
                    await profile.deleteMoveList(props.id);

                    toast.add({
                        title: 'Move List deleted.',
                    });
                } catch (error: any) {
                    toast.add({
                        title: 'Failed to delete Move List.',
                        color: 'red',
                    });
                }

                emit('deleted', props.id);
            },
        },
    ],
];

function handleEditMoveClick(moveId: string) {
    selectedMoveId.value = moveId;
    isCreateModalOpen.value = true;
}

async function handleDeleteMoveClick(moveId: string) {
    try {
        await confirm({
            title: 'Delete Move',
            message: 'Are you sure you want to delete this move? This action cannot be undone.',
            confirmButtonText: 'Delete',
        });
    } catch (error: any) {
        return;
    }

    try {
        await profile.deleteMove(moveId, props.id);

        toast.add({
            title: 'Move deleted.',
        });
    } catch (error: any) {
        toast.add({
            title: 'Failed to delete Move.',
            color: 'red',
        });
    }
}

function handleMoveCreated() {
    toast.add({
        title: 'Move created.',
    });

    if (props.moves.length > 1) {
        isExpanded.value = true;
    }

    reset();
}

function handleMoveUpdated() {
    toast.add({
        title: 'Move updated.',
    });

    reset();
}

function reset() {
    selectedMoveId.value = null;
    isCreateModalOpen.value = false;
}
</script>
