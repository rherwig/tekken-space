<script setup lang="ts">
import TsNotationDisplay from '~/ui/notation/ts-notation-display.vue';

const demoMove = 'd/f+2;b+1,2 T!;d+4:2:1+2';
</script>

<template>
    <div class="space-y-8">
        <div class="bg-black/50 py-10">
            <div class="container text-center space-y-2">
                <h1 class="text-4xl">
                    Welcome to Tekken<span class="text-green-500">Space</span>.
                </h1>
                <p class="text-xl text-copy/50">
                    A community project to share moves and combos for Tekken 8
                    characters.
                </p>
            </div>
        </div>

        <div class="container space-y-4">
            <UAlert
                class="mb-8"
                title="Please Note"
                description="This site is currently in development. It started as a side-project to serve the author's needs and may be updated infrequently."
            />

            <p>
                With TekkenSpace, you can manage combos and move-lists for your
                favorite Tekken 8 character. You can note your combos down in
                Tekken Notation and have it displayed as visual notation,
                supporting different input types, like gamepad and arcade.
            </p>

            <p></p>

            <p>
                This helps beginners or those unaware with Tekken Notation to
                have a combos like this:
            </p>

            <pre>{{ demoMove }}</pre>

            <p>displayed like this:</p>

            <div class="bg-black/50 rounded-md p-4">
                <TsNotationDisplay :notation="demoMove" />
            </div>

            <p>
                You can try this out yourself, by using the
                <NuxtLink
                    class="text-green-500 hover:text-green-600 transition-colors underline underline-offset-2"
                    href="/share"
                    >Share</NuxtLink
                >
                <span> page</span>.
            </p>
        </div>
    </div>
</template>
