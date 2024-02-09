<script lang="ts" setup>
import html2canvas from 'html2canvas';

import TsNotationDisplay from '~/ui/notation/ts-notation-display.vue';

const router = useRouter();
const route = useRoute();
const clipboard = useClipboard();
const toast = useToast();

const notation = ref<string>(decodeURI(route.query.n?.toString() ?? ''));
const notationWrapperRef = ref<HTMLElement>();
const canvasRef = ref<HTMLCanvasElement>();

const encodedNotation = computed(() => encodeURI(notation.value));

watch(notation, () => {
    router.replace({
        query: {
            n: encodedNotation.value,
        },
    });
});

async function copyUrlToClipboard() {
    if (!clipboard.isSupported.value) {
        toast.add({
            title: 'Failed to copy to clipboard.',
        });

        return;
    }

    clipboard.copy(location.href);

    toast.add({
        title: 'Copied URL to clipboard.',
    });
}

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
        backgroundColor: 'transparent',
        useCORS: true,
    });
    const imageUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${notation.value}.png`;
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
}

useHead({
    title: 'Share',
});
</script>

<template>
    <div class="container mt-8">
        <h1 class="text-2xl font-light">Share a Combo</h1>
        <p class="text-copy/50">
            Use the text field below to enter the combo notation.
        </p>

        <div class="flex flex-col my-4">
            <UInput
                placeholder="Notation, e.g. d/f+2; 2"
                v-model="notation"
            />

            <div class="bg-black/50 p-4">
                <div
                    class="h-[56px]"
                    ref="notationWrapperRef"
                >
                    <TsNotationDisplay
                        v-if="notation.length"
                        :notation="notation"
                    />
                </div>
            </div>
        </div>

        <div class="flex gap-2">
            <UButton @click="copyUrlToClipboard"> Copy Link </UButton>
            <UButton
                @click="exportAsImage"
                color="white"
            >
                Export as Image (alpha)
            </UButton>
        </div>

        <div ref="canvasRef"></div>
    </div>
</template>
