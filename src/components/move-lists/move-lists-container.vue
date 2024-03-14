<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { MoveList as PrismaMoveList, User } from 'prisma/types';

import MoveList from '~/components/move-lists/move-list.vue';
import TsModal from '~/components/ui/modals/ts-modal.vue';
import PermissionsOnly from '~/modules/auth/components/permissions-only.vue';
import UpsertMoveListForm from '~/components/forms/upsert-move-list-form.vue';
import { useToast } from '#imports';

interface Props {
    title: string;
    author: User;
    moveLists: PrismaMoveList[];
}

const props = defineProps<Props>();

const toast = useToast();

const isCreateModalOpen = ref<boolean>(false);
const selectedMoveListId = ref<string | null>(null);

const selectedMoveList = computed(() => {
    return props.moveLists.find((list) => list.id === selectedMoveListId.value);
});

function handleMoveListCreated() {
    toast.add({
        title: 'Move list created.',
    });

    reset();
}
function handleMoveListUpdated() {
    toast.add({
        title: 'Move list updated.',
    });

    reset();
}

function reset() {
    selectedMoveListId.value = null;
    isCreateModalOpen.value = false;
}

async function handleEditMoveListClick(moveListId: string) {
    selectedMoveListId.value = moveListId;
    isCreateModalOpen.value = true;
}
</script>

<template>
    <div>
        <div class="flex justify-between items-center mb-8">
            <div>
                <h2 class="text-xl">
                    <slot name="title" />
                </h2>

                <p class="text-copy/50">
                    <slot name="description" />
                </p>
            </div>

            <PermissionsOnly
                :author="props.author.id"
                admin
            >
                <UButton @click="isCreateModalOpen = true">Add Move List</UButton>
            </PermissionsOnly>
        </div>

        <div class="flex flex-col gap-4">
            <MoveList
                v-for="list in props.moveLists"
                :key="list.id"
                :id="list.id"
                :character="list.character"
                :title="list.name"
                :moves="list.moves"
                :author-id="props.author.id"
                :video-url="list.metadata?.videoUrl"
                @edit="handleEditMoveListClick"
            />
        </div>

        <TsModal v-model="isCreateModalOpen">
            <UpsertMoveListForm
                :author-id="props.author.id"
                :move-list="selectedMoveList"
                @created="handleMoveListCreated"
                @updated="handleMoveListUpdated"
                @cancel="reset"
            />
        </TsModal>
    </div>
</template>
