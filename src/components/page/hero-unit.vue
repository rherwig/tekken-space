<template>
    <div class="bg-black/50 py-10">
        <div class="container text-center space-y-2">
            <h1 class="text-4xl">
                <slot name="title" />
            </h1>
            <p class="text-xl text-copy/50">
                <slot />
            </p>
        </div>
    </div>
</template>
