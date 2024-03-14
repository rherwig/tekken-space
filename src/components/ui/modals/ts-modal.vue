<script lang="ts" setup>
interface Props {
    modelValue: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    'update:modelValue': [value: boolean];
}>();
</script>

<template>
    <UModal
        :model-value="props.modelValue"
        @update:modelValue="emit('update:modelValue', $event)"
        class="overflow-y-auto"
        :ui="{ base: '!overflow-visible' }"
    >
        <div class="p-4">
            <slot />
        </div>
    </UModal>
</template>
