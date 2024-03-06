<script lang="ts" setup>
import { InstructionSubType, type ParsedInstruction } from 'packages/notation-parser';

interface Props {
    instruction: ParsedInstruction;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="flex items-center">
        <NuxtImg
            v-if="props.instruction.subType === InstructionSubType.BRACKET_LEFT"
            src="/images/notation/bracketl.png"
            width="16"
            height="64"
        />

        <NuxtImg
            v-if="props.instruction.subType === InstructionSubType.BRACKET_RIGHT"
            src="/images/notation/bracketr.png"
            width="16"
            height="64"
        />
    </div>
</template>
