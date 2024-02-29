<script lang="ts" setup>
import styles from './ts-movement-arrow.module.scss';

interface Props {
    direction: string;
    hold?: boolean;
}

const props = defineProps<Props>();

const imageSrc = !props.hold ? `/images/notation/arrow.png` : `/images/notation/arrow-hold.png`;
</script>

<template>
    <div class="relative flex items-center justify-center min-h-[2.5em] w-[2.5em]">
        <NuxtImg
            :class="styles[props.direction]"
            width="64"
            height="64"
            :src="imageSrc"
        />
    </div>
</template>
