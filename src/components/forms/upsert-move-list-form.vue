<script lang="ts" setup>
import { reactive } from 'vue';
import { z } from 'zod';
import type { MoveList } from 'prisma/types';

import { useProfile } from '~/stores/profile';
import type { FormSubmitEvent } from '#ui/types';
import TsFormActions from '~/components/forms/actions/ts-form-actions.vue';
import TsCharacterSelect from '~/components/ui/selects/ts-character-select.vue';

interface Props {
    moveList?: MoveList;
    authorId?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    created: [value: MoveList];
    updated: [value: MoveList];
    cancel: [];
}>();

const profile = useProfile();

const state = reactive({
    id: props.moveList?.id ?? undefined,
    name: props.moveList?.name ?? '',
    authorId: props.authorId ?? undefined,
    characterId: props.moveList?.characterId ?? '',
});

const schema = z.object({
    id: z.string().optional(),
    authorId: z.string().optional(),
    name: z.string().min(1, 'Please specify a name for your move list.'),
    characterId: z.string().min(1, 'Please specify a character for your move list.'),
});

type Schema = z.output<typeof schema>;

/**
 * Handle form submission and upserts a move list.
 * @param event
 */
async function handleSubmit(event: FormSubmitEvent<Schema>) {
    const moveList = await profile.createMoveList(event.data);

    if (event.data.id) {
        emit('updated', moveList);
    } else {
        emit('created', moveList);
    }
}
</script>

<template>
    <UForm
        :schema="schema"
        :state="state"
        @submit="handleSubmit"
    >
        <h3 class="text-xl mb-2">Add Move List</h3>
        <p class="text-sm text-copy/50 mb-4">
            Choose a character and a name for your move list. You can add moves after creating it.
        </p>

        <UAlert
            v-if="props.authorId !== profile.user?.id"
            class="mb-4"
            title="Please Note"
            description="You are creating a move list for another user."
            color="yellow"
        />

        <div class="space-y-4">
            <UFormGroup
                label="Character"
                name="characterId"
            >
                <TsCharacterSelect v-model="state.characterId" />
            </UFormGroup>

            <UFormGroup
                label="Name"
                name="name"
            >
                <UInput
                    v-model="state.name"
                    placeholder="Name, e.g. Hopkick Staple Combos"
                />
            </UFormGroup>
        </div>

        <TsFormActions>
            <UButton type="submit"> Save Move List </UButton>
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
