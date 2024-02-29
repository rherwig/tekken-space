<script lang="ts" setup>
import NotationInput from '~/components/moves/forms/notation-input.vue';
import {
    computed,
    ref,
    useClipboard,
    useHead,
    useRoute,
    useRouter,
    useToast,
    watch,
} from '#imports';

const router = useRouter();
const route = useRoute();
const clipboard = useClipboard();
const toast = useToast();

const notation = ref<string>(decodeURI(route.query.n?.toString() ?? ''));
const notationInputRef = ref<typeof NotationInput>();

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

useHead({
    title: 'Share',
});
</script>

<template>
    <div class="container mt-8">
        <h1 class="text-2xl font-light">Share a Combo</h1>
        <p class="text-copy/50">Use the text field below to enter the combo notation.</p>

        <NotationInput
            ref="notationInputRef"
            class="my-4"
            v-model="notation"
        />

        <div class="flex justify-end gap-2">
            <UButton @click="copyUrlToClipboard"> Copy Link </UButton>
            <UButton
                @click="(notationInputRef as any)?.exportAsImage()"
                color="white"
            >
                Export as Image (alpha)
            </UButton>
        </div>
    </div>
</template>
