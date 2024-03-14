<script setup lang="ts">
import html2canvas from 'html2canvas';
import { computed, ref, type Ref, unref } from 'vue';

import { defineShortcuts } from '#imports';
import TsNotationDisplay from '~/components/ui/notation/ts-notation-display.vue';
import { useWrapAround } from '~/composables/wrap-around';

interface Props {
    modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const notationInputRef = ref<HTMLInputElement>();
const notationWrapperRef = ref<HTMLElement>();
const canvasRef = ref<HTMLCanvasElement>();

const showAutocomplete = ref<boolean>(false);

const activeAutocompleteIndex = ref<number>(-1);

defineShortcuts({
    arrowup: {
        usingInput: true,
        whenever: [showAutocomplete],
        handler: () => setActiveAutocompleteIndex(activeAutocompleteIndex.value - 1),
    },

    arrowdown: {
        usingInput: true,
        whenever: [showAutocomplete],
        handler: () => setActiveAutocompleteIndex(activeAutocompleteIndex.value + 1),
    },

    enter: {
        usingInput: 'notationInput',
        whenever: [showAutocomplete],
        handler: () => {
            const text = autocompleteMoves.value.at(activeAutocompleteIndex.value);
            if (!text) {
                return;
            }

            insertAtCursor(text);
        },
    },
});

function insertAtCursor(text: string) {
    const inputField = unref(notationInputRef);
    if (!inputField) {
        return;
    }

    const currentValue = unref(props.modelValue);

    const start = inputField.selectionStart ?? 0;
    const end = inputField.selectionEnd ?? 0;

    const nextValue =
        currentValue.substring(0, start ?? 0) +
        text +
        currentValue.substring(end, currentValue.length);

    inputField.selectionStart = start + text.length;
    inputField.selectionEnd = end + text.length;

    emit('update:modelValue', nextValue);
}

/**
 * Saves the rendered notation as a png image with transparent background.
 */
async function exportAsImage() {
    if (!window) {
        return;
    }

    const notationElement = unref(notationWrapperRef);
    if (!notationElement) {
        return;
    }

    const canvasElement = unref(canvasRef);
    if (!canvasElement) {
        return;
    }

    const canvas = await html2canvas(notationElement, {
        backgroundColor: null,
        removeContainer: true,
        width: notationElement.firstChild?.clientWidth ?? 0,
        scale: 4,
        useCORS: true,
    });
    const imageUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${props.modelValue}.png`;
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
}

defineExpose({
    exportAsImage,
});

const demoMoves = ['b+2', 'b+2,1', 'b+2,2', 'No Sword Stance (NSS)', 'Kincho (KIN)', 'Flea (FLE)'];

const filteredMoves = computed(() => demoMoves.filter((move) => move.startsWith(props.modelValue)));

const autocompleteMoves = computed(() => {
    return filteredMoves.value.filter((_, index) => index < 4);
});

function setActiveAutocompleteIndex(nextIndex: number | Ref<number>) {
    const index = useWrapAround(nextIndex, 0, autocompleteMoves.value.length);

    activeAutocompleteIndex.value = index.value;
}
</script>

<template>
    <div class="flex flex-col">
        <div class="bg-black/50 rounded-t-md p-4 overflow-x-auto">
            <div
                class="h-[56px]"
                ref="notationWrapperRef"
            >
                <TsNotationDisplay
                    v-if="props.modelValue.length"
                    :notation="props.modelValue"
                />
            </div>
        </div>

        <input
            name="notationInput"
            ref="notationInputRef"
            class="rounded-b-sm w-full px-4 py-2 font-mono bg-white/10"
            @keydown="showAutocomplete = true"
            placeholder="Notation, e.g. d/f+2; 2"
            :value="props.modelValue"
            @input="emit('update:modelValue', $event.target.value)"
            autocomplete="off"
        />

        <ClientOnly v-if="false">
            <UPopover
                v-model:open="showAutocomplete"
                :popper="{
                    placement: 'bottom-start',
                    offsetDistance: -10,
                }"
            >
                <div class="h-2" />

                <template #panel>
                    <div class="min-w-[200px] bg-black/50">
                        <div class="py-3 px-4">
                            <div class="text-lg font-light mb-1">Yoshimitsu</div>
                            <div class="flex gap-1">
                                <UBadge>All</UBadge>
                                <UBadge>Moves</UBadge>
                                <UBadge>Stances</UBadge>
                            </div>
                        </div>

                        <ul>
                            <li
                                v-for="(move, index) in autocompleteMoves"
                                :key="move"
                                class="px-4 py-2 bg-black/25 text-sm hover:bg-black/35 cursor-pointer"
                                :class="index === activeAutocompleteIndex ? 'bg-primary/50' : ''"
                            >
                                {{ move }}
                            </li>
                        </ul>

                        <div
                            v-if="!autocompleteMoves.length"
                            class="px-4 pb-3 text-sm text-copy/50"
                        >
                            No matching moves found.
                        </div>
                    </div>
                </template>
            </UPopover>
        </ClientOnly>

        <div ref="canvasRef"></div>
    </div>
</template>
