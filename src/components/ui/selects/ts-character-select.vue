<script lang="ts" setup>
import { computed, onMounted, unref } from 'vue';

import { useAsyncData } from '#app';
import { useCharacters } from '~/stores/characters';

interface Props {
    modelValue: string | undefined;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const characters = useCharacters();

await useAsyncData('characters', () => characters.fetchAll());

const characterItems = computed(() => {
    return characters.all.map((character) => ({
        id: character.id,
        label: character.name,
        avatar: character.imageUrl,
    }));
});

const selectedCharacterItem = computed(() => {
    const items = unref(characterItems);
    if (!items) {
        return null;
    }

    if (!props.modelValue) {
        return items.at(0);
    }

    return items.find((item) => item.id === props.modelValue);
});

function handleSelectCharacter(character: any) {
    emit('update:modelValue', character.id);
}

onMounted(() => {
    emit('update:modelValue', selectedCharacterItem.value?.id);
});
</script>

<template>
    <USelectMenu
        :model-value="selectedCharacterItem"
        @update:model-value="handleSelectCharacter"
        :options="characterItems"
        searchable
    >
        <template #leading>
            <UAvatar
                :src="selectedCharacterItem.avatar"
                size="3xs"
                class="mx-0.5"
            />
        </template>
    </USelectMenu>
</template>
