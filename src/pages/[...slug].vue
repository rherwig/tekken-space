<template>
    <div class="container">
        <div class="text-center mt-20 mb-10">
            <h1 class="font-logo text-display">
                <span class="text-green-500">4</span>
                <span class="text-copy/80">0</span>
                <span class="text-green-500">4</span>
            </h1>
            <p class="text-2xl text-copy/50">
                Oh, no! Looks like the page, you tried to access, ran away.
            </p>
        </div>

        <div class="text-center text-xl">
            <p>If you wave-dash fast enough, you might be able to catch it.</p>
            <p>Otherwise, try one of these pages:</p>

            <ul class="mt-10 space-y-2">
                <li>
                    <NuxtLink
                        class="text-green-500 hover:text-green-700"
                        href="/"
                    >
                        Home
                    </NuxtLink>
                </li>

                <li>
                    <NuxtLink
                        class="text-green-500 hover:text-green-700"
                        href="/share"
                    >
                        Share
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>
