<script lang="ts" setup>
import { computed } from 'vue';

import TsIconBadge from '~/components/ui/badges/ts-icon-badge.vue';

interface Props {
    value: any;
    tooltip?: string;
    icon?: string;
    color?: string;
}

const props = defineProps<Props>();

const displayValue = computed(() => {
    if (!props.value) {
        return null;
    }

    const valueString = props.value.toString();

    switch (valueString.toLowerCase()) {
        case 'knd':
            return 'Knockdown';
        case 'lnc':
            return 'Launch';
        default:
            return valueString;
    }
});
</script>

<template>
    <TsIconBadge
        :label="displayValue"
        :tooltip="props.tooltip"
        :icon="props.icon"
        :color="props.color"
    />
</template>
