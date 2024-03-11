<script lang="ts" setup>
interface Props {
    label: string;
    tooltip: string;
    icon?: string;
    color?: string;
}

const props = defineProps<Props>();
</script>

<template>
    <UTooltip :text="tooltip">
        <UBadge
            :color="props.color"
            class="select-none text-sm"
        >
            <div class="flex items-center gap-1 justify-center">
                <UIcon
                    v-if="props.icon"
                    :name="props.icon"
                    dynamic
                />

                {{ props.label }}
            </div>
        </UBadge>
    </UTooltip>
</template>
