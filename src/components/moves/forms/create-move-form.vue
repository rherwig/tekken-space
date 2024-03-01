<script lang="ts" setup>
import { z } from 'zod';
import { reactive, ref } from 'vue';
import TsNotationDisplay from 'packages/ui/notation/ts-notation-display.vue';

import { DIFFICULTIES } from '~/constants/moves';
import { useProfile } from '~/stores/profile';

interface Props {
    moveListId: string;
    modelValue: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const profile = useProfile();

const isFullsize = ref<boolean>(false);

const schema = z.object({
    notation: z.string().min(1, 'Please provide at least one input.'),
    damage: z.object({
        base: z.number().gte(0, 'Please provide a positive damage number.').optional(),
    }),
    metadata: z.object({
        difficulty: z.number().gte(0).optional(),
    }),
});

const form = reactive({
    notation: '',
    damage: {
        base: undefined,
    },
    metadata: {
        difficulty: 0,
    },
});

async function handleSubmit() {
    await profile.createMove(form.notation, props.moveListId, form.damage, form.metadata);

    emit('update:modelValue', false);
}
</script>

<template>
    <UModal
        :model-value="props.modelValue"
        @update:model-value="emit('update:modelValue', $event)"
        class="overflow-y-auto"
        :ui="{ base: '!overflow-visible', width: isFullsize ? 'sm:max-w-full mx-16' : '' }"
    >
        <div class="p-4">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl">Add Move</h3>
                <div
                    @click="isFullsize = !isFullsize"
                    class="flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer w-5 h-5 rounded-full"
                >
                    <UIcon
                        name="i-tabler-resize"
                        dynamic
                    />
                </div>
            </div>
            <p class="text-sm text-copy/50 mb-4">
                Enter the notation and optional information for the move and click add, to add it to
                the move list.
            </p>

            <UForm
                :schema="schema"
                :state="form"
                @submit="handleSubmit"
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

                <div class="flex gap-2">
                    <UFormGroup
                        label="Damage (optional)"
                        name="damage"
                        class="flex-1"
                    >
                        <UInput
                            type="number"
                            v-model="form.damage.base"
                            label="Damage"
                            placeholder="Amount of damage"
                        />
                    </UFormGroup>

                    <UFormGroup
                        label="Difficulty (optional)"
                        name="difficulty"
                        class="flex-1"
                    >
                        <USelectMenu
                            v-model="form.metadata.difficulty"
                            :options="DIFFICULTIES"
                            value-attribute="id"
                            label="Difficulty"
                            placeholder="Select difficulty"
                        />
                    </UFormGroup>
                </div>

                <div class="space-x-2">
                    <UButton type="submit"> Add </UButton>
                    <UButton
                        type="reset"
                        color="white"
                        @click="emit('update:modelValue', false)"
                    >
                        Cancel
                    </UButton>
                </div>
            </UForm>
        </div>
    </UModal>
</template>
