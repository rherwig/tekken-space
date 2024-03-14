<script lang="ts" setup>
import type { ParsedMove } from 'packages/notation-parser';

import TsInstruction from './ts-instruction.vue';

interface Props {
    move: ParsedMove;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="flex gap-2 whitespace-nowrap">
        <TsInstruction
            v-for="(instruction, index) in props.move.instructions"
            :key="index"
            :instruction="instruction"
        />
    </div>
</template>
