<script lang="ts" setup>
import TsMovementNeutral from './ts-movement-neutral.vue';
import TsMovementArrow from './ts-movement-arrow.vue';

import { computed } from '#imports';

interface Props {
    notation: string;
}

const props = defineProps<Props>();

const notation = computed(() => props.notation.replace('/', ''));
const isNeutral = computed(() => notation.value === 'N' || notation.value === 'n');
const isHoldInput = computed(() => notation.value.toLowerCase() !== notation.value);
</script>

<template>
    <div class="relative min-h-0 flex items-center justify-center">
        <TsMovementNeutral v-if="isNeutral" />
        <TsMovementArrow
            v-else
            :direction="notation.toLowerCase()"
            :hold="isHoldInput"
        />
    </div>
</template>
