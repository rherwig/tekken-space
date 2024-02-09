<template>
    <NuxtLink
        class="flex items-center h-full px-8 font-light"
        :href="props.href"
    >
        <slot />
    </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
    href: string;
}

const props = defineProps<Props>();
</script>
