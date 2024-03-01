<script lang="ts" setup>
import type { ParsedInstruction } from 'packages/notation-parser';
import { computed, type ComputedRef } from 'vue';

interface Props {
    instruction: ParsedInstruction;
}

const props = defineProps<Props>();

const displayValue: ComputedRef<string> = computed(() => {
    const value = props.instruction.value ?? props.instruction.notation;

    return value.replace(/\s/gi, '\n');
});
</script>

<template>
    <div
        class="mr-0.5 px-2 py-1 max-w-[11ch] whitespace-break-spaces text-sm rounded-sm text-center leading-[1.05]"
    >
        {{ displayValue }}
    </div>
</template>
