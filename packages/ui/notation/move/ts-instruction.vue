<script lang="ts" setup>
import {
    InstructionSubType,
    InstructionTypes,
    type ParsedInstruction,
} from 'packages/notation-parser';

import TsMovement from '../movement/ts-movement.vue';
import TsAttack from '../attack/ts-attack.vue';
import TsRage from '../special/ts-rage.vue';
import TsHeat from '../special/ts-heat.vue';
import TsStance from '../special/ts-stance.vue';
import TsTornado from '../special/ts-tornado.vue';

import { unref } from '#imports';

interface Props {
    instruction: ParsedInstruction;
}

const props = defineProps<Props>();

const { type, subType, notation } = unref(props.instruction);
</script>

<template>
    <div class="flex w-full">
        <TsMovement
            v-if="type === InstructionTypes.MOVEMENT"
            :notation="notation"
        />

        <TsAttack
            v-else-if="type === InstructionTypes.ATTACK"
            :actions="notation.split('+')"
        />

        <div
            v-else-if="type === InstructionTypes.COMBINATOR"
            class="flex items-center font-bold font-mono text-3xl -mt-1 px-1"
        >
            {{ notation }}
        </div>

        <div
            v-else-if="type === InstructionTypes.ALTERNATIVE"
            class="flex items-center"
        >
            <UBadge
                color="gray"
                class="font-bold mx-4"
                size="lg"
                label="OR"
            />
        </div>

        <div v-else-if="type === InstructionTypes.TEXT">
            {{ notation }}
        </div>

        <div
            v-else-if="type === InstructionTypes.SPECIAL"
            class="flex items-center"
        >
            <UBadge
                v-if="subType === InstructionSubType.NONE"
                color="gray"
                class="font-bold"
                size="lg"
                :label="notation"
            />
            <TsHeat v-if="subType === InstructionSubType.HEAT" />
            <TsRage v-if="subType === InstructionSubType.RAGE" />
            <TsTornado v-if="subType === InstructionSubType.TORNADO" />
            <TsStance
                :notation="notation"
                v-if="subType === InstructionSubType.STANCE"
            />
        </div>
    </div>
</template>
