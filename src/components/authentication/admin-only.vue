<script lang="ts" setup>
import type { ComputedRef } from 'vue';

import { computed, useAuth } from '#imports';

const { session } = useAuth();

const isAdmin: ComputedRef<boolean> = computed(() => {
    return session.value?.user?.role === 'ADMIN';
});
</script>

<template>
    <slot v-if="isAdmin" />
</template>
