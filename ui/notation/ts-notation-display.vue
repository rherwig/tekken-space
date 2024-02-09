<script lang="ts" setup>
import { parseTekkenNotation } from '~/modules/notation-parser/parser';
import TsMove from '~/ui/notation/move/ts-move.vue';
import TsMoveSeparator from '~/ui/notation/move/ts-move-separator.vue';

interface Props {
    notation: string;
}

const props = defineProps<Props>();

const parserResult = computed(() => parseTekkenNotation(props.notation));
</script>

<template>
    <div class="flex gap-2 w-full h-full origin-left">
        <div
            v-for="(move, index) in parserResult.moves"
            :key="`${index}-${move.notation}`"
            class="flex h-full w-auto gap-2"
        >
            <TsMove :move="move" />

            <TsMoveSeparator v-if="index < parserResult.moves.length - 1" />
        </div>
    </div>
</template>
