<script lang="ts" setup>
import type { PopulatedMove } from 'prisma/types';

import TsNotationDisplay from '~/components/ui/notation/ts-notation-display.vue';
import { computed } from '#imports';
import { DIFFICULTIES } from '~/constants/moves';
import TsIconBadge from '~/components/ui/badges/ts-icon-badge.vue';
import TsFrameBadge from '~/components/ui/badges/ts-frame-badge.vue';

interface Props {
    move: PopulatedMove;
}

const props = defineProps<Props>();

const damage = computed(() => {
    const damageTotal = props.move.damage.total;
    if (damageTotal) {
        return damageTotal;
    }

    const damageHits = props.move.damage.hits;
    if (!Array.isArray(damageHits)) {
        return null;
    }

    return damageHits.reduce((sum, hit) => sum + hit, 0);
});

const difficultyLabel = computed(() => {
    const difficulty = props.move.metadata?.difficulty;
    if (!difficulty) {
        return null;
    }

    return DIFFICULTIES[difficulty]?.label;
});

const startupFrames = computed(() => {
    return props.move.frames.startup;
});

const hitFrames = computed(() => {
    return props.move.frames.hit;
});

const counterFrames = computed(() => {
    return props.move.frames.counter;
});

const blockFrames = computed(() => {
    return props.move.frames.block;
});
</script>

<template>
    <div class="space-y-4">
        <TsNotationDisplay :notation="props.move.notation" />

        <div class="space-x-2">
            <TsIconBadge
                v-if="damage"
                :label="damage.toString()"
                tooltip="Damage"
                icon="i-tabler-heart-broken"
                color="red"
            />

            <TsFrameBadge
                v-if="startupFrames"
                :value="startupFrames.toString()"
                tooltip="Startup Frames"
                icon="i-tabler-clock"
            />

            <TsFrameBadge
                v-if="hitFrames"
                :value="hitFrames.toString()"
                tooltip="Hit Frames"
                icon="i-tabler-crosshair"
            />

            <TsFrameBadge
                v-if="counterFrames"
                :value="counterFrames"
                tooltip="Counter Hit Frames"
                icon="i-tabler-heart-discount"
                color="yellow"
            />

            <TsFrameBadge
                v-if="blockFrames"
                :value="blockFrames.toString()"
                tooltip="Block Frames"
                icon="i-tabler-shield"
                color="blue"
            />

            <TsIconBadge
                v-if="difficultyLabel"
                :label="difficultyLabel"
                tooltip="Difficulty"
                icon="i-tabler-antenna-bars-5"
            />
        </div>
    </div>
</template>
