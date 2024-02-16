<template>
    <div class="flex h-full flex-col">
        <AppHeader />

        <main class="flex-grow">
            <slot />
        </main>

        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/app-header.vue';
import AppFooter from '~/components/app-footer.vue';
</script>
