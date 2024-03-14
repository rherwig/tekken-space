<script lang="ts" setup>
import { computed } from 'vue';

import TsModal from '~/components/ui/modals/ts-modal.vue';

interface Props {
    title: string;
    message: string;
    variant?: 'warning' | 'error' | 'info';
    confirmButtonText?: string;
    cancelButtonText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'error',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
});

const confirmButtonColor = computed(() => {
    switch (props.variant) {
        case 'warning':
            return 'yellow';
        case 'error':
            return 'red';
        case 'info':
            return 'blue';
    }
});
</script>

<template>
    <TsModal>
        <h2 class="text-lg font-bold mb-4">{{ props.title }}</h2>
        <p>{{ props.message }}</p>
        <div class="flex justify-end gap-2 mt-4">
            <UButton
                color="white"
                @click="props.onCancel"
            >
                {{ props.cancelButtonText }}
            </UButton>
            <UButton
                @click="props.onConfirm"
                :color="confirmButtonColor"
            >
                {{ props.confirmButtonText }}
            </UButton>
        </div>
    </TsModal>
</template>
