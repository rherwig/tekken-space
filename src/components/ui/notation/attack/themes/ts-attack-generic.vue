<script lang="ts" setup>
import type { ControllerLayout } from 'prisma/types';

interface Props {
    type: ControllerLayout;
    actions: string[];
}

const props = defineProps<Props>();

const colorSchemes: Record<ControllerLayout, string[]> = {
    UNKNOWN: [],
    XBOX: [
        '',
        'bg-blue-500 text-blue-900',
        'bg-yellow-500 text-yellow-900',
        'bg-green-500 text-green-900',
        'bg-red-500 text-red-900',
    ],
    PLAYSTATION: [
        '',
        'bg-pink-400 text-pink-900',
        'bg-green-500 text-green-900',
        'bg-slate-500 text-slate-900',
        'bg-red-500 text-red-950',
    ],
    GAMEPAD: [
        '',
        'bg-blue-500 text-blue-900',
        'bg-yellow-500 text-yellow-900',
        'bg-green-500 text-green-900',
        'bg-red-500 text-red-900',
    ],
    ARCADE: [
        '',
        'bg-blue-500 text-blue-900',
        'bg-yellow-500 text-yellow-900',
        'bg-green-500 text-green-900',
        'bg-red-500 text-red-900',
    ],
    HITBOX: [
        '',
        'bg-red-500 text-red-900',
        'bg-red-500 text-red-900',
        'bg-red-500 text-red-900',
        'bg-red-500 text-red-900',
    ],
};
</script>

<style lang="postcss" module>
.root {
    @apply relative w-[3.5em] h-[3.5em];
}

[data-button] {
    width: 39%;
    height: 39%;

    @apply absolute;
    @apply border border-transparent rounded-full;
    @apply flex items-center justify-center;
    @apply font-medium leading-none;
}

[data-button='2'] {
    @apply top-0 left-1/2;
    @apply -translate-x-1/2;
}

[data-button='3'] {
    @apply bottom-0 left-1/2;
    @apply -translate-x-1/2;
}

[data-button='4'] {
    @apply top-1/2 right-0;
    @apply -translate-y-1/2;
}

.isGamepad {
    [data-button='1'] {
        @apply left-0 top-1/2;
        @apply -translate-y-1/2;
    }

    [data-button='2'] {
        @apply top-0 left-1/2;
        @apply -translate-x-1/2;
    }

    [data-button='3'] {
        @apply bottom-0 left-1/2;
        @apply -translate-x-1/2;
    }

    [data-button='4'] {
        @apply top-1/2 right-0;
        @apply -translate-y-1/2;
    }
}

.isArcade {
    [data-button='1'] {
        @apply left-0 bottom-0;
        @apply -translate-y-full;
        @apply ml-1.5 mb-0.5;
    }

    [data-button='2'] {
        @apply right-0 top-0;
        @apply translate-x-0;
        @apply mr-1.5;
    }

    [data-button='3'] {
        @apply left-0 bottom-0;
        @apply translate-x-0;
        @apply ml-1.5;
    }

    [data-button='4'] {
        @apply right-0 top-0;
        @apply translate-y-full;
        @apply mr-1.5 mt-0.5;
    }
}
</style>

<template>
    <div :class="[$style.root, props.type === 'GAMEPAD' ? $style.isGamepad : $style.isArcade]">
        <div
            v-for="index in 4"
            :key="index"
            :data-button="index"
            :class="
                props.actions.includes(index.toString())
                    ? colorSchemes[props.type].at(index)
                    : 'bg-white text-slate-500'
            "
        >
            {{ index }}
        </div>
    </div>
</template>
