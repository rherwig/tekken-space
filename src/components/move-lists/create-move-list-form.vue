<script lang="ts" setup>
import { z } from 'zod';
import { reactive, ref } from 'vue';
import { TsCharacterSelect } from 'packages/ui';

import { useProfile } from '~/stores/profile';

interface Props {
    moveListId?: string;
}

const props = defineProps<Props>();

const profile = useProfile();

const isCreateModalOpen = ref<boolean>(false);

const schema = z.object({
    name: z.string().min(1, 'Please specify a name for your move list.'),
    characterId: z.string().min(1, 'Please specify a character for your move list.'),
});

const form = reactive({
    name: '',
    characterId: '',
});

async function handleFormSubmit(form: any) {
    const { name, characterId } = form.data;

    await profile.createMoveList(name, characterId);

    isCreateModalOpen.value = false;
}
</script>

<template>
    <div>
        <UButton
            label="Add Move List"
            @click="isCreateModalOpen = true"
        />

        <UModal
            v-model="isCreateModalOpen"
            class="overflow-y-auto"
            :ui="{ base: '!overflow-visible' }"
        >
            <div class="p-4">
                <h3 class="text-xl mb-2">Add Move List</h3>
                <p class="text-sm text-copy/50 mb-4">
                    Choose a character and a name for your move list. You can add moves after
                    creating it.
                </p>

                <UForm
                    :schema="schema"
                    :state="form"
                    @submit="handleFormSubmit"
                    class="space-y-4"
                >
                    <UFormGroup
                        label="Character"
                        name="characterId"
                    >
                        <TsCharacterSelect v-model="form.characterId" />
                    </UFormGroup>

                    <UFormGroup
                        label="Name"
                        name="name"
                    >
                        <UInput
                            v-model="form.name"
                            label="Name"
                            placeholder="e.g. Basic Combos"
                        />
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
