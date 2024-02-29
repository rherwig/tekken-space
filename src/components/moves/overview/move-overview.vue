<script lang="ts" setup>
import TsNotationDisplay from 'packages/ui/notation/ts-notation-display.vue';

import type { OverviewMoveItem } from '~/components/moves/moves.types';

interface Props {
    moveItems: OverviewMoveItem[];
}

const props = defineProps<Props>();
</script>

<template>
    <div
        class="grid grid-cols-[min-content_1fr] items-center"
        v-for="move in props.moveItems"
        :key="move.label"
    >
        <div class="font-mono min-w-[100px]">{{ move.label }}</div>

        <TsNotationDisplay
            class="scale-75"
            :notation="move.notation"
        />
    </div>
</template>
