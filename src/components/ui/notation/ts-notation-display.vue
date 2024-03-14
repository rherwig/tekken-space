<script lang="ts" setup>
import { parseTekkenNotation } from 'packages/notation-parser';

import TsMove from './move/ts-move.vue';
import TsMoveSeparator from './move/ts-move-separator.vue';

import { computed } from '#imports';

interface Props {
    notation: string;
}

const props = defineProps<Props>();

const parserResult = computed(() => parseTekkenNotation(props.notation));
</script>

<template>
    <div class="inline-flex gap-2 h-full origin-left overflow-x-auto overflow-y-hidden">
        <div
            v-for="(move, index) in parserResult.moves"
            :key="`${index}-${move.notation}`"
            class="flex h-full w-auto gap-2"
        >
            <TsMove :move="move" />

            <TsMoveSeparator v-if="index < parserResult.moves.length - 1" />
        </div>
    </div>
</template>
