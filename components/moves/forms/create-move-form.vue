<script lang="ts" setup>
import { z } from 'zod';

import TsNotationDisplay from '~/ui/notation/ts-notation-display.vue';

interface Props {
    moveListId?: string;
}

const props = defineProps<Props>();

const isCreateModalOpen = ref<boolean>(false);

const schema = z.object({
    notation: z.string().min(1, 'Please provide at least one input.'),
});

const form = reactive({
    notation: '',
});
</script>

<template>
    <div>
        <UButton
            label="Add Move"
            @click="isCreateModalOpen = true"
        />

        <UModal v-model="isCreateModalOpen">
            <div class="p-4">
                <h3 class="text-xl mb-2">Add Move</h3>
                <p class="text-sm text-copy/50 mb-4">
                    Enter the notation and optional information for the move and
                    click add, to add it to the move list.
                </p>

                <UForm
                    :schema="schema"
                    :state="form"
                    class="space-y-4"
                >
                    <UFormGroup
                        label="Notation"
                        name="notation"
                    >
                        <UInput
                            v-model="form.notation"
                            label="Notation"
                            placeholder="Enter notation"
                        />
                        <div class="p-4 bg-black/25">
                            <div class="h-[56px]">
                                <TsNotationDisplay
                                    v-if="form.notation"
                                    :notation="form.notation"
                                />
                            </div>
                        </div>
                    </UFormGroup>

                    <div class="space-x-2">
                        <UButton type="submit"> Add </UButton>
                        <UButton
                            type="reset"
                            color="white"
                            @click="isCreateModalOpen = false"
                        >
                            Cancel
                        </UButton>
                    </div>
                </UForm>
            </div>
        </UModal>
    </div>
</template>
