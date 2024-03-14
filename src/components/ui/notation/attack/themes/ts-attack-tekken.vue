<script lang="ts" setup>
import type { ControllerLayout } from 'prisma/types';

import { computed } from '#imports';

interface Props {
    type: ControllerLayout;
    actions: string[];
}

const props = defineProps<Props>();

const imageSrc = computed(() => {
    const action = props.actions.join('+');

    return `/images/notation/themes/tekken/${action}.png`;
});
</script>

<template>
    <NuxtImg
        height="64"
        :src="imageSrc"
    />
</template>
