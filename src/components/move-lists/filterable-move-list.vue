<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { PopulatedMove } from 'prisma/types';

import MoveDisplayWithMeta from '~/components/moves/move-display-with-meta.vue';

interface Props {
    moves: PopulatedMove[];
    showFilter?: boolean;
}

const props = defineProps<Props>();

const searchQuery = ref<string>('');

const moves = computed(() => {
    return props.moves.filter((move) => {
        return move.notation.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
});
</script>

<template>
    <div class="space-y-4">
        <div
            v-if="props.showFilter"
            class="bg-black/25 rounded-md p-4"
        >
            <div class="flex gap-2">
                <UInput
                    v-model="searchQuery"
                    class="flex-1"
                    placeholder="Search by Notation"
                />
                <USelectMenu placeholder="Sorting" />
            </div>
        </div>
        <div class="bg-black/25 rounded-md">
            <div
                v-for="move in moves"
                :key="move.id"
                class="flex flex-col gap-4 p-4 border-b border-white/10"
            >
                <pre class="text-lg">{{ move.notation }}</pre>
                <MoveDisplayWithMeta :move="move" />
            </div>
        </div>
    </div>
</template>
