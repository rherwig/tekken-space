<script lang="ts" setup>
import type { ComputedRef } from 'vue';

import { computed, useAuth } from '#imports';

const { session } = useAuth();

const isPro: ComputedRef<boolean> = computed(() => {
    return session.value?.user?.isPro ?? false;
});
</script>

<template>
    <slot v-if="isPro" />
</template>
