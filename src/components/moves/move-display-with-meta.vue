<script lang="ts" setup>
import Prisma from '@prisma/client';
import { TsNotationDisplay } from 'packages/ui';

import { computed } from '#imports';
import { DIFFICULTIES } from '~/constants/moves';

interface Props {
    move: Prisma.Move;
}

const props = defineProps<Props>();

const damage = computed(() => props.move.damage?.base);

const difficultyLabel = computed(() => {
    const difficulty = props.move.metadata?.difficulty;
    if (!difficulty) {
        return null;
    }

    return DIFFICULTIES[difficulty]?.label;
});
</script>

<template>
    <div class="space-y-4">
        <TsNotationDisplay :notation="props.move.notation" />

        <div class="space-x-2">
            <UBadge
                v-if="damage"
                size="xs"
                :label="`${damage} Damage`"
                color="red"
            />

            <UBadge
                v-if="difficultyLabel"
                size="xs"
                :label="difficultyLabel"
                color="green"
            />
        </div>
    </div>
</template>
