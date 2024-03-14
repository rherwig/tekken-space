<script lang="ts" setup>
import type { Move } from 'prisma/types';

import MoveDisplayWithMeta from '~/components/moves/move-display-with-meta.vue';

interface Props {
    move: Move;
    index: number;
    authorId: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    edit: [moveId: string];
    delete: [moveId: string];
    created: [move: Move];
    updated: [move: Move];
    cancel: [];
}>();

const actions = [
    [
        {
            label: 'Edit Move',
            icon: 'i-tabler-pencil',
            click() {
                emit('edit', props.move.id);
            },
        },
        {
            label: 'Delete Move',
            icon: 'i-tabler-trash',
            click() {
                emit('delete', props.move.id);
            },
        },
    ],
];
</script>

<template>
    <div class="flex flex-col gap-4 p-4 border-t border-white/10">
        <div class="flex gap-2 items-center">
            <PermissionsOnly
                admin
                :author="props.authorId"
            >
                <UDropdown
                    :items="actions"
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

            <div class="text-sm">Variant {{ props.index + 1 }}</div>
        </div>

        <MoveDisplayWithMeta :move="props.move" />
    </div>
</template>
