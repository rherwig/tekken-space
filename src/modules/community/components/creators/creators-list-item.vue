<script lang="ts" setup>
import Prisma from '@prisma/client';

interface Props {
    creator: Prisma.User;
}

const props = defineProps<Props>();
</script>

<template>
    <NuxtLink
        :href="`/@${props.creator.handle}`"
        class="flex bg-black/50 border-green-400 border-2 p-4 rounded-md"
    >
        <div class="flex items-center gap-2">
            <UAvatar :text="props.creator.name.at(0)" />
            {{ props.creator.name }}
        </div>
    </NuxtLink>
</template>
