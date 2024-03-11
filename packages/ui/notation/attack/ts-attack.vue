<script lang="ts" setup>
import type { ComputedRef } from 'vue';
import { ControllerLayout } from 'prisma/types';
import TsAttackTekken from 'packages/ui/notation/attack/themes/ts-attack-tekken.vue';

import TsAttackGeneric from './themes/ts-attack-generic.vue';

import { computed, useProfile } from '#imports';

interface Props {
    actions: string[];
}

const props = defineProps<Props>();

const profile = useProfile();

const propScheme: ComputedRef<ControllerLayout> = computed(() => profile.preferences.layout);

const isGenericTheme = computed(() =>
    [ControllerLayout.GAMEPAD, ControllerLayout.ARCADE].includes(propScheme.value),
);

const isTekkenTheme = computed(() => propScheme.value === ControllerLayout.TEKKEN);
</script>

<template>
    <TsAttackGeneric
        v-if="isGenericTheme"
        :type="propScheme"
        :actions="props.actions"
    />

    <TsAttackTekken
        v-else-if="isTekkenTheme"
        :type="propScheme"
        :actions="props.actions"
    />
</template>
