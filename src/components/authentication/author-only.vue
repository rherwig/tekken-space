<script lang="ts" setup>
import type { ComputedRef } from 'vue';

import { computed, useAuth } from '#imports';

interface Props {
    id: string;
}

const props = defineProps<Props>();

const { session } = useAuth();

const isAuthor: ComputedRef<boolean> = computed(() => {
    if (session.value?.user?.role !== 'ADMIN') {
        return false;
    }

    return props.id === session.value?.user?.id;
});
</script>

<template>
    <slot v-if="isAuthor" />
</template>
