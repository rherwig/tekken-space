<script lang="ts" setup>
import { TsNotationDisplay } from 'packages/ui';
import type { PopulatedMove } from 'prisma/types';

import { computed } from '#imports';
import { DIFFICULTIES } from '~/constants/moves';
import TsIconBadge from '~/components/ui/badges/ts-icon-badge.vue';

interface Props {
    move: PopulatedMove;
}

const props = defineProps<Props>();

const damage = computed(() => {
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
                :label="damage"
                tooltip="Damage"
                icon="i-tabler-heart-broken"
                color="red"
            />
            <TsIconBadge
                v-if="startupFrames"
                :label="startupFrames"
                tooltip="Startup Frames"
                icon="i-tabler-clock"
            />
            <TsIconBadge
                v-if="hitFrames"
                :label="hitFrames"
                tooltip="Hit Frames"
                icon="i-tabler-heart-discount"
            />
            <TsIconBadge
                v-if="blockFrames"
                :label="blockFrames"
                tooltip="Block Frames"
                icon="i-tabler-shield"
                color="blue"
            />
            <TsIconBadge
                v-if="difficultyLabel"
                :label="difficultyLabel"
                tooltip="Difficulty"
                icon="i-tabler-clock"
            />
        </div>
    </div>
</template>
