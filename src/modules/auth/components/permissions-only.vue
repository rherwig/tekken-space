<script lang="ts" setup>
import { computed } from 'vue';

import { useAuth } from '#imports';

interface Props {
    admin?: boolean;
    pro?: boolean;
    author?: string;
    guest?: boolean;
}

const props = defineProps<Props>();

const auth = useAuth();

const hasPermissions = computed(() => {
    const user = auth.session.value?.user;

    const permissionsList: boolean[] = [];

    if (!user) {
        return props.guest;
    }

    if (props.admin) {
        return user.role === 'ADMIN';
    }

    if (props.pro) {
        permissionsList.push(!!user.isPro);
    }

    if (props.author) {
        permissionsList.push(user.id === props.author);
    }

    return permissionsList.every(Boolean);
});
</script>

<template>
    <slot v-if="hasPermissions" />
</template>
