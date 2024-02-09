<script lang="ts" setup>
interface Props {
    notation: string;
}

const props = defineProps<Props>();
</script>

<template>
    <UBadge
        color="green"
        class="font-base mr-2"
        size="lg"
        :label="props.notation"
    />
</template>
