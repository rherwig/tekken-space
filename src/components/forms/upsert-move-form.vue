<script lang="ts" setup>
import { reactive } from 'vue';
import { z } from 'zod';
import type { Move } from 'prisma/types';

import type { FormSubmitEvent } from '#ui/types';
import { useProfile } from '~/stores/profile';
import TsFormActions from '~/components/forms/actions/ts-form-actions.vue';
import TsNotationDisplay from '~/components/ui/notation/ts-notation-display.vue';
import { DIFFICULTIES } from '~/constants/moves';

interface Props {
    moveListId: string;
    move?: Move;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    created: [value: Move];
    updated: [value: Move];
    cancel: [];
}>();

const profile = useProfile();

const schema = z.object({
    notation: z.string().min(1, 'Please provide at least one input.'),
    damage: z.object({
        base: z.number().gte(0, 'Please provide a positive damage number.').optional(),
    }),
    metadata: z.object({
        difficulty: z.number().gte(0).optional(),
    }),
});

type Schema = z.output<typeof schema>;

const state = reactive({
    id: props.move?.id ?? undefined,
    notation: props.move?.notation ?? '',
    damage: {
        total: props.move?.damage?.total ?? undefined,
    },
    metadata: {
        difficulty: props.move?.metadata?.difficulty ?? undefined,
    },
});

/**
 * Handles the form submission.
 * @param event
 */
async function handleSubmit(event: FormSubmitEvent<Schema>) {
    const move = await profile.createMove(event.data, props.moveListId);

    if (event.data.id) {
        emit('updated', move);
    } else {
        emit('created', move);
    }
}
</script>

<template>
    <UForm
        :schema="schema"
        :state="state"
        @submit="handleSubmit"
    >
        <h3 class="text-xl mb-2">Add Move</h3>
        <p class="text-sm text-copy/50 mb-4">
            Enter the notation and optional information for the move and click add, to add it to the
            move list.
        </p>

        <div class="space-y-4">
            <UFormGroup
                label="Notation"
                name="notation"
            >
                <UInput
                    v-model="state.notation"
                    label="Notation"
                    placeholder="Enter notation"
                />

                <div class="p-4 bg-black/25">
                    <div class="h-[56px]">
                        <TsNotationDisplay
                            v-if="state.notation"
                            :notation="state.notation"
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
                        v-model="state.damage.total"
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
                        v-model="state.metadata.difficulty"
                        :options="DIFFICULTIES"
                        value-attribute="id"
                        label="Difficulty"
                        placeholder="Select difficulty"
                    />
                </UFormGroup>
            </div>
        </div>

        <TsFormActions>
            <UButton type="submit"> Save Move </UButton>
            <UButton
                type="reset"
                color="white"
                @click="emit('cancel')"
            >
                Cancel
            </UButton>
        </TsFormActions>
    </UForm>
</template>
