<script lang="ts" setup>
import styles from './ts-movement-arrow.module.scss';

const ARROW_DIRECTIONS = {
    u: 'up',
    d: 'down',
    b: 'back',
    f: 'forward',
    ub: 'up-back',
    uf: 'up-forward',
    db: 'down-back',
    df: 'down-forward',
};

interface Props {
    direction: keyof typeof ARROW_DIRECTIONS;
    hold?: boolean;
}

const props = defineProps<Props>();

const direction = ARROW_DIRECTIONS[props.direction];
const isHoldInput = props.hold ?? false;
</script>

<template>
    <div :class="styles.arrowContainer">
        <div
            :class="[
                styles.arrow,
                isHoldInput && styles.hold,
                styles[direction],
            ]"
        ></div>
    </div>
</template>
